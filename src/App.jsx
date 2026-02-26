import React, { useState, useEffect } from "react";
import "./index.css";
import LoginScreen from "./components/Login.jsx";
import DashboardScreen from "./components/Dashboard.jsx";
import MapScreen from "./components/Map.jsx";
import ReportScreen from "./components/Report.jsx";
import HistoryScreen from "./components/History.jsx";

// ─── Initial Data (Moving to State) ────────
const INITIAL_BUSES = [
  { id: "47A", route: "Central → Madurai South", last: "Stop 4 — Anna Nagar", eta: 6, status: "on-time", confidence: 92, reports: 14 },
  { id: "15B", route: "Bus Stand → College Road", last: "Stop 2 — Main Market", eta: 11, status: "delayed", confidence: 78, reports: 8 },
  { id: "23", route: "Periyar Bus Stand → Airport", last: "Stop 6 — Bypass Rd", eta: 3, status: "crowded", confidence: 88, reports: 21 },
  { id: "8C", route: "Town Hall → Palanganatham", last: "Stop 1 — Town Hall", eta: 18, status: "on-time", confidence: 65, reports: 5 },
];

const STOPS = [
  "Anna Nagar", "Main Market", "Bypass Road", "Town Hall",
  "Meenakshi Nagar", "College Road", "Central Bus Stand", "Airport Junction"
];

const INITIAL_HISTORY = [
  { id: 1, type: "report", bus: "47A", stop: "Anna Nagar", time: "2 mins ago", pts: 10 },
  { id: 2, type: "view", bus: "15B", stop: "Main Market", time: "18 mins ago", pts: 0 },
];

export default function App() {
  // Global States
  const [currentUser, setCurrentUser] = useState(null); // null = not logged in
  const [activeTab, setActiveTab] = useState('dash');

  const [buses, setBuses] = useState(INITIAL_BUSES);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [userRank, setUserRank] = useState({ points: 230, rank: 12 });

  const [selectedBus, setSelectedBus] = useState(null);

  // ─── Simulated Real-Time ETA Hook ────────
  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => ({
          ...bus,
          eta: Math.max(0, bus.eta - 1), // Decrease ETA by 1 every 30s for demo
          status: bus.eta <= 1 ? "on-time" : bus.status
        }))
      );
    }, 30000); // 30 second fake ticks
    return () => clearInterval(interval);
  }, [currentUser]);

  // Handle Login
  const handleLogin = (phone) => {
    setCurrentUser(phone || 'Guest');
  };

  // Handle View Map
  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    setActiveTab('map');
  };

  // Handle Report Submission
  const handleReportSubmit = (reportData) => {
    const { busId, stop, status } = reportData;

    // Update Bus State (Bump reports, adjust status)
    setBuses(prev => prev.map(b =>
      b.id === busId
        ? { ...b, status: status, last: stop, reports: b.reports + 1, confidence: Math.min(b.confidence + 5, 100) }
        : b
    ));

    // Update History State
    setHistory(prev => [
      { id: Date.now(), type: 'report', bus: busId, stop, time: 'Just now', pts: 10, isNew: true },
      ...prev
    ]);

    // Update User Score
    setUserRank(prev => ({ ...prev, points: prev.points + 10 }));
  };


  // ─── Render Pipeline ────────
  if (!currentUser) {
    return (
      <div className="app-shell">
        <div className="bg-grid" />
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }

  // Define screens for the Content Area
  const renderScreen = () => {
    switch (activeTab) {
      case 'dash': return <DashboardScreen buses={buses} userPoints={userRank.points} onSelectBus={handleSelectBus} />;
      case 'map': return <MapScreen selectedBus={selectedBus} buses={buses} STOPS={STOPS} />;
      case 'report': return <ReportScreen buses={buses} STOPS={STOPS} onReportSubmit={handleReportSubmit} userRank={userRank} />;
      case 'history': return <HistoryScreen history={history} />;
      default: return null;
    }
  };

  return (
    <div className="app-shell">
      <div className="bg-grid" />

      {/* Mobile Header (Hidden on Desktop via CSS) */}
      <div className="header">
        <div className="header-logo">
          <div className="icon">🚌</div>
          <div className="brand">Bus<span>Trackr</span></div>
        </div>
        <div className="avatar">{currentUser.substring(0, 2) === '+9' ? currentUser.substring(currentUser.length - 2) : 'ME'}</div>
      </div>

      <div className="app-content">
        {/* Navigation Sidebar/Bottom Bar */}
        <nav className="main-nav">
          <div className={`nav-item ${activeTab === 'dash' ? 'active' : ''}`} onClick={() => setActiveTab('dash')}>
            <div className="nav-icon">📊</div>
            <div className="nav-label">Dashboard</div>
          </div>
          <div className={`nav-item ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>
            <div className="nav-icon">📍</div>
            <div className="nav-label">Live Map</div>
          </div>
          <div className={`nav-item ${activeTab === 'report' ? 'active' : ''}`} onClick={() => setActiveTab('report')}>
            <div className="nav-icon">📢</div>
            <div className="nav-label">Report</div>
          </div>
          <div className={`nav-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            <div className="nav-icon">🏆</div>
            <div className="nav-label">Rewards</div>
          </div>
        </nav>

        {/* Dynamic Screen Content */}
        {renderScreen()}
      </div>
    </div>
  );
}