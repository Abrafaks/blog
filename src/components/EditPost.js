import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Missing from "./Missing";
import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";

const EditPost = () => {
    const { id } = useParams();
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    const handleEdit = (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        editPost(updatedPost);
        navigate(`/post/${id}`);
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
                            type="button"
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
