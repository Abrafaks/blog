import React from "react";
import { Link, useParams } from "react-router-dom";

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
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                )}

                {!post && (
                    <>
                        <h2>Post not found</h2>
                        <p>What a pity...</p>
                        <p>
                            <Link to="/">Visit Our Homepage</Link>
                        </p>
                    </>
                )}
            </article>
        </main>
    );
};

export default PostPage;
