import { NextResponse } from "next/server";
import { PROBLEMS } from "@/lib/data/problems";
import { executeJudge } from "@/lib/judge";

export async function POST(req: Request) {
  try {
    const { problemSlug, code, language } = await req.json();

    if (!problemSlug || !code || !language) {
      return NextResponse.json(
        { error: "Missing required parameters (problemSlug, code, language)" },
        { status: 400 }
      );
    }

    const problem = PROBLEMS.find((p) => p.slug === problemSlug);
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    // Execute against all test cases (samples + hidden)
    const result = await executeJudge(code, language, problem.testCases, true);

    return NextResponse.json({
      ...result,
      problemId: problem.id,
      problemSlug: problem.slug,
      problemTitle: problem.title,
      difficulty: problem.difficulty,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to judge submission" },
      { status: 500 }
    );
  }
}

