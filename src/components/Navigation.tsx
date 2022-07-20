import { User } from "firebase/auth";
import { Link } from "react-router-dom";
import { ReactComponent as TwitterIcon } from "images/twitterIcon.svg";
import UserDefaultImage from "images/UserDefaultImage";

interface Props {
  user: User | null;
}

const Navigation = ({ user }: Props) => {
  return (
    <nav className="w-full h-max flex flex-col items-center">
      <div className="sticky top-0 left-0 z-20 bg-white border-b-2 max-w-4xl w-full">
        <ul className="flex justify-between p-2 items-center">
          <li>
            <Link to="/">
              <TwitterIcon width="40px" height="40px" fill="#03A9F4" />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              {user && user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="user-profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <UserDefaultImage width="40px" height="40px" />
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
