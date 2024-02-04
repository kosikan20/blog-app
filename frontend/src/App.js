import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BlogList from "./components/pages/BlogList";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import UpdatePost from "./components/pages/UpdatePost";
import AddPost from "./components/pages/AddPost";
import Post from "./components/pages/Post";
import NavBar from "./components/NavBar";
import MyPosts from "./components/pages/MyPosts";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<BlogList />}></Route>
        <Route path="/posts/:id" element={<Post />}></Route>
        <Route path="/add-post" element={<AddPost />}></Route>
        <Route path="/update-post/:id" element={<UpdatePost />}></Route>
        <Route path="/myposts/" element={<MyPosts />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
