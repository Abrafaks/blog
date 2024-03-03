import React from "react";
import { Link } from "react-router-dom";

const Missing = ({ name }) => {
    return (
        <main className="missing">
            <h2>{name} Not Found</h2>
            <p>What a pity...</p>
            <p>
                <Link to="/">Visit Our Homepage</Link>
            </p>
        </main>
    );
};

export default Missing;
