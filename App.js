import React, { useState, useMemo } from 'react'
import { SafeAreaView, View, Text, TextInput, Image, Pressable, StyleSheet, ScrollView, Modal } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { StatusBar } from 'expo-status-bar'
import Svg, { Circle } from 'react-native-svg'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({ name: 'Ronald Allan' })
  const [active, setActive] = useState('DASHBOARD')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleDemoLogin = () => {
    const isValid = (username && password) || (username === 'demo' && password === 'demo')
    if (isValid) {
      setLoggedIn(true)
      setError('')
    } else {
      setError('Enter any username and password to continue (demo).')
    }
  }

  const Drawer = createDrawerNavigator()

  const DonutChart = ({ size = 220, strokeWidth = 36, minorRatio = 0.65 }) => {
    const radius = (size - strokeWidth) / 2
    const cx = size / 2
    const cy = size / 2
    const circumference = 2 * Math.PI * radius
    const minorLen = circumference * minorRatio
    const majorLen = circumference - minorLen

    return (
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={cx} cy={cy} r={radius} stroke="#f3c623" strokeWidth={strokeWidth} strokeDasharray={`${minorLen}, ${circumference}`} strokeLinecap="butt" fill="none" />
        <Circle cx={cx} cy={cy} r={radius} stroke="#ff2e2e" strokeWidth={strokeWidth} strokeDasharray={`${majorLen}, ${circumference}`} strokeDashoffset={-minorLen} strokeLinecap="butt" fill="none" />
      </Svg>
    )
  }

  const DashboardScreen = () => (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.page}>
        <ScrollView contentContainerStyle={{padding:16}}>
          <View style={styles.statRow}>
            <View style={styles.statCard}><Text style={styles.statNum}>12</Text><Text style={styles.statLabel}>Total Students Violation</Text></View>
            <View style={styles.statCard}><Text style={styles.statNum}>5</Text><Text style={styles.statLabel}>Pending Acknowledge</Text></View>
            <View style={styles.statCard}><Text style={styles.statNum}>3</Text><Text style={styles.statLabel}>Appointments This Week</Text></View>
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Recent Violation</Text>
            {Array.from({ length: 6 }).map((_, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={{color:'#1f2b3a'}}>Maria Magdalene</Text>
                <Text style={{color:'#4b5563'}}>Aug 10 • {i % 2 ? 'MINOR' : 'MAJOR'} • {i % 3 ? 'PENDING' : 'NOTIFIED'}</Text>
              </View>
            ))}
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Violation Severity</Text>
            <View style={styles.legendRow}>
              <View style={[styles.legendDot,{backgroundColor:'#f3c623'}]} />
              <Text style={styles.legendText}>MINOR</Text>
              <View style={[styles.legendDot,{backgroundColor:'#ff2e2e', marginLeft:16}]} />
              <Text style={styles.legendText}>MAJOR</Text>
            </View>
            <View style={styles.donutWrap}>
              <DonutChart size={220} strokeWidth={36} minorRatio={0.65} />
            </View>
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Violation by Month</Text>
            <View style={styles.bars}>
              <View style={[styles.bar,{height:60}]} />
              <View style={[styles.bar,{height:110}]} />
              <View style={[styles.bar,{height:140}]} />
            </View>
            <View style={styles.barLabels}>
              <Text style={styles.barLabelText}>JAN</Text>
              <Text style={styles.barLabelText}>FEB</Text>
              <Text style={styles.barLabelText}>MARCH</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )

  const StudentInfoScreen = () => {
    const [query, setQuery] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [studentId, setStudentId] = useState('')
    const [program, setProgram] = useState('')
    const [name, setName] = useState('')

    const students = [
      { id:'2024-0001', name:'MARIA MAGDALENE', program:'BSIT', year:'3', gender:'F', guardian:'JOSEPHINE MAGDALENE', contact:'+63 900 123 4567', email:'guardian@example.com' },
      { id:'2024-0002', name:'JUAN DELA CRUZ', program:'BSBA', year:'2', gender:'M', guardian:'PEDRO CRUZ', contact:'+63 900 333 1111', email:'pedro@example.com' },
      { id:'2024-0003', name:'ANA SANTOS', program:'BSIT', year:'1', gender:'F', guardian:'MARIA SANTOS', contact:'+63 900 555 2222', email:'maria@example.com' },
      { id:'2024-0004', name:'MARK REYES', program:'BSCpE', year:'4', gender:'M', guardian:'JUAN REYES', contact:'+63 900 777 3333', email:'juan@example.com' },
    ]

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase()
      return students
        .filter(s => {
          if (!q) return true
          const target = `${s.id} ${s.program} ${s.name}`.toLowerCase()
          return target.includes(q)
        })
        .filter(s =>
          s.id.toLowerCase().includes(studentId.toLowerCase()) &&
          s.program.toLowerCase().includes(program.toLowerCase()) &&
          s.name.toLowerCase().includes(name.toLowerCase())
        )
    }, [query, studentId, program, name])

    const clearFilters = () => { setQuery(''); setStudentId(''); setProgram(''); setName('') }

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.page}>
          <ScrollView contentContainerStyle={{padding:16}}>
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>STUDENT INFORMATION</Text>
              <View style={styles.searchRow}>
                <TextInput placeholder="Search by Student ID / Program / Name" placeholderTextColor="#8f8ba8" value={query} onChangeText={setQuery} style={styles.searchInput} />
                <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={() => setShowFilters(v => !v)}>
                  <Text style={styles.chipText}>{showFilters ? 'Hide' : 'Filter'}</Text>
                </Pressable>
              </View>
              {showFilters && (
                <View style={styles.filterCard}>
                  <TextInput value={studentId} onChangeText={setStudentId} placeholder="Student ID" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={program} onChangeText={setProgram} placeholder="Program" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#8f8ba8" style={styles.input} />
                  <View style={[styles.actionRow,{marginTop:8}]}> 
                    <Pressable style={[styles.chipBtn, styles.secondaryChip]}><Text style={styles.chipTextDark}>Filter</Text></Pressable>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={clearFilters}><Text style={styles.chipText}>Clear</Text></Pressable>
                  </View>
                </View>
              )}
              {filtered.map((s)=> (
                <View key={s.id} style={styles.itemCard}>
                  <Text style={styles.itemTitle}>{s.name}</Text>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Student ID</Text><Text style={styles.itemValue}>{s.id}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Program</Text><Text style={styles.itemValue}>{s.program}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Yr Level</Text><Text style={styles.itemValue}>{s.year}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Gender</Text><Text style={styles.itemValue}>{s.gender}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Guardian</Text><Text style={styles.itemValue}>{s.guardian}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Contact</Text><Text style={styles.itemValue}>{s.contact}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Email</Text><Text style={styles.itemValue}>{s.email}</Text></View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }

  const ViolationsScreen = () => {
    const [query, setQuery] = useState('')
    const [openAdd, setOpenAdd] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [selected, setSelected] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [fIncidentId, setFIncidentId] = useState('')
    const [fStudentId, setFStudentId] = useState('')
    const [fName, setFName] = useState('')
    const STUDENTS = [
      { id:'2024-0001', name:'MARIA MAGDALENE', program:'BSIT', yearLevel:'3' },
      { id:'2024-0002', name:'JUAN DELA CRUZ', program:'BSBA', yearLevel:'2' },
      { id:'2024-0003', name:'ANA SANTOS', program:'BSCpE', yearLevel:'1' },
    ]
    const options = {
      students: ['MARIA MAGDALENE', 'JUAN DELA CRUZ'],
      types: ['NO UNIFORM', 'TARDINESS'],
      severities: ['MINOR', 'MAJOR'],
      statuses: ['PENDING', 'NOTIFIED'],
      email: ['Send email', 'Do not send']
    }
    const pickNext = (current, arr) => {
      if (!current) return arr[0]
      const idx = arr.indexOf(current)
      return arr[(idx + 1) % arr.length]
    }
    const [vForm, setVForm] = useState({
      studentId:'', name:'', program:'', yearLevel:'',
      violationType:'', severity:'', status:'', dateTime:'', reportedBy:'', description:'',
      evidenceName:'', sendEmail:'Send email'
    })
    const rows = Array.from({ length: 7 }).map((_, idx) => ({
      studentName: 'MARIA MAGDALENE',
      studentId: '2023-17011' + idx,
      incidentId: '1234567891' + idx,
      violationType: idx % 2 ? 'TARDINESS' : 'NO UNIFORM',
      date: '08-1' + (idx + 1) + '-2025',
      time: `6:0${idx}am`,
      severity: idx % 2 ? 'MINOR' : 'MAJOR',
      status: idx % 3 ? 'PENDING' : 'NOTIFIED',
      reportedBy: 'Irish Mahagis',
      evidenceStatus: idx % 2 ? 'Pending' : 'Uploaded',
      notes: 'yung anak mo walang kwenta lagi naka revealing na damit'
    }))
    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase()
      return rows
        .filter(r => {
          if (!q) return true
          return (
            r.incidentId.toLowerCase().includes(q) ||
            r.studentId.toLowerCase().includes(q) ||
            r.studentName.toLowerCase().includes(q)
          )
        })
        .filter(r =>
          r.incidentId.toLowerCase().includes(fIncidentId.toLowerCase()) &&
          r.studentId.toLowerCase().includes(fStudentId.toLowerCase()) &&
          r.studentName.toLowerCase().includes(fName.toLowerCase())
        )
    }, [query, fIncidentId, fStudentId, fName])

    const clearFilters = () => { setQuery(''); setFIncidentId(''); setFStudentId(''); setFName('') }
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.page}>
          <ScrollView contentContainerStyle={{padding:16}}>
            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <Text style={styles.panelTitle}>RECENT VIOLATION</Text>
                <Pressable style={styles.btn} onPress={() => setOpenAdd(true)}><Text style={styles.btnText}>ADD NEW</Text></Pressable>
              </View>
              <View style={styles.searchRow}>
                <TextInput placeholder="Search by Incident ID / Student ID / Student's Name" placeholderTextColor="#8f8ba8" value={query} onChangeText={setQuery} style={styles.searchInput} />
                <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={() => setShowFilters(v => !v)}>
                  <Text style={styles.chipText}>{showFilters ? 'Hide' : 'Filter'}</Text>
                </Pressable>
              </View>
              {showFilters && (
                <View style={styles.filterCard}>
                  <TextInput value={fIncidentId} onChangeText={setFIncidentId} placeholder="Incident ID" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={fStudentId} onChangeText={setFStudentId} placeholder="Student ID" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={fName} onChangeText={setFName} placeholder="Student Name" placeholderTextColor="#8f8ba8" style={styles.input} />
                  <View style={[styles.actionRow,{marginTop:8}]}> 
                    <Pressable style={[styles.chipBtn, styles.secondaryChip]}><Text style={styles.chipTextDark}>Filter</Text></Pressable>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={clearFilters}><Text style={styles.chipText}>Clear</Text></Pressable>
                  </View>
                </View>
              )}
              {filtered.map((r, idx) => (
                <View key={idx} style={styles.itemCard}>
                  <Text style={styles.itemTitle}>{r.studentName}</Text>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Student ID</Text><Text style={styles.itemValue}>{r.studentId}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Incident ID</Text><Text style={styles.itemValue}>{r.incidentId}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Violation Type</Text><Text style={styles.itemValue}>{r.violationType}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Date</Text><Text style={styles.itemValue}>{r.date}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Severity</Text><Text style={[styles.itemValue, r.severity==='MINOR'?styles.severityMinor:styles.severityMajor]}>{r.severity}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Status</Text><Text style={[styles.itemValue, r.status==='PENDING'?styles.statusPending:styles.statusNotified]}>{r.status}</Text></View>
                  <View style={[styles.itemRow,{justifyContent:'flex-end'}]}>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={()=>{ setSelected(r); setOpenView(true) }}>
                      <Text style={styles.chipText}>View</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <Modal visible={openView} transparent animationType="fade" onRequestClose={() => setOpenView(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>RECENT VIOLATION INFORMATION</Text>
                  <Pressable onPress={()=> setOpenView(false)}><Text style={{color:'#555', fontSize:20}}>×</Text></Pressable>
                </View>
                <View style={styles.modalBody}>
                  <View style={{flexDirection:'row', gap:10}}>
                    <TextInput editable={false} value={selected?.studentId || ''} placeholder="Student ID" style={[styles.inputLight,{flex:1, opacity:0.85}]} />
                    <TextInput editable={false} value={selected?.date || ''} placeholder="Date" style={[styles.inputLight,{flex:1, opacity:0.85}]} />
                  </View>
                  <View style={{flexDirection:'row', gap:10, marginTop:8}}>
                    <TextInput editable={false} value={selected?.violationType || ''} placeholder="Violation Type" style={[styles.inputLight,{flex:1, opacity:0.85}]} />
                    <TextInput editable={false} value={selected?.time || ''} placeholder="Time" style={[styles.inputLight,{flex:1, opacity:0.85}]} />
                  </View>
                  <View style={{flexDirection:'row', gap:10, marginTop:8}}>
                    <TextInput editable={false} value={selected?.severity || ''} placeholder="Severity" style={[styles.inputLight,{flex:1, opacity:0.85}]} />
                    <Pressable style={[styles.select,{flex:1}]} onPress={()=> setSelected(p=>({...p, status: p?.status==='PENDING'?'NOTIFIED':'PENDING'}))}>
                      <Text style={styles.selectText}>{selected?.status || 'Status'}</Text>
                      <Text style={styles.selectChevron}>⌄</Text>
                    </Pressable>
                  </View>
                  <View style={{flexDirection:'row', gap:10, marginTop:8}}>
                    <TextInput editable={false} value={selected?.reportedBy || ''} placeholder="Reported By..." style={[styles.inputLight,{flex:1, opacity:0.85}]} />
                    <View style={{flex:1}}>
                      <Pressable style={[styles.select]}>
                        <Text style={styles.selectText}>Upload Evidence</Text>
                        <Text style={styles.selectChevron}>View</Text>
                      </Pressable>
                    </View>
                  </View>
                  <TextInput multiline numberOfLines={6} value={selected?.notes || ''} onChangeText={t=> setSelected(p=>({...p, notes:t}))} placeholder="Notes" style={[styles.textarea,{marginTop:8}]} />
                  <View style={styles.modalFooter}>
                    <Pressable style={[styles.select]}><Text style={styles.selectText}>Send SMS</Text></Pressable>
                    <Pressable style={[styles.btn,{backgroundColor:'#e11d48', paddingHorizontal:18}]} onPress={()=> setOpenView(false)}>
                      <Text style={styles.btnText}>Remove</Text>
                    </Pressable>
                    <Pressable style={[styles.btn,{paddingHorizontal:18}]} onPress={()=> setOpenView(false)}>
                      <Text style={styles.btnText}>Save Changes</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Modal visible={openAdd} transparent animationType="fade" onRequestClose={() => setOpenAdd(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>ADD NEW VIOLATION</Text>
                  <Pressable onPress={() => setOpenAdd(false)}><Text style={{color:'#555', fontSize:20}}>×</Text></Pressable>
                </View>
                <View style={styles.modalBody}>
                  <Text style={styles.hint}>Enter Student ID to auto-fill details</Text>
                  <TextInput placeholder="Student ID" placeholderTextColor="#6b6a78" value={vForm.studentId} onChangeText={(t)=>{
                    const m = STUDENTS.find(s=>s.id.toLowerCase()===t.toLowerCase())
                    setVForm(p=>({...p, studentId:t, name:m?.name||'', program:m?.program||'', yearLevel:m?.yearLevel||''}))
                  }} style={styles.inputLight} />
                  <View style={{flexDirection:'row', gap:10}}>
                    <TextInput editable={false} placeholder="Name" placeholderTextColor="#6b6a78" value={vForm.name} style={[styles.inputLight,{flex:1, opacity:0.8}]} />
                    <TextInput editable={false} placeholder="Program" placeholderTextColor="#6b6a78" value={vForm.program} style={[styles.inputLight,{flex:1, opacity:0.8}]} />
                  </View>
                  <TextInput editable={false} placeholder="Yr Level" placeholderTextColor="#6b6a78" value={vForm.yearLevel} style={[styles.inputLight,{width:'50%', opacity:0.8, marginTop:8}]} />
                  <View style={{flexDirection:'row', gap:10}}>
                    <Pressable style={[styles.select,{flex:1}]} onPress={() => setVForm(p=>({...p, violationType: pickNext(p.violationType, options.types)}))}>
                      <Text style={styles.selectText}>{vForm.violationType || 'Violation Type'}</Text>
                      <Text style={styles.selectChevron}>⌄</Text>
                    </Pressable>
                    <Pressable style={[styles.select,{flex:1}]} onPress={() => setVForm(p=>({...p, severity: pickNext(p.severity, options.severities)}))}>
                      <Text style={styles.selectText}>{vForm.severity || 'Severity'}</Text>
                      <Text style={styles.selectChevron}>⌄</Text>
                    </Pressable>
                  </View>
                  <Pressable style={styles.select} onPress={() => setVForm(p=>({...p, status: pickNext(p.status, options.statuses)}))}>
                    <Text style={styles.selectText}>{vForm.status || 'Status'}</Text>
                    <Text style={styles.selectChevron}>⌄</Text>
                  </Pressable>
                  <TextInput placeholder="Date & Time (manual)" placeholderTextColor="#6b6a78" value={vForm.dateTime} onChangeText={t=>setVForm(p=>({...p, dateTime:t}))} style={styles.inputLight} />
                  <TextInput placeholder="Reported By" placeholderTextColor="#6b6a78" value={vForm.reportedBy} onChangeText={t=>setVForm(p=>({...p, reportedBy:t}))} style={styles.inputLight} />
                  <TextInput multiline numberOfLines={6} placeholder="Description" placeholderTextColor="#8f8ba8" value={vForm.description} onChangeText={t=>setVForm(p=>({...p, description:t}))} style={styles.textarea} />
                  <Pressable style={[styles.select,{justifyContent:'center'}]} onPress={() => setVForm(p=>({...p, evidenceName: p.evidenceName ? '' : 'Attached (demo)'}))}>
                    <Text style={styles.selectText}>{vForm.evidenceName || 'Attach Photo/PDF (demo)'}</Text>
                  </Pressable>
                  <View style={styles.modalFooter}>
                    <Pressable style={[styles.select,{flex:0.6}]} onPress={() => setVForm(p=>({...p, sendEmail: pickNext(p.sendEmail, options.email)}))}>
                      <Text style={styles.selectText}>{vForm.sendEmail}</Text>
                      <Text style={styles.selectChevron}>⌄</Text>
                    </Pressable>
                    <Pressable style={[styles.btn,{paddingHorizontal:18}]} onPress={()=> setOpenAdd(false)}>
                      <Text style={styles.btnText}>Save & Notify</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    )
  }

  const SmsLogsScreen = () => {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [fIncident, setFIncident] = useState('')
    const [fSmsId, setFSmsId] = useState('')
    const [fSent, setFSent] = useState('')

    const rows = Array.from({ length: 7 }).map((_, idx) => ({
      smsId: String(86767860 + idx),
      incident: idx === 0 ? 'No ID' : 'INC-10' + idx,
      guardian: idx % 2 ? 'Magahis' : 'Sean Creencia',
      student: idx % 2 ? 'Irish' : 'Juan Dela Cruz',
      content: 'Good day, your child Juan Dela Cruz was reported for being late on Aug 12, 2025.',
      timestamp: idx === 0 ? 'Aug 12 2025, 12:12' : `Aug 0${idx} 2025, 11:3${idx}`,
      dateCreated: idx === 0 ? 'Aug 12 2025, 12:00' : `Aug 0${idx} 2025, 11:00`,
      sentBy: 'chuchu (DO office)',
      gateway: 'GlobeSMS_API',
      retryCount: 1,
      recipientNumber: '+63 912 345 6789',
      messageType: 'Violation Notice',
      status: idx % 3 === 1 ? 'FAILED' : 'SENT',
    }))

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase()
      return rows
        .filter(r => {
          if (!q) return true
          return (
            r.smsId.toLowerCase().includes(q) ||
            r.incident.toLowerCase().includes(q) ||
            r.timestamp.toLowerCase().includes(q)
          )
        })
        .filter(r =>
          r.incident.toLowerCase().includes(fIncident.toLowerCase()) &&
          r.smsId.toLowerCase().includes(fSmsId.toLowerCase()) &&
          r.timestamp.toLowerCase().includes(fSent.toLowerCase())
        )
    }, [query, fIncident, fSmsId, fSent])

    const clearFilters = () => { setQuery(''); setFIncident(''); setFSmsId(''); setFSent('') }

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.page}>
          <ScrollView contentContainerStyle={{padding:16}}>
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>SMS LOGS</Text>
              <View style={styles.searchRow}>
                <TextInput placeholder="Search by Incident # / SMS ID / Sent Date" placeholderTextColor="#8f8ba8" value={query} onChangeText={setQuery} style={styles.searchInput} />
                <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={() => setShowFilters(v => !v)}>
                  <Text style={styles.chipText}>{showFilters ? 'Hide' : 'Filter'}</Text>
                </Pressable>
              </View>
              {showFilters && (
                <View style={styles.filterCard}>
                  <TextInput value={fIncident} onChangeText={setFIncident} placeholder="Incident #" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={fSmsId} onChangeText={setFSmsId} placeholder="SMS ID" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={fSent} onChangeText={setFSent} placeholder="Sent Date" placeholderTextColor="#8f8ba8" style={styles.input} />
                  <View style={[styles.actionRow,{marginTop:8}]}> 
                    <Pressable style={[styles.chipBtn, styles.secondaryChip]}><Text style={styles.chipTextDark}>Filter</Text></Pressable>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={clearFilters}><Text style={styles.chipText}>Clear</Text></Pressable>
                  </View>
                </View>
              )}
              {filtered.map((r, idx)=> (
                <View key={idx} style={styles.itemCard}>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>SMS ID</Text><Text style={styles.itemValue}>{r.smsId}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Incident #</Text><Text style={styles.itemValue}>{r.incident}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Guardian</Text><Text style={styles.itemValue}>{r.guardian}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Sent</Text><Text style={styles.itemValue}>{r.timestamp}</Text></View>
                  <View style={[styles.itemRow,{justifyContent:'flex-end'}]}>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={()=>{ setSelected(r); setOpen(true) }}>
                      <Text style={styles.chipText}>View</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <Modal visible={open} transparent animationType="fade" onRequestClose={()=> setOpen(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>SMS LOG DETAILS</Text>
                  <Pressable onPress={()=> setOpen(false)}><Text style={{color:'#555', fontSize:20}}>×</Text></Pressable>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.detailsCard}>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Sms ID:</Text><Text style={styles.detailValue}>{selected?.smsId || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Incident #:</Text><Text style={styles.detailValue}>{selected?.incident || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Guardian's Name:</Text><Text style={styles.detailValue}>{selected?.guardian || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Student Name:</Text><Text style={styles.detailValue}>{selected?.student || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Recipient Number:</Text><Text style={styles.detailValue}>{selected?.recipientNumber || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Message Type:</Text><Text style={styles.detailValue}>{selected?.messageType || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Date Created:</Text><Text style={styles.detailValue}>{selected?.dateCreated || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Sent Timestamp:</Text><Text style={styles.detailValue}>{selected?.timestamp || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Status:</Text><Text style={styles.detailValue}>{selected?.status || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Sent By:</Text><Text style={styles.detailValue}>{selected?.sentBy || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Gateway:</Text><Text style={styles.detailValue}>{selected?.gateway || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Retry Count:</Text><Text style={styles.detailValue}>{String(selected?.retryCount ?? '')}</Text></View>
                  </View>
                  <TextInput editable={false} multiline numberOfLines={6} value={selected?.content || ''} placeholder="Message Content" style={[styles.textarea,{marginTop:8, opacity:0.85}]} />
                  <View style={styles.modalFooter}>
                    <Pressable style={[styles.btn,{paddingHorizontal:18}]} onPress={()=> setOpen(false)}>
                      <Text style={styles.btnText}>Done</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    )
  }

  const EmailLogsScreen = () => {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [fIncident, setFIncident] = useState('')
    const [fEmailId, setFEmailId] = useState('')
    const [fSent, setFSent] = useState('')

    const rows = Array.from({ length: 7 }).map((_, idx) => ({
      emailId: String(987654321 + idx),
      incident: idx === 0 ? 'No ID' : 'INC-20' + idx,
      recipientEmail: idx % 2 ? 'Mahagis@gmail.com' : 'guardian@example.com',
      guardian: idx % 2 ? 'Magahis' : 'Sean Creencia',
      student: idx % 2 ? 'Irish' : 'Juan Dela Cruz',
      subject: 'Violation Notice',
      dateCreated: idx === 0 ? 'Aug 12 2025, 12:00' : `Aug 1${idx} 2025, 12:00`,
      timestamp: idx === 0 ? 'Aug 12 2025, 12:12' : `Aug 1${idx} 2025, 13:2${idx}`,
      status: idx % 3 === 1 ? 'FAILED' : 'SENT',
      sentBy: 'chuchu (DO office)',
      gateway: 'Email API',
      attachments: 'None',
      retryCount: 1,
      content: 'Good day, this is to notify you that your child Juan Dela Cruz was reported late on Aug 12, 2025.'
    }))

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase()
      return rows
        .filter(r => {
          if (!q) return true
          return (
            r.emailId.toLowerCase().includes(q) ||
            r.incident.toLowerCase().includes(q) ||
            r.timestamp.toLowerCase().includes(q)
          )
        })
        .filter(r =>
          r.incident.toLowerCase().includes(fIncident.toLowerCase()) &&
          r.emailId.toLowerCase().includes(fEmailId.toLowerCase()) &&
          r.timestamp.toLowerCase().includes(fSent.toLowerCase())
        )
    }, [query, fIncident, fEmailId, fSent])

    const clearFilters = () => { setQuery(''); setFIncident(''); setFEmailId(''); setFSent('') }

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.page}>
          <ScrollView contentContainerStyle={{padding:16}}>
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>EMAIL LOGS</Text>
              <View style={styles.searchRow}>
                <TextInput placeholder="Search by Incident # / Email ID / Sent Date" placeholderTextColor="#8f8ba8" value={query} onChangeText={setQuery} style={styles.searchInput} />
                <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={() => setShowFilters(v => !v)}>
                  <Text style={styles.chipText}>{showFilters ? 'Hide' : 'Filter'}</Text>
                </Pressable>
              </View>
              {showFilters && (
                <View style={styles.filterCard}>
                  <TextInput value={fIncident} onChangeText={setFIncident} placeholder="Incident #" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={fEmailId} onChangeText={setFEmailId} placeholder="Email ID" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={fSent} onChangeText={setFSent} placeholder="Sent Date" placeholderTextColor="#8f8ba8" style={styles.input} />
                  <View style={[styles.actionRow,{marginTop:8}]}> 
                    <Pressable style={[styles.chipBtn, styles.secondaryChip]}><Text style={styles.chipTextDark}>Filter</Text></Pressable>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={clearFilters}><Text style={styles.chipText}>Clear</Text></Pressable>
                  </View>
                </View>
              )}
              {filtered.map((r, idx)=> (
                <View key={idx} style={styles.itemCard}>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Email ID</Text><Text style={styles.itemValue}>{r.emailId}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Incident #</Text><Text style={styles.itemValue}>{r.incident}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Guardian</Text><Text style={styles.itemValue}>{r.guardian}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Sent</Text><Text style={styles.itemValue}>{r.timestamp}</Text></View>
                  <View style={[styles.itemRow,{justifyContent:'flex-end'}]}>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={()=>{ setSelected(r); setOpen(true) }}>
                      <Text style={styles.chipText}>View</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <Modal visible={open} transparent animationType="fade" onRequestClose={()=> setOpen(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>EMAIL LOG DETAILS</Text>
                  <Pressable onPress={()=> setOpen(false)}><Text style={{color:'#555', fontSize:20}}>×</Text></Pressable>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.detailsCard}>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Email ID:</Text><Text style={styles.detailValue}>{selected?.emailId || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Incident #:</Text><Text style={styles.detailValue}>{selected?.incident || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Recipient Email:</Text><Text style={styles.detailValue}>{selected?.recipientEmail || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Guardian's Name:</Text><Text style={styles.detailValue}>{selected?.guardian || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Student Name:</Text><Text style={styles.detailValue}>{selected?.student || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Subject:</Text><Text style={styles.detailValue}>{selected?.subject || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Date Created:</Text><Text style={styles.detailValue}>{selected?.dateCreated || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Sent Timestamp:</Text><Text style={styles.detailValue}>{selected?.timestamp || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Status:</Text><Text style={styles.detailValue}>{selected?.status || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Sent By:</Text><Text style={styles.detailValue}>{selected?.sentBy || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Gateway:</Text><Text style={styles.detailValue}>{selected?.gateway || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Attachments:</Text><Text style={styles.detailValue}>{selected?.attachments || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Retry Count:</Text><Text style={styles.detailValue}>{String(selected?.retryCount ?? '')}</Text></View>
                  </View>
                  <TextInput editable={false} multiline numberOfLines={6} value={selected?.content || ''} placeholder="Email Content" style={[styles.textarea,{marginTop:8, opacity:0.85}]} />
                  <View style={styles.modalFooter}>
                    <Pressable style={[styles.btn,{paddingHorizontal:18}]} onPress={()=> setOpen(false)}>
                      <Text style={styles.btnText}>Done</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    )
  }

  const AcknowledgementScreen = () => {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [fIncident, setFIncident] = useState('')
    const [fAckId, setFAckId] = useState('')
    const [fDate, setFDate] = useState('')

    const rows = Array.from({ length: 7 }).map((_, idx) => ({
      ackId: String(456789123 + idx),
      incident: 'SAMPLE',
      guardian: 'Sean Creencia',
      guardianContact: '+63 912 345 6789',
      method: idx % 2 ? 'SMS Reply' : 'SMS',
      dateSent: idx === 0 ? 'Aug 12 2025, 12:12' : `Aug ${10+idx} 2025, 10:1${idx}`,
      dateAck: idx === 0 ? 'Aug 12 2025, 12:30' : `Aug ${10+idx} 2025, 10:3${idx}`,
      acknowledged: idx % 2 ? 'YES' : 'NO',
      content: 'Received, I will talk to my child.',
      timestamp: `Aug ${10+idx} 2025, 10:2${idx}`,
    }))

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase()
      return rows
        .filter(r => {
          if (!q) return true
          return (
            r.incident.toLowerCase().includes(q) ||
            r.ackId.toLowerCase().includes(q) ||
            r.timestamp.toLowerCase().includes(q)
          )
        })
        .filter(r =>
          r.incident.toLowerCase().includes(fIncident.toLowerCase()) &&
          r.ackId.toLowerCase().includes(fAckId.toLowerCase()) &&
          r.timestamp.toLowerCase().includes(fDate.toLowerCase())
        )
    }, [query, fIncident, fAckId, fDate])

    const clearFilters = () => { setQuery(''); setFIncident(''); setFAckId(''); setFDate('') }

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.page}>
          <ScrollView contentContainerStyle={{padding:16}}>
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>ACKNOWLEDGEMENT</Text>
              <View style={styles.searchRow}>
                <TextInput placeholder="Search by Incident # / Ack ID / Ack'd Date" placeholderTextColor="#8f8ba8" value={query} onChangeText={setQuery} style={styles.searchInput} />
                <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={() => setShowFilters(v => !v)}>
                  <Text style={styles.chipText}>{showFilters ? 'Hide' : 'Filter'}</Text>
                </Pressable>
              </View>
              {showFilters && (
                <View style={styles.filterCard}>
                  <TextInput value={fIncident} onChangeText={setFIncident} placeholder="Incident #" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={fAckId} onChangeText={setFAckId} placeholder="Ack ID" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={fDate} onChangeText={setFDate} placeholder="Ack'd Date" placeholderTextColor="#8f8ba8" style={styles.input} />
                  <View style={[styles.actionRow,{marginTop:8}]}> 
                    <Pressable style={[styles.chipBtn, styles.secondaryChip]}><Text style={styles.chipTextDark}>Filter</Text></Pressable>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={clearFilters}><Text style={styles.chipText}>Clear</Text></Pressable>
                  </View>
                </View>
              )}
              {filtered.map((r, idx)=> (
                <View key={idx} style={styles.itemCard}>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Ack ID</Text><Text style={styles.itemValue}>{r.ackId}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Incident #</Text><Text style={styles.itemValue}>{r.incident}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Guardian</Text><Text style={styles.itemValue}>{r.guardian}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Acknowledged?</Text><Text style={styles.itemValue}>{r.acknowledged}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Method</Text><Text style={styles.itemValue}>{r.method}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Ack'd Date</Text><Text style={styles.itemValue}>{r.timestamp}</Text></View>
                  <View style={[styles.itemRow,{justifyContent:'flex-end'}]}>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={()=>{ setSelected(r); setOpen(true) }}>
                      <Text style={styles.chipText}>View</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <Modal visible={open} transparent animationType="fade" onRequestClose={()=> setOpen(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>ACKNOWLEDGEMENT LOG DETAILS</Text>
                  <Pressable onPress={()=> setOpen(false)}><Text style={{color:'#555', fontSize:20}}>×</Text></Pressable>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.detailsCard}>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Acknowledgement ID:</Text><Text style={styles.detailValue}>{selected?.ackId || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Incident #:</Text><Text style={styles.detailValue}>{selected?.incident || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Guardian's Name:</Text><Text style={styles.detailValue}>{selected?.guardian || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Guardian Contact:</Text><Text style={styles.detailValue}>{selected?.guardianContact || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Acknowledgement Type:</Text><Text style={styles.detailValue}>{selected?.method || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Date Sent to Guardian:</Text><Text style={styles.detailValue}>{selected?.dateSent || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Date Acknowledged:</Text><Text style={styles.detailValue}>{selected?.dateAck || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Acknowledged?</Text><Text style={styles.detailValue}>{selected?.acknowledged || ''}</Text></View>
                  </View>
                  <TextInput editable={false} multiline numberOfLines={4} value={selected?.content || ''} placeholder="Acknowledgement Content" style={[styles.textarea,{marginTop:8, opacity:0.85}]} />
                  <View style={styles.modalFooter}>
                    <Pressable style={[styles.btn,{paddingHorizontal:18}]} onPress={()=> setOpen(false)}>
                      <Text style={styles.btnText}>Done</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    )
  }

  const AppointmentsScreen = () => {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [statusOpen, setStatusOpen] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [fIncident, setFIncident] = useState('')
    const [fApt, setFApt] = useState('')
    const [fDate, setFDate] = useState('')

    const rows = Array.from({ length: 7 }).map((_, idx) => ({
      ackId: 'A' + (1000 + idx),
      appointmentId: 100 + idx,
      incidentId: 'INC-40' + idx,
      appointmentNo: 'APT-' + (123456 + idx),
      student: 'Juan Dela Cruz',
      guardian: 'Sean Creencia',
      guardianContact: '+63 912 345 6789',
      purpose: 'Violation Discussion',
      requestedBy: 'Teacher Maria Santos',
      assignedTo: idx % 2 ? 'Dean Office' : 'Guidance Office',
      dateTime: 'Aug 20, 2025 – 2:0' + idx + ' PM',
      meetLink: 'https://meet.google.com/abc-defg-hij',
      status: idx % 3 === 1 ? 'UPCOMING' : 'DONE',
      notes: ''
    }))

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase()
      return rows
        .filter(r => {
          if (!q) return true
          return (
            r.incidentId.toLowerCase().includes(q) ||
            r.appointmentNo.toLowerCase().includes(q) ||
            r.dateTime.toLowerCase().includes(q)
          )
        })
        .filter(r =>
          r.incidentId.toLowerCase().includes(fIncident.toLowerCase()) &&
          r.appointmentNo.toLowerCase().includes(fApt.toLowerCase()) &&
          r.dateTime.toLowerCase().includes(fDate.toLowerCase())
        )
    }, [query, fIncident, fApt, fDate])

    const clearFilters = () => { setQuery(''); setFIncident(''); setFApt(''); setFDate('') }

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.page}>
          <ScrollView contentContainerStyle={{padding:16}}>
            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <Text style={styles.panelTitle}>APPOINTMENTS</Text>
                <Pressable style={styles.btn}><Text style={styles.btnText}>ADD NEW</Text></Pressable>
              </View>
              <View style={styles.searchRow}>
                <TextInput placeholder="Search by Incident # / Appointment # / Appointment Date" placeholderTextColor="#8f8ba8" value={query} onChangeText={setQuery} style={styles.searchInput} />
                <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={() => setShowFilters(v => !v)}>
                  <Text style={styles.chipText}>{showFilters ? 'Hide' : 'Filter'}</Text>
                </Pressable>
              </View>
              {showFilters && (
                <View style={styles.filterCard}>
                  <TextInput value={fIncident} onChangeText={setFIncident} placeholder="Incident #" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={fApt} onChangeText={setFApt} placeholder="Appointment #" placeholderTextColor="#8f8ba8" style={[styles.input,{marginBottom:8}]} />
                  <TextInput value={fDate} onChangeText={setFDate} placeholder="Appointment Date" placeholderTextColor="#8f8ba8" style={styles.input} />
                  <View style={[styles.actionRow,{marginTop:8}]}> 
                    <Pressable style={[styles.chipBtn, styles.secondaryChip]}><Text style={styles.chipTextDark}>Filter</Text></Pressable>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={clearFilters}><Text style={styles.chipText}>Clear</Text></Pressable>
                  </View>
                </View>
              )}
              {filtered.map((r, idx)=> (
                <View key={idx} style={styles.itemCard}>
                  <Text style={styles.itemTitle}>{r.appointmentNo}</Text>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Ack ID</Text><Text style={styles.itemValue}>{r.ackId}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Incident #</Text><Text style={styles.itemValue}>{r.incidentId}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Assigned To</Text><Text style={styles.itemValue}>{r.assignedTo}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Guardian</Text><Text style={styles.itemValue}>{r.guardian}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Date & Time</Text><Text style={styles.itemValue}>{r.dateTime}</Text></View>
                  <View style={styles.itemRow}><Text style={styles.itemLabel}>Meet Link</Text><Text style={styles.itemValue} numberOfLines={1}>{r.meetLink}</Text></View>
                  <View style={[styles.itemRow,{justifyContent:'space-between'}]}>
                    <Text style={styles.itemValue}>{r.status}</Text>
                    <Pressable style={[styles.chipBtn, styles.darkChip]} onPress={()=>{ setSelected(r); setOpen(true) }}>
                      <Text style={styles.chipText}>View / Update</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <Modal visible={open} transparent animationType="fade" onRequestClose={()=> setOpen(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>APPOINTMENT DETAILS</Text>
                  <Pressable onPress={()=> setOpen(false)}><Text style={{color:'#555', fontSize:20}}>×</Text></Pressable>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.detailsCard}>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Appointment ID:</Text><Text style={styles.detailValue}>{selected?.appointmentId || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Student:</Text><Text style={styles.detailValue}>{selected?.student || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Guardian:</Text><Text style={styles.detailValue}>{selected?.guardian || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Guardian Contact:</Text><Text style={styles.detailValue}>{selected?.guardianContact || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Purpose:</Text><Text style={styles.detailValue}>{selected?.purpose || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Requested By:</Text><Text style={styles.detailValue}>{selected?.requestedBy || ''}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Requested Date & Time:</Text><Text style={styles.detailValue}>{selected?.dateTime || ''}</Text></View>
                  </View>
                  <View style={{flexDirection:'row', gap:10}}>
                    <TextInput value={selected?.assignedTo || ''} onChangeText={t=> setSelected(p=>({...p, assignedTo:t}))} placeholder="Assigned" style={[styles.inputLight,{flex:1}]} />
                    <View style={{flex:1}}>
                      <Pressable style={[styles.select]} onPress={()=> setStatusOpen(o=>!o)}>
                        <Text style={styles.selectText}>{selected?.status || 'Status'}</Text>
                        <Text style={styles.selectChevron}>⌄</Text>
                      </Pressable>
                      {statusOpen && (
                        <View style={styles.dropdown}>
                          {statusOptions.map(opt => (
                            <Pressable key={opt} style={styles.dropdownItem} onPress={() => { setSelected(p=>({...p, status: opt})); setStatusOpen(false) }}>
                              <Text style={[styles.dropdownText, selected?.status===opt && {fontWeight:'800'}]}>{opt}</Text>
                            </Pressable>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>
                  <TextInput multiline numberOfLines={5} value={selected?.notes || ''} onChangeText={t=> setSelected(p=>({...p, notes:t}))} placeholder="Type here..." style={[styles.textarea,{marginTop:8}]} />
                  <View style={styles.modalFooter}>
                    <Pressable style={[styles.btn,{paddingHorizontal:18}]} onPress={()=> setOpen(false)}>
                      <Text style={styles.btnText}>Save Changes</Text>
                    </Pressable>
                    <Pressable style={[styles.chipBtn, styles.secondaryChip]} onPress={()=> setOpen(false)}>
                      <Text style={styles.chipTextDark}>Cancel</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    )
  }

  const ReportsScreen = () => (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.page}>
        <ScrollView contentContainerStyle={{padding:16}}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>REPORTS</Text>
              <View style={styles.actionRow}>
                <Pressable style={[styles.chipBtn, styles.secondaryChip]}><Text style={styles.chipText}>Download Excel</Text></Pressable>
                <Pressable style={[styles.chipBtn, styles.secondaryChip]}><Text style={styles.chipText}>Download PDF</Text></Pressable>
                <Pressable style={[styles.chipBtn, styles.darkChip]}><Text style={styles.chipText}>Filter</Text></Pressable>
              </View>
            </View>
            <ScrollView horizontal>
              <View style={{minWidth:1080}}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={[styles.tableHeaderText,{width:120}]}>Violation#</Text>
                  <Text style={[styles.tableHeaderText,{width:180}]}>Student Name</Text>
                  <Text style={[styles.tableHeaderText,{width:160}]}>Violation Type</Text>
                  <Text style={[styles.tableHeaderText,{width:120}]}>Date</Text>
                  <Text style={[styles.tableHeaderText,{width:120}]}>Severity</Text>
                  <Text style={[styles.tableHeaderText,{width:150}]}>Acknowledge</Text>
                  <Text style={[styles.tableHeaderText,{width:140}]}>Program</Text>
                  <Text style={[styles.tableHeaderText,{width:100}]}></Text>
                </View>
                {Array.from({length:6}).map((_,idx)=> (
                  <View key={idx} style={styles.tableRow}>
                    <Text style={[styles.tableCell,{width:120}]}>878787</Text>
                    <Text style={[styles.tableCell,{width:180}]}>—</Text>
                    <Text style={[styles.tableCell,{width:160}]}>—</Text>
                    <Text style={[styles.tableCell,{width:120}]}>—</Text>
                    <Text style={[styles.tableCell,{width:120}]}>—</Text>
                    <Text style={[styles.tableCell,{width:150}]}>—</Text>
                    <Text style={[styles.tableCell,{width:140}]}>—</Text>
                    <View style={{width:100}}>
                      <Pressable style={[styles.chipBtn, styles.darkChip, {alignSelf:'flex-start'}]}><Text style={styles.chipText}>View all</Text></Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )

  const DrawerContent = (props) => {
    const active = props.state?.routeNames?.[props.state.index]
    const navItem = (routeName, label) => (
      <DrawerItem
        label={label}
        onPress={() => props.navigation.navigate(routeName)}
        labelStyle={active === routeName ? styles.navLabelActive : styles.navLabel}
        style={[styles.navItem, active === routeName && styles.navItemActive]}
      />
    )
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop:16, backgroundColor:'#fff', flexGrow:1}}>
        <View style={{flexGrow:1, justifyContent:'space-between'}}>
          <View>
            <View style={{flexDirection:'row', alignItems:'center', gap:8, paddingHorizontal:16, marginBottom:10}}>
              <Image source={require('../assets/nj-logo.png')} style={{width:32, height:32}} />
              <Text style={{color:'#2e4b7a', fontWeight:'900', fontSize:14}}>STUDENT VIOLATION TRACKING</Text>
            </View>
            <Text style={styles.drawerWelcome}>Welcome, {user?.name || 'User'}</Text>
            {navItem('Dashboard', 'Dashboard')}
            {navItem('Student Info', 'Student Info')}
            {navItem('Violations', 'Violations')}
            {navItem('SMS Logs', 'SMS Logs')}
            {navItem('Email Logs', 'Email Logs')}
            {navItem('Acknowledgement', 'Acknowledgement')}
            {navItem('Appointments', 'Appointments')}
            {navItem('Reports', 'Reports')}
          </View>
          <View style={{marginTop:8}}>
            <DrawerItem label="Logout" labelStyle={{color:'#6b7280'}} onPress={() => setLoggedIn(false)} style={{marginHorizontal:16, marginBottom:16}} />
          </View>
        </View>
      </DrawerContentScrollView>
    )
  }

  if (loggedIn) {
    return (
      <NavigationContainer theme={{...DefaultTheme, colors:{...DefaultTheme.colors, background:'#e9eaee'}}}>
        <Drawer.Navigator screenOptions={{headerShown:true, headerStyle:{backgroundColor:'#e9eaee'}, headerTintColor:'#1f2b3a', drawerStyle:{backgroundColor:'#fff', width:280}, sceneContainerStyle:{backgroundColor:'#e9eaee'}}} drawerContent={(p)=> <DrawerContent {...p} />}>
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Student Info" component={StudentInfoScreen} />
          <Drawer.Screen name="Violations" component={ViolationsScreen} />
          <Drawer.Screen name="SMS Logs" component={SmsLogsScreen} />
          <Drawer.Screen name="Email Logs" component={EmailLogsScreen} />
          <Drawer.Screen name="Acknowledgement" component={AcknowledgementScreen} />
          <Drawer.Screen name="Appointments" component={AppointmentsScreen} />
          <Drawer.Screen name="Reports" component={ReportsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={[styles.page, styles.loginPage]}>
        <ScrollView contentContainerStyle={{padding:16}}>
          <View style={styles.split}>
            <View style={styles.imagePanel}>
              <Image source={require('../assets/login_image.png')} style={styles.image} />
            </View>
            <View style={styles.formPanel}>
              <View style={styles.njHeader}>
                <Image source={require('../assets/nj-logo.png')} style={styles.njLogo} />
                <Text style={styles.njTitle}>STUDENT VIOLATION TRACKING SYSTEM</Text>
                <Text style={styles.njSignin}>SIGN IN</Text>
              </View>
              <View style={styles.signinCard}>
                <Text style={styles.label}>Username/Employee ID</Text>
                <TextInput value={username} onChangeText={setUsername} placeholder="Username/Employee ID" placeholderTextColor="#8f8ba8" style={styles.loginInput} />
                <Text style={[styles.label,{marginTop:10}]}>Password</Text>
                <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#8f8ba8" secureTextEntry style={styles.loginInput} />
                {Boolean(error) && <Text style={styles.error}>{error}</Text>}
                <Pressable>
                  <Text style={styles.link}>Forgot password?</Text>
                </Pressable>
                <Pressable style={styles.loginPrimary} onPress={handleDemoLogin}>
                  <Text style={styles.primaryText}>Sign In</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:{ flex:1, backgroundColor:'#e9eaee' },
  page:{ flex:1, backgroundColor:'#e9eaee' },
  loginPage:{ backgroundColor:'#d7d7da' },
  shell:{ flex:1, flexDirection:'row', backgroundColor:'#2a2438' },
  sidebar:{ width:240, backgroundColor:'#262233', padding:16 },
  sidebarBrand:{ color:'#eee', fontWeight:'800', fontSize:14, lineHeight:18, marginBottom:10 },
  sidebarItem:{ backgroundColor:'#2d2a3a', borderRadius:8, paddingVertical:14, paddingHorizontal:12, marginVertical:10 },
  sidebarItemActive:{ backgroundColor:'#4b46a2' },
  sidebarItemText:{ color:'#cfcbe4', fontWeight:'700', fontSize:12 },
  avatarFloating:{ position:'absolute', top:8, left:230, width:28, height:28, borderRadius:14, backgroundColor:'#cfcfd6', alignItems:'center', justifyContent:'center' },
  content:{ flex:1, padding:18 },
  topbar:{ height:34, flexDirection:'row', alignItems:'center', gap:12, marginBottom:12 },
  searchbar:{ height:28, backgroundColor:'#3a3650', borderRadius:6, flex:1 },
  split:{ gap:12 },
  imagePanel:{ height:240, backgroundColor:'#fff', borderRadius:12, overflow:'hidden', marginBottom:12 },
  image:{ width:'100%', height:'100%' },
  formPanel:{ alignItems:'center' },
  njHeader:{ alignItems:'center', marginBottom:12 },
  njLogo:{ width:157, height:176, resizeMode:'contain' },
  njTitle:{ color:'#2e4b7a', fontWeight:'800', letterSpacing:0.2, fontSize:18, textAlign:'center', marginTop:8 },
  njSignin:{ color:'#e29a3b', fontSize:28, fontWeight:'800', marginTop:4 },
  signinCard:{ backgroundColor:'#fff', borderRadius:10, padding:16, width:'92%', maxWidth:429, borderWidth:1, borderColor:'#e3e3ea' },
  loginInput:{ backgroundColor:'#fff', borderRadius:8, paddingHorizontal:12, paddingVertical:10, color:'#1f1b2b', borderWidth:1, borderColor:'#e3e3ea' },
  loginPrimary:{ backgroundColor:'#3b5ba8', paddingVertical:12, borderRadius:10, marginTop:10, alignItems:'center' },
  brand:{ color:'#d7d2e9', fontWeight:'700', marginTop:4, marginBottom:10 },
  card:{ backgroundColor:'#2d2a3a', borderRadius:10, padding:16 },
  title:{ color:'#fff', fontSize:26, fontWeight:'800', marginBottom:10 },
  label:{ color:'#c1bdd3', fontSize:14, marginBottom:6 },
  input:{ backgroundColor:'#fff', borderRadius:8, paddingHorizontal:12, paddingVertical:10, color:'#1f1b2b' },
  searchRow:{ flexDirection:'row', gap:8, alignItems:'center', marginBottom:8 },
  searchInput:{ flex:1, backgroundColor:'#fff', borderRadius:10, paddingHorizontal:12, paddingVertical:10, color:'#1f1b2b' },
  filterCard:{ backgroundColor:'#f3f4f8', borderRadius:10, padding:10, marginBottom:8, borderWidth:1, borderColor:'#e5e7eb' },
  link:{ color:'#9f99c5', textDecorationLine:'underline', marginTop:8 },
  primary:{ backgroundColor:'#5b54d9', paddingVertical:12, borderRadius:10, marginTop:10, alignItems:'center' },
  primaryText:{ color:'#fff', fontWeight:'700' },
  error:{ color:'#ff7b7b', marginTop:6 },
  headerRow:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12 },
  headerTitle:{ color:'#fff', fontSize:22, fontWeight:'800' },
  signOutText:{ color:'#9f99c5', textDecorationLine:'underline' },
  statRow:{ flexDirection:'row', gap:12, marginBottom:12 },
  statCard:{ flex:1, backgroundColor:'#fff', borderRadius:10, padding:14, borderWidth:1, borderColor:'#e5e7eb' },
  statNum:{ color:'#2e4b7a', fontSize:22, fontWeight:'800' },
  statLabel:{ color:'#4b5563', fontSize:12, marginTop:4 },
  panel:{ backgroundColor:'#fff', borderRadius:10, padding:14, marginBottom:12, borderWidth:1, borderColor:'#e5e7eb' },
  panelTitle:{ color:'#2e4b7a', fontWeight:'800', marginBottom:8 },
  panelHeader:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:8 },
  btn:{ backgroundColor:'#3b5ba8', borderRadius:8, paddingHorizontal:14, paddingVertical:8 },
  btnText:{ color:'#fff', fontWeight:'800' },
  actionRow:{ flexDirection:'row', gap:8 },
  chipBtn:{ paddingHorizontal:12, paddingVertical:8, borderRadius:8 },
  chipText:{ color:'#fff', fontWeight:'700' },
  chipTextDark:{ color:'#1f2b3a', fontWeight:'700' },
  secondaryChip:{ backgroundColor:'#f3f4f8', borderWidth:1, borderColor:'#e5e7eb' },
  darkChip:{ backgroundColor:'#3b5ba8' },
  drawerWelcome:{ color:'#6b7280', marginLeft:16, marginBottom:6 },
  navItem:{ backgroundColor:'#fff', borderRadius:8, marginHorizontal:16, marginVertical:8, borderWidth:1, borderColor:'#e5e7eb' },
  navItemActive:{ backgroundColor:'#3b5ba8', borderColor:'#3b5ba8' },
  navLabel:{ color:'#2e4b7a', fontWeight:'700', textTransform:'uppercase', fontSize:12 },
  navLabelActive:{ color:'#ffc700', fontWeight:'700', textTransform:'uppercase', fontSize:12 },
  legendRow:{ flexDirection:'row', alignItems:'center', marginBottom:8 },
  legendDot:{ width:12, height:12, borderRadius:6 },
  legendText:{ color:'#4b5563', fontSize:12, marginLeft:6 },
  donutWrap:{ alignItems:'center', justifyContent:'center', paddingVertical:8 },
  listItem:{ paddingVertical:8, borderBottomColor:'#e5e7eb', borderBottomWidth:1 },
  bars:{ flexDirection:'row', alignItems:'flex-end', gap:18, height:160, backgroundColor:'#f3f4f8', borderRadius:8, paddingHorizontal:12 },
  bar:{ width:24, backgroundColor:'#3b5ba8', borderTopLeftRadius:6, borderTopRightRadius:6 },
  barLabels:{ flexDirection:'row', justifyContent:'space-around', marginTop:6 },
  barLabelText:{ color:'#4b5563', fontSize:12 },
  tableRow:{ flexDirection:'row', borderBottomColor:'#e5e7eb', borderBottomWidth:1, paddingVertical:8 },
  tableHeader:{ borderBottomColor:'#e5e7eb', borderBottomWidth:2 },
  tableHeaderText:{ color:'#2e4b7a', fontWeight:'800', fontSize:12, paddingRight:8 },
  tableCell:{ color:'#1f2b3a', fontSize:12, paddingRight:8 },
  itemCard:{ backgroundColor:'#fff', borderRadius:10, padding:12, marginBottom:10, borderWidth:1, borderColor:'#e5e7eb' },
  itemTitle:{ color:'#1f2b3a', fontWeight:'800', marginBottom:6 },
  itemRow:{ flexDirection:'row', justifyContent:'space-between', marginBottom:4 },
  itemLabel:{ color:'#6b7280' },
  itemValue:{ color:'#1f2b3a', fontWeight:'600' },
  severityMinor:{ color:'#f3c623', fontWeight:'800' },
  severityMajor:{ color:'#2fbf4a', fontWeight:'800' },
  statusPending:{ color:'#ff2e2e', fontWeight:'800' },
  statusNotified:{ color:'#2fbf4a', fontWeight:'800' },
  modalOverlay:{ flex:1, backgroundColor:'rgba(0,0,0,0.4)', alignItems:'center', justifyContent:'center', padding:16 },
  modalCard:{ backgroundColor:'#fff', borderRadius:12, width:'100%', maxWidth:600 },
  modalHeader:{ padding:12, borderBottomWidth:1, borderBottomColor:'#e5e7eb', flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  modalTitle:{ color:'#2e4b7a', fontWeight:'800' },
  modalBody:{ padding:12, backgroundColor:'#f5f5f8', borderBottomLeftRadius:12, borderBottomRightRadius:12 },
  detailsCard:{ backgroundColor:'#fff', borderWidth:1, borderColor:'#e5e7eb', borderRadius:8, padding:10, marginBottom:8 },
  detailRow:{ flexDirection:'row', justifyContent:'space-between', marginBottom:4 },
  detailLabel:{ color:'#6b7280', fontWeight:'700' },
  detailValue:{ color:'#1f2b3a' },
  select:{ backgroundColor:'#fff', borderColor:'#e5e7eb', borderWidth:1, borderRadius:8, paddingHorizontal:12, paddingVertical:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8 },
  selectText:{ color:'#37354a', fontWeight:'700' },
  selectChevron:{ color:'#37354a' },
  textarea:{ backgroundColor:'#fff', borderColor:'#e5e7eb', borderWidth:1, borderRadius:8, paddingHorizontal:12, paddingVertical:10, color:'#37354a', minHeight:120, textAlignVertical:'top' },
  modalFooter:{ flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:10 },
  inputLight:{ backgroundColor:'#fff', borderColor:'#e5e7eb', borderWidth:1, borderRadius:8, paddingHorizontal:12, paddingVertical:10, color:'#37354a', marginTop:8 },
  hint:{ color:'#6b6a78', marginBottom:6 },
  dropdown:{ backgroundColor:'#fff', borderRadius:8, elevation:3, shadowColor:'#000', shadowOpacity:.15, shadowOffset:{width:0, height:2}, shadowRadius:6, marginTop:6 },
  dropdownItem:{ paddingHorizontal:12, paddingVertical:10, borderBottomWidth:1, borderBottomColor:'#eee' },
  dropdownText:{ color:'#37354a' }
})

export default App


