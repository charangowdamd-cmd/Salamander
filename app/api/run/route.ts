import { NextResponse } from "next/server";
import { PROBLEMS } from "@/lib/data/problems";
import { executeJudge } from "@/lib/judge";

export async function POST(req: Request) {
  try {
    const { problemSlug, code, language, customInput } = await req.json();

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

    const result = await executeJudge(code, language, problem.testCases, false, customInput);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to execute code" },
      { status: 500 }
    );
  }
}

