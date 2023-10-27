import React from "react";
import { FileOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
const { Content, Footer, Sider } = Layout;
const items = [FileOutlined, HomeOutlined, UserOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const AdminPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let user = JSON.parse(localStorage.getItem("USER"));
  if (user.maLoaiNguoiDung == "KhachHang") {
    window.location.href = "/";
  }
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu icon={<UserOutlined />} title="Users">
            <Menu.Item icon={<UserOutlined />}>
              <NavLink to="/admin/users">Users</NavLink>
            </Menu.Item>
            <Menu.Item icon={<FileOutlined />}>
              <NavLink to="/admin/users/adduser">Add user</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu icon={<FileOutlined />} title="Films">
            <Menu.Item icon={<FileOutlined />}>
              <NavLink to="/admin/films">Films</NavLink>
            </Menu.Item>
            <Menu.Item icon={<FileOutlined />}>
              <NavLink to="/admin/films/addnew">Add new</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item icon={<HomeOutlined />}>
            <NavLink to="/">Back to home</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminPage;
