# Twitter Clone

> 트위터의 기능을 구현해봅니다.  
>  (노마드 코더와 함께...)

## 실행

```shell
npm install
npm run start
```

## 접속

[`http://localhost:3000`](http://localhost:3000)

## 사용

- React(CRA)
- typescript
- tailwind css
- firebase

---

## 학습 내용

### 프로젝트 초기 세팅

```shell
npx create-react-app --template typescript

npm install react-router-dom

npm install firebase

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // ...
};
```

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```javascript
// src/firebase.tsx
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);

export default app;
```

### firebase 계정 생성 및 로그인 처리 [Firebase 문서(비밀번호 인증)](https://firebase.google.com/docs/auth/web/password-auth)

| 메소드                           | 파라미터                                   | 기능                                  |
| -------------------------------- | ------------------------------------------ | ------------------------------------- |
| `createUserWithEmailAndPassword` | `getAuth()`,&nbsp;`email`,&nbsp;`password` | 신규 계정 생성                        |
| `signInWithEmailAndPassword`     | `getAuth()`,&nbsp;`email`,&nbsp;`password` | 사용자 로그인 처리                    |
| `onAuthStateChanged`             | `getAuth(),`&nbsp;`callbackFunction`       | Auth 객체 관찰자 설정(Auth 변화 감지) |
