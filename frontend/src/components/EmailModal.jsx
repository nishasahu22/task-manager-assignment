import { useState } from "react";

export default function EmailModal({ open, onClose, onSubmit, eventTitle }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    setError("");
    if (!email.includes("@")) return setError("Please enter a valid email");
    if (!consent) return setError("Please tick consent checkbox");
    onSubmit({ email, consent });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Get Tickets</h2>
            <p className="text-sm text-gray-600 mt-1">
              {eventTitle || "Event"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-1"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            I agree to receive updates and emails for this event.
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Continue to Tickets
          </button>

          <button
            onClick={onClose}
            className="w-full border py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
