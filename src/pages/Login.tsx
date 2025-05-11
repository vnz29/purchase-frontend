import { loginUser } from "@/api/user";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  console.log("protectedRoutes");
  const mutation = useMutation({
    mutationFn: (credentials: User) => loginUser(credentials),
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      console.log("Login successful:", data.username);
      // Redirect or update auth context here
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    mutation.mutate({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" required placeholder="Email" />
      <input name="password" type="password" required placeholder="Password" />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Logging in..." : "Login"}
      </button>
      {mutation.isError && (
        <p style={{ color: "red" }}> {(mutation.error as Error).message}</p>
      )}
    </form>
  );
}
