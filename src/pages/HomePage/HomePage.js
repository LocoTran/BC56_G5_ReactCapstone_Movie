import React from "react";
import ListMovie from "./ListMovie/ListMovie";
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
