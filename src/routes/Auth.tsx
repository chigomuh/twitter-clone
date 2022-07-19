import { authService } from "firebaseConfig";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { ReactComponent as TwitterIcon } from "images/twitterIcon.svg";
import { ReactComponent as GoogleIcon } from "images/googleIcon.svg";
import { ReactComponent as GithubIcon } from "images/githubIcon.svg";
import { footerContent } from "config";
import { Link, useNavigate } from "react-router-dom";
import TwitterCover from "components/atoms/TwitterCover";

export const onSocialClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  const {
    currentTarget: { name },
  } = event;

  const signInWithPopupProvider = async (provider: FirebaseProvider) => {
    try {
      await signInWithPopup(authService, provider);
    } catch (error) {
      console.error(error);
    }
  };

  if (name === "google") {
    const provider = new GoogleAuthProvider();

    signInWithPopupProvider(provider);
  } else if (name === "github") {
    const provider = new GithubAuthProvider();

    signInWithPopupProvider(provider);
  }
};

type FirebaseProvider = GoogleAuthProvider | GoogleAuthProvider;

const Auth = () => {
  const navigator = useNavigate();

  const onClickSignUp = () => {
    navigator("/singup");
  };

  const onClickLogIn = () => {
    navigator("/login");
  };

  return (
    <>
      <div className="flex">
        <div className="hidden lg:block relative w-1/2 h-[90vh]">
          <TwitterCover />
        </div>
        <div className="lg:w-1/2">
          <div className="space-y-8 pt-8 px-8 w-full">
            <TwitterIcon width="64px" height="64px" fill="#03A9F4" />
            <div className="text-4xl font-bold">
              지금 무슨 일이 일어나고 있는지 확인하세요.
            </div>
            <div className="text-2xl font-bold text-center">
              오늘 트위터에 가입하세요.
            </div>
          </div>
          <div className="space-y-4 p-8 w-full flex flex-col items-center">
            <button
              name="google"
              onClick={onSocialClick}
              className="bg-white w-full h-10 border-2 rounded-full flex justify-center items-center space-x-1 max-w-md"
            >
              <GoogleIcon width="35px" height="35px" />
              <span>
                <strong>Google</strong> 계정으로 가입하기
              </span>
            </button>
            <button
              name="github"
              onClick={onSocialClick}
              className="bg-white w-full h-10 border-2 rounded-full flex justify-center items-center space-x-1 max-w-md"
            >
              <GithubIcon width="25px" height="25px" fill="black" />
              <span>
                <strong>Github</strong>에서 가입하기
              </span>
            </button>
            <div className="w-full flex items-center justify-between max-w-md">
              <span className="bg-gray-300 w-[40%] h-[0.1px]"></span>
              <span>또는</span>
              <span className="bg-gray-300 w-[40%] h-[0.1px]"></span>
            </div>
            <button
              name="email"
              className="bg-[#03A9F4] w-full h-10 border-2 rounded-full text-white font-bold text-sm max-w-md"
              onClick={onClickSignUp}
            >
              휴대폰 번호나 이메일 주소로 가입하기
            </button>
            <div className="text-[10px]">
              By signing up, you agree to the&nbsp;
              <Link to="/tos" className="text-[#03A9F4]">
                Terms of Service&nbsp;
              </Link>
              and&nbsp;
              <Link to="/privacy" className="text-[#03A9F4]">
                Privacy Policy
              </Link>
              , including&nbsp;
              <Link to="/cookiePolicy" className="text-[#03A9F4]">
                Cookie Use.
              </Link>
            </div>
          </div>
          <div className="p-8 space-y-4 w-full flex flex-col items-center">
            <div className="text-lg font-bold">이미 트위터에 가입하셨나요?</div>
            <button
              className="bg-white w-full h-10 border-2 rounded-full text-[#03A9F4] font-bold max-w-md"
              onClick={onClickLogIn}
            >
              로그인
            </button>
          </div>
          <div className="relative w-screen h-[333px] lg:hidden">
            <TwitterCover />
          </div>
        </div>
      </div>
      <footer className="p-4 text-sm text-center">
        {footerContent.map((content) => (
          <span key={content.title} className="px-2 whitespace-nowrap">
            <Link to={content.link}>{content.title}</Link>
          </span>
        ))}
        <span className="whitespace-nowrap">
          <a href="https://github.com/chigomuh/twitter-clone/tree/main">
            &copy; {new Date().getFullYear()} chigomuh
          </a>
        </span>
      </footer>
    </>
  );
};

export default Auth;
