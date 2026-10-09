
import { useState } from "react";

const Profile = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Movie Fan", email: "fan@example.com", role: "Viewer" }
  ]);

  const [form, setForm] = useState({
    name: "", email: "", role: "Viewer"
  });

  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState("");

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setStatus("");
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (form.name.trim().length < 2) {
      setStatus("Name must contain at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("Enter a valid email address.");
      return;
    }

    if (editId !== null) {
      setProfiles(old => old.map(profile =>
        profile.id === editId ? { ...profile, ...form } : profile
      ));
      setStatus("Profile updated successfully.");
    } else {
      setProfiles(old => [
        ...old,
        { ...form, id: Date.now() }
      ]);
      setStatus("Profile added successfully.");
    }

    setForm({ name: "", email: "", role: "Viewer" });
    setEditId(null);
  };

  const editProfile = profile => {
    setForm({
      name: profile.name,
      email: profile.email,
      role: profile.role
    });
    setEditId(profile.id);
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProfile = id => {
    setProfiles(old => old.filter(profile => profile.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ name: "", email: "", role: "Viewer" });
    }
    setStatus("Profile deleted.");
  };

  return (
    <main className="page-container">
      <span className="eyebrow">YOUR ACCOUNT</span>
      <h1>Profile Manager</h1>
      <p className="page-description">
        Manage viewer profiles and demonstrate CRUD operations.
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <h2>{editId !== null ? "Update Profile" : "Create Profile"}</h2>

        <label>Full Name
          <input name="name" value={form.name} onChange={handleChange}
            placeholder="Enter full name" required minLength={2} />
        </label>

        <label>Email Address
          <input type="email" name="email" value={form.email}
            onChange={handleChange} placeholder="Enter email" required />
        </label>

        <label>Role
          <select name="role" value={form.role} onChange={handleChange}>
            <option>Viewer</option>
            <option>Reviewer</option>
            <option>Admin</option>
          </select>
        </label>

        <div className="form-actions">
          <button className="primary-button" type="submit">
            {editId !== null ? "Update Profile" : "Add Profile"}
          </button>

          {editId !== null && (
            <button type="button" className="secondary-button"
              onClick={() => {
                setEditId(null);
                setForm({ name: "", email: "", role: "Viewer" });
                setStatus("");
              }}>
              Cancel
            </button>
          )}
        </div>

        {status && <p className="form-status" role="status">{status}</p>}
      </form>

      <section className="profiles-section">
        <h2>Saved Profiles ({profiles.length})</h2>

        {profiles.length === 0 ? (
          <p className="message">No profiles available. Add one above.</p>
        ) : profiles.map(profile => (
          <article className="profile-row" key={profile.id}>
            <div className="avatar">{profile.name.charAt(0).toUpperCase()}</div>
            <div className="profile-details">
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
              <span className="role-badge">{profile.role}</span>
            </div>
            <div className="profile-actions">
              <button className="secondary-button"
                onClick={() => editProfile(profile)}>Edit</button>
              <button className="danger-button"
                onClick={() => deleteProfile(profile.id)}>Delete</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Profile;
