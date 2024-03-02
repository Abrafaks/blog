import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
    return (
        <main className="missing">
            <h2>Page Not Found</h2>
            <p>What a pity...</p>
            <p>
                <Link to="/">Visit Our Homepage</Link>
            </p>
        </main>
    );
};

export default Missing;
