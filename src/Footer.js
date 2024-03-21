import { useStoreState } from "easy-peasy";
import React from "react";

const Footer = () => {
    const postCount = useStoreState((state) => state.postCount);
    return (
        <footer className="footer">
            <p>
                {postCount} Blog Post{postCount !== 1 ? "s" : ""}
            </p>
        </footer>
    );
};

export default Footer;
