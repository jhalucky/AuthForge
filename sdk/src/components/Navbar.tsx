import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-neutral-800">

      <Link to="/" className="text-xl font-bold">
        AuthForge
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/docs">Docs</Link>

        <Link to="/login">Login</Link>

        <Link to="/signup">
          <button className="bg-white text-black px-4 py-2 rounded">
            Get Started
          </button>
        </Link>

      </div>

    </nav>
  );
}