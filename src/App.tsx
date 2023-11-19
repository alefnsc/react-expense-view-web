import "./App.css";

import ErrorPage from "./pages/ErrorPage";
import ReactExpenseViewWeb from "./pages/ReactExpenseViewWeb";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/expenses/:month" element={<ReactExpenseViewWeb />} />
          <Route path="" element={<Navigate to="/expenses/all" />} />
          <Route path="/expenses" element={<Navigate to="/expenses/all" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
