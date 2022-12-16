import { useAuthContext } from "./hooks/useAuthContext";

//styles
import "./App.css";

// route components
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// page components
import Login from "./pages/login/Login";
import CreateAccount from "./pages/create-account/CreateAccount";
import Dashboard from "./pages/dashboard/Dashboard";
import Outreach from "./pages/outreach/Outreach";
import EditSummary from "./pages/edit-summary/EditSummary";
import Requests from "./pages/requests/Requests";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import MyOutreach from "./pages/my-outreach/MyOutreach";
import AboutUs from "./pages/about-us/AboutUs";
import AccountInfo from "./pages/account-info/AccountInfo";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="app">
      {authIsReady && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Dashboard />}
            </Route>
            <Route exact path="/outreach/:outreachId">
              {!user && <Redirect to="/login" />}
              {user && <Outreach />}
            </Route>
            <Route exact path="/edit-summary/:editSummaryId">
              {!user && <Redirect to="/login" />}
              {user && <EditSummary />}
            </Route>
            <Route path="/requests">
              {!user && <Redirect to="/login" />}
              {(user && user.email === "admin_user1@tip.edu.ph") ||
              (user && user.email === "admin_user2@tip.edu.ph") ||
              (user && user.email === "admin_user3@tip.edu.ph") ||
              (user && user.email === "admin_user4@tip.edu.ph") ||
              (user && user.email === "admin_user5@tip.edu.ph") ||
              (user && user.email === "cecilia.venal@tip.edu.ph") ||
              (user && user.email === "qmcvenal@tip.edu.ph") ||
              (user && user.email === "jtaylar.cpe@tip.edu.ph") ||
              (user && user.email === "qjtaylar@tip.edu.ph") ||
              (user && user.email === "mmiranda.cpe@tip.edu.ph") ||
              (user && user.email === "vvicente.cpe@tip.edu.ph") ||
              (user && user.email === "qcrregio@tip.edu.ph") ||
              (user && user.email === "qramarmito@tip.edu.ph") ||
              (user && user.email === "qmc-garcia@tip.edu.ph") ||
              (user && user.email === "qigbbravo@tip.edu.ph") ||
              (user && user.email === "qjpgaba@tip.edu.ph") ? (
                <Requests />
              ) : (
                <Unauthorized />
              )}
            </Route>
            <Route path="/my-outreach">
              {!user && <Redirect to="/login" />}
              {user && <MyOutreach />}
            </Route>
            <Route path="/about-us">
              {!user && <Redirect to="/login" />}
              {user && <AboutUs />}
            </Route>
            <Route path="/account-info">
              {!user && <Redirect to="/login" />}
              {user && <AccountInfo />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/create-account">
              {user && <Redirect to="/" />}
              {!user && <CreateAccount />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
