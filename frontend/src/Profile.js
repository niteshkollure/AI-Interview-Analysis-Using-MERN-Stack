import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [form, setForm] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      name: user.name || '',
      lastname: user.lastname || '',
      email: user.email || '',
      phone: user.phone || ''
    };
  });

  // Clear success message after 3 seconds
  useEffect(() => {
    if (updated) {
      const timer = setTimeout(() => setUpdated(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [updated]);

  const handleChange = (e) => {
    if (edit) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(form));
    setEdit(false);
    setUpdated(true);
    // Auto-clear after 3 seconds
    setTimeout(() => setUpdated(false), 3000);
  };

  const handleCancel = () => {
    setEdit(false);
    setUpdated(false);
    // Reset form to saved data
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setForm({
      name: user.name || '',
      lastname: user.lastname || '',
      email: user.email || '',
      phone: user.phone || ''
    });
  };

  const handleEditClick = () => {
    setEdit(true);
    setUpdated(false);
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      
      {updated && !edit && (
        <div className="update-success">
          ✓ Profile Updated Successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="profile-form">
        <div className="form-group">
          <label>First Name</label>
          <input 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            disabled={!edit}
            className={edit ? 'editable' : 'read-only'}
            placeholder="Enter your first name"
            required 
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input 
            name="lastname" 
            value={form.lastname} 
            onChange={handleChange} 
            disabled={!edit}
            className={edit ? 'editable' : 'read-only'}
            placeholder="Enter your last name"
            required 
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            name="email" 
            type="email"
            value={form.email} 
            onChange={handleChange} 
            disabled={!edit}
            className={edit ? 'editable' : 'read-only'}
            placeholder="Enter your email"
            required 
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input 
            name="phone" 
            type="tel"
            value={form.phone} 
            onChange={handleChange} 
            disabled={!edit}
            className={edit ? 'editable' : 'read-only'}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="button-group">
          {edit ? (
            <>
              <button type="submit" className="btn-save">✓ Confirm</button>
              <button type="button" onClick={handleCancel} className="btn-cancel">✕ Cancel</button>
            </>
          ) : (
            <button type="button" onClick={handleEditClick} className="btn-edit">✎ Edit</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
