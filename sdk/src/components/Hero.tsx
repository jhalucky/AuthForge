import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="text-center py-32">

      <h1 className="text-6xl font-bold mb-6">
        Authentication for developers
      </h1>

      <p className="text-neutral-400 mb-8">
        Open source alternative to Clerk
      </p>

      <Link to="/signup">
        <button className="bg-white text-black px-6 py-3 rounded-lg cursor-pointer hover:bg-zinc-200 transition">
          Start building
        </button>
      </Link>

    </section>
  );
}