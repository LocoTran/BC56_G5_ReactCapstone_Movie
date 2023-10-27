import React, { useEffect, useState } from "react";
import { Table, Tag, Button } from "antd";
import { adminService } from "../../services/service";
export default function UserPage() {
  const [userArr, setUserArr] = useState([]);
  //   gọi api lấy danh sách người dùng
  useEffect(() => {
    // antd table ( dùng table đầu tiên)
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
      title: "Name",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Gmail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Type",
      dataIndex: "maLoaiNguoiDung",
      render: (text) => {
        if (text == "KhachHang") return <Tag color="green">Khách Hàng</Tag>;
        else return <Tag color="red">Quản Trị</Tag>;
      },
      key: "maLoaiNguoiDung",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => {
        return <Button danger>Delete</Button>;
      },
    },
  ];
  return (
    <div>
      <Table dataSource={userArr} columns={columns} />
    </div>
  );
}
