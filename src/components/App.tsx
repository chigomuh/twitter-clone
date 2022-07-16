import RouterComponent from "components/Router";
import { useState } from "react";
import { authService } from "firebaseConfig";
import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUser(user);
      }

      setInit(true);
    });
  }, []);

  return (
    <>
      {init && user ? (
        <RouterComponent isLoggedIn={Boolean(user)} user={user} />
      ) : (
        <div>초기화 중...</div>
      )}
      <footer>&copy; {new Date().getFullYear()} chigomuh</footer>
    </>
  );
}

export default App;
