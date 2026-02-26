import React from 'react';

export default function LoginScreen({ onLogin }) {
    const [step, setStep] = React.useState(0);
    const [phone, setPhone] = React.useState("");
    const [otp, setOtp] = React.useState(["", "", "", "", ""]);

    const handleOtp = (i, v) => {
        if (!/^\d?$/.test(v)) return;
        const n = [...otp]; n[i] = v; setOtp(n);
        if (v && i < 4) document.getElementById(`otp${i + 1}`)?.focus();
    };

    return (
        <div className="screen fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <div className="login-hero">
                <div className="login-icon-wrap">🚌</div>
                <div className="login-title">BusTrackr</div>
                <div className="login-subtitle">Community-powered bus tracking.<br />No GPS needed — just your tap.</div>
            </div>

            {step === 0 ? (
                <div className="card fade-in">
                    <div className="card-title">Sign In</div>
                    <div className="input-wrap">
                        <label className="input-label">Mobile Number</label>
                        <input className="input" placeholder="+91 98765 43210"
                            value={phone} onChange={e => setPhone(e.target.value)} maxLength={13} />
                    </div>
                    <button className="btn btn-primary" onClick={() => setStep(1)} disabled={phone.length < 10}>📲 Send OTP</button>
                    <div className="divider" />
                    <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>No account? OTP auto-creates one.</div>
                </div>
            ) : (
                <div className="card fade-in">
                    <div className="card-title">Enter OTP</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>Sent to {phone || "+91 98765 43210"}</div>
                    <div className="otp-row" style={{ marginBottom: 20 }}>
                        {otp.map((v, i) => (
                            <input key={i} id={`otp${i}`} className="otp-input"
                                maxLength={1} value={v} onChange={e => handleOtp(i, e.target.value)} />
                        ))}
                    </div>
                    <button className="btn btn-primary" onClick={() => onLogin(phone)}>✅ Verify & Enter</button>
                    <div style={{ textAlign: "center", marginTop: 12 }}>
                        <span style={{ fontSize: 12, color: "var(--sky)", cursor: "pointer" }} onClick={() => setStep(0)}>← Change number</span>
                    </div>
                </div>
            )}

            <div className="card" style={{ marginTop: 8 }}>
                <div className="card-title">Why Join?</div>
                {[
                    ["🚌", "Real-time ETA", "Know exactly when your bus arrives"],
                    ["📍", "Live Map", "See bus locations on an interactive map"],
                    ["🏆", "Earn Points", "Get rewards for reporting bus movements"],
                ].map(([ic, t, d]) => (
                    <div key={t} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontSize: 24 }}>{ic}</span>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{t}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)" }}>{d}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
