import { https } from "./config";

export let userService = {
  login: (valueForm) => {
    return https.post("/api/QuanLyNguoiDung/DangNhap", valueForm);
  },
  register: (valueForm) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", valueForm);
  },
};

export let movieService = {
  getList: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP14");
  },
  getDetail: (id) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  },
  getMovieByTheather: () => {
    return https.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap");
  },
};
export let adminService = {
  getUserList: () => {
    return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },
};
