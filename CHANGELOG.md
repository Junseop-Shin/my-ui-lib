# Changelog

## 2.0.0

### Breaking

- **스타일시트를 직접 불러와야 한다.** 앱 진입점에 `import "@junseop-shin/my-ui-lib/styles.css";`
  한 줄을 더한다. v1은 소비자의 Tailwind가 만들어내는 기본 유틸리티에 기대고 있었지만, v2의
  `rounded-button` `h-button-md` 같은 클래스는 라이브러리의 `@theme` 블록에서만 나온다.
  이 줄이 없으면 버튼에 높이도 모서리도 여백도 붙지 않는다.
- `ThemeProvider`의 단일 `theme` 축이 `theme`(디자인 테마) · `mode`(컬러 모드) 두 축으로 갈라졌다. `useTheme()`은 `{ theme, setTheme, mode, setMode, resolvedMode }`를 반환한다.
- 테마 적용 방식이 `<html>`의 클래스에서 `data-theme` · `data-mode` 속성으로 바뀌었다. 클래스(`.dark` `.finance`)를 직접 셀렉터로 쓰던 코드는 속성 셀렉터로 고쳐야 한다.
- `useTheme()`을 Provider 밖에서 부르면 던진다(전에는 기본값 객체를 돌려줬다).
- `localStorage` 키가 `ui-theme` 하나에서 `ui-design-theme` · `ui-color-mode` 둘로 나뉘었다. 옛 키는 첫 실행에 자동 이전된다.

### Added

- 디자인 테마 6종: `default` `finance` `vintage-paper` `mocha-mousse` `neo-brutalism` `claymorphism`
- L1 토큰에 공간(`--space`) · 그림자 6값 · 모션(`--duration-fast` `--duration-normal` `--ease`) · 타이포(`--font-family-serif` `--font-family-mono` `--tracking-normal`) 축 추가
- L2 컴포넌트 토큰(Button · Input · Card · Badge · Dialog)과 그에 대응하는 Tailwind 유틸리티
- Button · Input · Card · Badge · Dialog에 `data-ui` · `data-variant` · `data-size` 속성
- 미리 빌드된 스타일시트 `dist/styles.css` (`@junseop-shin/my-ui-lib/styles.css`). 컴포넌트가 쓰는 유틸리티와 테마 6종의 토큰 블록이 모두 들어 있어 소비자 쪽에 Tailwind가 없어도 된다.
- 테마가 색뿐 아니라 형태도 바꾼다. L2 컴포넌트 토큰의 기본값이 L1에서 파생하도록 바뀌어 `neo-brutalism`은 각진 버튼과 단단한 그림자를, `claymorphism`은 둥근 모서리와 번진 그림자를 그대로 낸다. `default`·`finance`는 v1의 생김새를 테마 안에서 다시 지정해 이전과 같다.
- `npm run test:contrast` — 테마 12블록의 대비율 측정. `mocha-mousse` light와 `claymorphism` light의 보조 텍스트 대비가 WCAG 1.4.3(4.5:1)에 못 미친다. 레퍼런스 프리셋 원본값이라 손대지 않았다 — 자세한 건 [docs/themes.md](docs/themes.md).
