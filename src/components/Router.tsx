import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import { User } from "firebase/auth";

interface Props {
  isLoggedIn: boolean;
  user: User | null;
  refreshUser: () => void;
}

const RouterComponent = ({ refreshUser, isLoggedIn, user }: Props) => {
  return (
    <Router>
      {isLoggedIn && <Navigation user={user} />}
      <Routes>
        {isLoggedIn && user ? (
          <>
            <Route path="/" element={<Home user={user} />}></Route>
            <Route
              path="/profile"
              element={<Profile user={user} refreshUser={refreshUser} />}
            ></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  );
};

export default RouterComponent;
