// Simple demo app.js
// For production, replace localStorage flow with Firestore / REST API.

// --- Sample hospitals (in real app fetch from DB) ---
const hospitals = [
  { id: "h1", name: "Govt Hospital - Kadapa", depts: ["General", "Pediatrics", "OPD"] },
  { id: "h2", name: "City Clinic - Peddapashapula", depts: ["General", "ENT", "Dental"] }
];

const hospitalSelect = document.getElementById('hospitalSelect');
const deptSelect = document.getElementById('deptSelect');
const tokensList = document.getElementById('tokensList');

function populateHospitals(){
  hospitals.forEach(h=>{
    const opt = document.createElement('option');
    opt.value = h.id; opt.textContent = h.name;
    hospitalSelect.appendChild(opt);
  });
  populateDepartments(hospitals[0].id);
}

function populateDepartments(hId){
  deptSelect.innerHTML = '';
  const h = hospitals.find(x=>x.id===hId);
  h.depts.forEach(d=>{
    const opt = document.createElement('option');
    opt.value = d; opt.textContent = d;
    deptSelect.appendChild(opt);
  });
}

hospitalSelect.addEventListener('change', e=>{
  populateDepartments(e.target.value);
});

document.getElementById('bookBtn').addEventListener('click', ()=>{
  const name = document.getElementById('patientName').value.trim();
  const phone = document.getElementById('patientPhone').value.trim();
  const hospitalId = hospitalSelect.value;
  const dept = deptSelect.value;
  if(!name || !phone){ alert('దయచేసి పేరు మరియు ఫోన్ ఇవ్వండి'); return; }

  // create token object
  const tokens = JSON.parse(localStorage.getItem('tokens_demo')||'[]');
  const token = {
    id: 'T'+Date.now(),
    name, phone, hospitalId, dept,
    created: new Date().toISOString()
  };
  tokens.push(token);
  localStorage.setItem('tokens_demo', JSON.stringify(tokens));
  renderTokens();
  alert('టోకెన్ బుక్ అయింది: '+token.id);
});

// render tokens
function renderTokens(){
  const tokens = JSON.parse(localStorage.getItem('tokens_demo')||'[]');
  tokensList.innerHTML = '';
  tokens.slice().reverse().forEach(t=>{
    const li = document.createElement('li');
    const hospital = hospitals.find(h=>h.id===t.hospitalId);
    li.textContent = `${t.id} — ${t.name} — ${hospital?hospital.name:''} — ${t.dept} — ${new Date(t.created).toLocaleString()}`;
    tokensList.appendChild(li);
  });
}

// --- Firebase integration (OPTIONAL) ---
// If you want to use Firebase Firestore, create a Firebase project and replace the config below.
// Example:
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "PROJECT.firebaseapp.com",
//   projectId: "PROJECT_ID",
//   storageBucket: "PROJECT.appspot.com",
//   messagingSenderId: "SENDER_ID",
//   appId: "APP_ID"
// };
// Then initialize firebase and push tokens to a `tokens` collection instead of localStorage.

// *** End of demo ***
populateHospitals();
renderTokens();
