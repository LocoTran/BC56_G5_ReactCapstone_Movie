import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../services/service";

export default function PurchaseDesktop() {
    const { idBooking } = useParams();
    const [detailRoom, setDetailRoom] = useState();

    useEffect(() => {
        movieService
            .getToPurchase(idBooking)
            .then((res) => {
                console.log("🚀👾👽 ~ .then ~ res:", res.data.content);
                setDetailRoom(res.data.content);
            })
            .catch((err) => {
                console.log("🚀👾👽 ~ err:", err);
            });
    }, []);

    let renderBooking = () => {
        console.log(detailRoom);
        return detailRoom?.danhSachGhe.map((ghe) => {
            return (
                <span
                    key={ghe.maGhe}
                    className={ghe.loaiGhe == "Vip" ? "gheVip" : "gheThuong"}
                >
                    {ghe.daDat == false ? ghe.tenGhe : "X"}
                </span>
            );
        });
    };

    return (
        <div className="container flex py-5">
            <div className="grid grid-cols-10 gap-3 w-3/4">
                {renderBooking()}
            </div>
            <div></div>
        </div>
    );
}
