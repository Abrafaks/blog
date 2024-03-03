import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Layout from "./Layout";
import { format } from "date-fns";
import api from "./api/posts";

function App() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get("/posts");
                setPosts(response.data);
            } catch (e) {}
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const filteredResults = posts.filter((post) => {
            return (
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
            );
        });

        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

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
        } catch (e) {}
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postList = posts.filter((post) => post.id !== id);
            setPosts(postList);
            navigate("/");
        } catch (e) {}
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout
                        title="React Blog"
                        search={search}
                        setSearch={setSearch}
                    />
                }
            >
                <Route index element={<Home posts={searchResults} />} />
                <Route path="post">
                    <Route
                        index
                        element={
                            <NewPost
                                handleSubmit={handleSubmit}
                                postTitle={postTitle}
                                setPostTitle={setPostTitle}
                                postBody={postBody}
                                setPostBody={setPostBody}
                            />
                        }
                    />
                    <Route
                        path=":id"
                        element={
                            <PostPage
                                posts={posts}
                                handleDelete={handleDelete}
                            />
                        }
                    />
                </Route>
                <Route path="about" element={<About />} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
