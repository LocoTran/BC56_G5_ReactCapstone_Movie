import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import ListMovie from "./ListMovie/ListMovie";
import { movieService } from "../../services/service";
import playBtn from "./play.png";
import Theather from "../../components/Theather/Theather";

export default function HomePage() {
    const [list, setList] = useState([]);

    useEffect(() => {
        movieService
            .getList()
            .then((res) => {
                setList(res.data.content);
            })
            .catch((err) => {
                console.log("🚀👾👽 ~ err:", err);
            });
    }, []);

    const contentStyle = {
        height: "calc(75vh - 80px)",
        width: "100%",
        objectFit: "contain",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "rgb(254 215 170)",
    };

    let renderCarousel = () => {
        return list.map(({ hinhAnh, maPhim, trailer }) => {
            return (
                <div key={maPhim} className="relative">
                    <a href={trailer} target="_blank" rel="noopener">
                        <img
                            loading="lazy"
                            src={playBtn}
                            alt=""
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </a>
                    <img src={hinhAnh} alt="" style={contentStyle} />
                </div>
            );
        });
    };

    return (
        <div>
            <Carousel autoplay>{renderCarousel()}</Carousel>
            <ListMovie list={list} />
            <Theather />
        </div>
    );
}
