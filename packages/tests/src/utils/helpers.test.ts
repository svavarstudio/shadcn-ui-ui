import { execa } from "execa"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { runCommand } from "./helpers"

vi.mock("execa", () => ({ execa: vi.fn() }))

describe("runCommand process results", () => {
  beforeEach(() => vi.resetAllMocks())

  it("reports a timed-out child as failure even without an exit code", async () => {
    vi.mocked(execa).mockResolvedValue({
      stdout: "Installing dependencies",
      stderr: "",
      exitCode: undefined,
      timedOut: true,
    } as never)

    const result = await runCommand(process.cwd(), ["add", "button"], {
      timeout: 120000,
    })
    expect(result.exitCode).toBe(1)
    expect(result.stdout).toBe("Installing dependencies")
    expect(result.stderr).toContain("timed out after 120000ms")
  })

  it("does not turn a signal termination into success", async () => {
    vi.mocked(execa).mockResolvedValue({
      stdout: "",
      stderr: "terminated",
      exitCode: undefined,
      timedOut: false,
    } as never)
    expect((await runCommand(process.cwd(), ["add", "button"])).exitCode).toBe(
      1
    )
  })

  it.each([0, 2])("preserves an explicit exit code of %s", async (exitCode) => {
    vi.mocked(execa).mockResolvedValue({
      stdout: "output",
      stderr: "diagnostic",
      exitCode,
      timedOut: false,
    } as never)
    expect(await runCommand(process.cwd(), ["add", "button"])).toEqual({
      stdout: "output",
      stderr: "diagnostic",
      exitCode,
    })
  })
})
