import { ReactComponent as TwitterIcon } from "images/twitterIcon.svg";

const FetchLoading = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-50 z-30"></div>
      <div className="z-50 flex flex-col justify-center w-screen h-screen absolute top-0 left-[10%] animate-loading">
        <TwitterIcon width="50px" height="50px" fill="#03A9F4" />
      </div>
    </>
  );
};

export default FetchLoading;
