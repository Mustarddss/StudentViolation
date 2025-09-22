import React, { useState } from 'react'

const StudentManagement = ({
  filtered = [],
  onView = () => {},
  // modal & form props (controlled by parent)
  open = false,
  setOpen = () => {},
  form = {},
  update = () => {},
  saveRecord = () => {},
  clearForm = () => {},
  openView = false,
  setOpenView = () => {},
  selected = null,
  draft = null,
  isEditing = false,
  setIsEditing = () => {},
  updateDraft = () => {},
  onDeactivate = () => {},
  saveStudentChanges = () => {},
}) => {
  const [showSaved, setShowSaved] = useState(false)
  const [showDeactFx, setShowDeactFx] = useState(false)

  // Department → Allowed Programs mapping
  const DEPARTMENT_PROGRAMS = {
    'SECA – School of Engineering, Computing, and Architecture': [
      'BSA - BS Architecture',
      'BSCE - BS Civil Engineering',
      'BSCpE - BS Computer Engineering',
      'BSCS - BS Computer Science',
      'BSIT-MWA - BS Information Technology (with Specialization in Mobile and Web Applications)',
    ],
    'SBMA – School of Business, Management, and Accountancy': [
      'BSAc- BS Accountancy ',
      'BSMA - BS Management Accounting ',
      'BSBA-FM - BS Business Administration, major in Financial Management ',
      'BSBA-MM - BS Business Administration, major in Marketing Management',
    ],
    'SASE – School of Arts, Sciences, and Education': [
      'BPEd - Bachelor in Physical Education ',
      'BA Comm or BAC - Bachelor of Arts in Communication',
      'BSPsy or BSPsych - BS Psychology (Bachelor of Science in Psychology)',
    ],
    // Programs trimmed to currently used schools
  }
  const saveToDatabase = async () => {
  const studentData = {
    student_id: form.id,
    first_name: form.firstName,
    middle_name: form.middleName,
    last_name: form.lastName,
    gender: form.gender,
    department: form.department,
    program: form.program,
    year_level: form.yearLevel,
    guardian_first_name: form.guardianFirst,
    guardian_middle_name: form.guardianMiddle,
    guardian_last_name: form.guardianLast,
    guardian_contact: form.guardianContact,
    guardian_email: form.guardianEmail,
  };

  try {
    const response = await fetch("http://localhost/studentviolation_backend/add_student.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    // Check if response is OK
    if (!response.ok) {
      const text = await response.text();
      console.error("Server response:", text);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Attempt to parse JSON
    const result = await response.json();

    if (result.success) {
      alert("Student added successfully!");
      return true;
    } else {
      alert("Error: " + result.message);
      return false;
    }
  } catch (error) {
    console.error("Error in saveToDatabase:", error);
    alert(`An error occurred while saving to the database: ${error.message}`);
    return false;
  }
};

  return (
    <section className="panel">
      <div className="panel-header">
        <h3>STUDENT INFORMATION</h3>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>STUDENT ID</th>
            <th>LAST NAME</th>
            <th>FIRST NAME</th>
            <th>PROGRAM</th>
            <th>DEPARTMENT</th>
            <th>YR LEVEL</th>
            <th>GENDER</th>
            <th>GUARDIAN'S NAME</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(!filtered || filtered.length === 0) ? (
            <tr>
              <td colSpan="9" style={{ textAlign:'center', color:'#6b7280', padding:'12px 0' }}>No records found</td>
            </tr>
          ) : (
            filtered.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.lastName}</td>
                <td>{s.firstName}</td>
                <td>{s.program}</td>
                <td>{s.department}</td>
                <td>{s.yearLevel}</td>
                <td>{s.gender}</td>
                <td>{s.guardian}</td>
                <td><button className="btn small dark" onClick={() => onView(s)}>View / Update</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>ADD NEW STUDENT FORM</h3>
            </div>
            <div className="modal-body">
              <div className="grid-two">
                <label className="field">
                  <span>Student ID <b>*</b></span>
                  <input value={form.id} onChange={update('id')} />
                </label>
                <label className="field">
                  <span>Guardian Email</span>
                  <input value={form.guardianEmail} onChange={update('guardianEmail')} />
                </label>
                <label className="field">
                  <span>First Name <b>*</b></span>
                  <input value={form.firstName} onChange={update('firstName')} />
                </label>
                <label className="field">
                  <span>Department <b>*</b></span>
                  <select value={form.department} onChange={(e) => { update('department')(e); update('program')({ target: { value: '' } }) }}>
                    <option value="">Select department</option>
                    <option>SECA – School of Engineering, Computing, and Architecture</option>
                    <option>SBMA – School of Business, Management, and Accountancy</option>
                    <option>SASE – School of Arts, Sciences, and Education</option>
                  </select>
                </label>
                <label className="field">
                  <span>Student's Middle Name</span>
                  <input value={form.middleName} onChange={update('middleName')} />
                </label>
                <label className="field span-2">
                  <span>Program <b>*</b></span>
                  <select value={form.program} onChange={update('program')} disabled={!form.department}>
                    <option value="">Select program</option>
                    {(DEPARTMENT_PROGRAMS[form.department] || []).map(p => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Last Name <b>*</b></span>
                  <input value={form.lastName} onChange={update('lastName')} />
                </label>
                <label className="field">
                  <span>Year Level <b>*</b></span>
                  <input value={form.yearLevel} onChange={(e)=> {
                    const v = e.target.value.replace(/[^0-9]/g,'')
                    update('yearLevel')({ target: { value: v } })
                  }} />
                </label>
                <label className="field">
                  <span>Gender <b>*</b></span>
                  <select value={form.gender} onChange={update('gender')}>
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>
                <label className="field">
                  <span>Guardian Contact # <b>*</b></span>
                  <input
                    value={form.guardianContact}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9+]/g, '')
                      update('guardianContact')({ target: { value: v } })
                    }}
                    placeholder="e.g. 09XXXXXXXXX or +639XXXXXXXXX"
                  />
                </label>
                <label className="field">
                  <span>Guardian's First Name <b>*</b></span>
                  <input value={form.guardianFirst} onChange={update('guardianFirst')} />
                </label>
                <label className="field">
                  <span>Guardian's Middle Name</span>
                  <input value={form.guardianMiddle} onChange={update('guardianMiddle')} />
                </label>
                <label className="field">
                  <span>Guardian's Last Name <b>*</b></span>
                  <input value={form.guardianLast} onChange={update('guardianLast')} />
                </label>
              </div>
              <div className="modal-footer">
                <button className="btn secondary"
                   onClick={async () => {
                    const phone = String(form.guardianContact || '');
                    const valid = /^(\+639\d{9}|09\d{9})$/.test(phone);
                     if (!valid) {
                   alert('Please enter a valid PH cellphone number (e.g., 09XXXXXXXXX or +639XXXXXXXXX)');
                        return;
                }
    
                  const saved = await saveToDatabase();
                 if (saved) {
                  if (saveRecord()) setOpen(false);
         }
                  }}
                   >   Save & Close
                      </button>

                      <button
  className="btn primary"
  onClick={async () => {
    const phone = String(form.guardianContact || '');
    const valid = /^(\+639\d{9}|09\d{9})$/.test(phone);
    if (!valid) {
      alert('Please enter a valid PH cellphone number (e.g., 09XXXXXXXXX or +639XXXXXXXXX)');
      return;
    }
    
    const saved = await saveToDatabase();
    if (saved) {
      if (saveRecord()) {
        clearForm();
        try {
          setShowSaved(true);
          setTimeout(() => setShowSaved(false), 1500);
        } catch {}
      }
    }
  }}
>
  Save & Add New
</button>



                <button className="btn secondary" onClick={() => { clearForm(); setOpen(false) }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openView && selected && draft && (
        <div className="modal-overlay" onClick={() => setOpenView(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>STUDENT FORM</h3>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <button className="btn small secondary" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="btn small danger" onClick={() => { try { setShowDeactFx(true); setTimeout(()=> setShowDeactFx(false), 900) } catch {}; onDeactivate(selected) }}>Deactivate</button>
              </div>
            </div>
            <div className="modal-body">
              <div className="grid-two">
                <label className="field">
                  <span>Student ID <b>*</b></span>
                  <input value={draft.id} onChange={updateDraft('id')} readOnly={!isEditing} />
                </label>
                <label className="field">
                  <span>Last Name <b>*</b></span>
                  <input value={draft.lastName} onChange={updateDraft('lastName')} readOnly={!isEditing} />
                </label>
                <label className="field">
                  <span>First Name <b>*</b></span>
                  <input value={draft.firstName} onChange={updateDraft('firstName')} readOnly={!isEditing} />
                </label>
                <label className="field span-2">
                  <span>Program <b>*</b></span>
                  <select value={draft.program} onChange={updateDraft('program')} disabled={!isEditing || !draft.department}>
                    <option value="">Select program</option>
                    {(DEPARTMENT_PROGRAMS[draft?.department] || []).map(p => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Department <b>*</b></span>
                  <select value={draft.department} onChange={(e)=> { if (!isEditing) return; updateDraft('department')(e); updateDraft('program')({ target: { value: '' } }) }} disabled={!isEditing}>
                    <option value="">Select department</option>
                    <option>SECA – School of Engineering, Computing, and Architecture</option>
                    <option>SBMA – School of Business, Management, and Accountancy</option>
                    <option>SASE – School of Arts, Sciences, and Education</option>
                  </select>
                </label>
                <label className="field">
                  <span>Year Level <b>*</b></span>
                  <input value={draft.yearLevel} onChange={(e)=> {
                    if (!isEditing) return
                    const v = e.target.value.replace(/[^0-9]/g,'')
                    updateDraft('yearLevel')({ target: { value: v } })
                  }} readOnly={!isEditing} />
                </label>
                <label className="field">
                  <span>Gender <b>*</b></span>
                  <input value={draft.gender} onChange={updateDraft('gender')} readOnly={!isEditing} />
                </label>
                <label className="field">
                  <span>Guardian Contact # <b>*</b></span>
                  <input
                    value={draft.guardianContact}
                    onChange={(e) => {
                      if (!isEditing) return
                      const v = e.target.value.replace(/[^0-9+]/g, '')
                      updateDraft('guardianContact')({ target: { value: v } })
                    }}
                    readOnly={!isEditing}
                  />
                </label>
                <label className="field">
                  <span>Guardian Name</span>
                  <input value={draft.guardianName} onChange={updateDraft('guardianName')} readOnly={!isEditing} />
                </label>
                <label className="field">
                  <span>Guardian Email</span>
                  <input value={draft.guardianEmail} onChange={updateDraft('guardianEmail')} readOnly={!isEditing} />
                </label>
              </div>
              <div className="modal-footer">
                <button className="btn primary" onClick={() => {
                  if (isEditing) {
                    const phone = String(draft.guardianContact || '')
                    const valid = /^(\+639\d{9}|09\d{9})$/.test(phone)
                    if (!valid) { alert('Please enter a valid PH cellphone number (e.g., 09XXXXXXXXX or +639XXXXXXXXX)'); return }
                  }
                  saveStudentChanges(draft, isEditing)
                }}>Save Changes</button>
                <button className="btn secondary" onClick={() => setOpenView(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSaved && (
        <div className="toast toast-success">
          <span className="toast-icon">✓</span>
          <span>Student added</span>
        </div>
      )}

      {showDeactFx && (
        <div className="fx-deactivated">
          <div className="fx-face">:(</div>
          <div className="fx-text">Deactivated</div>
        </div>
      )}

    </section>
  )
}

export default StudentManagement


