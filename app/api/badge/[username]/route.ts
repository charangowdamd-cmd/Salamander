import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  const username = params?.username || "developer";
  const points = 2150;
  const solved = 85;
  const streak = 7;

  // Generate responsive GitHub README SVG badge
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="110" viewBox="0 0 340 110" fill="none">
    <style>
      .bg { fill: #090d16; stroke: #1e293b; stroke-width: 1.5; rx: 16; }
      .title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 14px; fill: #ffffff; }
      .badge-tag { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 700; fill: #10b981; }
      .stat-label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; fill: #94a3b8; }
      .stat-val { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: 800; fill: #f8fafc; }
      .emerald { fill: #10b981; }
      .amber { fill: #f59e0b; }
      .cyan { fill: #06b6d4; }
    </style>
    <rect width="340" height="110" class="bg" />
    
    <!-- Header -->
    <text x="18" y="28" class="title">🦎 Salamanders</text>
    <rect x="130" y="16" width="65" height="18" rx="9" fill="#10b981" fill-opacity="0.12" stroke="#10b981" stroke-opacity="0.3" />
    <text x="142" y="29" class="badge-tag">VERIFIED</text>
    
    <text x="322" y="28" text-anchor="end" font-family="monospace" font-size="11" fill="#64748b">@${username}</text>
    <line x1="18" y1="42" x2="322" y2="42" stroke="#1e293b" stroke-width="1" />
    
    <!-- Stats Columns -->
    <g transform="translate(18, 52)">
      <text x="0" y="14" class="stat-label">SOLVED</text>
      <text x="0" y="36" class="stat-val emerald">${solved}</text>
    </g>
    <g transform="translate(125, 52)">
      <text x="0" y="14" class="stat-label">POINTS</text>
      <text x="0" y="36" class="stat-val cyan">${points}</text>
    </g>
    <g transform="translate(230, 52)">
      <text x="0" y="14" class="stat-label">STREAK</text>
      <text x="0" y="36" class="stat-val amber">🔥 ${streak}d</text>
    </g>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=300, s-maxage=600",
    },
  });
}

