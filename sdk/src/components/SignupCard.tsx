import { useState } from "react";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignupCard() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      const res = await fetch("http://localhost:4000/developer/signup", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),

      });

      const data = await res.json();

      console.log(data);

      navigate("/");

    } catch (error) {

      console.error(error);

    }

  };


  return (

    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 w-[380px] shadow-xl">

      <h1 className="text-2xl font-bold text-white mb-1">
        Create account
      </h1>

      <p className="text-zinc-400 mb-5 text-sm">
        Sign up to AuthForge
      </p>


      {/* Google */}

      <button
         onClick={() => {
          window.location.href = "http://localhost:4000/auth/google";
        }}
        className="w-full mb-3 flex items-center justify-center gap-3 bg-white text-black py-2 rounded-md hover:bg-zinc-200 cursor-pointer"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
        />

        Continue with Google
      </button>


      {/* GitHub */}

      <button
        onClick={() => {
          window.location.href = "http://localhost:4000/auth/github";
        }}
        className="w-full mb-4 flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-700 text-white py-2 rounded-md hover:bg-zinc-800 cursor-pointer"
      >
        <Github size={18} />

        Continue with GitHub
      </button>


      {/* Divider */}

      <div className="flex items-center gap-2 mb-4">

        <div className="flex-1 h-px bg-zinc-800"></div>

        <span className="text-zinc-500 text-sm">
          or
        </span>

        <div className="flex-1 h-px bg-zinc-800"></div>

      </div>


      {/* Email */}

      <input
        className="w-full p-2 mb-3 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


      <input
        type="password"
        className="w-full p-2 mb-4 bg-zinc-900 border border-zinc-800 rounded-md text-white"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />


      <button
        onClick={handleSignup}
        className="w-full bg-white text-black py-2 rounded-md hover:bg-zinc-200 transition cursor-pointer"
      >
        Create account
      </button>


      <p className="text-zinc-500 text-sm mt-4 text-center">

        Already have an account?

        <span
          onClick={() => navigate("/login")}
          className="text-white cursor-pointer ml-1 hover:underline cursor-pointer"
        >
          Sign in
        </span>

      </p>

    </div>

  );
}