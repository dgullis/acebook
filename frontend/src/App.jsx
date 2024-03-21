import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { UserPage } from "./pages/User/UserPage"

// docs: https://reactrouter.com/en/main/start/overview
// defines routes for the application
// each route object contains a path and a react element to render when the path is met
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/posts",
    element: <FeedPage />,
  },
  {
    path: "/users/:username",
    element: <UserPage />
  }
]);

// RouterProvider component ensures routing configuration provided by router is accessible to all components within the app.
const App = () => {
    return (
      <RouterProvider router={router} />
    );
};

export default App;
