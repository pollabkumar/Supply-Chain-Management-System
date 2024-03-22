import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LogoutOutlined,
    HomeOutlined,
    CopyOutlined,
    UnorderedListOutlined,
    ShoppingCartOutlined,
    AppstoreAddOutlined ,
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
    const navigate = useNavigate();
    const { cartItems, loading } = useSelector(state => state.rootReducer)
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch()
    const toggle = () => {
        setCollapsed(
            !collapsed
        );
    };

    useEffect(() => {
        localStorage.setItem('cardItems', JSON.stringify(cartItems))
    }, [cartItems])

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h1 className="text-center text-light font-wight-bold mt-4">SCMS</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={window.location.pathname}
                >

                    <Menu.Item key="/menuf" icon={<HomeOutlined />}>
                        <Link to="/menuf">Manufacturer</Link>
                    </Menu.Item>

                    <Menu.Item key="/distributor" icon={<UserOutlined />}>
                        <Link to="/distributor">Distributor</Link>
                    </Menu.Item>

                    <Menu.Item key="/re" icon={<UserOutlined />}>
                        <Link to="/re">Retailer</Link>
                    </Menu.Item>

                    <Menu.Item key="/show" icon={<AppstoreAddOutlined  />}>
                        <Link to="/show">Products</Link>
                    </Menu.Item>

                    <Menu.Item key="/bills" icon={<CopyOutlined />}>
                        <Link to="/bills">Order Details</Link>
                    </Menu.Item>

                    <Menu.Item key="/logout" onClick={() => {
                        localStorage.removeItem('auth')
                        navigate('/login')
                    }} icon={<LogoutOutlined />}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: toggle,
                        }
                    )}
                    <div className="cart-item d-flex jusitfy-content-space-between flex-row" onClick={() => navigate('/all')}>
                        <p>{cartItems.length}</p>
                        <ShoppingCartOutlined />
                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default DefaultLayout