import { useEffect, useState } from "react";
import "./App.css";

import ErrorPage from "./pages/ErrorPage";
import ReactExpenseViewWeb from "./pages/ReactExpenseViewWeb";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getUserEndpoint } from "./services/backend";
import LoginPage from "./pages/LoginPage";
import { IUser } from "./types/userType";
import { UserMenu } from "./components/UserMenu";
import { authContext } from "./hooks/authContext";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
  }
  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <Router>
          <UserMenu />
          <Routes>
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/expenses/:month" element={<ReactExpenseViewWeb />} />
            <Route path="/expenses" element={<Navigate to="/expenses/all" />} />
            <Route path="*" element={<Navigate to="/expenses/all" />} />
          </Routes>
        </Router>
      </authContext.Provider>
    );
  } else {
    return <LoginPage onSignIn={setUser} />;
  }
}

export default App;
