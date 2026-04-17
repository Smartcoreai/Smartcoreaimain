"use client";
import { useState, useEffect, useCallback } from "react";
import { Zap, Users, DollarSign, TrendingUp, Trash2, ChevronDown, LogOut, RefreshCw, Search } from "lucide-react";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string;
  employees?: string;
  budget?: string;
  quote?: number;
  message?: string;
  status: string;
  source?: string;
  created_at: string;
};

const STATUSES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

const STATUS_COLORS: Record<string, string> = {
  New:       "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Qualified: "bg-purple-100 text-purple-700",
  Proposal:  "bg-orange-100 text-orange-700",
  Won:       "bg-green-100 text-green-700",
  Lost:      "bg-red-100 text-red-700",
};

// ─── Login screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 font-bold text-xl text-brand-600 mb-6">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          Ekspedenten Admin
        </div>
        <h2 className="text-2xl font-bold mb-1">Sign in</h2>
        <p className="text-gray-500 text-sm mb-6">Enter your admin password to continue.</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(false); }}
          onKeyDown={(e) => e.key === "Enter" && onLogin(pw)}
          placeholder="Admin password"
          className={`w-full border rounded-xl px-4 py-2.5 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-brand-500 ${err ? "border-red-400" : "border-gray-200"}`}
        />
        {err && <p className="text-red-500 text-xs mb-3">Incorrect password.</p>}
        <button className="btn-primary w-full mt-4" onClick={() => onLogin(pw)}>Sign In</button>
      </div>
    </div>
  );
}

// ─── Stats card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-500 text-sm">{label}</div>
      </div>
    </div>
  );
}

// ─── Kanban column ───────────────────────────────────────────────────────────
function KanbanColumn({ status, leads, onStatusChange, onDelete }: {
  status: string;
  leads: Lead[];
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}) {
  const colorClass = STATUS_COLORS[status] ?? "bg-gray-100 text-gray-700";
  return (
    <div className="bg-gray-50 rounded-xl p-3 min-w-[220px] flex-1">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colorClass}`}>{status}</span>
        <span className="text-xs text-gray-400 font-medium">{leads.length}</span>
      </div>
      <div className="space-y-2">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} onStatusChange={onStatusChange} onDelete={onDelete} />
        ))}
        {leads.length === 0 && (
          <div className="text-center text-gray-300 text-xs py-6">No leads</div>
        )}
      </div>
    </div>
  );
}

function LeadCard({ lead, onStatusChange, onDelete }: {
  lead: Lead;
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-sm">
      <div className="flex items-start justify-between gap-1 mb-1">
        <div className="font-semibold text-gray-800 truncate">{lead.name}</div>
        <button onClick={() => onDelete(lead.id)} className="text-gray-300 hover:text-red-400 p-0.5 flex-shrink-0">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      {lead.company && <div className="text-xs text-gray-400 mb-1">{lead.company}</div>}
      <div className="text-xs text-gray-500 truncate mb-2">{lead.email}</div>
      {lead.services && (
        <div className="text-xs text-brand-600 bg-brand-50 rounded px-2 py-0.5 mb-2 truncate">
          {lead.services}
        </div>
      )}
      {lead.quote && (
        <div className="text-xs font-semibold text-gray-700 mb-2">${lead.quote.toLocaleString()}/mo</div>
      )}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-2 py-1 w-full justify-between"
        >
          <span>{lead.status}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        {showMenu && (
          <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-100 rounded-xl shadow-lg z-10 w-full overflow-hidden">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => { onStatusChange(lead.id, s); setShowMenu(false); }}
                className="block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 text-gray-700"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="text-xs text-gray-300 mt-2">{new Date(lead.created_at).toLocaleDateString()}</div>
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"table" | "kanban">("kanban");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchLeads = useCallback(async (pw: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads", { headers: { "x-admin-password": pw } });
      if (res.status === 401) { setAuthed(false); return; }
      setLeads(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleLogin(pw: string) {
    const res = await fetch("/api/leads", { headers: { "x-admin-password": pw } });
    if (res.status === 401) { return; }
    setPassword(pw);
    setAuthed(true);
    setLeads(await res.json());
  }

  async function handleStatusChange(id: number, status: string) {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ status }),
    });
    fetchLeads(password);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE", headers: { "x-admin-password": password } });
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  useEffect(() => {
    if (authed) fetchLeads(password);
  }, [authed, fetchLeads, password]);

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.company ?? "").toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = leads.filter((l) => l.status === "Won").reduce((s, l) => s + (l.quote ?? 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-xl text-brand-600">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          Ekspedenten Admin
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => fetchLeads(password)} className="text-gray-500 hover:text-gray-700 p-2">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={() => setAuthed(false)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="p-6 max-w-screen-xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total leads" value={leads.length} icon={Users} color="bg-blue-50 text-blue-600" />
          <StatCard label="New leads" value={leads.filter((l) => l.status === "New").length} icon={TrendingUp} color="bg-purple-50 text-purple-600" />
          <StatCard label="Won deals" value={leads.filter((l) => l.status === "Won").length} icon={TrendingUp} color="bg-green-50 text-green-600" />
          <StatCard label="Won MRR" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} color="bg-yellow-50 text-yellow-600" />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads..." className="bg-transparent text-sm outline-none flex-1" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500">
            <option value="All">All statuses</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
            {(["kanban", "table"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-4 py-2 text-sm font-medium transition-colors capitalize ${view === v ? "bg-brand-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Kanban view */}
        {view === "kanban" && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STATUSES.map((s) => (
              <KanbanColumn
                key={s}
                status={s}
                leads={filtered.filter((l) => l.status === s)}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Table view */}
        {view === "table" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Name", "Email", "Company", "Services", "Quote", "Status", "Source", "Date", ""].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-500">{lead.email}</td>
                      <td className="px-4 py-3 text-gray-500">{lead.company ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{lead.services ?? "—"}</td>
                      <td className="px-4 py-3 font-semibold">{lead.quote ? `$${lead.quote.toLocaleString()}/mo` : "—"}</td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLORS[lead.status] ?? ""}`}
                        >
                          {STATUSES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{lead.source}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{new Date(lead.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleDelete(lead.id)} className="text-gray-300 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={9} className="text-center text-gray-400 py-12">No leads found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
