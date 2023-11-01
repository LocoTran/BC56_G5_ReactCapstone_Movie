import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Drawer, Form, Input } from "antd";
import { adminService } from "../../services/service";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import toast from "react-hot-toast";
import Search from "antd/es/input/Search";

export default function UserPage() {
  const [userArr, setUserArr] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [userDelete, setUserDelete] = useState();

  const [userDetail, setUserDetail] = useState();

  const [isOpenDrawer, setIsOpenDrawer] = useState();

  const getUsers = async () => {
    try {
      const res = await adminService.getUserList("?maNhom=GP00");
      setUserArr(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
      render: (value, recordItem, index) => {
        return (
          <Fragment>
            <NavLink
              onClick={async () => {
                try {
                  const res = await adminService.getUserDetailById(
                    recordItem.taiKhoan
                  );
                  if (res) {
                    setUserDetail(res.data.content);
                    setIsOpenDrawer(true);
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
              key={1}
              className=" mr-2  text-2xl"
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              onClick={() => {
                setUserDelete(recordItem);
                setIsOpenModal(true);
              }}
              style={{ cursor: "pointer" }}
              key={2}
              className="text-2xl"
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
          </Fragment>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        dataSource={userArr}
        columns={columns}
        pagination={{
          total: 200,
        }}
      />

      <Modal
        open={isOpenModal}
        onOk={async () => {
          try {
            await adminService.deleteUser(userDelete.taiKhoan);
            toast.success("Xóa user thành công");
            getUsers();
          } catch (err) {
            toast.error(err.response.data.content);
          } finally {
            setIsOpenModal(false);
          }
        }}
        onCancel={() => {
          setIsOpenModal(false);
        }}
      >
        <p>Xác nhận xóa thông tin user: {userDelete?.taiKhoan}</p>
      </Modal>
      {userDetail && (
        <Drawer
          open={isOpenDrawer}
          onClose={() => {
            setIsOpenDrawer(false);
            setUserDetail(undefined);
          }}
          title="Chỉnh sửa thông tin user"
        >
          <Form
            onFinish={async (value) => {
              try {
                await adminService.updateUser({
                  ...userDetail,
                  ...value,
                });
                setIsOpenDrawer(false);
                setUserDetail(userDetail);
                getUsers();

                toast.success("Cập Nhật Thành Công");
              } catch (err) {
                console.log(value);
                toast.success("Cập Nhật Thất Bại");
              }
              console.log(value);
            }}
          >
            <Form.Item
              label="Họ và tên"
              name="hoTen"
              initialValue={userDetail?.hoTen}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              initialValue={userDetail?.email}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số Điện Thoại"
              name="soDT"
              initialValue={userDetail?.soDT}
            >
              <Input />
            </Form.Item>
            <Button
              className="!mt-10 bg-gray-950"
              type="primary"
              htmlType="submit"
            >
              Update
            </Button>
          </Form>
        </Drawer>
      )}
    </div>
  );
}
