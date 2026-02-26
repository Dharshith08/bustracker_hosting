import React from 'react';

export default function HistoryScreen({ history }) {
    if (history.length === 0) {
        return (
            <div className="screen fade-in">
                <div style={{ marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22 }}>Activity History</div>
                </div>
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
                    No activity yet. Start reporting to earn points!
                </div>
            </div>
        );
    }

    return (
        <div className="screen fade-in">
            <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Your Impact</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22 }}>Activity History</div>
            </div>

            {history.map((item, idx) => (
                <div key={item.id} className={`hist-item ${item.isNew ? 'new-report' : ''}`}>
                    <div className={`hist-icon ${item.type}`}>
                        {item.type === 'report' ? '📢' : '👁️'}
                    </div>
                    <div className="hist-meta">
                        <div className="hist-title">
                            {item.type === 'report' ? 'Reported Bus ' : 'Viewed Bus '}
                            {item.bus}
                        </div>
                        <div className="hist-time">{item.time} • {item.stop}</div>
                    </div>
                    {item.pts > 0 && <div className="hist-pts">+{item.pts} pts</div>}
                </div>
            ))}
        </div>
    );
}
