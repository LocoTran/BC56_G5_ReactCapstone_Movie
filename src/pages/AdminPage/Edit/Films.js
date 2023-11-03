import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Drawer, Form, Input, Modal, Table } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { adminService } from "../../../services/service";
import toast from "react-hot-toast";

export default function Films() {
  const [filmArr, setFilmArr] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [filmDelete, setFilmDelete] = useState();

  const [filmDetail, setFilmDetail] = useState();

  const [isOpenDrawer, setIsOpenDrawer] = useState();

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
      render: (value, recordItem, index, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className=" mr-2  text-2xl"
              onClick={async () => {
                console.log(recordItem);
                try {
                  const res = await adminService.layThongTinPhimEdit(
                    recordItem.maPhim
                  );
                  if (res) {
                    console.log("💖  onClick={  res:♋", res);
                    setFilmDetail(res.data.content);
                    setIsOpenDrawer(true);
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              <EditOutlined style={{ color: "blue" }} />{" "}
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="text-2xl"
              onClick={() => {
                setFilmDelete(recordItem);
                setIsOpenModal(true);
              }}
            >
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
      <Modal
        open={isOpenModal}
        onOk={async () => {
          try {
            await adminService.xoaPhim(filmDelete.maPhim);
            toast.success("Xóa phim thành công");
            getFilms();
          } catch (err) {
            console.log(err.response.data.content);
          } finally {
            setIsOpenModal(false);
          }
        }}
        onCancel={() => {
          setIsOpenDrawer(false);
        }}
      >
        <p>Xác nhận xóa phim:{filmDelete?.tenPhim}</p>
      </Modal>
      {filmDetail && (
        <Drawer
          open={isOpenDrawer}
          onClose={() => {
            setIsOpenDrawer(false);
            setFilmDetail(undefined);
          }}
          title="Chỉnh sửa thông tin phim"
        >
          <Form
            onFinish={async (value) => {
              try {
                await adminService.capNhatPhimUpload({
                  ...filmDetail,
                  ...value,
                });
                setIsOpenDrawer(false);
                setFilmDetail(filmDetail);
                getFilms();
                toast.success("Cập Nhật Thành Công");
              } catch (err) {
                console.log(err);
                toast.success("Cập Nhật Thất Bại");
              }
            }}
          >
            <Form.Item
              label="Tên Phim"
              name="tenPhim"
              initialValue={filmDetail?.tenPhim}
            >
              <Input />
            </Form.Item>
          </Form>
        </Drawer>
      )}
    </div>
  );
}
