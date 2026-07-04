"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [email, setEmail]= useState("procodrr@gamail.com")
    const [password, setPassword] = useState("123456");

  const handleLogin = async(e) => {
    e.preventDefault();
     const response = await fetch("/api/login",{
      method: "POST",
      body: JSON.stringify({ email, password}),
     });
     const data = await response.json();
     console.log(data)
     if(response.status === 401){
      return router.push("/login");
     }
     if(!data.error){
      return router.push("/");
     } 

    // console.log("Logging in:", {email, password});
    // router.push("/")
    
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("Logging in:", {email, password});

//     // API Call Example
//     // fetch("/api/login", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(formData),
//     // });
//   };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-blue-500 mb-8">
          Todo App
        </h1>

        <h2 className="text-2xl font-semibold text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="procodrr@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Register
              </Link>
            </p>
        </form>
      </div>
    </div>
  );
}