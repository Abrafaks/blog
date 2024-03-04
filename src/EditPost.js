import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Missing from "./Missing";
import DataContext from "./context/DataContext";
import { format } from "date-fns";
import api from "./api/posts";

const EditPost = () => {
    const { posts, setPosts, navigate } = useContext(DataContext);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const { id } = useParams();
    const post = posts.find((post) => post.id === id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    const handleEdit = async (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);

            setPosts(
                posts.map((post) =>
                    post.id === id ? { ...response.data } : post
                )
            );
            setEditBody("");
            setEditTitle("");
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <main className="new-post">
            {editTitle && (
                <>
                    <h2>Edit Post</h2>
                    <form
                        className="new-post-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor="post-title">Title:</label>
                        <input
                            type="text"
                            id="post-title"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />

                        <label htmlFor="post-body">Post:</label>
                        <textarea
                            id="post-body"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={() => handleEdit(post.id)}
                        >
                            Update Post
                        </button>
                    </form>
                </>
            )}
            {!editTitle && <Missing name={"Post"} />}
        </main>
    );
};

export default EditPost;
