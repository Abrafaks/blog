import React from "react";
import { Link, useParams } from "react-router-dom";
import Missing from "./Missing";

const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);
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
