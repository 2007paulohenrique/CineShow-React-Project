import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";


function App() {
  return (
    <Router>
      <NavBar/>

      <Routes>
        <Route exact path="/" element={<Home/>}/>
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;
