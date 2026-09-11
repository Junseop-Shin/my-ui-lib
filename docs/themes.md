# 디자인 테마

my-ui-lib은 컬러 모드(`data-mode`)와 디자인 테마(`data-theme`)를 따로 둔다. 테마 하나가 light/dark 한 쌍을 가진다.

## 목록

| 이름 | 결 | 출처 |
|---|---|---|
| `default` | Apple 계열. 라이브러리 기본값 | 자체 |
| `finance` | 어두운 금융 대시보드 | 자체 (v1의 finance 테마) |
| `vintage-paper` | 잉크·종이 | tweakcn |
| `mocha-mousse` | 따뜻한 | tweakcn |
| `neo-brutalism` | 각지고 강한 | tweakcn |
| `claymorphism` | 둥글고 부드러운 | tweakcn |

## 출처와 라이선스

레퍼런스 4종의 색·반경·그림자·타이포 값은 [tweakcn](https://github.com/jnsahaj/tweakcn)(Apache-2.0)의 동명 프리셋에서 가져왔다. 이름을 그대로 둔 것은 출처를 밝히기 위해서다. 모션 값(`--duration-*` `--ease`)과 상태색(`--success` `--warning` `--info`)은 tweakcn에 없어 우리가 정했다.

## 폰트

레퍼런스 테마는 Google Fonts 패밀리를 지정하지만 **라이브러리가 폰트를 불러오지 않는다.** 소비자가 직접 로드해야 한다. Storybook 미리보기에는 `.storybook/preview-head.html`에서 불러온다.

## 대비율

`npm run test:contrast` 결과. 본문(`--foreground`)과 보조 텍스트(`--muted-foreground`)를 배경 대비로 잰 값이다. WCAG 1.4.3의 본문 기준은 4.5:1이다.

| 테마 | 모드 | fg/bg | muted-fg/bg |
|---|---|---|---|
| default | light | 20.13 | 7.43 |
| default | dark | 18.62 | 5.78 |
| finance | light | 18.52 | 7.00 |
| finance | dark | 14.25 | 6.19 |
| vintage-paper | light | 9.06 | 4.53 |
| vintage-paper | dark | 11.88 | 7.91 |
| mocha-mousse | light | 7.91 | 4.48 |
| mocha-mousse | dark | 13.11 | 6.86 |
| neo-brutalism | light | 21.00 | 12.63 |
| neo-brutalism | dark | 21.00 | 13.08 |
| claymorphism | light | 11.65 | 3.85 |
| claymorphism | dark | 13.90 | 6.75 |

4.5:1을 못 넘는 조합은 그대로 기록한다. 레퍼런스 테마의 값을 고치지 않는 것이 원칙이고, 이 표는 6단계 판정에서 기준선으로 쓴다.

- `mocha-mousse` light의 muted-fg/bg가 4.48로 4.5:1에 살짝 못 미친다.
- `claymorphism` light의 muted-fg/bg가 3.85로 4.5:1에 뚜렷이 못 미친다.
