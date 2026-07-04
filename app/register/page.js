"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('ankit')
  const [email, setEmail]= useState("procodrr@gamail.com")
  const [password, setPassword] = useState("123456");


  const handleRegister = async(e) => {
    e.preventDefault();
     const response = await fetch("/api/register",{
      method: "POST",
      body: JSON.stringify({name, email, password}),
     });
     const data = await response.json();
     console.log(data)
     if(!data.error){
      return router.push("/login");
     } 
    
  };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = async (e) => {
  // e.preventDefault();

  // API call
  // const response = await fetch(...)

//   console.log("Registering:", formData);

//   // Registration successful
//   alert("Registration Successful!");

//   router.push("/login");
// };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-blue-500 mb-8">
          Todo App
        </h1>

        <div className="bg-transparent">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Register
          </h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="ProCodrr"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white outline-none focus:border-blue-500"
              />
            </div>

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
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
            >
              Register
            </button>
            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}