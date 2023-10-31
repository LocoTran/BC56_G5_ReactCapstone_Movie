import { adminService } from "../../services/service";

export const quanLyNguoiDungAction = {
  themNguoiDungAction: (thongTinNguoiDung) => {
    return async (dispatch) => {
      try {
        const result = await adminService.addUser(thongTinNguoiDung);
        if (result.data.statusCode === 200) {
          // console.log('result: ', result.data.content);
          alert("Thêm người dùng thành công!");
        }
      } catch (errors) {
        console.log("errors: ", errors.reponse?.data);
      }
    };
  },
};
