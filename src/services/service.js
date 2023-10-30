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
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
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
  deleteUser: (taiKhoan) => {
    return https.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  },
  getUserDetailById: (taiKhoan) => {
    return https.post(
      `/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
    );
  },
  updateUser: (payload) => {
    return https.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, payload);
  },
};

// layDanhSachBanner: () => {
//   return https.get(`QuanLyPhim/LayDanhSachBanner`);
// },

// // layDanhSachPhim: (tenPhim = "") => {
// layDanhSachPhim: (id) => {
//   // if (tenPhim.trim() !== "") {
//   //   return https.get(
//   //     `QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`
//   //   );
//   // }
//   return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
// },

// themPhimUploadHinh: (formData) => {
//   return https.post(`QuanLyPhim/ThemPhimUploadHinh`, formData);
// },

// layThongTinPhimEdit: (maPhim) => {
//   return https.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
// },

// capNhatPhimUpload: (formData) => {
//   return https.post(`QuanLyPhim/CapNhatPhimUpload`, formData);
// },

// xoaPhim: (maPhim) => {
//   return https.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
// },
