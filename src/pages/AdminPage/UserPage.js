import React, { useEffect, useState } from "react";
import { Table, Tag, Button } from "antd";
import { adminService } from "../../services/service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

export default function UserPage() {
  const [userArr, setUserArr] = useState([]);
  useEffect(() => {
    adminService
      .getUserList()
      .then((res) => {
        console.log(res);
        setUserArr(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const dataSource = userArr;

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      width: "15%",
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sortDirections: ["descend", "ascend"],
      width: "5%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      sortDirections: ["descend", "ascend"],
      width: "10%",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Hành động",
      dataIndex: "stt",
      sortDirections: ["descend", "ascend"],
      key: "action",
      width: "15%",
      render: () => {
        return (
          <Fragment>
            <NavLink key={1} className=" mr-2  text-2xl">
              <EditOutlined style={{ color: "blue" }} />{" "}
            </NavLink>
            <span style={{ cursor: "pointer" }} key={2} className="text-2xl">
              <DeleteOutlined style={{ color: "red" }} />
            </span>
          </Fragment>
        );
      },
    },
  ];
  return (
    <div>
      <Table dataSource={userArr} columns={columns} />
    </div>
  );
}
