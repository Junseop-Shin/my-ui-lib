import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function Probe() {
  const { theme, setTheme, mode, setMode, resolvedMode } = useTheme();
  return (
    <>
      <span data-testid="state">{`${theme}/${mode}/${resolvedMode}`}</span>
      <button onClick={() => setTheme("finance")}>t</button>
      <button onClick={() => setMode("dark")}>m</button>
    </>
  );
}

const root = () => document.documentElement;
const attrs = () => `${root().getAttribute("data-theme")}/${root().getAttribute("data-mode")}`;

function mockMatchMedia(prefersDark: boolean) {
  const listeners = new Set<(e: MediaQueryListEvent) => void>();
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: prefersDark,
    media: q,
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => listeners.delete(cb),
  }));
  return { fire: (matches: boolean) => listeners.forEach((cb) => cb({ matches } as MediaQueryListEvent)) };
}

beforeEach(() => {
  localStorage.clear();
  root().removeAttribute("data-theme");
  root().removeAttribute("data-mode");
});
afterEach(() => vi.unstubAllGlobals());

describe("ThemeProvider", () => {
  it("두 축을 각각 <html> 속성으로 꽂는다", () => {
    mockMatchMedia(false);
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("default/light");
    expect(screen.getByTestId("state").textContent).toBe("default/system/light");
  });

  it("system은 matchMedia로 풀어서 꽂고 system이라는 값은 DOM에 넣지 않는다", () => {
    mockMatchMedia(true);
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("default/dark");
    expect(root().getAttribute("data-mode")).not.toBe("system");
  });

  it("OS 설정이 바뀌면 따라간다", () => {
    const mm = mockMatchMedia(false);
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("default/light");
    act(() => mm.fire(true));
    expect(attrs()).toBe("default/dark");
  });

  it("두 축이 서로 독립으로 바뀐다", async () => {
    mockMatchMedia(false);
    render(<ThemeProvider><Probe /></ThemeProvider>);
    await userEvent.click(screen.getByText("t"));
    expect(attrs()).toBe("finance/light");
    await userEvent.click(screen.getByText("m"));
    expect(attrs()).toBe("finance/dark");
  });

  it("키 두 개에 따로 저장한다", async () => {
    mockMatchMedia(false);
    render(<ThemeProvider><Probe /></ThemeProvider>);
    await userEvent.click(screen.getByText("t"));
    await userEvent.click(screen.getByText("m"));
    expect(localStorage.getItem("ui-design-theme")).toBe("finance");
    expect(localStorage.getItem("ui-color-mode")).toBe("dark");
  });

  it("옛 ui-theme=dark를 mode로 옮기고 지운다", () => {
    mockMatchMedia(false);
    localStorage.setItem("ui-theme", "dark");
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("default/dark");
    expect(localStorage.getItem("ui-theme")).toBeNull();
    expect(localStorage.getItem("ui-color-mode")).toBe("dark");
  });

  it("옛 ui-theme=finance를 두 축으로 쪼갠다", () => {
    mockMatchMedia(false);
    localStorage.setItem("ui-theme", "finance");
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("finance/dark");
    expect(localStorage.getItem("ui-design-theme")).toBe("finance");
    expect(localStorage.getItem("ui-color-mode")).toBe("dark");
  });

  it("저장된 값이 쓰레기면 기본값으로 떨어진다", () => {
    mockMatchMedia(false);
    localStorage.setItem("ui-design-theme", "nope");
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("default/light");
  });

  it("useTheme을 Provider 밖에서 부르면 던진다", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(/ThemeProvider/);
    spy.mockRestore();
  });
});
