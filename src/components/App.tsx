import RouterComponent from "routes/Router";
import { useState } from "react";
import { authService } from "firebaseConfig";
import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import Loading from "./Loading";

function App() {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUser({ ...user });
      }

      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;

    if (user) {
      setUser({ ...user });
    } else {
      setUser(null);
    }
  };

  return (
    <>
      {init ? (
        <RouterComponent
          refreshUser={refreshUser}
          isLoggedIn={Boolean(user)}
          user={user}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
