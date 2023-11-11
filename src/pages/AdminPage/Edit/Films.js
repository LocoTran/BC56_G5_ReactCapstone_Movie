import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Switch,
  Table,
  Upload,
  message,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { adminService } from "../../../services/service";
import toast from "react-hot-toast";
import moment from "moment";

export default function Films() {
  const [filmArr, setFilmArr] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [filmDelete, setFilmDelete] = useState();

  const [filmDetail, setFilmDetail] = useState();

  const [isOpenDrawer, setIsOpenDrawer] = useState();

  const [selectedImage, setSelectedImage] = useState(null);

  function normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ chấp nhận định dạng JPG/PNG!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Hình ảnh phải nhỏ hơn 2MB!");
      return false;
    }
    // Update the selected image state
    setSelectedImage(file);
    return false; // Prevent default upload behavior
  }

  function dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

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
                  hinhAnh: selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : filmDetail?.hinhAnh,
                });
                setIsOpenDrawer(false);
                setFilmDetail(filmDetail);
                getFilms();
                toast.success("Cập Nhật Thành Công");
              } catch (err) {
                console.log(err);
                toast.error("Cập Nhật Thất Bại");
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
            <Form.Item
              label="Hình Ảnh"
              name="hinhAnh"
              valuePropName="fileList"
              initialValue={
                filmDetail?.hinhAnh
                  ? [
                      {
                        uid: "-1",
                        name: "image.png",
                        status: "done",
                        url: filmDetail.hinhAnh,
                      },
                    ]
                  : []
              }
              getValueFromEvent={normFile}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={dummyRequest}
              >
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : filmDetail?.hinhAnh ? (
                  <img
                    src={filmDetail.hinhAnh}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div>
                    <div style={{ marginTop: 8 }}>Tải lên</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label="Mô Tả"
              name="moTa"
              initialValue={filmDetail?.moTa}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Đang Chiếu"
              name="dangChieu"
              valuePropName="checked"
              initialValue={filmDetail?.dangChieu}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="Sắp Chiếu"
              name="sapChieu"
              valuePropName="checked"
              initialValue={filmDetail?.sapChieu}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="Ngày Chiếu"
              name="ngayKhoiChieu"
              initialValue={moment(filmDetail?.ngayKhoiChieu)}
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              label="Đánh Giá"
              name="danhGia"
              initialValue={filmDetail?.danhGia}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>
            {/* Add other fields as needed */}
            <Form.Item>
              <Button className="bg-black" type="primary" htmlType="submit">
                Cập Nhật
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      )}
    </div>
  );
}
