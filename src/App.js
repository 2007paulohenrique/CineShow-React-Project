import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/login/Login";

function Layout({children}) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <>
      {!isLogin && <NavBar/>}
      {children}
      {!isLogin && <Footer/>}
    </>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>      
      </Layout>
    </Router>
  );
}

export default App;
