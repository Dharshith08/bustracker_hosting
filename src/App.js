import { useState } from "react";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

  :root {
    --navy:   #0A1628;
    --blue:   #1A4FBB;
    --sky:    #2E7CF6;
    --orange: #F97316;
    --amber:  #FBBF24;
    --white:  #F8FAFF;
    --glass:  rgba(255,255,255,0.06);
    --glass2: rgba(255,255,255,0.12);
    --border: rgba(255,255,255,0.10);
    --text:   #E2E8F8;
    --muted:  #8899BB;
    --green:  #22C55E;
    --red:    #EF4444;
    --card:   rgba(14,24,50,0.85);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--navy);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app-shell {
    max-width: 430px;
    min-height: 100vh;
    margin: 0 auto;
    background: var(--navy);
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .bg-grid {
    position: fixed;
    inset: 0;
    max-width: 430px;
    margin: 0 auto;
    background-image:
      linear-gradient(rgba(46,124,246,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(46,124,246,0.05) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    z-index: 0;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(16px);
    background: rgba(10,22,40,0.88);
    border-bottom: 1px solid var(--border);
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-logo { display: flex; align-items: center; gap: 10px; }
  .header-logo .icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--sky), var(--orange));
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .header-logo .brand {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 17px; letter-spacing: -0.3px;
  }
  .header-logo .brand span { color: var(--orange); }

  .avatar {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--blue), var(--sky));
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 600;
    border: 2px solid var(--orange);
    cursor: pointer;
  }

  .bottom-nav {
    position: sticky; bottom: 0; z-index: 50;
    background: rgba(10,22,40,0.95);
    border-top: 1px solid var(--border);
    backdrop-filter: blur(16px);
    display: flex; padding: 8px 0 12px;
  }
  .nav-item {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; gap: 4px;
    cursor: pointer; padding: 6px 0;
    transition: all 0.2s; position: relative;
  }
  .nav-item .nav-icon { font-size: 22px; transition: transform 0.2s; }
  .nav-item .nav-label {
    font-size: 10px; font-weight: 500;
    color: var(--muted); transition: color 0.2s;
  }
  .nav-item.active .nav-label { color: var(--orange); }
  .nav-item.active .nav-icon { transform: translateY(-2px); }
  .nav-item.active::after {
    content: ''; position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: 32px; height: 2px;
    background: var(--orange); border-radius: 0 0 4px 4px;
  }

  .screen {
    flex: 1; overflow-y: auto;
    padding: 20px 20px 16px;
    position: relative; z-index: 1;
  }
  .screen::-webkit-scrollbar { width: 0; }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px; padding: 18px;
    backdrop-filter: blur(8px); margin-bottom: 14px;
  }
  .card-title {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 13px; color: var(--muted);
    text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;
  }

  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 99px;
    font-size: 11px; font-weight: 600;
  }
  .badge-green  { background: rgba(34,197,94,0.15);  color: var(--green); }
  .badge-orange { background: rgba(249,115,22,0.18); color: var(--orange); }
  .badge-red    { background: rgba(239,68,68,0.15);  color: var(--red); }
  .badge-blue   { background: rgba(46,124,246,0.18); color: var(--sky); }
  .badge-amber  { background: rgba(251,191,36,0.18); color: var(--amber); }

  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 600;
    border-radius: 12px; transition: all 0.2s;
    width: 100%; padding: 14px; font-size: 15px;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--sky), var(--blue));
    color: white; box-shadow: 0 4px 20px rgba(46,124,246,0.35);
  }
  .btn-primary:hover { transform: translateY(-1px); }
  .btn-orange {
    background: linear-gradient(135deg, var(--orange), #EA580C);
    color: white; box-shadow: 0 4px 20px rgba(249,115,22,0.35);
  }
  .btn-ghost {
    background: var(--glass2); color: var(--text);
    border: 1px solid var(--border);
  }

  .input-wrap { margin-bottom: 14px; }
  .input-label {
    display: block; font-size: 12px; font-weight: 500;
    color: var(--muted); margin-bottom: 6px;
  }
  .input {
    width: 100%; background: var(--glass);
    border: 1px solid var(--border); border-radius: 12px;
    padding: 13px 16px; color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input:focus {
    border-color: var(--sky);
    box-shadow: 0 0 0 3px rgba(46,124,246,0.15);
  }
  .input::placeholder { color: var(--muted); }
  select.input { appearance: none; cursor: pointer; }

  .progress-track {
    height: 6px; background: var(--glass2);
    border-radius: 99px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, var(--sky), var(--orange));
    transition: width 0.6s ease;
  }

  .bus-row {
    display: flex; align-items: center; gap: 14px;
    padding: 14px; background: var(--glass);
    border: 1px solid var(--border); border-radius: 14px;
    margin-bottom: 10px; cursor: pointer; transition: all 0.2s;
  }
  .bus-row:hover { background: var(--glass2); border-color: rgba(46,124,246,0.3); }
  .bus-num {
    min-width: 52px; height: 52px;
    background: linear-gradient(135deg, var(--blue), var(--sky));
    border-radius: 12px; display: flex; align-items: center;
    justify-content: center; font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 16px;
  }
  .bus-info { flex: 1; }
  .bus-route { font-weight: 600; font-size: 14px; margin-bottom: 3px; }
  .bus-sub { font-size: 12px; color: var(--muted); }
  .bus-eta { text-align: right; font-family: 'Syne', sans-serif; font-weight: 700; }
  .bus-eta .mins { font-size: 22px; color: var(--amber); line-height: 1; }
  .bus-eta .label { font-size: 10px; color: var(--muted); font-family: 'DM Sans', sans-serif; }

  .live-dot {
    width: 8px; height: 8px; background: var(--green);
    border-radius: 50%; display: inline-block;
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
    50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
  }

  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
  .stat-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 16px;
  }
  .stat-num {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 28px; line-height: 1; margin-bottom: 4px;
  }
  .stat-lbl { font-size: 12px; color: var(--muted); }

  .map-area {
    background: linear-gradient(145deg, #0d1e3a, #0a2240);
    border: 1px solid var(--border); border-radius: 16px;
    height: 260px; position: relative; overflow: hidden; margin-bottom: 14px;
  }
  .map-roads {
    position: absolute; inset: 0; opacity: 0.3;
    background-image:
      linear-gradient(var(--sky) 1px, transparent 1px),
      linear-gradient(90deg, var(--sky) 1px, transparent 1px),
      linear-gradient(rgba(46,124,246,0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(46,124,246,0.3) 1px, transparent 1px);
    background-size: 60px 60px, 60px 60px, 15px 15px, 15px 15px;
  }
  .map-bus-dot {
    position: absolute; width: 14px; height: 14px;
    background: var(--orange); border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 4px rgba(249,115,22,0.3);
    animation: float 3s ease-in-out infinite;
  }
  @keyframes float {
    0%,100% { transform: translate(0,0); }
    50%      { transform: translate(4px,-4px); }
  }
  .map-you-dot {
    position: absolute; width: 14px; height: 14px;
    background: var(--sky); border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 8px rgba(46,124,246,0.2);
  }
  .map-route-line {
    position: absolute; background: var(--orange);
    height: 2px; border-radius: 2px; opacity: 0.6;
    transform-origin: left center;
  }
  .map-stop-dot {
    position: absolute; width: 8px; height: 8px;
    background: white; border-radius: 50%;
    border: 2px solid var(--sky);
  }
  .map-overlay {
    position: absolute; top: 12px; left: 12px;
    background: rgba(10,22,40,0.85); backdrop-filter: blur(8px);
    border: 1px solid var(--border); border-radius: 10px;
    padding: 8px 12px; font-size: 11px;
    display: flex; align-items: center; gap: 6px;
  }
  .map-zoom-btn {
    width: 32px; height: 32px;
    background: rgba(10,22,40,0.85); backdrop-filter: blur(8px);
    border: 1px solid var(--border); border-radius: 8px;
    color: var(--text); font-size: 18px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  }

  .step-wrap { display: flex; align-items: center; margin-bottom: 24px; }
  .step-circle {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; transition: all 0.3s; flex-shrink: 0;
  }
  .step-circle.done { background: var(--green); color: white; }
  .step-circle.active {
    background: linear-gradient(135deg, var(--sky), var(--blue));
    color: white; box-shadow: 0 0 0 4px rgba(46,124,246,0.2);
  }
  .step-circle.pending {
    background: var(--glass2); color: var(--muted);
    border: 1px solid var(--border);
  }
  .step-line { flex: 1; height: 2px; background: var(--border); margin: 0 8px; }
  .step-line.done { background: var(--green); }

  .status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .status-opt {
    background: var(--glass); border: 2px solid var(--border);
    border-radius: 12px; padding: 14px 10px;
    text-align: center; cursor: pointer; transition: all 0.2s;
  }
  .status-opt.selected { border-color: var(--orange); background: rgba(249,115,22,0.1); }
  .status-opt .s-icon { font-size: 24px; margin-bottom: 6px; }
  .status-opt .s-label { font-size: 12px; font-weight: 600; }

  .hist-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px; background: var(--glass);
    border: 1px solid var(--border); border-radius: 14px; margin-bottom: 10px;
  }
  .hist-icon {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .hist-icon.report { background: rgba(249,115,22,0.15); }
  .hist-icon.view   { background: rgba(46,124,246,0.15); }
  .hist-meta { flex: 1; }
  .hist-title { font-weight: 600; font-size: 14px; margin-bottom: 2px; }
  .hist-time  { font-size: 11px; color: var(--muted); }
  .hist-pts   { font-family: 'Syne',sans-serif; font-weight: 700; font-size: 14px; color: var(--amber); }

  .login-hero { text-align: center; padding: 40px 0 32px; }
  .login-icon-wrap {
    width: 88px; height: 88px;
    background: linear-gradient(135deg, var(--sky), var(--orange));
    border-radius: 24px; display: flex; align-items: center;
    justify-content: center; font-size: 44px;
    margin: 0 auto 20px;
    box-shadow: 0 12px 40px rgba(46,124,246,0.35);
    animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes popIn {
    0%   { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1);   opacity: 1; }
  }
  .login-title {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px;
    margin-bottom: 8px;
    background: linear-gradient(135deg, var(--white), var(--sky));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .login-subtitle { font-size: 14px; color: var(--muted); line-height: 1.5; }

  .otp-row { display: flex; gap: 10px; }
  .otp-input {
    width: 100%; background: var(--glass);
    border: 1px solid var(--border); border-radius: 12px;
    padding: 16px 0; color: var(--text);
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 22px; text-align: center; outline: none; transition: all 0.2s;
  }
  .otp-input:focus { border-color: var(--sky); box-shadow: 0 0 0 3px rgba(46,124,246,0.15); }

  .sec-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .sec-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; }
  .sec-action { font-size: 12px; color: var(--sky); cursor: pointer; }

  .trust-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .trust-label { font-size: 12px; color: var(--muted); min-width: 90px; }
  .trust-track { flex: 1; height: 5px; background: var(--glass2); border-radius: 99px; overflow: hidden; }
  .trust-fill  { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--sky), var(--green)); }
  .trust-val   { font-size: 12px; font-weight: 600; min-width: 32px; text-align: right; }

  .conf-ring {
    width: 64px; height: 64px; border-radius: 50%;
    background: conic-gradient(var(--green) 0%, var(--green) var(--pct), var(--glass2) var(--pct));
    display: flex; align-items: center; justify-content: center;
  }
  .conf-inner {
    width: 48px; height: 48px; border-radius: 50%;
    background: var(--navy); display: flex;
    align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px;
  }

  .success-anim { text-align: center; padding: 24px 0; animation: fadeUp 0.4s ease; }
  .success-icon { font-size: 56px; display: block; margin-bottom: 16px; animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1); }
  .success-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; margin-bottom: 8px; }

  .notif-dot {
    position: absolute; top: 2px; right: 2px;
    width: 8px; height: 8px; background: var(--orange);
    border-radius: 50%; border: 1px solid var(--navy);
  }
  .divider { height: 1px; background: var(--border); margin: 16px 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeUp 0.35s ease forwards; }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const BUSES = [
  { id:"47A", route:"Central → Madurai South",      last:"Stop 4 — Anna Nagar",   eta:6,  status:"on-time",   confidence:92, reports:14 },
  { id:"15B", route:"Bus Stand → College Road",      last:"Stop 2 — Main Market",  eta:11, status:"delayed",   confidence:78, reports:8  },
  { id:"23",  route:"Periyar Bus Stand → Airport",   last:"Stop 6 — Bypass Rd",   eta:3,  status:"crowded",   confidence:88, reports:21 },
  { id:"8C",  route:"Town Hall → Palanganatham",     last:"Stop 1 — Town Hall",    eta:18, status:"on-time",   confidence:65, reports:5  },
];

const STOPS = [
  "Anna Nagar","Main Market","Bypass Road","Town Hall",
  "Meenakshi Nagar","College Road","Central Bus Stand","Airport Junction"
];

const HISTORY = [
  { type:"report", bus:"47A", stop:"Anna Nagar",       time:"2 mins ago",  pts:10 },
  { type:"view",   bus:"15B", stop:"Main Market",      time:"18 mins ago", pts:0  },
  { type:"report", bus:"23",  stop:"Bypass Road",      time:"1 hr ago",    pts:10 },
  { type:"report", bus:"8C",  stop:"Town Hall",        time:"3 hrs ago",   pts:10 },
  { type:"view",   bus:"47A", stop:"College Road",     time:"5 hrs ago",   pts:0  },
  { type:"report", bus:"15B", stop:"Meenakshi Nagar",  time:"Yesterday",   pts:10 },
];

const STATUS_OPTS = [
  { key:"on-time",   icon:"✅", label:"On Time"   },
  { key:"delayed",   icon:"⏰", label:"Delayed"    },
  { key:"crowded",   icon:"👥", label:"Crowded"    },
  { key:"breakdown", icon:"🔧", label:"Breakdown"  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function statusBadge(s) {
  if (s==="on-time")   return <span className="badge badge-green">✅ On Time</span>;
  if (s==="delayed")   return <span className="badge badge-orange">⏰ Delayed</span>;
  if (s==="crowded")   return <span className="badge badge-amber">👥 Crowded</span>;
  if (s==="breakdown") return <span className="badge badge-red">🔧 Breakdown</span>;
  return null;
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["","","","",""]);

  const handleOtp = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const n = [...otp]; n[i] = v; setOtp(n);
    if (v && i < 4) document.getElementById(`otp${i+1}`)?.focus();
  };

  return (
    <div className="screen fade-in">
      <div className="login-hero">
        <div className="login-icon-wrap">🚌</div>
        <div className="login-title">BusTrackr</div>
        <div className="login-subtitle">Community-powered bus tracking.<br/>No GPS needed — just your tap.</div>
      </div>

      {step === 0 ? (
        <div className="card fade-in">
          <div className="card-title">Sign In</div>
          <div className="input-wrap">
            <label className="input-label">Mobile Number</label>
            <input className="input" placeholder="+91 98765 43210"
              value={phone} onChange={e => setPhone(e.target.value)} maxLength={13} />
          </div>
          <button className="btn btn-primary" onClick={() => setStep(1)}>📲 Send OTP</button>
          <div className="divider"/>
          <div style={{textAlign:"center",fontSize:12,color:"var(--muted)"}}>No account? OTP auto-creates one.</div>
        </div>
      ) : (
        <div className="card fade-in">
          <div className="card-title">Enter OTP</div>
          <div style={{fontSize:13,color:"var(--muted)",marginBottom:16}}>Sent to {phone || "+91 98765 43210"}</div>
          <div className="otp-row" style={{marginBottom:20}}>
            {otp.map((v,i) => (
              <input key={i} id={`otp${i}`} className="otp-input"
                maxLength={1} value={v} onChange={e => handleOtp(i, e.target.value)} />
            ))}
          </div>
          <button className="btn btn-primary" onClick={onLogin}>✅ Verify & Enter</button>
          <div style={{textAlign:"center",marginTop:12}}>
            <span style={{fontSize:12,color:"var(--sky)",cursor:"pointer"}} onClick={()=>setStep(0)}>← Change number</span>
          </div>
        </div>
      )}

      <div className="card" style={{marginTop:8}}>
        <div className="card-title">Why Join?</div>
        {[["🚌","Real-time ETA","Know exactly when your bus arrives"],
          ["📍","Live Map","See bus locations on an interactive map"],
          ["🏆","Earn Points","Get rewards for reporting bus movements"]
        ].map(([ic,t,d]) => (
          <div key={t} style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
            <span style={{fontSize:24}}>{ic}</span>
            <div>
              <div style={{fontWeight:600,fontSize:14}}>{t}</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Dashboard Screen ─────────────────────────────────────────────────────────
function DashboardScreen({ onSelectBus }) {
  const [search, setSearch] = useState("");
  const filtered = BUSES.filter(b =>
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.route.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="screen fade-in">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <div style={{fontSize:13,color:"var(--muted)"}}>Good morning 👋</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22}}>Live Buses</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span className="live-dot"></span>
          <span style={{fontSize:12,color:"var(--green)"}}>4 Active</span>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-num" style={{color:"var(--sky)"}}>4</div>
          <div className="stat-lbl">Buses Live</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{color:"var(--orange)"}}>47</div>
          <div className="stat-lbl">Reports Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{color:"var(--green)"}}>6</div>
          <div className="stat-lbl">Avg ETA (min)</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{color:"var(--amber)"}}>230</div>
          <div className="stat-lbl">My Points 🏆</div>
        </div>
      </div>

      <div className="input-wrap">
        <input className="input" placeholder="🔍  Search bus number or route…"
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="sec-head">
        <div className="sec-title">Nearby Buses</div>
        <div className="sec-action">See all</div>
      </div>

      {filtered.map(bus => (
        <div className="bus-row" key={bus.id} onClick={() => onSelectBus(bus)}>
          <div className="bus-num">{bus.id}</div>
          <div className="bus-info">
            <div className="bus-route">{bus.route}</div>
            <div className="bus-sub">📍 {bus.last}</div>
            <div style={{marginTop:5}}>{statusBadge(bus.status)}</div>
          </div>
          <div className="bus-eta">
            <div className="mins">{bus.eta}</div>
            <div className="label">min</div>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{textAlign:"center",padding:"32px 0",color:"var(--muted)"}}>
          <div style={{fontSize:32,marginBottom:8}}>🔍</div>
          No buses match your search
        </div>
      )}
    </div>
  );
}

// ─── Map Screen ───────────────────────────────────────────────────────────────
function MapScreen({ selectedBus }) {
  const bus = selectedBus || BUSES[0];
  return (
    <div className="screen fade-in">
      <div style={{marginBottom:16}}>
        <div style={{fontSize:13,color:"var(--muted)"}}>Live Map</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22}}>
          Bus {bus.id} — {bus.route.split("→")[0].trim()}
        </div>
      </div>

      <div className="map-area">
        <div className="map-roads" />
        <div className="map-route-line" style={{top:140,left:40,width:300,transform:"rotate(-12deg)"}} />
        {[[60,130],[130,110],[200,105],[270,115],[330,128]].map(([x,y],i) => (
          <div key={i} className="map-stop-dot" style={{left:x,top:y}} />
        ))}
        <div className="map-bus-dot" style={{left:185,top:95}} />
        <div className="map-you-dot" style={{left:280,top:110}} />
        <div className="map-overlay">
          <span className="live-dot" />
          <span style={{color:"var(--green)",fontWeight:600}}>LIVE</span>
          <span style={{marginLeft:8,color:"var(--muted)"}}>Updated 12s ago</span>
        </div>
        <div style={{
          position:"absolute",bottom:12,left:12,
          background:"rgba(10,22,40,0.85)",backdropFilter:"blur(8px)",
          border:"1px solid var(--border)",borderRadius:10,
          padding:"6px 10px",display:"flex",gap:14,fontSize:11
        }}>
          <span>🟠 Bus {bus.id}</span>
          <span>🔵 You</span>
          <span>⚪ Stop</span>
        </div>
        <div style={{position:"absolute",right:12,bottom:12,display:"flex",flexDirection:"column",gap:6}}>
          <div className="map-zoom-btn">+</div>
          <div className="map-zoom-btn">−</div>
        </div>
      </div>

      <div className="card">
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
          <div className="bus-num">{bus.id}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:15}}>{bus.route}</div>
            <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>📍 {bus.last}</div>
          </div>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:28,color:"var(--amber)",lineHeight:1}}>{bus.eta}</div>
            <div style={{fontSize:10,color:"var(--muted)"}}>min away</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {statusBadge(bus.status)}
          <span className="badge badge-blue">👥 {bus.reports} reports</span>
        </div>
        <div className="card-title">Confidence Score</div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div className="conf-ring" style={{"--pct":`${bus.confidence}%`}}>
            <div className="conf-inner">{bus.confidence}%</div>
          </div>
          <div style={{flex:1}}>
            {[["Reports (24hr)",bus.reports,30],["User accuracy","89%","89%"],["Freshness","12s","100%"]].map(([l,v,p]) => (
              <div className="trust-row" key={l}>
                <span className="trust-label">{l}</span>
                <div className="trust-track">
                  <div className="trust-fill" style={{width:typeof p==="number"?`${Math.min(p/30*100,100)}%`:p}} />
                </div>
                <span className="trust-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Route Stops</div>
        {STOPS.slice(0,6).map((s,i) => (
          <div key={s} style={{
            display:"flex",alignItems:"center",gap:12,padding:"8px 0",
            borderBottom:i<5?"1px solid var(--border)":"none"
          }}>
            <div style={{
              width:24,height:24,borderRadius:"50%",
              background:i<2?"var(--green)":i===2?"var(--orange)":"var(--glass2)",
              border:i===2?"none":"1px solid var(--border)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:10,fontWeight:700,flexShrink:0,
              color:i<2?"white":i===2?"white":"var(--muted)"
            }}>{i<2?"✓":i===2?"🚌":i+1}</div>
            <span style={{
              fontSize:13,
              color:i===2?"var(--orange)":i<2?"var(--muted)":"var(--text)",
              fontWeight:i===2?600:400
            }}>{s}</span>
            {i===2 && <span className="badge badge-orange" style={{marginLeft:"auto",fontSize:10}}>HERE</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Report Screen ────────────────────────────────────────────────────────────
function ReportScreen() {
  const [step, setStep] = useState(0);
  const [busId, setBusId] = useState("");
  const [stop, setStop] = useState("");
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setStep(0); setBusId(""); setStop(""); setStatus(""); }, 3000);
  };

  if (submitted) {
    return (
      <div className="screen">
        <div className="success-anim">
          <span className="success-icon">🎉</span>
          <div className="success-title">Report Submitted!</div>
          <div style={{color:"var(--muted)",fontSize:14,marginBottom:24}}>
            You just helped {Math.floor(Math.random()*20)+5} commuters nearby.
          </div>
          <div className="card" style={{textAlign:"left"}}>
            <div className="card-title">You Earned</div>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <span style={{fontSize:40}}>🏆</span>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:28,color:"var(--amber)"}}>+10 pts</div>
                <div style={{fontSize:13,color:"var(--muted)"}}>Total: 240 pts — Rank #12</div>
              </div>
            </div>
          </div>
          <div style={{marginTop:16}}>
            <div className="progress-track">
              <div className="progress-fill" style={{width:"48%"}} />
            </div>
            <div style={{fontSize:11,color:"var(--muted)",marginTop:6}}>240 / 500 pts to next rank</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen fade-in">
      <div style={{marginBottom:20}}>
        <div style={{fontSize:13,color:"var(--muted)"}}>Contribute</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22}}>Report a Bus</div>
      </div>

      <div className="step-wrap">
        {["Bus & Stop","Status","Confirm"].map((lbl,i) => (
          <div key={lbl} style={{display:"contents"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div className={`step-circle ${i<step?"done":i===step?"active":"pending"}`}>
                {i<step?"✓":i+1}
              </div>
              <div style={{fontSize:9,color:i===step?"var(--sky)":"var(--muted)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{lbl}</div>
            </div>
            {i<2 && <div className={`step-line ${i<step?"done":""}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="fade-in">
          <div className="card">
            <div className="card-title">Step 1 — Bus & Stop</div>
            <div className="input-wrap">
              <label className="input-label">Bus Number</label>
              <select className="input" value={busId} onChange={e=>setBusId(e.target.value)}>
                <option value="">Select bus…</option>
                {BUSES.map(b=><option key={b.id} value={b.id}>Bus {b.id} — {b.route}</option>)}
              </select>
            </div>
            <div className="input-wrap">
              <label className="input-label">Current Stop</label>
              <select className="input" value={stop} onChange={e=>setStop(e.target.value)}>
                <option value="">Select stop…</option>
                {STOPS.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button className="btn btn-primary" disabled={!busId||!stop}
            style={{opacity:busId&&stop?1:0.4}} onClick={()=>setStep(1)}>
            Continue →
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="fade-in">
          <div className="card">
            <div className="card-title">Step 2 — Bus Status</div>
            <div className="status-grid">
              {STATUS_OPTS.map(o => (
                <div key={o.key} className={`status-opt ${status===o.key?"selected":""}`}
                  onClick={()=>setStatus(o.key)}>
                  <div className="s-icon">{o.icon}</div>
                  <div className="s-label">{o.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button className="btn btn-ghost" style={{flex:1}} onClick={()=>setStep(0)}>← Back</button>
            <button className="btn btn-primary" style={{flex:2,opacity:status?1:0.4}}
              disabled={!status} onClick={()=>setStep(2)}>Continue →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="fade-in">
          <div className="card">
            <div className="card-title">Step 3 — Confirm Report</div>
            {[["🚌","Bus",`Bus ${busId}`],["📍","Stop",stop],
              ["📊","Status",STATUS_OPTS.find(o=>o.key===status)?.label||""],
              ["⏰","Time","Now"]
            ].map(([ic,lbl,val]) => (
              <div key={lbl} style={{
                display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"10px 0",borderBottom:"1px solid var(--border)"
              }}>
                <span style={{fontSize:13,color:"var(--muted)"}}>{ic} {lbl}</span>
                <span style={{fontSize:14,fontWeight:600}}>{val}</span>
              </div>
            ))}
            <div style={{
              marginTop:14,padding:12,
              background:"rgba(249,115,22,0.08)",
              borderRadius:10,border:"1px solid rgba(249,115,22,0.2)",
              fontSize:13,color:"var(--muted)",textAlign:"center"
            }}>
              🏆 You will earn <strong style={{color:"var(--amber)"}}>+10 points</strong> for this report
            </div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button className="btn btn-ghost" style={{flex:1}} onClick={()=>setStep(1)}>← Back</button>
            <button className="btn btn-orange" style={{flex:2}} onClick={handleSubmit}>🚀 Submit Report</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── History Screen ───────────────────────────────────────────────────────────
function HistoryScreen() {
  const totalPts = HISTORY.filter(h=>h.type==="report").length * 10;
  return (
    <div className="screen fade-in">
      <div style={{marginBottom:16}}>
        <div style={{fontSize:13,color:"var(--muted)"}}>Your Activity</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22}}>History</div>
      </div>

      <div className="card" style={{
        background:"linear-gradient(135deg, rgba(26,79,187,0.4), rgba(249,115,22,0.25))",
        border:"1px solid rgba(249,115,22,0.3)",marginBottom:14
      }}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{
            width:60,height:60,borderRadius:16,
            background:"linear-gradient(135deg,var(--amber),var(--orange))",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:28
          }}>🏆</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:24,color:"var(--amber)"}}>
              {totalPts+190} pts
            </div>
            <div style={{fontSize:13,color:"var(--muted)"}}>Community Rank #12</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:12,color:"var(--muted)"}}>Level</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:"var(--sky)"}}>Silver</div>
          </div>
        </div>
        <div style={{marginTop:14}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--muted)",marginBottom:6}}>
            <span>Progress to Gold</span><span>{totalPts+190}/500</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{width:`${((totalPts+190)/500)*100}%`}} />
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
        {[["📊",`${HISTORY.filter(h=>h.type==="report").length}`,"Reports"],
          ["👁️",`${HISTORY.filter(h=>h.type==="view").length}`,"Views"],
          ["🎯","94%","Accuracy"]
        ].map(([ic,v,l]) => (
          <div key={l} className="card" style={{padding:12,textAlign:"center",margin:0}}>
            <div style={{fontSize:20,marginBottom:4}}>{ic}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18}}>{v}</div>
            <div style={{fontSize:11,color:"var(--muted)"}}>{l}</div>
          </div>
        ))}
      </div>

      <div className="sec-head">
        <div className="sec-title">Recent Activity</div>
      </div>

      {HISTORY.map((h,i) => (
        <div className="hist-item" key={i}>
          <div className={`hist-icon ${h.type}`}>{h.type==="report"?"📡":"👁️"}</div>
          <div className="hist-meta">
            <div className="hist-title">{h.type==="report"?`Reported Bus ${h.bus}`:`Viewed Bus ${h.bus}`}</div>
            <div className="hist-time">📍 {h.stop} · {h.time}</div>
          </div>
          {h.pts>0 && <div className="hist-pts">+{h.pts}</div>}
        </div>
      ))}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [selectedBus, setSelectedBus] = useState(null);

  const handleSelectBus = (bus) => { setSelectedBus(bus); setTab("map"); };

  const TABS = [
    { id:"dashboard", icon:"🏠", label:"Home"    },
    { id:"map",       icon:"🗺️", label:"Map"     },
    { id:"report",    icon:"📡", label:"Report", notif:true },
    { id:"history",   icon:"📋", label:"History" },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="app-shell">
        <div className="bg-grid" />
        {!loggedIn ? (
          <>
            <div className="header">
              <div className="header-logo">
                <div className="icon">🚌</div>
                <div className="brand">Bus<span>Trackr</span></div>
              </div>
            </div>
            <LoginScreen onLogin={() => setLoggedIn(true)} />
          </>
        ) : (
          <>
            <div className="header">
              <div className="header-logo">
                <div className="icon">🚌</div>
                <div className="brand">Bus<span>Trackr</span></div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{position:"relative"}}>
                  <div style={{
                    width:34,height:34,borderRadius:10,
                    background:"var(--glass)",border:"1px solid var(--border)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:16,cursor:"pointer"
                  }}>🔔</div>
                  <div className="notif-dot" />
                </div>
                <div className="avatar">A</div>
              </div>
            </div>

            {tab==="dashboard" && <DashboardScreen onSelectBus={handleSelectBus} />}
            {tab==="map"       && <MapScreen selectedBus={selectedBus} />}
            {tab==="report"    && <ReportScreen />}
            {tab==="history"   && <HistoryScreen />}

            <div className="bottom-nav">
              {TABS.map(t => (
                <div key={t.id} className={`nav-item ${tab===t.id?"active":""}`}
                  onClick={() => setTab(t.id)} style={{position:"relative"}}>
                  <span className="nav-icon">{t.icon}</span>
                  <span className="nav-label">{t.label}</span>
                  {t.notif && <div className="notif-dot" style={{top:2,right:24}} />}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
