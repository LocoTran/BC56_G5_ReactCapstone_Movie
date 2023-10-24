import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register/Register";
import DetailPage from "./pages/DetailPage/DetailPage";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Toaster />
                <Header />
                <Footer />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
