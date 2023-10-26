import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import ListMovie from "./ListMovie/ListMovie";
import { movieService } from "../../services/service";
import playBtn from "./play.png";
import Theather from "../../components/Theather/Theather";
import Hero from "./Hero";

export default function HomePage() {
    return (
        <div>
            <Hero />
            <ListMovie />
            <Theather />
        </div>
    );
}
