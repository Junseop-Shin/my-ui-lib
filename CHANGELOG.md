# Changelog

## 2.0.0

### Breaking

- `ThemeProvider`의 단일 `theme` 축이 `theme`(디자인 테마) · `mode`(컬러 모드) 두 축으로 갈라졌다. `useTheme()`은 `{ theme, setTheme, mode, setMode, resolvedMode }`를 반환한다.
- 테마 적용 방식이 `<html>`의 클래스에서 `data-theme` · `data-mode` 속성으로 바뀌었다. 클래스(`.dark` `.finance`)를 직접 셀렉터로 쓰던 코드는 속성 셀렉터로 고쳐야 한다.
- `useTheme()`을 Provider 밖에서 부르면 던진다(전에는 기본값 객체를 돌려줬다).
- `localStorage` 키가 `ui-theme` 하나에서 `ui-design-theme` · `ui-color-mode` 둘로 나뉘었다. 옛 키는 첫 실행에 자동 이전된다.

### Added

- 디자인 테마 6종: `default` `finance` `vintage-paper` `mocha-mousse` `neo-brutalism` `claymorphism`
- L1 토큰에 공간(`--space`) · 그림자 6값 · 모션(`--duration-fast` `--duration-normal` `--ease`) · 타이포(`--font-family-serif` `--font-family-mono` `--tracking-normal`) 축 추가
- L2 컴포넌트 토큰(Button · Input · Card · Badge · Dialog)과 그에 대응하는 Tailwind 유틸리티
- Button · Input · Card · Badge · Dialog에 `data-ui` · `data-variant` · `data-size` 속성
- `npm run test:contrast` — 테마 12블록의 대비율 측정. `mocha-mousse` light와 `claymorphism` light의 보조 텍스트 대비가 WCAG 1.4.3(4.5:1)에 못 미친다. 레퍼런스 프리셋 원본값이라 손대지 않았다 — 자세한 건 [docs/themes.md](docs/themes.md).
