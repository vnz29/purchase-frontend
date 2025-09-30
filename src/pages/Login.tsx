import { loginUser } from "@/api/user";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LoginForm } from "@/components/common/LoginForm";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  if (Cookies.get("accessToken") !== undefined) {
    return <Navigate to="/" replace />;
  }
  const mutation = useMutation({
    mutationFn: (credentials: User) => loginUser(credentials),
    onSuccess: () => {
      toast.success("Logged in successfully!");
      // Redirect or update auth context here
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("napasok");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    mutation.mutate({ username, password });
  };

  return (
    <div>
      <LoginForm onSubmit={(e) => handleSubmit(e)} />
    </div>
  );
}
