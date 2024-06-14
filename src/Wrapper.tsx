import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Wrapper = () => {
  const queryClient = new QueryClient();

  // const clientId = import.meta.env.VITE_APP_CLIENT_ID;
  const clientId =
    "182721288209-dc3213dufq26ijvindhbhho7qblcskt6.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />

        <AuthProvider>
          <Routes />
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default Wrapper;
