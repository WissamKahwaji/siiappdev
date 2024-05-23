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
import CoursesMainPage from "./pages/courses/CoursesMainPage";
import CoursesPage from "./pages/courses/CoursesPage";
import CoursePreviewPage from "./pages/courses/CoursePreviewPage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import SiiCardInfo from "./pages/profile/SiiCardInfo";
import GetSiiCard from "./pages/profile/GetSiiCard";
import Home from "./pages/home";
const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path=":userName" element={<Profile />} />
        <Route path="sii-card" element={<SiiCardInfo />} />
        <Route path="get-sii-card/:userName" element={<GetSiiCard />} />
        <Route path=":userName/:postId" element={<Profile />} />
        <Route path="account/edit-profile" element={<EditProfilePage />} />
        <Route path="register" element={<Signup />} />
        <Route path="courses" element={<CoursesMainPage />} />
        <Route path="courses/category" element={<CoursesPage />} />
        <Route path="courses/course-preview" element={<CoursePreviewPage />} />
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
