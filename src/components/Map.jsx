import React from 'react';

function statusBadge(s) {
    if (s === "on-time") return <span className="badge badge-green">✅ On Time</span>;
    if (s === "delayed") return <span className="badge badge-orange">⏰ Delayed</span>;
    if (s === "crowded") return <span className="badge badge-amber">👥 Crowded</span>;
    if (s === "breakdown") return <span className="badge badge-red">🔧 Breakdown</span>;
    return null;
}

export default function MapScreen({ selectedBus, buses, STOPS }) {
    const bus = selectedBus || buses[0];

    return (
        <div className="screen fade-in">
            <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Live Map</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22 }}>
                    Bus {bus.id} — {bus.route.split("→")[0].trim()}
                </div>
            </div>

            <div className="map-area">
                <div className="map-roads" />
                <div className="map-route-line" style={{ top: 140, left: 40, width: 300, transform: "rotate(-12deg)" }} />
                {[[60, 130], [130, 110], [200, 105], [270, 115], [330, 128]].map(([x, y], i) => (
                    <div key={i} className="map-stop-dot" style={{ left: x, top: y }} />
                ))}
                {/* Dynamic Map Dot position based on ETA pseudo-logic */}
                <div className="map-bus-dot" style={{ left: 185 + (30 - Math.min(bus.eta * 2, 30)), top: 95 - (30 - Math.min(bus.eta, 30)) }} />
                <div className="map-you-dot" style={{ left: 280, top: 110 }} />
                <div className="map-overlay">
                    <span className="live-dot" />
                    <span style={{ color: "var(--green)", fontWeight: 600 }}>LIVE</span>
                    <span style={{ marginLeft: 8, color: "var(--muted)" }}>Updated practically now</span>
                </div>
                <div style={{
                    position: "absolute", bottom: 12, left: 12,
                    background: "rgba(10,22,40,0.85)", backdropFilter: "blur(8px)",
                    border: "1px solid var(--border)", borderRadius: 10, padding: "6px 10px",
                    display: "flex", gap: 14, fontSize: 11
                }}>
                    <span>🟠 Bus {bus.id}</span><span>🔵 You</span><span>⚪ Stop</span>
                </div>
                <div className="map-zoom">
                    <div className="map-zoom-btn">+</div>
                    <div className="map-zoom-btn">−</div>
                </div>
            </div>

            {/* Map Content grid to make use of Desktop Space later in Dashboard layout */}
            <div className="dashboard-layout">
                <div className="card" style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                        <div className="bus-num">{bus.id}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 15 }}>{bus.route}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>📍 {bus.last}</div>
                        </div>
                        <div>
                            <div style={{ "fontFamily": "'Syne',sans-serif", fontWeight: 800, fontSize: 28, color: "var(--amber)", lineHeight: 1 }}>{bus.eta}</div>
                            <div style={{ fontSize: 10, color: "var(--muted)" }}>min away</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                        {statusBadge(bus.status)}
                        <span className="badge badge-blue">👥 {bus.reports} reports</span>
                    </div>
                    <div className="card-title">Confidence Score</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div className="conf-ring" style={{ "--pct": `${bus.confidence}%` }}>
                            <div className="conf-inner">{bus.confidence}%</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className="trust-wrap">
                                {[["Reports (24hr)", bus.reports, 30], ["User accuracy", "89%", "89%"], ["Freshness", "Live", "100%"]].map(([l, v, p]) => (
                                    <div className="trust-row" key={l}>
                                        <span className="trust-label">{l}</span>
                                        <div className="trust-track">
                                            <div className="trust-fill" style={{ width: typeof p === "number" ? `${Math.min(p / 30 * 100, 100)}%` : p }} />
                                        </div>
                                        <span className="trust-val">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-title">Route Stops</div>
                    {STOPS.slice(0, 6).map((s, i) => (
                        <div key={s} style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "8px 0", borderBottom: i < 5 ? "1px solid var(--border)" : "none"
                        }}>
                            <div style={{
                                width: 24, height: 24, borderRadius: "50%",
                                background: i < 2 ? "var(--green)" : i === 2 ? "var(--orange)" : "var(--glass2)",
                                border: i === 2 ? "none" : "1px solid var(--border)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 10, fontWeight: 700, flexShrink: 0,
                                color: i < 2 ? "white" : i === 2 ? "white" : "var(--muted)"
                            }}>{i < 2 ? "✓" : i === 2 ? "🚌" : i + 1}</div>
                            <span style={{ fontSize: 13, color: i === 2 ? "var(--orange)" : i < 2 ? "var(--muted)" : "var(--text)", fontWeight: i === 2 ? 600 : 400 }}>{s}</span>
                            {i === 2 && <span className="badge badge-orange" style={{ marginLeft: "auto", fontSize: 10 }}>HERE</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
