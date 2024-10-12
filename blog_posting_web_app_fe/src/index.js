import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import { SnackbarProvider } from 'notistack';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthContext } from './utils/AuthContex';
import CreatePost from './Pages/CreatePost/CreateBlog';
import MyBlogs from './Pages/MyBlogs/MyBlogs';
import CreateBlog from './Pages/CreatePost/CreateBlog';
// import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path:"/create",
        element: <ProtectedRoute><CreateBlog /></ProtectedRoute>
      },
      {
        path:"/myblogs",
        element: <ProtectedRoute><MyBlogs /></ProtectedRoute>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        preventDuplicate
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
