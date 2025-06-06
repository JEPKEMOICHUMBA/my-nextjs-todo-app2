"use client";

import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwtToken
      message
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      const token = data?.login?.jwtToken;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("loggedIn", "true");
        router.push("/"); // Redirect to home or dashboard
      } else {
        // Optionally show message from backend
        alert(data?.login?.message || "Login failed");
      }
    } catch (err) {
      // Optionally handle error
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-200 to-orange-400">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-3 bg-orange-50 text-gray-800 border border-orange-300 rounded-lg"
            required
            disabled={loading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-3 bg-orange-50 text-gray-800 border border-orange-300 rounded-lg"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-600 mt-2 text-sm">Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
}