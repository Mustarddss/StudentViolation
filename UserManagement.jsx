import React, { useState } from 'react';

const UserManagement = ({ 
  filtered = [], 
  userOpen = false, 
  setUserOpen = () => {}, 
  startUserView = () => {}, 
  userOpenView = false, 
  selectedUser = null, 
  userDraft = null, 
  userIsEditing = false, 
  updateUserDraft = () => {}, 
  saveUserChanges = () => {}, 
  setUserIsEditing = () => {}, 
  setUserOpenView = () => {}, 
  onDeactivateUser = () => {}, 
  saveUser = () => {}, 
  userForm = {}, 
  updateUserForm = () => {}, 
  clearUserForm = () => {} 
}) => {
  const [showDeactFx, setShowDeactFx] = useState(false);
  const [addError, setAddError] = useState('');

  const handleAddUser = async () => {
    if (!userForm.employeeId || !userForm.userId || !userForm.password || !userForm.lastName || !userForm.firstName) {
      setAddError('All fields marked with * are required.');
      return;
    }

    if (userForm.password !== userForm.confirmPassword) {
      setAddError('Passwords do not match.');
      return;
    }

    const userData = {
      user_id: userForm.userId,
      password: userForm.password,
      last_name: userForm.lastName,
      first_name: userForm.firstName,
      middle_name: userForm.middleName || '',
      emp_id: userForm.employeeId
    };

    try {
      const response = await fetch('http://localhost/studentviolation_backend/add_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const text = await response.text(); // Get raw response
      let result;
      try {
        result = JSON.parse(text); // Attempt to parse JSON
      } catch (jsonError) {
        console.error('Invalid JSON response:', text);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        setAddError(`Error: ${result.message || 'Server error'}`);
        return;
      }

      if (result.success) {
        setAddError('');
        if (saveUser()) {
          setUserOpen(false);
          clearUserForm();
        }
      } else {
        setAddError(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error in saveToDatabase:', error);
      setAddError(`An error occurred while saving to the database: ${error.message}`);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <h3>USER MANAGEMENT</h3>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>USER ID</th>
            <th>LAST NAME</th>
            <th>FIRST NAME</th>
            <th>MIDDLE NAME</th>
            <th>EMPLOYEE ID</th>
            <th>PASSWORD</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(!filtered || filtered.length === 0) ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', color: '#6b7280', padding: '12px 0' }}>No records found</td>
            </tr>
          ) : (
            filtered.map(u => (
              <tr key={u.userId}>
                <td>{u.userId}</td>
                <td>{u.lastName}</td>
                <td>{u.firstName}</td>
                <td>{u.middleName}</td>
                <td>{u.employeeId}</td>
                <td>••••••••</td>
                <td><button className="btn small dark" onClick={() => startUserView(u)}>View</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add user modal */}
      {userOpen && (
        <div className="modal-overlay" onClick={() => setUserOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>ADD NEW USER</h3>
            </div>
            <div className="modal-body">
              <div className="grid-two">
                <label className="field">
                  <span>Employee ID <b>*</b></span>
                  <input value={userForm.employeeId} onChange={updateUserForm('employeeId')} placeholder="2023-12345" />
                </label>
                <label className="field">
                  <span>User ID <b>*</b></span>
                  <input value={userForm.userId} onChange={updateUserForm('userId')} placeholder="username" />
                </label>
                <label className="field">
                  <span>Last Name:</span>
                  <input value={userForm.lastName} onChange={updateUserForm('lastName')} />
                </label>
                <label className="field">
                  <span>Password <b>*</b></span>
                  <input type="password" value={userForm.password} onChange={updateUserForm('password')} />
                </label>
                <label className="field">
                  <span>First Name:</span>
                  <input value={userForm.firstName} onChange={updateUserForm('firstName')} />
                </label>
                <label className="field">
                  <span>Confirm Password <b>*</b></span>
                  <input type="password" value={userForm.confirmPassword || ''} onChange={updateUserForm('confirmPassword')} />
                </label>
                <label className="field">
                  <span>Middle Name:</span>
                  <input value={userForm.middleName} onChange={updateUserForm('middleName')} />
                </label>
                <div></div>
              </div>
              {addError && <div className="error-text" style={{ color: 'red', marginTop: '10px' }}>{addError}</div>}
              <div className="modal-footer" style={{ justifyContent: 'center' }}>
                <button className="btn" style={{ background: '#16a34a', color: '#fff', minWidth: 120 }} onClick={handleAddUser}>Add</button>
                <button className="btn secondary" style={{ minWidth: 120 }} onClick={() => { setUserOpen(false); clearUserForm(); }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {userOpenView && selectedUser && userDraft && (
        <div className="modal-overlay" onClick={() => setUserOpenView(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>USER INFO</h3>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button className="btn small danger" onClick={() => { try { setShowDeactFx(true); setTimeout(() => setShowDeactFx(false), 900); } catch {}; onDeactivateUser(selectedUser); }}>Deactivate</button>
                <button className="btn small secondary" onClick={() => { setUserIsEditing(true); }}>Edit</button>
              </div>
            </div>
            <div className="modal-body">
              {userIsEditing ? (
                <div className="grid-two">
                  <label className="field">
                    <span>Employee ID <b>*</b></span>
                    <input value={userDraft.employeeId} onChange={updateUserDraft('employeeId')} />
                  </label>
                  <label className="field">
                    <span>User ID <b>*</b></span>
                    <input value={userDraft.userId} onChange={updateUserDraft('userId')} />
                  </label>
                  <label className="field">
                    <span>Last Name <b>*</b></span>
                    <input value={userDraft.lastName} onChange={updateUserDraft('lastName')} />
                  </label>
                  <label className="field">
                    <span>Password <b>*</b></span>
                    <input type="password" value={userDraft.password} onChange={updateUserDraft('password')} />
                  </label>
                  <label className="field">
                    <span>First Name <b>*</b></span>
                    <input value={userDraft.firstName} onChange={updateUserDraft('firstName')} />
                  </label>
                  <label className="field">
                    <span>Confirm Password <b>*</b></span>
                    <input type="password" value={userDraft.confirmPassword || ''} onChange={updateUserDraft('confirmPassword')} placeholder="Re-type password" />
                  </label>
                  <label className="field">
                    <span>Middle Name</span>
                    <input value={userDraft.middleName} onChange={updateUserDraft('middleName')} />
                  </label>
                  <div className="field" style={{ alignSelf: 'end', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn small secondary" type="button" onClick={() => {
                      try {
                        updateUserDraft('password')({ target: { value: '' } });
                        updateUserDraft('confirmPassword')({ target: { value: '' } });
                      } catch {}
                    }}>Reset password</button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: 8 }}>
                  <div><b>User ID:</b> {userDraft.userId}</div>
                  <div><b>Last Name:</b> {userDraft.lastName}</div>
                  <div><b>First Name:</b> {userDraft.firstName}</div>
                  <div><b>Middle Name:</b> {userDraft.middleName}</div>
                  <div><b>Employee ID:</b> {userDraft.employeeId}</div>
                  <div><b>Password:</b> {'•'.repeat(String(userDraft.password || '').length)}</div>
                </div>
              )}
              <div className="modal-footer">
                <button className="btn primary" onClick={() => {
                  if (userIsEditing && String(userDraft.password || '') !== String(userDraft.confirmPassword || '')) { alert('Passwords do not match'); return; }
                  saveUserChanges();
                }}>Save</button>
                <button className="btn secondary" onClick={() => setUserOpenView(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeactFx && (
        <div className="fx-deactivated">
          <div className="fx-face">:(</div>
          <div className="fx-text">Deactivated</div>
        </div>
      )}
    </section>
  );
};

export default UserManagement;
