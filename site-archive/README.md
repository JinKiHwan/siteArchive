# 클라이언트 SNS 아카이브

소중한 SNS 콘텐츠를 손쉽게 아카이브하고 관리할 수 있는 웹 애플리케이션입니다.

## 기능

-   다양한 SNS 플랫폼의 콘텐츠 저장 및 아카이브
-   태그와 카테고리를 통한 체계적인 콘텐츠 정리
-   검색 기능을 통한 빠른 콘텐츠 찾기
-   사용자 인증 및 개인화된 아카이브 관리

## 기술 스택

-   **프레임워크**: Next.js 14 (App Router), TypeScript
-   **상태 관리**: Tanstack Query, Zustand
-   **UI/스타일링**: Tailwind CSS, Shadcn UI
-   **폼 관리**: React Hook Form, Zod
-   **애니메이션**: GSAP, Framer Motion
-   **데이터베이스**: PostgreSQL, Prisma ORM
-   **배포**: Vercel

## 시작하기

### 사전 요구사항

-   Node.js 18.0.0 이상
-   PostgreSQL 데이터베이스

### 설치

```bash
# 레포지토리 클론
git clone https://github.com/[당신의_사용자명]/client-sns-archive.git
cd client-sns-archive

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 편집하여 필요한 환경 변수를 설정하세요

# 데이터베이스 마이그레이션 실행
npx prisma migrate dev

# 개발 서버 실행
npm run dev
```

이후 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하면 애플리케이션을 볼 수 있습니다.

## 프로젝트 구조

```
src/
  ├── app/             # Next.js App Router 페이지
  │   ├── api/         # API 경로
  │   ├── auth/        # 인증 관련 페이지
  │   ├── archive/     # 아카이브 관련 페이지
  │   ├── profile/     # 프로필 관련 페이지
  │   └── layout.tsx   # 루트 레이아웃
  ├── components/      # 재사용 가능한 컴포넌트
  │   ├── ui/          # UI 컴포넌트 (shadcn)
  │   └── archives/    # 아카이브 관련 컴포넌트
  ├── lib/             # 유틸리티 함수
  ├── hooks/           # 커스텀 훅
  ├── store/           # Zustand 스토어
  └── types/           # TypeScript 타입 정의
```

## 기여하기

1. 이 레포지토리를 포크합니다.
2. 새 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

## 라이선스

MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
