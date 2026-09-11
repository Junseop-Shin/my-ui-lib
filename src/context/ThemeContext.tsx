import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

export const DESIGN_THEMES = [
  "default",
  "finance",
  "vintage-paper",
  "mocha-mousse",
  "neo-brutalism",
  "claymorphism",
] as const

export type DesignTheme = (typeof DESIGN_THEMES)[number]
export type ColorMode = "light" | "dark" | "system"
export type ResolvedMode = "light" | "dark"

const COLOR_MODES: readonly ColorMode[] = ["light", "dark", "system"]

export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: DesignTheme
  defaultMode?: ColorMode
  themeStorageKey?: string
  modeStorageKey?: string
}

type ThemeProviderState = {
  theme: DesignTheme
  setTheme: (theme: DesignTheme) => void
  mode: ColorMode
  setMode: (mode: ColorMode) => void
  resolvedMode: ResolvedMode
}

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined)

const canUseDOM = typeof window !== "undefined"

function read(key: string): string | null {
  if (!canUseDOM) return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    // 사파리 프라이빗 모드 등에서 접근이 막힌다. 저장 없이 동작한다.
    return null
  }
}

function write(key: string, value: string): void {
  if (!canUseDOM) return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* 저장 실패는 무시한다 */
  }
}

/** 옛 단일 축 키(ui-theme)를 두 축으로 옮기고 지운다. 첫 실행에 한 번만 일어난다. */
function migrateLegacy(themeKey: string, modeKey: string): void {
  const legacy = read("ui-theme")
  if (legacy === null) return
  if (legacy === "light" || legacy === "dark") write(modeKey, legacy)
  else if (legacy === "finance") {
    write(themeKey, "finance")
    write(modeKey, "dark")
  }
  try {
    window.localStorage.removeItem("ui-theme")
  } catch {
    /* 무시 */
  }
}

function prefersDark(): boolean {
  return canUseDOM && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false
}

export function ThemeProvider({
  children,
  defaultTheme = "default",
  defaultMode = "system",
  themeStorageKey = "ui-design-theme",
  modeStorageKey = "ui-color-mode",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<DesignTheme>(() => {
    migrateLegacy(themeStorageKey, modeStorageKey)
    const stored = read(themeStorageKey)
    return DESIGN_THEMES.includes(stored as DesignTheme) ? (stored as DesignTheme) : defaultTheme
  })

  const [mode, setModeState] = useState<ColorMode>(() => {
    const stored = read(modeStorageKey)
    return COLOR_MODES.includes(stored as ColorMode) ? (stored as ColorMode) : defaultMode
  })

  const [systemDark, setSystemDark] = useState<boolean>(prefersDark)

  useEffect(() => {
    if (!canUseDOM || typeof window.matchMedia !== "function") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const resolvedMode: ResolvedMode = mode === "system" ? (systemDark ? "dark" : "light") : mode

  useEffect(() => {
    if (!canUseDOM) return
    const root = window.document.documentElement
    root.setAttribute("data-theme", theme)
    root.setAttribute("data-mode", resolvedMode)
  }, [theme, resolvedMode])

  const setTheme = useCallback(
    (next: DesignTheme) => {
      write(themeStorageKey, next)
      setThemeState(next)
    },
    [themeStorageKey],
  )

  const setMode = useCallback(
    (next: ColorMode) => {
      write(modeStorageKey, next)
      setModeState(next)
    },
    [modeStorageKey],
  )

  const value = useMemo(
    () => ({ theme, setTheme, mode, setMode, resolvedMode }),
    [theme, setTheme, mode, setMode, resolvedMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
