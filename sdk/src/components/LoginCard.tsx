import { useState } from "react";
import { AuthForge } from "../sdk/authforge";
import { useAuth } from "../sdk/AuthProvider";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginCard() {

  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    await AuthForge.login(email, password);

    await refreshUser();

  };

  return (
    <Card className="w-[400px] bg-zinc-900 border-zinc-800 text-white">

      <CardHeader>
        <CardTitle>Sign in to AuthForge</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <Label className="mb-1">Email</Label>
          <Input
            className="bg-zinc-800 border-zinc-700 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label className="mb-1">Password</Label>
          <Input
            type="password"
            className="bg-zinc-800 border-zinc-700 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          className="w-full bg-white text-black hover:bg-gray-200"
          onClick={login}
        >
          Sign In
        </Button>

      </CardContent>

    </Card>
  );
}