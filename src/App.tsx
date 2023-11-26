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
      <Router>
        <Routes>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/expenses/:month" element={<ReactExpenseViewWeb />} />
          <Route path="/expenses" element={<Navigate to="/expenses/all" />} />
          <Route path="*" element={<Navigate to="/expenses/all" />} />
        </Routes>
      </Router>
    );
  } else {
    return <LoginPage onSignIn={setUser} />;
  }
}

export default App;
