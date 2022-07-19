import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "firebaseConfig";
import { ReactComponent as XIcon } from "images/x.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TwitterIcon } from "images/twitterIcon.svg";
import { ReactComponent as GoogleIcon } from "images/googleIcon.svg";
import { ReactComponent as GithubIcon } from "images/githubIcon.svg";
import { onSocialClick } from "./Auth";

const LogIn = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onClickMoveHome = () => {
    navigator("/");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(authService, email, password).then(
        () => {
          navigator("/");
        }
      );
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error);

        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          setError("이메일과 비밀번호를 다시 확인하세요.");
        }
      }
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="p-2 space-y-6 w-screent h-screen max-w-lg lg:flex lg:flex-col lg:justify-center">
        <XIcon
          fill="black"
          width="28px"
          height="28px"
          onClick={onClickMoveHome}
          className="cursor-pointer"
        />
        <div className="flex justify-center">
          <TwitterIcon width="46px" height="46px" fill="#03A9F4" />
        </div>
        <button
          name="google"
          onClick={onSocialClick}
          className="bg-white w-full h-10 border-2 rounded-full flex justify-center items-center space-x-1"
        >
          <GoogleIcon width="35px" height="35px" />
          <span>
            <strong>Google</strong> 계정으로 로그인하기
          </span>
        </button>
        <button
          name="github"
          onClick={onSocialClick}
          className="bg-white w-full h-10 border-2 rounded-full flex justify-center items-center space-x-1"
        >
          <GithubIcon width="25px" height="25px" fill="black" />
          <span>
            <strong>Github</strong>에서 로그인하기
          </span>
        </button>
        <div className="w-full flex items-center justify-between">
          <span className="bg-gray-300 w-[40%] h-[0.1px]"></span>
          <span>또는</span>
          <span className="bg-gray-300 w-[40%] h-[0.1px]"></span>
        </div>
        <form onSubmit={onSubmit} className="p-4 flex flex-col justify-center">
          <div className="space-y-8">
            <p className="text-2xl font-bold">이메일로 로그인하기</p>
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={email}
              required
              onChange={onChange}
              className="w-full h-14 border-2 rounded-md px-2"
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={password}
              required
              onChange={onChange}
              className="w-full h-14 border-2 rounded-md px-2"
            />
            <div className="text-center text-red-500">{error}</div>
          </div>
          <button
            type="submit"
            className="w-full h-14 border-2 bg-gray-500 text-white rounded-full"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
