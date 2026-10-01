# Custom Design Guide Template (커스텀 디자인 가이드 템플릿)

이 템플릿은 사용자가 원하는 브랜드나 서비스의 고유 디자인 스타일을 Agent에게 전달하기 위한 문서입니다.
이 파일의 값을 수정한 뒤, Agent에게 **"이 디자인 가이드 기반으로 디자인 시스템 토큰을 만들고 화면을 구성해줘"**라고 요청하세요.

---

## 1. 브랜드 및 디자인 컨셉
- **브랜드명**: My Brand
- **컨셉 키워드**: 모던, 네오브루탈리즘, 다크모드 중심, 글래스모피즘 등
- **주요 타겟 환경**: Web / Mobile / Desktop

---

## 2. 색상 (Color Palette)

### Primary / Brand
- `primary`: `#6366F1` (메인 포인트 컬러)
- `primary-hover`: `#4F46E5`
- `primary-light`: `#EEF2FF`

### Semantic
- `success`: `#10B981`
- `warning`: `#F59E0B`
- `danger`: `#EF4444`
- `info`: `#3B82F6`

### Neutral / Surface
- `bg-surface`: `#FFFFFF`
- `bg-canvas`: `#F9FAFB`
- `text-primary`: `#111827`
- `text-secondary`: `#4B5563`
- `border-default`: `#E5E7EB`

---

## 3. 타이포그래피 (Typography)
- **기본 폰트**: `"Inter", -apple-system, sans-serif`
- **제목 폰트**: `"Outfit", sans-serif`
- **단위 크기**: Display (32px), Title (24px), Body (16px), Caption (12px)

---

## 4. 조형 및 모서리 (Border Radius & Shadow)
- **기본 라운딩**: `12px` (Buttons, Inputs), `18px` (Cards)
- **그림자 스타일**: 부드러운 다중 레이어 그림자 (`0 10px 25px -5px rgba(0, 0, 0, 0.08)`)

---

## 5. 특정 컴포넌트 추가 요구사항
- (예: 버튼 호버 시 위로 2px 뜨는 애니메이션 효과 적용)
- (예: 카드는 반투명 블러 효과(Glassmorphism) 적용)
