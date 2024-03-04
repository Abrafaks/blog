import React, { useContext } from "react";
import Feed from "./Feed";
import DataContext from "./context/DataContext";

const Home = () => {
    const { searchResults, fetchError, isLoading } = useContext(DataContext);

    return (
        <main className="home">
            {isLoading && <p className="status-msg">Loading posts...</p>}
            {fetchError && (
                <p className="status-msg" style={{ color: "red" }}>
                    {fetchError}
                </p>
            )}

            {!isLoading &&
                !fetchError &&
                (searchResults.length ? (
                    <Feed posts={searchResults} />
                ) : (
                    <p className="status-msg">No posts to display.</p>
                ))}
        </main>
    );
};

export default Home;
