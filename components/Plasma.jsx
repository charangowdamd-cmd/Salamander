'use client';

import { useEffect, useRef } from 'react';
import './Plasma.css';

const VERTEX = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

// Plasma fragment shader — smooth fluid blobs with configurable color
const FRAGMENT = `#version 300 es
precision highp float;

uniform vec2 uView;
uniform float uTime;
uniform float uScale;
uniform float uTwist;
uniform float uSoftness;
uniform float uShine;
uniform float uWave;
uniform vec3 uColor;
uniform vec2 uPointer;
uniform float uPointerActive;

out vec4 outColor;

float plasma(vec2 uv, float t) {
  float v = 0.0;
  v += sin(uv.x * uScale + t);
  v += sin(uv.y * uScale * 0.8 + t * 1.1);
  v += sin((uv.x + uv.y) * uScale * 0.6 + t * 0.9);
  v += sin(sqrt(uv.x * uv.x + uv.y * uv.y) * uScale * uWave + t * 0.7);
  v += uTwist * sin(uv.x * uScale * 0.4 + uv.y * uScale * 0.5 - t * 0.5);
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uView) * 2.0 - 1.0;
  uv.x *= uView.x / uView.y;

  // Pointer distortion
  if (uPointerActive > 0.0) {
    vec2 pUv = (uPointer / uView) * 2.0 - 1.0;
    pUv.x *= uView.x / uView.y;
    vec2 diff = uv - pUv;
    float dist = length(diff);
    uv += (diff / max(dist, 0.001)) * uPointerActive * 0.08 * exp(-dist * 2.5);
  }

  float t = uTime;
  float v = plasma(uv, t);

  // Normalize to [0,1]
  float n = (sin(v * 1.2) * 0.5 + 0.5);
  // Apply softness: blend toward midpoint to reduce contrast
  n = mix(n, 0.5, uSoftness * 0.5);
  // Apply shine: brighten peaks
  float peak = pow(n, 2.0) * uShine;
  n = clamp(n + peak * 0.3, 0.0, 1.0);

  // Output: color tinted by plasma intensity, with alpha
  vec3 col = uColor * n;
  float alpha = n * 0.9;
  outColor = vec4(col * alpha, alpha);
}`;

const compile = (gl, type, src) => {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
  return s;
};

const link = (gl, fragSrc) => {
  const vert = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const frag = compile(gl, gl.FRAGMENT_SHADER, fragSrc);
  const prog = gl.createProgram();
  if (!vert || !frag || !prog) return null;
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.bindAttribLocation(prog, 0, 'aPosition');
  gl.linkProgram(prog);
  gl.deleteShader(vert);
  gl.deleteShader(frag);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { gl.deleteProgram(prog); return null; }
  const uniforms = {};
  const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(prog, i);
    if (info) uniforms[info.name.replace(/\[0\]$/, '')] = gl.getUniformLocation(prog, info.name);
  }
  return { prog, uniforms };
};

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
};

const Plasma = ({
  color = '#ff2727',
  speed = 1,
  direction = 'forward',
  scale = 1,
  twist = 1,
  softness = 0.5,
  shine = 1,
  mouseInteractive = true,
  wave = 1.95,
  className = '',
  style = {},
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const propsRef = useRef(null);
  propsRef.current = { color, speed, direction, scale, twist, softness, shine, mouseInteractive, wave };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'default',
    });
    if (!container || !canvas || !gl) return;

    const program = link(gl, FRAGMENT);
    if (!program) return;

    const buf = gl.createBuffer();
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const pointer = { x: 0, y: 0, active: 0 };
    let raf = 0;
    let last = 0;
    let time = 0;
    let visible = true;

    const render = (now) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const p = propsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const dir = p.direction === 'backward' ? -1 : 1;
      time += dt * p.speed * 0.4 * dir;

      const w = canvas.width;
      const h = canvas.height;
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program.prog);
      gl.bindVertexArray(vao);

      const u = program.uniforms;
      gl.uniform2f(u.uView, w, h);
      gl.uniform1f(u.uTime, time);
      gl.uniform1f(u.uScale, p.scale * 2.2);
      gl.uniform1f(u.uTwist, p.twist);
      gl.uniform1f(u.uSoftness, p.softness);
      gl.uniform1f(u.uShine, p.shine);
      gl.uniform1f(u.uWave, p.wave);
      gl.uniform3fv(u.uColor, hexToRgb(p.color));
      gl.uniform2f(u.uPointer, pointer.x, pointer.y);
      gl.uniform1f(u.uPointerActive, p.mouseInteractive ? pointer.active : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    const wake = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(render); };

    const resize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      // shortcut: fixed dpr=1 for perf; upgrade to devicePixelRatio if sharpness matters
      canvas.width = w;
      canvas.height = h;
      wake();
    };

    const onMove = (e) => {
      if (!propsRef.current.mouseInteractive) return;
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = canvas.height - (e.clientY - rect.top);
      pointer.active = Math.min(1, pointer.active + 0.1);
    };
    const onLeave = () => { pointer.active = 0; };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    const io = new IntersectionObserver((entries) => {
      visible = entries.some(e => e.isIntersecting);
      if (visible) { last = 0; wake(); }
    });
    io.observe(container);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      gl.deleteBuffer(buf);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program.prog);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div ref={containerRef} className={`plasma-container${className ? ` ${className}` : ''}`} style={style}>
      <canvas ref={canvasRef} className="plasma-canvas" aria-hidden="true" />
    </div>
  );
};

export default Plasma;

