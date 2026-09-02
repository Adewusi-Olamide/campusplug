"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  School,
  BookOpen,
  GraduationCap,
  Pencil,
  Save,
  Lock,
  LogOut,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import supabase from "@/lib/supabase";
import "./page.css";

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    school: "",
    department: "",
    level: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/signin");
        return;
      }

      setUser(user);

      const metadata = user.user_metadata || {};

      setFormData({
        fullName:
          metadata.full_name ||
          metadata.name ||
          metadata.username ||
          "",
        school: metadata.school || "",
        department: metadata.department || "",
        level: metadata.level || "",
      });

      setLoading(false);
    };

    getProfile();
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: formData.fullName,
        school: formData.school,
        department: formData.department,
        level: formData.level,
      },
    });

    if (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } else {
      setMessage({
        type: "success",
        text: "Profile updated successfully.",
      });

      setEditing(false);

      const {
        data: { user: updatedUser },
      } = await supabase.auth.getUser();

      setUser(updatedUser);
    }

    setSaving(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    await supabase.auth.signOut();

    router.push("/signin");
    router.refresh();
  };

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </main>
    );
  }

  const displayName =
    formData.fullName ||
    user?.user_metadata?.username ||
    "Student";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <main className="profile-page">
      <div className="profile-container">

        {/* Header */}
        <div className="profile-heading">
          <div>
            <span className="profile-label">ACCOUNT</span>
            <h1>My Profile</h1>
            <p>Manage your CampusPlug account and personal information.</p>
          </div>
        </div>

        {/* Profile Card */}
        <section className="profile-card">

          <div className="profile-top">
            <div className="avatar">
              {initial}
            </div>

            <div className="profile-identity">
              <h2>{displayName}</h2>
              <p>{user?.email}</p>
            </div>

            {!editing && (
              <button
                className="edit-btn"
                onClick={() => {
                  setEditing(true);
                  setMessage({ type: "", text: "" });
                }}
              >
                <Pencil size={17} />
                Edit Profile
              </button>
            )}
          </div>

          <div className="divider"></div>

          {/* Message */}
          {message.text && (
            <div className={`profile-message ${message.type}`}>
              {message.type === "success" ? (
                <CheckCircle size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Information */}
          <div className="profile-grid">

            <div className="profile-field">
              <label>Full Name</label>

              {editing ? (
                <div className="input-wrapper">
                  <User size={18} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
              ) : (
                <div className="field-value">
                  <User size={18} />
                  <span>{formData.fullName || "Not provided"}</span>
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Email Address</label>

              <div className="field-value disabled-field">
                <Mail size={18} />
                <span>{user?.email}</span>
              </div>
            </div>

            <div className="profile-field">
              <label>School / Institution</label>

              {editing ? (
                <div className="input-wrapper">
                  <School size={18} />
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    placeholder="Enter your school"
                  />
                </div>
              ) : (
                <div className="field-value">
                  <School size={18} />
                  <span>{formData.school || "Not provided"}</span>
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Department</label>

              {editing ? (
                <div className="input-wrapper">
                  <BookOpen size={18} />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter your department"
                  />
                </div>
              ) : (
                <div className="field-value">
                  <BookOpen size={18} />
                  <span>{formData.department || "Not provided"}</span>
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Level</label>

              {editing ? (
                <div className="input-wrapper">
                  <GraduationCap size={18} />

                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                  >
                    <option value="">Select level</option>
                    <option value="100 Level">100 Level</option>
                    <option value="200 Level">200 Level</option>
                    <option value="300 Level">300 Level</option>
                    <option value="400 Level">400 Level</option>
                    <option value="500 Level">500 Level</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              ) : (
                <div className="field-value">
                  <GraduationCap size={18} />
                  <span>{formData.level || "Not provided"}</span>
                </div>
              )}
            </div>

          </div>

          {/* Save / Cancel */}
          {editing && (
            <div className="edit-actions">
              <button
                className="cancel-btn"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <div className="button-spinner"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        {/* Account Actions */}
        <section className="account-card">
          <div className="account-info">
            <div className="account-icon">
              <Lock size={21} />
            </div>

            <div>
              <h3>Account Security</h3>
              <p>
                Keep your account secure by managing your password.
              </p>
            </div>
          </div>

          <button
            className="password-btn"
            onClick={() => router.push("/forgot-password")}
          >
            Change Password
          </button>
        </section>

        {/* Logout */}
        <section className="logout-card">
          <div>
            <h3>Sign out</h3>
            <p>Sign out of your CampusPlug account on this device.</p>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <LogOut size={18} />
            {loggingOut ? "Signing out..." : "Logout"}
          </button>
        </section>

      </div>
    </main>
  );
};

export default Page;
