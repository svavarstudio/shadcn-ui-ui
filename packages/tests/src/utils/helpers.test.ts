import { describe, expect, it } from "vitest"

import { normalizeCommandResult } from "./helpers"

describe("command process results", () => {
  it("reports a timed-out child as failure even without an exit code", () => {
    const result = normalizeCommandResult(
      {
        stdout: "Installing dependencies",
        stderr: "",
        exitCode: undefined,
        timedOut: true,
      },
      120000
    )
    expect(result.exitCode).toBe(1)
    expect(result.stdout).toBe("Installing dependencies")
    expect(result.stderr).toContain("timed out after 120000ms")
  })

  it("does not turn a signal termination into success", () => {
    expect(
      normalizeCommandResult({
        stdout: "",
        stderr: "terminated",
        exitCode: undefined,
        timedOut: false,
      }).exitCode
    ).toBe(1)
  })

  it.each([0, 2])("preserves an explicit exit code of %s", (exitCode) => {
    expect(
      normalizeCommandResult({
        stdout: "output",
        stderr: "diagnostic",
        exitCode,
        timedOut: false,
      })
    ).toEqual({ stdout: "output", stderr: "diagnostic", exitCode })
  })
})
