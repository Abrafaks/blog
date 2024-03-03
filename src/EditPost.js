import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Missing from "./Missing";

const EditPost = ({
    posts,
    handleEdit,
    editBody,
    setEditBody,
    editTitle,
    setEditTitle,
}) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id === id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    return (
        <main className="new-post">
            {editTitle && (
                <>
                    <h2>Edit Post</h2>
                    <form className="new-post-form" onSubmit={handleEdit}>
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
                        <button type="submit">Update Post</button>
                    </form>
                </>
            )}
            {!editTitle && <Missing name={"Post"} />}
        </main>
    );
};

export default EditPost;
