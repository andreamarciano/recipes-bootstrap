import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "../../../userContext/useUser";

interface Props {
  onSwitch: () => void;
}

export default function LoginForm({ onSwitch }: Props) {
  const { setUser } = useUser();

  // User Data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        alert(data.error || "Login failed");
        return;
      }

      // Save User
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (err) {
      console.error("Login error", err);
      alert("Login error");
    }
  };

  return (
    <>
      <h5>Sign in</h5>
      <p className="text-muted mb-2">Get access to more features</p>

      {/* Switch Menu */}
      <p className="text-muted mb-3">
        Don't have an account?{" "}
        <button
          onClick={onSwitch}
          type="button"
          className="btn btn-link p-0 align-baseline"
        >
          Register
        </button>
      </p>

      {/* Username */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="mb-3 position-relative">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          aria-pressed={showPassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((prev) => !prev)}
          className="btn btn-sm text-secondary me-2"
          style={{
            top: "34.5px",
            right: "0px",
            position: "absolute",
          }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Login */}
      <button
        onClick={handleLogin}
        type="submit"
        className="btn btn-primary w-100"
      >
        Sign In
      </button>
    </>
  );
}
