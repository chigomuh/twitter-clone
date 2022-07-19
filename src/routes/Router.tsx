import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import { User } from "firebase/auth";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

interface Props {
  isLoggedIn: boolean;
  user: User | null;
  refreshUser: () => void;
}

const RouterComponent = ({ refreshUser, isLoggedIn, user }: Props) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {isLoggedIn && <Navigation user={user} />}
      <Routes>
        {isLoggedIn && user ? (
          <>
            <Route path="/" element={<Home user={user} />}></Route>
            <Route
              path="/profile"
              element={<Profile user={user} refreshUser={refreshUser} />}
            ></Route>
            <Route path="*" element={<Home user={user} />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />}></Route>
            <Route
              path="/singup"
              element={<SignUp refreshUser={refreshUser} />}
            ></Route>
            <Route path="/login" element={<LogIn />}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
};

export default RouterComponent;
