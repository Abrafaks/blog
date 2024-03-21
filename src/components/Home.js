import React from "react";
import Feed from "./Feed";
import { useStoreState } from "easy-peasy";

const Home = ({ isLoading, fetchError }) => {
    const searchResults = useStoreState((state) => state.searchResults);
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
