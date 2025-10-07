"use client";

import{useRouter} from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const handleSignupClick = ()=>{
        router.push("/signup");
    }
    const handleSigninClick = ()=>{
        router.push("/signin");
    }

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold text-blue-700">CodeMentor</h1>
      <div className="flex gap-4">
          <button
              onClick={handleSigninClick}
              className="bg-blue-800 text-white px-4 py-2 rounded">Login</button>
        <button
            onClick={handleSignupClick}
            className="bg-blue-200 text-black px-4 py-2 rounded">Sign Up</button>
      </div>
    </header>
  );
}