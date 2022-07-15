# Twitter Clone

> 트위터의 기능을 구현해봅니다.  
>  (노마드 코더와 함께...)

## 실행

```shell
npm install
npm run start
```

## 접속

`http://localhost:3000`

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
