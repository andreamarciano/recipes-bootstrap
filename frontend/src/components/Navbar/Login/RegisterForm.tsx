import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "../../../userContext/useUser";

interface Props {
  onSwitch: () => void;
}

export default function RegisterForm({ onSwitch }: Props) {
  const { setUser } = useUser();

  // User Data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    // Username
    if (username.length < 3 || username.length > 15) {
      alert("Username must be between 3 and 15 characters");
      return false;
    }

    // Password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters and contain uppercase, lowercase, and a number, and a special character (!@#$%^&*)"
      );
      return false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch(`http://localhost:4000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        alert(data.error || "Registration failed");
        return;
      }

      // Save User
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      // Clear Form
      setUsername("");
      setPassword("");
      setEmail("");
    } catch (err) {
      console.error("Register error", err);
      alert("Registration error");
    }
  };

  return (
    <>
      <h5>Create your account</h5>

      {/* Switch Menu */}
      <p className="text-muted mb-3">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          type="button"
          className="btn btn-link p-0 align-baseline"
        >
          Sign In
        </button>
      </p>

      {/* Email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="form-control"
          value={email}
          maxLength={64}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

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
          maxLength={15}
          onChange={(e) => setUsername(e.target.value)}
          aria-describedby="usernameHelp"
          required
        />
        <div id="usernameHelp" className="form-text">
          Username must be between 3 and 15 characters.
        </div>
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
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="passwordHelp"
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
        <div id="passwordHelp" className="form-text">
          Password must be at least 8 characters, with uppercase, lowercase,
          number, special (!@#$%^&*).
        </div>
      </div>

      {/* Register */}
      <button
        onClick={handleRegister}
        type="submit"
        className="btn btn-primary w-100"
      >
        Create account
      </button>
    </>
  );
}
