import React from "react";

const NewPost = ({
    handleSubmit,
    postTitle,
    setPostTitle,
    postBody,
    setPostBody,
}) => {
    return (
        <main className="new-post">
            <h2>New Post</h2>
            <form className="new-post-form" onSubmit={handleSubmit}>
                <label htmlFor="post-title">Title:</label>
                <input
                    type="text"
                    id="post-title"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />

                <label htmlFor="post-body">Post:</label>
                <textarea
                    id="post-body"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Create Post</button>
            </form>
        </main>
    );
};

export default NewPost;
