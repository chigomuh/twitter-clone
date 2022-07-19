import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authService } from "firebaseConfig";
import { useState } from "react";
import { ReactComponent as XIcon } from "images/x.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  refreshUser: () => void;
}

const AuthForm = ({ refreshUser }: Props) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigator = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(authService, email, password).then(
        () => {
          if (authService.currentUser) {
            updateProfile(authService.currentUser, {
              displayName,
            })
              .then(() => {
                refreshUser();
              })
              .catch((error) => {
                console.error(error);
              });
          }
          navigator("/");
        }
      );
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error);

        if (error.code === "auth/weak-password") {
          setError("패스워드는 6자리 이상 입력하세요");
        } else if (error.code === "auth/email-already-in-use") {
          setError("해당 이메일은 이미 가입되었어요.");
        }
      }
    }
  };

  const onClickMoveHome = () => {
    navigator("/");
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
        <form onSubmit={onSubmit} className="p-4 flex flex-col justify-center">
          <div className="space-y-8">
            <p className="text-2xl font-bold">계정을 생성하세요</p>
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
            <input
              type="text"
              name="displayName"
              placeholder="닉네임"
              value={displayName}
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
            계정 생성
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
