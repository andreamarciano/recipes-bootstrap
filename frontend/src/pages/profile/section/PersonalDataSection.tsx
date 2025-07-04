import { useUser } from "../../../userContext/useUser";
import { ClipboardList, Mail } from "lucide-react";

import { API_PATHS } from "../../../constants/api";

interface PersonalDataProps {
  newEmail: string;
  setNewEmail: (email: string) => void;
  emailMessage: string;
  setEmailMessage: (msg: string) => void;
}

export default function PersonalDataSection({
  newEmail,
  setNewEmail,
  emailMessage,
  setEmailMessage,
}: PersonalDataProps) {
  const { user, setUser } = useUser();
  if (!user) return null;

  // Change Email
  const handleEmailChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_PATHS.UPDATE_EMAIL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      setUser({ ...user, email: data.email });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, email: data.email })
      );
      setEmailMessage("Email updated successfully");
    } catch (err) {
      setEmailMessage(`${err}`);
    }
  };

  return (
    <section
      className="bg-secondary rounded-4 p-4 shadow mx-auto mt-5"
      style={{ maxWidth: "768px" }}
    >
      <h2 className="fs-3 fw-bold mb-4 d-flex align-items-center gap-2">
        <ClipboardList size={24} /> Personal Data
      </h2>

      {/* User Info */}
      <div className="row mb-4">
        <div className="col">
          <p className="d-flex align-items-center gap-2">
            <Mail size={20} className="text-primary" />
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>

      {/* Email Update Form */}
      <div className="bg-dark p-3 rounded-3 mb-4">
        <h3 className="fs-5 fw-semibold mb-3">📨 Update Email</h3>
        <div className="mb-3">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email"
            className="form-control"
          />
          <button onClick={handleEmailChange} className="btn btn-primary mt-2">
            Update Email
          </button>
          {emailMessage && (
            <p
              className={`mt-2 small ${
                emailMessage.includes("✅") ? "text-success" : "text-danger"
              }`}
            >
              {emailMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
