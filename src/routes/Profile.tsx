import { signOut } from "firebase/auth";
import { authService } from "firebaseConfig";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigator = useNavigate();

  const onLogOutClick = () => {
    try {
      signOut(authService);

      navigator("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
