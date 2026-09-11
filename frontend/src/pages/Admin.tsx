import { useState, useEffect } from "react";
import {
  Lock,
  LogOut,
  Clock,
  DollarSign,
  Users,
  MessageSquare,
  X,
  Eye,
  Download,
  Plus,
  Trash2,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api, type TempleTimingsData, type FestivalData } from "@/services/api";

export default function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("mahakuta_admin_token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"payments" | "bookings" | "donations" | "inquiries" | "timings" | "festivals">("payments");

  // Data States
  const [stats, setStats] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [timings, setTimings] = useState<TempleTimingsData>({
    morningDarshan: "6:00 AM – 1:30 PM",
    eveningDarshan: "4:30 PM – 8:30 PM",
    morningAbhisheka: "7:00 AM – 9:00 AM",
    mahaMangalarathi: "12:30 PM & 7:30 PM",
    specialDaysNote: "Special rituals conducted on Somavara, Pradosha, and Shivaratri.",
  });
  const [festivals, setFestivals] = useState<FestivalData[]>([]);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Lightbox Modal for Screenshot
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  // New Festival Modal
  const [showNewFestival, setShowNewFestival] = useState(false);
  const [newFest, setNewFest] = useState<FestivalData>({
    titleEn: "",
    titleKn: "",
    titleHi: "",
    dateString: "",
    descriptionEn: "",
    descriptionKn: "",
    descriptionHi: "",
    bannerImage: "/images/temple/twin-shrines-canopy.jpg",
  });

  // Action status message
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token, activeTab]);

  const loadAllData = async () => {
    try {
      const statsRes = await api.getAdminStats();
      setStats(statsRes);

      if (activeTab === "payments") {
        const p = await api.getAdminPayments();
        setPayments(p);
      } else if (activeTab === "bookings") {
        const b = await api.getAdminBookings();
        setBookings(b);
      } else if (activeTab === "donations") {
        const d = await api.getAdminDonations();
        setDonations(d);
      } else if (activeTab === "inquiries") {
        const i = await api.getAdminInquiries();
        setInquiries(i);
      } else if (activeTab === "timings") {
        const t = await api.getTimings();
        if (t) setTimings(t);
      } else if (activeTab === "festivals") {
        const f = await api.getFestivals();
        setFestivals(f);
      }
    } catch {
      // Ignored
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await api.adminLogin(username, password);
      if (res.token) {
        localStorage.setItem("mahakuta_admin_token", res.token);
        setToken(res.token);
      } else {
        setLoginError("Invalid username or password");
      }
    } catch {
      setLoginError("Login failed. Check server connection.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mahakuta_admin_token");
    setToken(null);
  };

  const notify = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  // Payment Verification Handler
  const handleVerifyPayment = async (id: string, status: "Verified" | "Rejected") => {
    try {
      await api.verifyPayment(id, status);
      notify(`Payment ${status.toLowerCase()} successfully.`);
      loadAllData();
    } catch {
      notify("Failed to update payment status.");
    }
  };

  // Booking Status Handler
  const handleUpdateBookingStatus = async (id: string, kind: string, status: string) => {
    const coll =
      kind === "pooja"
        ? "pooja_bookings"
        : kind === "room"
        ? "room_inquiries"
        : "hall_inquiries";
    try {
      await api.updateStatus(id, coll, status);
      notify(`Status changed to ${status}`);
      loadAllData();
    } catch {
      notify("Failed to update status.");
    }
  };

  // Timings Update Handler
  const handleSaveTimings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateTimings(timings);
      notify("Temple timings updated live on website!");
    } catch {
      notify("Failed to update timings.");
    }
  };

  // Festival Handlers
  const handleCreateFestival = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createFestival(newFest);
      setShowNewFestival(false);
      notify("Festival added successfully!");
      loadAllData();
    } catch {
      notify("Failed to add festival.");
    }
  };

  const handleDeleteFestival = async (id: string) => {
    if (!confirm("Are you sure you want to remove this festival?")) return;
    try {
      await api.deleteFestival(id);
      notify("Festival removed.");
      loadAllData();
    } catch {
      notify("Failed to delete festival.");
    }
  };

  // If not logged in, render secure Login Screen
  if (!token) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl border border-(--gold) bg-(--card) shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-(--sand) text-(--gold) flex items-center justify-center mb-2">
              <Lock size={22} />
            </div>
            <p className="eyebrow">॥ Om Namah Shivaya ॥</p>
            <h1 className="font-heading text-2xl font-bold text-(--text) mt-1">Temple Administration</h1>
            <p className="text-xs text-(--muted) mt-1">Sri Kshetra Mahakuteshwara Religious & Charitable Trust</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-(--muted) block mb-1">Admin Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-(--muted) block mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="text-sm"
              />
            </div>

            {loginError && <p className="text-xs text-red-600 font-medium">{loginError}</p>}

            <Button type="submit" disabled={loginLoading} className="gold-button w-full mt-2">
              {loginLoading ? "Authenticating..." : "Login to Portal"}
            </Button>
          </form>

          <p className="text-[11px] text-(--muted) text-center mt-6">
            Default credentials: <code className="bg-(--sand) px-1 rounded">admin</code> /{" "}
            <code className="bg-(--sand) px-1 rounded">Mahakuta@2026</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" data-testid="admin-dashboard">
      <div className="container-wide">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-(--line) bg-(--card) shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-(--sand) text-(--gold) flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-(--text)">Temple Management Portal</h1>
              <p className="text-xs text-(--muted)">Logged in as Administrator · Sri Mahakuteshwara Trust</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {actionMessage && (
              <span className="text-xs font-semibold px-3 py-1 rounded bg-green-100 text-green-800 animate-pulse">
                {actionMessage}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1.5 text-xs">
              <LogOut size={14} /> Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-(--line) bg-(--card) shadow-sm">
              <div className="flex items-center justify-between text-(--muted) mb-1">
                <span className="text-xs font-semibold">Total Bookings</span>
                <Users size={16} className="text-(--gold)" />
              </div>
              <strong className="text-2xl font-bold text-(--text)">{stats.totalBookings}</strong>
              <span className="text-[10px] text-(--muted) block mt-1">
                {stats.poojaBookings} Poojas · {stats.roomRequests} Rooms · {stats.hallRequests} Halls
              </span>
            </div>

            <div className="p-4 rounded-xl border border-(--line) bg-(--card) shadow-sm">
              <div className="flex items-center justify-between text-(--muted) mb-1">
                <span className="text-xs font-semibold">Total Seva Offerings</span>
                <DollarSign size={16} className="text-(--gold)" />
              </div>
              <strong className="text-2xl font-bold text-(--text)">₹{stats.totalDonations}</strong>
              <span className="text-[10px] text-(--muted) block mt-1">Today: ₹{stats.todayDonations}</span>
            </div>

            <div className="p-4 rounded-xl border border-(--line) bg-(--card) shadow-sm">
              <div className="flex items-center justify-between text-(--muted) mb-1">
                <span className="text-xs font-semibold">Pending Verifications</span>
                <Clock size={16} className="text-amber-600" />
              </div>
              <strong className="text-2xl font-bold text-amber-700">{stats.pendingPayments}</strong>
              <span className="text-[10px] text-(--muted) block mt-1">Screenshots awaiting review</span>
            </div>

            <div className="p-4 rounded-xl border border-(--line) bg-(--card) shadow-sm">
              <div className="flex items-center justify-between text-(--muted) mb-1">
                <span className="text-xs font-semibold">Contact Queries</span>
                <MessageSquare size={16} className="text-(--gold)" />
              </div>
              <strong className="text-2xl font-bold text-(--text)">{stats.contactMessages}</strong>
              <span className="text-[10px] text-(--muted) block mt-1">Devotee messages</span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--line) mb-6 pb-2">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "payments", label: "Verify Payments" },
              { id: "bookings", label: "Bookings & Rooms" },
              { id: "donations", label: "Hundi Donations" },
              { id: "inquiries", label: "Contact Inquiries" },
              { id: "timings", label: "Temple Timings" },
              { id: "festivals", label: "Festivals" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSearchTerm("");
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-(--gold) text-white shadow-sm"
                    : "text-(--muted) hover:bg-(--surface)"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Export CSV Button */}
          {(activeTab === "bookings" || activeTab === "donations" || activeTab === "inquiries") && (
            <a
              href={api.getExportCsvUrl(activeTab as any)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--line) hover:bg-(--surface) text-xs font-semibold text-(--text)"
            >
              <Download size={14} /> Export CSV
            </a>
          )}
        </div>

        {/* Tab Content Area */}
        <div className="rounded-2xl border border-(--line) bg-(--card) p-5 shadow-sm">
          {/* TAB 1: VERIFY PAYMENTS */}
          {activeTab === "payments" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="font-heading text-lg font-semibold text-(--text)">
                  UPI QR & Bank Transfer Payment Verifications
                </h2>
                <span className="text-xs text-(--muted)">
                  {payments.length} receipt{payments.length === 1 ? "" : "s"} submitted
                </span>
              </div>

              {payments.length === 0 ? (
                <p className="text-xs text-(--muted) py-8 text-center">No payment verification receipts found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-(--line) text-(--muted)">
                        <th className="p-2.5">Ref ID</th>
                        <th className="p-2.5">Devotee</th>
                        <th className="p-2.5">Phone</th>
                        <th className="p-2.5">Amount</th>
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5">Screenshot</th>
                        <th className="p-2.5">Status</th>
                        <th className="p-2.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p) => (
                        <tr key={p.id} className="border-b border-(--line) hover:bg-(--surface-soft)">
                          <td className="p-2.5 font-mono font-semibold text-(--gold)">{p.referenceId}</td>
                          <td className="p-2.5 font-medium">{p.devoteeName}</td>
                          <td className="p-2.5 text-(--muted)">{p.phone}</td>
                          <td className="p-2.5 font-bold text-(--text)">₹{p.amount}</td>
                          <td className="p-2.5 uppercase text-[10px] tracking-wider text-(--muted)">{p.linkedType}</td>
                          <td className="p-2.5">
                            <button
                              onClick={() => setActiveScreenshot(p.screenshotUrl)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-(--gold) hover:underline"
                            >
                              <Eye size={13} /> View Receipt
                            </button>
                          </td>
                          <td className="p-2.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.paymentStatus === "Verified"
                                  ? "bg-green-100 text-green-800"
                                  : p.paymentStatus === "Rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {p.paymentStatus}
                            </span>
                          </td>
                          <td className="p-2.5 text-right space-x-1.5">
                            {p.paymentStatus === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleVerifyPayment(p.id, "Verified")}
                                  className="px-2 py-1 rounded bg-green-700 hover:bg-green-800 text-white text-[11px] font-semibold"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleVerifyPayment(p.id, "Rejected")}
                                  className="px-2 py-1 rounded bg-red-700 hover:bg-red-800 text-white text-[11px] font-semibold"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BOOKINGS */}
          {activeTab === "bookings" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="font-heading text-lg font-semibold text-(--text)">Poojas, Rooms & Function Halls</h2>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, phone, ref..."
                    className="text-xs h-8 w-48"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-8 rounded-md border border-(--line) bg-(--background) text-xs px-2"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-(--line) text-(--muted)">
                      <th className="p-2.5">Ref ID</th>
                      <th className="p-2.5">Category</th>
                      <th className="p-2.5">Devotee Name</th>
                      <th className="p-2.5">Phone</th>
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Details</th>
                      <th className="p-2.5">Status</th>
                      <th className="p-2.5 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings
                      .filter((b) => statusFilter === "All" || b.status === statusFilter)
                      .filter(
                        (b) =>
                          !searchTerm ||
                          b.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.phone?.includes(searchTerm) ||
                          b.referenceId?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((b) => (
                        <tr key={b.id} className="border-b border-(--line) hover:bg-(--surface-soft)">
                          <td className="p-2.5 font-mono text-(--gold)">{b.referenceId}</td>
                          <td className="p-2.5 font-bold capitalize text-(--text)">{b.kind}</td>
                          <td className="p-2.5 font-medium">{b.fullName}</td>
                          <td className="p-2.5 text-(--muted)">{b.phone}</td>
                          <td className="p-2.5 text-(--muted)">{b.preferredDate || b.checkInDate || b.eventDate}</td>
                          <td className="p-2.5 text-[11px] text-(--muted)">
                            {b.poojaName || b.roomType || b.hallType}
                          </td>
                          <td className="p-2.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                b.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : b.status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="p-2.5 text-right">
                            <select
                              value={b.status}
                              onChange={(e) => handleUpdateBookingStatus(b.id, b.kind, e.target.value)}
                              className="h-7 rounded border border-(--line) bg-(--background) text-[11px] px-1"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DONATIONS */}
          {activeTab === "donations" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="font-heading text-lg font-semibold text-(--text)">Hundi & Seva Offerings</h2>
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search donations..."
                  className="text-xs h-8 w-48"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-(--line) text-(--muted)">
                      <th className="p-2.5">Ref ID</th>
                      <th className="p-2.5">Donor Name</th>
                      <th className="p-2.5">Phone</th>
                      <th className="p-2.5">Seva Category</th>
                      <th className="p-2.5">Amount</th>
                      <th className="p-2.5">PAN</th>
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations
                      .filter(
                        (d) =>
                          !searchTerm ||
                          d.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.sevaCategory?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((d) => (
                        <tr key={d.id} className="border-b border-(--line) hover:bg-(--surface-soft)">
                          <td className="p-2.5 font-mono text-(--gold)">{d.referenceId}</td>
                          <td className="p-2.5 font-medium">{d.fullName}</td>
                          <td className="p-2.5 text-(--muted)">{d.phone}</td>
                          <td className="p-2.5 font-semibold text-(--text)">{d.sevaCategory}</td>
                          <td className="p-2.5 font-bold text-(--text)">₹{d.amount}</td>
                          <td className="p-2.5 text-(--muted)">{d.panNumber || "—"}</td>
                          <td className="p-2.5 text-(--muted)">{d.createdAt?.slice(0, 10)}</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              {d.paymentStatus || "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT INQUIRIES */}
          {activeTab === "inquiries" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="font-heading text-lg font-semibold text-(--text)">Contact & Pilgrim Messages</h2>
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search messages..."
                  className="text-xs h-8 w-48"
                />
              </div>

              <div className="space-y-3">
                {inquiries
                  .filter(
                    (i) =>
                      !searchTerm ||
                      i.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      i.message?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((i) => (
                    <div key={i.id} className="p-4 rounded-xl border border-(--line) bg-(--card) text-xs">
                      <div className="flex justify-between items-center mb-2 pb-2 border-b border-(--line)">
                        <div>
                          <strong className="text-sm font-semibold text-(--text)">{i.fullName}</strong>
                          <span className="text-(--muted) ml-3">📞 {i.phone}</span>
                          {i.email && <span className="text-(--muted) ml-3">✉️ {i.email}</span>}
                        </div>
                        <span className="text-[11px] text-(--muted)">{i.createdAt?.slice(0, 10)}</span>
                      </div>
                      <p className="text-(--text) leading-relaxed">{i.message}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 5: TEMPLE TIMINGS */}
          {activeTab === "timings" && (
            <div>
              <h2 className="font-heading text-lg font-semibold text-(--text) mb-1">
                Dynamic Temple Timings Management
              </h2>
              <p className="text-xs text-(--muted) mb-6">
                Updating these values will immediately update the Darshan schedule on the homepage for all visitors.
              </p>

              <form onSubmit={handleSaveTimings} className="max-w-xl space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-(--muted) block mb-1">Morning Darshan Timings</label>
                  <Input
                    value={timings.morningDarshan}
                    onChange={(e) => setTimings({ ...timings, morningDarshan: e.target.value })}
                    className="text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-(--muted) block mb-1">Evening Darshan Timings</label>
                  <Input
                    value={timings.eveningDarshan}
                    onChange={(e) => setTimings({ ...timings, eveningDarshan: e.target.value })}
                    className="text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-(--muted) block mb-1">Morning Abhisheka Timings</label>
                  <Input
                    value={timings.morningAbhisheka}
                    onChange={(e) => setTimings({ ...timings, morningAbhisheka: e.target.value })}
                    className="text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-(--muted) block mb-1">Maha Mangalarathi Timings</label>
                  <Input
                    value={timings.mahaMangalarathi}
                    onChange={(e) => setTimings({ ...timings, mahaMangalarathi: e.target.value })}
                    className="text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-(--muted) block mb-1">Special Days & Festivals Note</label>
                  <Textarea
                    value={timings.specialDaysNote}
                    onChange={(e) => setTimings({ ...timings, specialDaysNote: e.target.value })}
                    className="text-xs"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="gold-button">
                  Save & Publish Timings
                </Button>
              </form>
            </div>
          )}

          {/* TAB 6: FESTIVALS */}
          {activeTab === "festivals" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-heading text-lg font-semibold text-(--text)">Temple Festivals & Jatre</h2>
                <Button size="sm" onClick={() => setShowNewFestival(true)} className="gold-button flex items-center gap-1">
                  <Plus size={14} /> Add Festival
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {festivals.map((f) => (
                  <div key={f.id} className="p-4 rounded-xl border border-(--line) bg-(--card) flex justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-(--gold) uppercase font-bold tracking-wider block">
                        {f.dateString}
                      </span>
                      <strong className="text-sm font-semibold text-(--text) block mt-0.5">{f.titleEn}</strong>
                      <p className="text-xs text-(--text) mt-0.5 font-medium">{f.titleKn}</p>
                      <p className="text-xs text-(--muted) mt-2 line-clamp-2">{f.descriptionEn}</p>
                    </div>

                    <button
                      onClick={() => f.id && handleDeleteFestival(f.id)}
                      className="text-red-600 hover:text-red-800 self-start p-1.5 rounded hover:bg-red-50"
                      title="Delete festival"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Festival Dialog */}
              {showNewFestival && (
                <div className="modal-backdrop">
                  <div className="inquiry-modal max-w-lg">
                    <button className="modal-close" onClick={() => setShowNewFestival(false)}>
                      <X size={18} />
                    </button>
                    <h3 className="font-heading text-lg font-bold text-(--text) mb-4">Add Upcoming Festival</h3>

                    <form onSubmit={handleCreateFestival} className="space-y-3 text-xs">
                      <div>
                        <label className="font-semibold text-(--muted) block mb-1">Title (English)</label>
                        <Input
                          value={newFest.titleEn}
                          onChange={(e) => setNewFest({ ...newFest, titleEn: e.target.value })}
                          placeholder="Annual Jatre Rathotsava"
                          required
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-(--muted) block mb-1">Title (Kannada)</label>
                        <Input
                          value={newFest.titleKn}
                          onChange={(e) => setNewFest({ ...newFest, titleKn: e.target.value })}
                          placeholder="ವಾರ್ಷಿಕ ಜಾತ್ರಾ ಮಹೋತ್ಸವ"
                          required
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-(--muted) block mb-1">Title (Hindi)</label>
                        <Input
                          value={newFest.titleHi}
                          onChange={(e) => setNewFest({ ...newFest, titleHi: e.target.value })}
                          placeholder="वार्षिक जात्रा महोत्सव"
                          required
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-(--muted) block mb-1">Date String</label>
                        <Input
                          value={newFest.dateString}
                          onChange={(e) => setNewFest({ ...newFest, dateString: e.target.value })}
                          placeholder="Magha Shuddha Poornima"
                          required
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-(--muted) block mb-1">Description (English)</label>
                        <Textarea
                          value={newFest.descriptionEn}
                          onChange={(e) => setNewFest({ ...newFest, descriptionEn: e.target.value })}
                          placeholder="Details of the chariot festival..."
                          required
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-(--muted) block mb-1">Description (Kannada)</label>
                        <Textarea
                          value={newFest.descriptionKn}
                          onChange={(e) => setNewFest({ ...newFest, descriptionKn: e.target.value })}
                          placeholder="ವಿವರಣೆ..."
                          required
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-(--muted) block mb-1">Description (Hindi)</label>
                        <Textarea
                          value={newFest.descriptionHi}
                          onChange={(e) => setNewFest({ ...newFest, descriptionHi: e.target.value })}
                          placeholder="विवरण..."
                          required
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setShowNewFestival(false)} className="flex-1">
                          Cancel
                        </Button>
                        <Button type="submit" className="gold-button flex-1">
                          Add Festival
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Receipt Screenshot */}
      {activeScreenshot && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveScreenshot(null)}
          role="presentation"
        >
          <div className="relative max-w-2xl max-h-[85vh] p-3 bg-white rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveScreenshot(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black"
            >
              <X size={18} />
            </button>
            <h4 className="text-xs font-bold text-stone-700 mb-2 px-1">Payment Verification Screenshot</h4>
            {activeScreenshot.endsWith(".pdf") ? (
              <div className="p-8 text-center">
                <p className="text-xs text-stone-600 mb-3">PDF Receipt Document</p>
                <a
                  href={activeScreenshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-amber-600 text-white text-xs font-semibold"
                >
                  <ExternalLink size={14} /> Open PDF in New Tab
                </a>
              </div>
            ) : (
              <img
                src={activeScreenshot}
                alt="Payment Receipt Screenshot"
                className="max-h-[70vh] w-auto mx-auto object-contain rounded border border-stone-200"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
