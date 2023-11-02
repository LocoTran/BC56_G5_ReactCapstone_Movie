import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { adminService } from "../../../services/service";

export default function Films() {
  const [filmArr, setFilmArr] = useState([]);

  const getFilms = async () => {
    try {
      const res = await adminService.layDanhSachPhim();
      setFilmArr(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFilms();
  }, []);

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "15%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + " ..."
              : film.moTa}
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink key={1} className=" mr-2  text-2xl">
              <EditOutlined style={{ color: "blue" }} />{" "}
            </NavLink>
            <span style={{ cursor: "pointer" }} key={2} className="text-2xl">
              <DeleteOutlined style={{ color: "red" }} />{" "}
            </span>

            <NavLink
              key={3}
              className=" mr-2 text-2xl"
              onClick={() => {
                localStorage.setItem("filmParams", JSON.stringify(film));
              }}
            >
              <CalendarOutlined style={{ color: "green" }} />{" "}
            </NavLink>
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={filmArr} rowKey={"maPhim"} />
    </div>
  );
}
