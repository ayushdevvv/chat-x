import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { useAuthStore } from "./store/useAuthStore";
import { setTokenGetter } from "./lib/axios";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { isSignedIn, isLoaded, getToken } = useAuth();

  const clearAuth = useAuthStore((state) => state.clearAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) checkAuth();
    else clearAuth();
  }, [checkAuth, clearAuth, isLoaded, isSignedIn]);

  return (
    <ThemeProvider>
      <AppRoutes />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;