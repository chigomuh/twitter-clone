import RouterComponent from "components/Router";
import { useState } from "react";
import { authService } from "firebaseConfig";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <RouterComponent isLoggedIn={isLoggedIn} />
      ) : (
        <div>초기화 중...</div>
      )}
      <footer>&copy; {new Date().getFullYear()} chigomuh</footer>
    </>
  );
}

export default App;
