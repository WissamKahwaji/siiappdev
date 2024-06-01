import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes as BrowserRouterRoutes,
  Route,
  Navigate,
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
import ProtectedRoute from "./components/const/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import AboutUsPage from "./components/pages/profile/AboutUsPage";
import UsersByCategoriesPage from "./pages/profile/UsersByCategoriesPage";
import UserFollowingsPage from "./pages/profile/UserFollowingsPage";
// Import your authentication-related utilities

const Routes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouterRoutes>
          {/* Redirect to home page if authenticated */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
          />

          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path=":userName" element={<Profile />} />

            <Route path=":userName/:postId" element={<Profile />} />
            <Route path=":userName/about" element={<AboutUsPage />} />
            <Route
              path="users/:userCategory"
              element={<UsersByCategoriesPage />}
            />

            <Route element={<ProtectedRoute />}>
              <Route path="sii-card" element={<SiiCardInfo />} />
              <Route path="get-sii-card/:userName" element={<GetSiiCard />} />

              <Route
                path="account/edit-profile"
                element={<EditProfilePage />}
              />
              <Route
                path="account/followings"
                element={<UserFollowingsPage type="followings" />}
              />
              <Route
                path="account/followers"
                element={<UserFollowingsPage type="followers" />}
              />
              <Route path="courses" element={<CoursesMainPage />} />
              <Route path="courses/category" element={<CoursesPage />} />
              <Route
                path="courses/course-preview"
                element={<CoursePreviewPage />}
              />
              {/* Add more routes here */}
            </Route>
          </Route>
        </BrowserRouterRoutes>
      </Suspense>
    </Router>
  );
};

export default Routes;
