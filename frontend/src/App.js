import "./common/stylesheets/App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./common/components/header";
import Homepage from "./pages/Homepage";
import React, {useState} from "react";
import PermanentDrawerLeft from "./common/components/drawerLeft";
import DetailsPage from "./pages/Details";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import SearchPage from "./pages/Search";
import SignupPage from "./pages/Signup";
import AuthorPage from "./pages/Author";
import useToken from './common/customHooks/useToken';

const drawerWidth = 250;

export const BACKEND_URL = "http://localhost:5000"

const Body = ({ drawerWidth, token, setToken }) => {
  // const { token, setToken } = useToken();
  const [lastPath, setHistory] = useState("/");
  return (
    <div
      className="body"
      style={{
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
      }}
    >
      <Header></Header>
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage token={token}/>}></Route>
          <Route element={<RequireAuth setHistory={setHistory} token={token}/>}>
            <Route path="/details/*" element={<DetailsPage />}></Route>
          </Route>
          <Route path="/login" exact element={<LoginPage token={token} setToken={setToken} lastPath={lastPath}/> }></Route>
          <Route path="/register" exact element={<SignupPage token={token} setToken={setToken}/>}></Route>
          <Route path="/profile" exact element={<ProfilePage />}></Route>
          <Route path="/author/*" element={<AuthorPage/>}></Route>
          <Route path="/search" exact element={<SearchPage />}></Route>
          <Route path="/*" element={<Homepage token={token}/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

function App() {
  const { token, setToken } = useToken();
  return (
    <Router>
      <PermanentDrawerLeft drawerWidth={drawerWidth} token={token} setToken={setToken}/>
      <Body drawerWidth={drawerWidth} token={token} setToken={setToken}/>
    </Router>
  );
}

function RequireAuth({token, setHistory}) {
  let location = useLocation();
  console.log('token ' + JSON.stringify(token));

  if (!token) {
    console.log('token was null');
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    setHistory(location.pathname)
    
    return <Navigate to="/login"/>;
  }

  return <Outlet />;
}

export default App;
