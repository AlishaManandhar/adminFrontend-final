import NavBar from "./components/NavBar";
import CreateBlog from "./views/CreateBlog";
import EditBlog from "./views/EditBlog";
import Home from "./views/Home";
import AdminBlog from "./views/AdminBlog"
import SingleBlog from "./views/SingleBlog";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./views/Login";
import Category from "./views/Category";
import CreateCategory from "./views/CreateCategory";
import EditCategory from "./views/EditCategory";
import SubCategory from "./views/SubCategory";
import CreateSubCategory from "./views/CreateSubCategory";
import EditSubCategory from "./views/EditSubCategory";
import CreateProduct from "./views/CreateProduct";
import Product from "./views/Products";


function App() {
  return (
    <div className="container-fluid">
      <ToastContainer />
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/blogs" exact element={<AdminBlog />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/category" exact element={<Category />} />
          <Route path="/sub-category/:id" exact element={<SubCategory />} />
          <Route path="/sub-category/create" exact element={<CreateSubCategory />} />
          <Route path="/sub-category/edit/:id" exact element={<EditSubCategory />} />

          <Route path="/category/create" exact element={<CreateCategory />} />

          <Route path="/category/edit/:id" exact element={<EditCategory />} />
          <Route path="/product/create" exact element={<CreateProduct />} />
          <Route path="/product" exact element={<Product />} />

          <Route path="/login" exact element={<Login />} />
          <Route path="/blogs/create-blog" exact element={<CreateBlog />} />
          <Route path="/blogs/:id" exact element={<SingleBlog />} />
          <Route path="/blogs/edit-blog/:id" exact element={<EditBlog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
