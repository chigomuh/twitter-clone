import { ReactComponent as TwitterIcon } from "images/twitterIcon.svg";

const TwitterCover = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('images/randingPageBackground.png')] bg-cover"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <TwitterIcon width="100%" height="100%" fill="white" />
      </div>
    </>
  );
};

export default TwitterCover;
