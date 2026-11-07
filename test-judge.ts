import { PROBLEMS } from "./lib/data/problems";
import { executeJudge } from "./lib/judge";

async function runFullVerification() {
  console.log("=== Salamanders Judge Integrity Test ===");
  let passedCount = 0;

  for (const problem of PROBLEMS) {
    console.log(`\nTesting Problem: ${problem.title} (${problem.slug})`);

    // Test JavaScript solution
    const jsResult = await executeJudge(
      problem.starterCode.javascript,
      "javascript",
      problem.testCases,
      true
    );
    console.log(`  [JS] Verdict: ${jsResult.verdict} (${jsResult.passedTests}/${jsResult.totalTests})`);

    // Test Python solution
    const pyResult = await executeJudge(
      problem.starterCode.python,
      "python",
      problem.testCases,
      true
    );
    console.log(`  [Py] Verdict: ${pyResult.verdict} (${pyResult.passedTests}/${pyResult.totalTests})`);

    if (jsResult.verdict === "Accepted" && pyResult.verdict === "Accepted") {
      passedCount++;
    } else {
      console.error(`  FAIL details for ${problem.slug}:`, {
        jsFailedCase: jsResult.failedCase,
        jsStdout: jsResult.stdout,
        pyFailedCase: pyResult.failedCase,
        pyStdout: pyResult.stdout,
      });
    }
  }

  console.log(`\nIntegrity Summary: ${passedCount}/${PROBLEMS.length} problems fully verified.`);
  if (passedCount === PROBLEMS.length) {
    console.log("All problems and test suites are 100% working!");
  } else {
    process.exit(1);
  }
}

runFullVerification().catch((e) => {
  console.error("Fatal test error:", e);
  process.exit(1);
});
