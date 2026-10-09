
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "", email: "", subject: "", message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setStatus("");
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (form.name.trim().length < 2) {
      setStatus("Please enter a valid name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    if (!form.subject.trim() || form.message.trim().length < 10) {
      setStatus("Enter a subject and a message of at least 10 characters.");
      return;
    }

    setStatus("Thank you! Your feedback has been submitted.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="page-container">
      <span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span>
      <h1>Contact Us</h1>
      <p className="page-description">
        Share feedback, suggestions, or ideas to improve MovieWorld.
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>Full Name
          <input name="name" value={form.name} onChange={handleChange}
            placeholder="Enter your name" required minLength={2} />
        </label>

        <label>Email Address
          <input type="email" name="email" value={form.email}
            onChange={handleChange} placeholder="you@example.com" required />
        </label>

        <label>Subject
          <input name="subject" value={form.subject} onChange={handleChange}
            placeholder="How can we help?" required />
        </label>

        <label>Message
          <textarea name="message" value={form.message}
            onChange={handleChange} placeholder="Write your message..."
            required minLength={10} rows={5} />
        </label>

        <button className="primary-button" type="submit">
          Submit Feedback →
        </button>

        {status && <p className="form-status" role="status">{status}</p>}
      </form>
    </main>
  );
};

export default Contact;
