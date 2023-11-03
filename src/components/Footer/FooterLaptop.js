import React from "react";

export default function FooterLaptop() {
    return (
        <div className="bg-black text-white">
            <div
                className="container flex gap-3 justify-between items-center py-5"
                id="footer"
            >
                <span className="text-4xl font-semibold text-red-500 cursor-pointer">
                    CyberCine
                </span>
                <p className="text-right">
                    Sản phẩm của nhóm 5 - BC56. <br />
                    Hoàn thành 11/2023. <br />
                    Thành viên nhóm:
                    <a
                        href="https://web.facebook.com/profile.php?id=100012335049289"
                        rel="noopener"
                        target="_blank"
                        className="text-red-500 hover:text-red-700 mx-2"
                    >
                        Trần Đại Phú Lộc
                    </a>
                    <a
                        href="https://web.facebook.com/nhan.truongthanh.19.03"
                        rel="noopener"
                        target="_blank"
                        className="text-red-500 hover:text-red-700 mx-2"
                    >
                        Trương Thành Nhân
                    </a>
                    <br />
                    Link phân chia task:{" "}
                    <a
                        href="https://docs.google.com/spreadsheets/d/1138x6tlvRE4PRMpoK95BPKnzBOSNn5XuI-nEu3XdysY/edit#gid=0"
                        rel="noopener"
                        target="_blank"
                        className="text-green-500 hover:text-green-700 mx-2"
                    >
                        GG sheet
                    </a>
                </p>
            </div>
        </div>
    );
}
