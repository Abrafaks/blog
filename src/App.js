import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import Layout from "./components/Layout";
import EditPost from "./components/EditPost";
import { useEffect } from "react";
import { useAxiosFetch } from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";

function App() {
    const setPosts = useStoreActions((actions) => actions.setPosts);
    const { data, fetchError, isLoading } = useAxiosFetch(
        "http://localhost:3500/posts"
    );

    useEffect(() => {
        setPosts(data);
    }, [data, setPosts]);

    return (
        <Routes>
            <Route path="/" element={<Layout title="React Blog" />}>
                <Route
                    index
                    element={
                        <Home isLoading={isLoading} fetchError={fetchError} />
                    }
                />
                <Route path="post">
                    <Route index element={<NewPost />} />
                    <Route path=":id" element={<PostPage />} />
                </Route>
                <Route path="edit">
                    <Route path=":id" element={<EditPost />} />
                </Route>
                <Route path="about" element={<About />} />
                <Route path="*" element={<Missing name={"Page"} />} />
            </Route>
        </Routes>
    );
}

export default App;
