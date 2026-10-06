import { runSecurityTestSuite } from "./lib/security/securityTests";

async function main() {
  console.log("============================================================");
  console.log("EXECUTING PI PLATFORM ADVERSARIAL SECURITY VERIFICATION SUITE");
  console.log("============================================================\n");

  const report = await runSecurityTestSuite();

  for (const test of report.results) {
    const symbol = test.passed ? "✔ [PASS]" : "✖ [FAIL]";
    console.log(`${symbol} ${test.suite.padEnd(30)} :: ${test.testName}`);
    if (test.details) {
      console.log(`         Reason: ${test.details}`);
    }
  }

  console.log("\n------------------------------------------------------------");
  console.log(`TOTAL TESTS: ${report.total}`);
  console.log(`PASSED:      ${report.passedCount}`);
  console.log(`FAILED:      ${report.failedCount}`);
  console.log(`STATUS:      ${report.allPassed ? "ALL SECURITY CHECKS PASSED" : "FAILED"}`);
  console.log("------------------------------------------------------------\n");

  if (!report.allPassed) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Test runner encountered error:", err);
  process.exit(1);
});
