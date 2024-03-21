import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Missing from "./Missing";
import { useStoreActions, useStoreState } from "easy-peasy";

const PostPage = () => {
    const { id } = useParams();
    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        deletePost(id);
        navigate("/");
    };

    return (
        <main className="post-page">
            <article className="post">
                {post && (
                    <>
                        <h2>{post.title}</h2>
                        <p className="post-date">{post.datetime}</p>
                        <p className="post-body">{post.body}</p>
                        <Link to={`/edit/${post.id}`}>
                            <button className="edit-button">Edit Post</button>
                        </Link>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(post.id)}
                        >
                            Delete Post
                        </button>
                    </>
                )}

                {!post && <Missing name={"Post"} />}
            </article>
        </main>
    );
};

export default PostPage;
