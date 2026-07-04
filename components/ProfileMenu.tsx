'use client'

import { useState } from "react";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileMenu() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const user = {
    name: "Ankit Meena",
    email: "ankit@gmail.com",
  };

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full border p-2 hover:bg-gray-700"
      >
        <User size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-lg border bg-gray-800 shadow-lg">
          <div className="border-b p-4">
            <p className="font-semibold text-white">
              {user.name}
            </p>

            <p className="text-sm text-gray-400">
              {user.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-2 px-4 py-3 text-red-400 hover:bg-gray-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}