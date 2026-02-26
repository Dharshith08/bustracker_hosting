import React from 'react';

const STATUS_OPTS = [
    { key: "on-time", icon: "✅", label: "On Time" },
    { key: "delayed", icon: "⏰", label: "Delayed" },
    { key: "crowded", icon: "👥", label: "Crowded" },
    { key: "breakdown", icon: "🔧", label: "Breakdown" },
];

export default function ReportScreen({ buses, STOPS, onReportSubmit, userRank }) {
    const [step, setStep] = React.useState(0);
    const [busId, setBusId] = React.useState("");
    const [stop, setStop] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    const canNext0 = busId && stop;
    const canNext1 = !!status;

    const handleSubmit = () => {
        onReportSubmit({ busId, stop, status });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false); setStep(0);
            setBusId(""); setStop(""); setStatus("");
        }, 4000);
    };

    if (submitted) {
        return (
            <div className="screen">
                <div className="success-anim">
                    <span className="success-icon">🎉</span>
                    <div className="success-title">Report Submitted!</div>
                    <div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
                        You just helped {Math.floor(Math.random() * 20) + 5} commuters nearby.
                    </div>
                    <div className="card" style={{ textAlign: "left" }}>
                        <div className="card-title">You Earned</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <span style={{ fontSize: 40 }}>🏆</span>
                            <div>
                                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, color: "var(--amber)" }}>+10 pts</div>
                                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Total: {userRank.points + 10} pts — Rank #{userRank.rank}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${Math.min(((userRank.points + 10) % 500) / 500 * 100, 100)}%` }} />
                        </div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>{(userRank.points + 10) % 500} / 500 pts to next rank</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="screen fade-in">
            <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Contribute</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22 }}>Report a Bus</div>
            </div>

            <div className="step-wrap">
                {["Bus & Stop", "Status", "Confirm"].map((lbl, i) => (
                    <React.Fragment key={lbl}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <div className={`step-circle ${i < step ? "done" : i === step ? "active" : "pending"}`}>
                                {i < step ? "✓" : i + 1}
                            </div>
                            <div style={{ fontSize: 9, color: i === step ? "var(--sky)" : "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{lbl}</div>
                        </div>
                        {i < 2 && <div className={`step-line ${i < step ? "done" : ""}`} key={`l${i}`} />}
                    </React.Fragment>
                ))}
            </div>

            {step === 0 && (
                <div className="fade-in">
                    <div className="card">
                        <div className="card-title">Step 1 — Bus & Stop</div>
                        <div className="input-wrap">
                            <label className="input-label">Bus Number</label>
                            <select className="input" value={busId} onChange={e => setBusId(e.target.value)}>
                                <option value="">Select bus…</option>
                                {buses.map(b => <option key={b.id} value={b.id}>Bus {b.id} — {b.route}</option>)}
                            </select>
                        </div>
                        <div className="input-wrap">
                            <label className="input-label">Current Stop</label>
                            <select className="input" value={stop} onChange={e => setStop(e.target.value)}>
                                <option value="">Select stop…</option>
                                {STOPS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary" disabled={!canNext0}
                        style={{ opacity: canNext0 ? 1 : 0.4 }} onClick={() => setStep(1)}>Continue →</button>
                </div>
            )}

            {step === 1 && (
                <div className="fade-in">
                    <div className="card">
                        <div className="card-title">Step 2 — Bus Status</div>
                        <div className="status-grid">
                            {STATUS_OPTS.map(o => (
                                <div key={o.key} className={`status-opt ${status === o.key ? "selected" : ""}`}
                                    onClick={() => setStatus(o.key)}>
                                    <div className="s-icon">{o.icon}</div>
                                    <div className="s-label">{o.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button className="btn btn-ghost" onClick={() => setStep(0)}>← Back</button>
                        <button className="btn btn-primary" disabled={!canNext1}
                            style={{ opacity: canNext1 ? 1 : 0.4 }} onClick={() => setStep(2)}>Review →</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="fade-in">
                    <div className="card">
                        <div className="card-title">Step 3 — Confirm Report</div>
                        <div style={{ marginBottom: 18 }}>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Bus</div>
                            <div style={{ fontWeight: 600 }}>{buses.find(b => b.id === busId)?.id} — {buses.find(b => b.id === busId)?.route}</div>
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>At Stop</div>
                            <div style={{ fontWeight: 600 }}>{stop}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Observed Status</div>
                            <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                                {STATUS_OPTS.find(o => o.key === status)?.icon} {STATUS_OPTS.find(o => o.key === status)?.label}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button className="btn btn-ghost" onClick={() => setStep(1)}>← Edit</button>
                        <button className="btn btn-orange" onClick={handleSubmit}>🚀 Submit (+10 pts)</button>
                    </div>
                </div>
            )}
        </div>
    );
}
