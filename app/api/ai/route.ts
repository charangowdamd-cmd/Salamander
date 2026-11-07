import { NextResponse } from "next/server";
import { PROBLEMS } from "@/lib/data/problems";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { problemSlug, code, language, action, level, failingCase } = await req.json();

    const problem = PROBLEMS.find((p) => p.slug === problemSlug);
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let prompt = "";
        if (action === "hint") {
          prompt = `You are the Salamanders AI Coding Mentor.
Problem: ${problem.title}
Difficulty: ${problem.difficulty}
Statement: ${problem.description}
User's Language: ${language}
Current User Code:
\`\`\`${language}
${code}
\`\`\`

The user requested a Hint at Level ${level}:
Level 1: High-level conceptual nudge only. Do NOT mention specific algorithm names or code.
Level 2: Name the standard algorithm pattern or data structure and explain the intuition.
Level 3: Provide a step-by-step plan and pseudo-code. No complete copy-pasteable code.
Level 4: Provide the full optimal solution in ${language} with code and explanation.

Respond strictly following the rule for Level ${level}. Be encouraging, clear, and concise.`;
        } else if (action === "debug") {
          prompt = `You are the Salamanders AI Coding Mentor assisting with debugging.
Problem: ${problem.title}
Constraints: ${problem.constraints.join(", ")}
Language: ${language}
Failing case info: ${JSON.stringify(failingCase || "Hidden test case mismatch")}
User Code:
\`\`\`${language}
${code}
\`\`\`

Identify likely causes (e.g. edge case, off-by-one, empty input, wrong complexity, mutation). Explain where the logic deviates and provide guidance on how to fix it without immediately writing the whole solution.`;
        } else if (action === "explain") {
          prompt = `You are the Salamanders AI Mentor. Explain the following code in ${language} for the problem "${problem.title}". Break it down into logical blocks and state its time and space complexity.
Code:
\`\`\`${language}
${code}
\`\`\``;
        }

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        return NextResponse.json({ text: responseText, source: "gemini-ai" });
      } catch (geminiError: any) {
        console.warn("Gemini API call failed, falling back to local mentor engine", geminiError);
      }
    }

    // Contextual deterministic mentor engine fallback
    let fallbackText = "";

    if (action === "hint") {
      if (level === 1) {
        fallbackText = `💡 **Level 1 Conceptual Nudge:**\nThink about what information you are repeatedly searching for. Instead of re-scanning previous elements from scratch, can you keep track of what you have seen so far in a lookup structure?`;
      } else if (level === 2) {
        fallbackText = `🎯 **Level 2 Approach:**\nThis problem can be effectively solved using **${problem.category}** (e.g., ${problem.tags.join(", ")}).\n\nKey intuition: ${problem.editorial.approach.slice(0, 150)}...`;
      } else if (level === 3) {
        fallbackText = `📋 **Level 3 Step-by-Step Plan:**\n1. Initialize your primary tracking state.\n2. Iterate through the elements one by one.\n3. At each step, check if the necessary condition is met.\n4. Update your state dynamically.\n5. Return the accumulated result. Target Complexity: ${problem.editorial.timeComplexity}.`;
      } else {
        fallbackText = `🔓 **Level 4 Full Solution:**\n\`\`\`${language}\n${problem.editorial.solutions[language === "python" ? "python" : "javascript"] || problem.editorial.solutions.javascript}\n\`\`\`\n*Note: Using Level 4 in mock or contest modes is recorded.*`;
      }
    } else if (action === "debug") {
      fallbackText = `🔍 **Debug Analysis:**\n- Check edge cases: What happens on empty inputs, single element arrays, or negative values?\n- Inspect boundaries: Ensure index bounds and condition checks do not cause an off-by-one.\n- Expected approach complexity: ${problem.editorial.timeComplexity}. If you are getting Time Limit Exceeded, check for nested loops.`;
    } else if (action === "explain") {
      fallbackText = `📖 **Code Explanation:**\nThis solution implements the **${problem.editorial.approach}**.\n\n- **Time Complexity:** ${problem.editorial.timeComplexity}\n- **Space Complexity:** ${problem.editorial.spaceComplexity}\n\nEach step processes the input systematically according to problem constraints.`;
    }

    return NextResponse.json({ text: fallbackText, source: "built-in-mentor" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "AI Mentor service error" },
      { status: 500 }
    );
  }
}

