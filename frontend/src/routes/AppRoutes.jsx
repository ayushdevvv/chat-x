import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "@clerk/react";
import LandingPage from "../pages/LandingPage";
import AuthPage from "../pages/AuthPage";
import ChatPage from "../pages/ChatPage";
import PageLoader from "../components/PageLoader";
import { useAuthStore } from "../store/useAuthStore";

function AppRoutes() {
  const { isSignedIn, isLoaded } = useAuth();
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  return (
    <Routes>
      {/* landing page always loads instantly, no auth wait */}
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/auth"
        element={
          !isLoaded ? (
            <PageLoader />
          ) : isSignedIn ? (
            <Navigate to="/chat" replace />
          ) : (
            <AuthPage />
          )
        }
      />

      <Route
        path="/chat"
        element={
          !isLoaded ? (
            <PageLoader />
          ) : !isSignedIn ? (
            <Navigate to="/auth" replace />
          ) : isCheckingAuth ? (
            <PageLoader />
          ) : (
            <ChatPage />
          )
        }
      />
    </Routes>
  );
}

export default AppRoutes;