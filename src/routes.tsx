import { Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Profile from "./pages/profile";
import App from "./App";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/SignUp";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Signup />} />
        <Route path="account" element={<Profile />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  );
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Routes;
