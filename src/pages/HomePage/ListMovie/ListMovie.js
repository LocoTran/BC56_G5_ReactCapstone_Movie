import React from "react";
import { Card, Rate } from "antd";
import Meta from "antd/es/card/Meta";
import { NavLink } from "react-router-dom";

export default function ListMovie({ list }) {
    let renderList = () => {
        return list.map(({ hinhAnh, maPhim, tenPhim, danhGia }) => {
            return (
                <Card
                    key={maPhim}
                    hoverable
                    style={{
                        width: 240,
                    }}
                    cover={
                        <NavLink to={`/detail/${maPhim}`}>
                            <img
                                alt=""
                                src={hinhAnh}
                                style={{
                                    height: 300,
                                    width: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </NavLink>
                    }
                >
                    <NavLink to={`/detail/${maPhim}`}>
                        <Meta title={tenPhim} />
                    </NavLink>
                    <Rate disabled value={danhGia / 2} className="mt-2" />
                    <NavLink
                        className="mt-2 inline-block btn-theme-red px-2"
                        to={`/detail/${maPhim}`}
                    >
                        Xem ngay
                    </NavLink>
                </Card>
            );
        });
    };

    return (
        <div className="container grid grid-cols-4 gap-6 py-5">
            {renderList()}
        </div>
    );
}
