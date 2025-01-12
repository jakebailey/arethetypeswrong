import type { CheckResult } from "@arethetypeswrong/core";
import { problemFlags } from "./problemUtils.js";
import type { RenderOptions } from "./render/index.js";

export function getExitCode(analysis: CheckResult, opts?: RenderOptions): number {
  if (!analysis.types) {
    return 0;
  }
  const ignoreRules = opts?.ignoreRules ?? [];
  const ignoreResolutions = opts?.ignoreResolutions ?? [];
  return analysis.problems.some((problem) => {
    const notRuleIgnored = !ignoreRules.includes(problemFlags[problem.kind]);
    const notResolutionIgnored = "resolutionKind" in problem ? !ignoreResolutions.includes(problem.resolutionKind) : true;
    return notRuleIgnored && notResolutionIgnored;
  }) ? 1 : 0;
}
