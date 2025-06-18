import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from 'sonner';
const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId="612895319536-5l11nlkn5199hoie89a120acab7cg0d5.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
