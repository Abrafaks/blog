import React from "react";

const today = new Date();

const Footer = () => {
    return (
        <footer className="footer">
            <p>Copyright &copy; {today.getFullYear()}</p>
        </footer>
    );
};

export default Footer;
