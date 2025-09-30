import { signUpUser } from "@/api/user";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { SignUpForm } from "@/components/common/SignUpForm";

export default function SignUp() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (credentials: User) => signUpUser(credentials),
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      console.log("Login successful:", data.username);
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

  if (Cookies.get("accessToken") !== undefined) {
    return <Navigate to="/" replace />;
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <input name="username" type="text" required placeholder="Email" />
    //   <input name="password" type="password" required placeholder="Password" />
    //   <button type="submit" disabled={mutation.isPending}>
    //     {mutation.isPending ? "Logging in..." : "Login"}
    //   </button>
    //   {mutation.isError && (
    //     <p style={{ color: "red" }}> {(mutation.error as Error).message}</p>
    //   )}
    // </form>
    <div>
      <SignUpForm onSubmit={(e) => handleSubmit(e)} />
    </div>
  );
}
