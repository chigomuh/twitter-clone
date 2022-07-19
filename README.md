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

### firebase 클라우드 데이터베이스 관련 기능 [Firebase 문서(Cloud Firestore)](https://firebase.google.com/docs/firestore)

| 메소드       | 파라미터                                                               | 기능                          |
| ------------ | ---------------------------------------------------------------------- | ----------------------------- |
| `addDoc`     | `collection(getAuth(), "컬렉션명")`,&nbsp; `{ 추가 데이터 }`           | 데이터 추가                   |
| `updateDoc`  | `doc(getAuth(), "컬렉션명", "변경할 문서ID")`,&nbsp; `{ 수정 데이터 }` | 데이터 수정                   |
| `deleteDoc`  | `doc(getAuth(), "컬렉션명", "삭제할 문서ID")`                          | 데이터 삭제                   |
| `getDosc`    | `collection(getAuth(), "컬렉션명")`                                    | 모든 데이터 읽기              |
| `onSnapshot` | `collection(getAuth(), "컬렉션명")`,&nbsp; `callbackFunction`          | 데이터 읽기(실시간 변경 반영) |

### firebase 유저 프로필 업데이트 [Firebase 문서(사용자 프로필)](https://firebase.google.com/docs/auth/web/manage-users)

| 메소드          | 파라미터                                                                                     | 기능                   |
| --------------- | -------------------------------------------------------------------------------------------- | ---------------------- |
| `updateProfile` | `getAuth().currentUser`,&nbsp; `{ displayName: "수정 닉네임", photoURL: "유저 이미지 경로"}` | 사용자 프로필 업데이트 |

## 디자인 학습 내용

### 긴 단어(text)의 강제 개행 막기

```css
/* css */
white-space: nowrap;
/* tailwind */
whitespace-nowrap;
```
