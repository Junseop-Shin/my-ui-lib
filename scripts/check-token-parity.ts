// CSS를 정규식으로 읽는다. 중첩 없는 평평한 블록만 다루므로 파서를 들이지 않는다.
export function parseThemeBlocks(css: string): Map<string, Set<string>> {
  const out = new Map<string, Set<string>>();
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const blockRe = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(stripped)) !== null) {
    const selector = m[1].trim().replace(/\s+/g, " ");
    const tokens = new Set<string>();
    for (const decl of m[2].split(";")) {
      const name = decl.split(":")[0]?.trim();
      if (name?.startsWith("--")) tokens.add(name);
    }
    if (tokens.size > 0) out.set(selector, tokens);
  }
  return out;
}
