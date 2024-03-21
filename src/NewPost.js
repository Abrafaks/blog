import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

const NewPost = () => {
    const posts = useStoreState((state) => state.posts);
    const postTitle = useStoreState((state) => state.postTitle);
    const postBody = useStoreState((state) => state.postBody);
    const savePost = useStoreActions((actions) => actions.savePost);
    const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
    const setPostBody = useStoreActions((actions) => actions.setPostBody);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = (
            posts.length ? parseInt(posts[posts.length - 1].id) + 1 : 1
        ).toString();
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const newPost = { id, title: postTitle, datetime, body: postBody };
        savePost(newPost);
        navigate("/");
    };

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
