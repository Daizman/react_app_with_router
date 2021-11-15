import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";

export const privateRoutes = [
    {path: '/', compontent: Posts},
    {path: '/posts', compontent: Posts},
    {path: '/posts/:id', compontent: PostIdPage},
    {path: '/about', compontent: About},
    {path: '/error', compontent: Error},
    {path: '*', compontent: Error},
];

export const publicRoutes = [
    {path: 'login', compontent: Login},
    {path: '*', compontent: Login},
];