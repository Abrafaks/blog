import React from "react";
import Feed from "./Feed";

const Home = ({ posts, fetchError, isLoading }) => {
    console.log(fetchError, isLoading);
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
                (posts.length ? (
                    <Feed posts={posts} />
                ) : (
                    <p className="status-msg">No posts to display.</p>
                ))}
        </main>
    );
};

export default Home;
