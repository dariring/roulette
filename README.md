# Marble Roulette

2D 물리 엔진(Box2D-WASM) 기반의 실시간 구슬 추첨기 웹 애플리케이션입니다.  
다양한 기믹과 장애물이 배치된 10종의 맵을 제공하며, 순수 프론트엔드(Vite + TypeScript) 환경에서 동작합니다.

---

## 주요 기능

### 1. 다양한 물리 맵 (총 10종)
- **Wheel of Fortune (운명의 수레바퀴)**: 회전 장애물과 지그재그 레일이 결합된 클래식 맵
- **BubblePop (버블팝)**: 구슬 충돌 시 파괴되는 취약 블록이 배치된 캐스케이드 맵
- **Pot of Greed (욕망의 항아리)**: 와이드 깔때기 구조와 고속 회전 분기점이 있는 맵
- **Into The Night (밤을 달리다)**: 빌딩 옥상 형태의 계단식 드롭 코스
- **Pinball Frenzy (핀볼 프렌지)**: 고탄성 범퍼, 플리퍼, 회전 프로펠러가 결합된 핀볼 코스
- **Cyber Slalom (사이버 슬라롬)**: 뱅크 코너와 턴 정점 스피너가 배치된 슬라롬 트랙
- **Pachinko Vortex (파친코 보텍스)**: 40개 이상의 파친코 핀 배열과 4날 회전 패들 풀
- **Double Helix (더블 나선 분기)**: 좌/우 나선 분기 트랙과 점프 교차로
- **Sky Castle (천공의 성)**: 파괴 가능한 구름 블록과 대형 풍차 블레이드 코스
- **Chaos Plinko (카오스 플린코)**: 고밀도 플린코 피라미드와 진동 편향기, 5개 진입 슬롯

### 2. 참가자 설정 및 문법 지원
- **문법 지원**:
  - `이름*3`: 해당 참가자 구슬을 3개 생성 (복수 참가)
  - `이름/2`: 가중치 부여 (스킬 발동 확률 및 쿨다운 조정)
- **빠른 프리셋**: 1~10, 1~20, 과일, 주사위(1~6), 점심메뉴, 전체 비우기
- **순서 섞기**: Fisher-Yates 셔플 기반 랜덤 재배치

### 3. 추첨 룰 및 게임 제어
- **당첨 방식**: 1등 당첨, 꼴찌 당첨 (마지막 통과자), N등 지정 당첨
- **실시간 HUD**:
  - 일시정지 / 재개 (`⏸️` / `▶️`)
  - 배속 제어 (`1x`, `2x`, `4x`, `8x`)
  - 끼임 해결 흔들기 (`🌪️ Shake`)
  - 실시간 상위 5위 순위표
- **Web Audio 사운드**: 구슬 충돌, 범퍼 튕김, 스킬 폭발, 골인 팡파르 합성음
- **결과 복사**: 마크다운 / 텍스트 형식으로 클립보드 원클릭 복사

---

## 기술 스택

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Physics**: [box2d-wasm](https://github.com/Birch-san/box2d-wasm) (WebAssembly)
- **Styling**: SCSS (CSS Variables, Flexbox/Grid, Glassmorphism)
- **Audio**: Web Audio API (합성 오실레이터)

---

## 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

### 빌드 결과물 미리보기
```bash
npm run preview
```

---

## 크레딧 (Credits)

이 프로젝트는 [lazygyu](https://github.com/lazygyu) 님의 [lazygyu/roulette](https://github.com/lazygyu/roulette)를 기반으로 작성되었습니다.
