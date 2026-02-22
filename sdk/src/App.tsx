import { AuthForge } from "./sdk/authforge";

AuthForge.init({
  publicKey: "pk_xxxxx",
  baseUrl: "http://localhost:4000"
});

import { AuthProvider, useAuth } from "./sdk/AuthProvider";
import LoginCard from "./components/LoginCard";

function Dashboard() {

  const { user } = useAuth();

   if (!user) return null;

  return (
    <div className="text-white">
      Logged in as {user.email}
    </div>
  );
}

function Content() {

  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Dashboard /> : <LoginCard />;
}

export default function App() {

  return (

    <AuthProvider>

      <div className="dark bg-zinc-950 min-h-screen flex items-center justify-center">

        <Content />

      </div>

    </AuthProvider>

  );
}