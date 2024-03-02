import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ title, search, setSearch }) => {
    return (
        <div className="App">
            <Header title={title} />
            <Nav search={search} setSearch={setSearch} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
