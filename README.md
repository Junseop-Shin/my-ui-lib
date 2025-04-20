UI 컴포넌트 만들기

- 버튼/헤더/페이지(스토리북 기본제공)
<details>
  <summary>⬇️ 드롭다운</summary>
  <div class="dropdown-content">
    ✅ 트리거 타입 (버튼 / 인풋)<br>
    ✅ 옵션 검색<br>
    ✅ 다중 선택<br>
    ✅ 선택 값 표시<br>
    ✅ 외부 클릭 시 닫기<br>
    ✅ 메뉴 포지션 지정 (좌/우/상/하)<br>
    ✅ 툴팁 표시 (옵션 설명)<br>
    ✅ 키보드 네비게이션<br>
    ❌ Submenu 지원(예정)
  </div>
</details>
<details>
  <summary>📋 테이블 (예정)</summary>
  <div class="table-content">
    ❌ 정렬 기능<br>
    ❌ 페이지네이션<br>
    ❌ 셀 커스텀 렌더링<br>
    ❌ 체크박스 선택<br>
    ❌ 행 클릭 이벤트
  </div>
</details>
<details>
  <summary>📊 차트 (예정)</summary>
  <div class="chart-content">
    ❌ 라인 차트 / 바 차트 / 파이 차트<br>
    ❌ 데이터 포맷팅<br>
    ❌ 툴팁/범례 커스터마이징
  </div>
</details>
<details>
  <summary>🪟 모달 (예정)</summary>
  <div class="modal-content">
    ❌ 포커스 트랩<br>
    ❌ ESC 키 닫기<br>
    ❌ 사이즈 지정
  </div>
</details>
<details>
  <summary>🔔 토스트 (예정)</summary>
  <div class="toast-content">
    ❌ 다중 토스트 큐 관리<br>
    ❌ auto-dismiss<br>
    ❌ 위치 설정 (top-right 등)<br>
    ❌ 커스텀 아이콘/색상
  </div>
</details>

기술

- Vite로 프로젝트 생성(CRA 대체)
- React, Typescript
- Tailwind
- vite 빌드
- Storybook

기능

- Storybook을 이용한 독립 개발
- Storybook을 이용한 테스트
  - Interaction 테스트
  - Visual 테스트(chromatic)
  - Accessibility 테스트

추가/수정하면 좋은 기능/컴포넌트

- 디자인 시스템 적용

  - Spacing/Color/Typography
  - Icon
  - Button

- 다크모드/반응형 디자인 반영
