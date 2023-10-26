import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register/Register";
import DetailPage from "./pages/DetailPage/DetailPage";
import HeadLayout from "./layout/HeadLayout";
import HeadFootLayout from "./layout/HeadFootLayout";
import Spinner from "./components/Spinner/Spinner";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Toaster />
                <Spinner />
                <Routes>
                    <Route path="/" element={<HeadFootLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/detail/:id" element={<DetailPage />} />
                    </Route>
                    <Route path="/" element={<HeadLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
