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
    getDetailBooking: (id) => {
        return https.get(
            `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
        );
    },
    getToPurchase: (idBooking) => {
        return https.get(
            `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idBooking}`
        );
    },
};
