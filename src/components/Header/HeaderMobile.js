import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function HeaderMobile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let { info } = useSelector((state) => state.userReducer);
    let navigate = useNavigate();

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    let handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };
    let renderNav = () => {
        if (info) {
            return (
                <>
                    <span className="inline-block mx-3">{info.hoTen}</span>
                    <button
                        className="btn-theme"
                        onClick={handleLogout}
                        style={{
                            padding: "4px 12px",
                        }}
                    >
                        Đăng xuất
                    </button>
                </>
            );
        }
        return (
            <>
                <button
                    className="btn-theme"
                    onClick={() => {
                        navigate("/login");
                    }}
                    style={{
                        padding: "4px 12px",
                    }}
                >
                    Đăng nhập
                </button>
                <button
                    className="btn-theme-red"
                    onClick={() => {
                        navigate("/register");
                    }}
                    style={{
                        padding: "4px 12px",
                    }}
                >
                    Đăng ký
                </button>
            </>
        );
    };

    return (
        <div className="relative">
            <div className="container flex justify-between items-center h-14">
                <span
                    className="text-3xl font-semibold text-red-500 cursor-pointer"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    CyberCine
                </span>
                <img
                    src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
                    alt=""
                    width={40}
                    height={40}
                    className="cursor-pointer"
                    onClick={handleMenuClick}
                />
            </div>
            <nav
                className={`${
                    isMenuOpen ? "" : "hidden"
                } absolute z-10 w-full bg-white px-6 pt-1 pb-4 flex flex-col justify-end items-end mt-[-1px] gap-3`}
            >
                {renderNav()}
            </nav>
        </div>
    );
}
