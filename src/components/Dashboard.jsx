import React from 'react';

function statusBadge(s) {
    if (s === "on-time") return <span className="badge badge-green">✅ On Time</span>;
    if (s === "delayed") return <span className="badge badge-orange">⏰ Delayed</span>;
    if (s === "crowded") return <span className="badge badge-amber">👥 Crowded</span>;
    if (s === "breakdown") return <span className="badge badge-red">🔧 Breakdown</span>;
    return null;
}

export default function DashboardScreen({ buses, userPoints, onSelectBus }) {
    const [search, setSearch] = React.useState("");

    const filtered = buses.filter(b =>
        b.id.toLowerCase().includes(search.toLowerCase()) ||
        b.route.toLowerCase().includes(search.toLowerCase())
    );

    const activeBusesCount = buses.filter(b => b.status !== 'breakdown').length;
    const reportsToday = buses.reduce((acc, curr) => acc + curr.reports, 0);
    const avgEta = Math.round(buses.reduce((acc, curr) => acc + curr.eta, 0) / (buses.length || 1));

    return (
        <div className="screen fade-in">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>Good morning 👋</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22 }}>Live Buses</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="live-dot"></span>
                    <span style={{ fontSize: 12, color: "var(--green)" }}>{activeBusesCount} Active</span>
                </div>
            </div>

            <div className="stat-grid">
                <div className="stat-card blue">
                    <div className="stat-num" style={{ color: "var(--sky)" }}>{activeBusesCount}</div>
                    <div className="stat-lbl">Buses Live</div>
                </div>
                <div className="stat-card orange">
                    <div className="stat-num" style={{ color: "var(--orange)" }}>{reportsToday}</div>
                    <div className="stat-lbl">Reports Today</div>
                </div>
                <div className="stat-card green">
                    <div className="stat-num" style={{ color: "var(--green)" }}>{avgEta}</div>
                    <div className="stat-lbl">Avg ETA (min)</div>
                </div>
                <div className="stat-card amber">
                    <div className="stat-num" style={{ color: "var(--amber)" }}>{userPoints}</div>
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
                        <div style={{ marginTop: 5 }}>{statusBadge(bus.status)}</div>
                    </div>
                    <div className={`bus-eta ${bus.eta <= 5 ? 'urgent' : ''}`}>
                        <div className="mins">{bus.eta}</div>
                        <div className="label">min</div>
                    </div>
                </div>
            ))}

            {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "32px 0", color: "var(--muted)" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                    No buses match your search
                </div>
            )}
        </div>
    );
}
