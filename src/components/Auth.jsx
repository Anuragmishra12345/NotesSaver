import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Auth = () => {
  const [mode, setMode] = useState("login"); // "login" | "register" | "changePin"
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [oldPin, setOldPin] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedPin = localStorage.getItem("userPin");
    if (pin === storedPin) {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successful!");
      navigate("/home");
    } else {
      toast.error("Invalid PIN!");
    }
  };

  const handleRegister = () => {
    if (pin.length < 4) {
      toast.error("PIN must be at least 4 digits!");
      return;
    }
    if (pin !== confirmPin) {
      toast.error("PINs do not match!");
      return;
    }
    localStorage.setItem("userPin", pin);
    toast.success("Registration successful! Please login.");
    setMode("login");
  };

  const handleChangePin = () => {
    const storedPin = localStorage.getItem("userPin");
    if (oldPin !== storedPin) {
      toast.error("Old PIN is incorrect!");
      return;
    }
    if (pin.length < 4) {
      toast.error("New PIN must be at least 4 digits!");
      return;
    }
    if (pin !== confirmPin) {
      toast.error("New PIN and Confirm PIN do not match!");
      return;
    }
    localStorage.setItem("userPin", pin);
    toast.success("PIN changed successfully! Please login again.");
    setMode("login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          {mode === "login" && "Login"}
          {mode === "register" && "Register"}
          {mode === "changePin" && "Change PIN"}
        </h2>

        {/* Login Form */}
        {mode === "login" && (
          <>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-center mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter PIN"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </>
        )}

        {/* Register Form */}
        {mode === "register" && (
          <>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-center mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter PIN"
            />
            <input
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-center mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm PIN"
            />
            <button
              onClick={handleRegister}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Register
            </button>
          </>
        )}

        {/* Change PIN Form */}
        {mode === "changePin" && (
          <>
            <input
              type="password"
              value={oldPin}
              onChange={(e) => setOldPin(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-center mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Old PIN"
            />
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-center mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter New PIN"
            />
            <input
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-center mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm New PIN"
            />
            <button
              onClick={handleChangePin}
              className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
            >
              Update PIN
            </button>
          </>
        )}

        {/* Switch Mode Links */}
        <div className="mt-4 text-sm text-gray-600">
          {mode !== "login" && (
            <button
              onClick={() => setMode("login")}
              className="text-blue-500 hover:underline mr-2"
            >
              Login
            </button>
          )}
          {mode !== "register" && (
            <button
              onClick={() => setMode("register")}
              className="text-green-500 hover:underline mr-2"
            >
              Register
            </button>
          )}
          {mode !== "changePin" && (
            <button
              onClick={() => setMode("changePin")}
              className="text-purple-500 hover:underline"
            >
              Change PIN
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
