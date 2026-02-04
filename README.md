# 🧠 Neural News Tower (뉴럴 뉴스 타워)

> **"Veritas Vincit" (진리가 이기리라)**  
> AI 기반 미디어 편향성 분석 및 실시간 뉴스 인텔리전스 플랫폼

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-12.x-FFCA28?logo=firebase)

---

## ✨ Project Overview (프로젝트 개요)

**Neural News Tower**는 정보의 과잉과 확증 편향이 심화되는 현대 사회에서, 뉴스 데이터의 다각적 분석을 통해 사용자에게 보다 중립적이고 객관적인 시각을 제공하는 인텔리전스 대시보드입니다.

단순한 뉴스 피드를 넘어, 언론사별 정치적 성향 분석, 엔티티(인물/조직) 간의 관계 시각화, 지리적 맥락 제공 등 고차원적인 뉴스 소비 경험을 선사합니다.

---

## 🚀 Key Features (주요 기능)

### 📊 미디어 편향성 분석 (Media Bias Index)
언론사별 보도 태도와 단어 선택을 분석하여 **좌/우/중립 성향**을 시각화합니다. 사용자는 동일한 사건이 진영에 따라 어떻게 다르게 프레임화되는지 한눈에 비교할 수 있습니다.

### 🌐 엔티티 네트워크 그래프 (Entity Network)
뉴스 기사 속에 등장하는 인물, 단체, 사건 간의 복잡한 연결 고리를 **3D/2D 인터랙티브 그래프**로 시각화합니다. 보이지 않는 권력 관계와 사건의 핵심 맥락을 파헤칩니다.

### 🗺️ 지리적 분석 (Geospatial Context)
뉴스 속 사건이 발생하는 위치를 지도로 매핑하여 글로벌/로컬 이슈의 공간적 배경을 명확히 이해하도록 돕습니다.

### ⚡ 실시간 인텔리전스 (Live Intelligence)
Firebase를 통한 실시간 데이터 동기화와 AI 분석 기반의 'Deep Dive' 리포트 기능을 통해, 복잡한 이슈에 대한 핵심 요약을 즉각적으로 제공합니다.

---

## 🛠 Tech Stack (기술 스택)

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Framer Motion (Animations)
- **Visualization**: React Force Graph, Recharts, Three.js
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Deployment**: Vercel

---

## ⚙️ Quick Start (시작 가이드)

### 1. 환경 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요.

```env
VITE_FIREBASE_API_KEY="your_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_project.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
VITE_FIREBASE_APP_ID="your_app_id"
VITE_FIREBASE_MEASUREMENT_ID="your_measurement_id"
```

### 2. 패키지 설치 및 실행
```bash
# 종속성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

---

## 🛡️ Security Note (보안 안내)
본 저장소는 API Key 등 민감한 정보를 포함하지 않습니다. 공개 커밋 히스토리에서 노출된 이전 키들은 모두 폐기되었으며, 모든 비밀 정보는 환경 변수(`.env`)로 관리됩니다.

---

## 📄 License
이 프로젝트는 **MIT License**를 따릅니다.

---

<p align="center">
  Developed with ❤️ by <b>Neural News Team</b>
</p>
