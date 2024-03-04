import React, { useContext, useState } from "react";
import DataContext from "./context/DataContext";
import { format } from "date-fns";
import api from "./api/posts";

const NewPost = () => {
    const { posts, setPosts, navigate } = useContext(DataContext);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = (
            posts.length ? parseInt(posts[posts.length - 1].id) + 1 : 1
        ).toString();
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const newPost = { id, title: postTitle, datetime, body: postBody };
        try {
            const response = await api.post("/posts", newPost);
            const allPosts = [...posts, response.data];

            setPosts(allPosts);
            setPostTitle("");
            setPostBody("");
            navigate("/");
        } catch (e) {
            console.log(e);
        }
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
