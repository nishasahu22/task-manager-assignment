import { useState } from "react";
import EmailModal from "../components/EmailModal.jsx";

export default function Home() {
  const [open, setOpen] = useState(false);

  // abhi sample event, baad me API se aayega
  const event = {
    title: "Sample Event",
    originalUrl: "https://www.eventbrite.com/",
  };

  const handleGetTickets = () => setOpen(true);

  const handleSubmit = ({ email, consent }) => {
    // abhi frontend me console me dikhayenge, baad me backend API call karenge
    console.log("Saved lead:", { email, consent, eventTitle: event.title });

    // requirement: save in DB (we will do via backend next)
    // then redirect to original event URL
    window.location.href = event.originalUrl;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Sydney Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold text-lg">{event.title}</h2>
          <p className="text-sm text-gray-600">
            This is sample event description.
          </p>
          <button
            onClick={handleGetTickets}
            className="mt-3 bg-black text-white px-4 py-2 rounded"
          >
            GET TICKETS
          </button>
        </div>
      </div>

      <EmailModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        eventTitle={event.title}
      />
    </div>
  );
}
