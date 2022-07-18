import { User } from "firebase/auth";
import { Link } from "react-router-dom";

interface Props {
  user: User | null;
}

const Navigation = ({ user }: Props) => {
  let userDisplayName = "익명";

  if (user) {
    if (user.displayName) {
      userDisplayName = user.displayName;
    } else if (user.email) {
      userDisplayName = user.email.split("@")[0];
    }
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userDisplayName}의 Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
