import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";
type SignUpFormType = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};
export function SignUpForm({ className, onSubmit }: SignUpFormType) {
  if (Cookies.get("accessToken") !== undefined) {
    return <Navigate to="/" replace />;
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen bg-gray-100 px-4", // center everything
        className
      )}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Create an acccount</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="username"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
