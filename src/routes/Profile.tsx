import { signOut, User, updateProfile } from "firebase/auth";
import { authService } from "firebaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User;
  refreshUser: () => void;
}

const Profile = ({ user, refreshUser }: Props) => {
  const userDisplayName = user.displayName
    ? user.displayName
    : user.email?.split("@")[0];

  const navigator = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userDisplayName);

  const onLogOutClick = () => {
    try {
      signOut(authService).then(() => {
        navigator("/", { replace: true });
        refreshUser();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setNewDisplayName(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (authService.currentUser && userDisplayName !== newDisplayName) {
      updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      })
        .then(() => {
          alert(`닉네임 변경 완료`);
          refreshUser();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
