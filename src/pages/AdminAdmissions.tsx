import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Download, LogOut, Search, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";
import { isSupabaseConfigured, supabase, type AdmissionApplication, type ApplicationStatus } from "../lib/supabase";

const statuses: ApplicationStatus[] = ["Submitted", "Under Review", "Accepted", "Payment Pending", "Paid / Enrolled", "Waitlisted", "More Information Required", "Closed / Withdrawn"];

function csvEscape(value: unknown) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export default function AdminAdmissions() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [selected, setSelected] = useState<AdmissionApplication | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const loadApplications = useCallback(async () => {
    if (!supabase || !sessionEmail) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("admission_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setMessage(error.message.includes("permission") ? "This email is not approved for the admissions dashboard." : error.message);
    else {
      setApplications((data || []) as AdmissionApplication[]);
      setSelected((data?.[0] as AdmissionApplication | undefined) || null);
      setMessage("");
    }
    setLoading(false);
  }, [sessionEmail]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return applications.filter((application) => {
      const matchesStatus = statusFilter === "All" || application.status === statusFilter;
      const haystack = `${application.application_id} ${application.first_name} ${application.last_name} ${application.email} ${application.phone} ${application.primary_course} ${application.source}`.toLowerCase();
      return matchesStatus && (!term || haystack.includes(term));
    });
  }, [applications, query, statusFilter]);

  const stats = useMemo(() => ({
    total: applications.length,
    today: applications.filter((application) => new Date(application.created_at).toDateString() === new Date().toDateString()).length,
    accepted: applications.filter((application) => application.status === "Accepted").length,
    enrolled: applications.filter((application) => application.status === "Paid / Enrolled").length,
  }), [applications]);

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : "Signed in.");
  };

  const sendMagicLink = async () => {
    if (!supabase || !email) return;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setMessage(error ? error.message : "Check your email for the secure login link.");
  };

  const updateSelected = async (updates: Partial<AdmissionApplication>) => {
    if (!supabase || !selected) return;
    const { data, error } = await supabase
      .from("admission_applications")
      .update(updates)
      .eq("id", selected.id)
      .select("*")
      .single();
    if (error) {
      setMessage(error.message);
      return;
    }
    const updated = data as AdmissionApplication;
    setSelected(updated);
    setApplications((current) => current.map((application) => application.id === updated.id ? updated : application));
    setMessage("Application updated.");
  };

  const exportCsv = () => {
    const columns: (keyof AdmissionApplication)[] = ["application_id", "created_at", "status", "payment_status", "first_name", "last_name", "phone", "email", "state", "city", "primary_course", "second_choice", "source", "referral"];
    const csv = [columns.join(","), ...filtered.map((application) => columns.map((column) => csvEscape(application[column])).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `affidex-admissions-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isSupabaseConfigured) {
    return <div className="container py-20"><SEO title="Admissions Admin | AFFIDEX Academy" /><h1 className="text-3xl font-bold">Supabase is not configured.</h1></div>;
  }

  if (!sessionEmail) {
    return (
      <div className="min-h-screen bg-[#0B1C2E] text-white">
        <SEO title="Admissions Admin | AFFIDEX Academy" description="Secure AFFIDEX admissions dashboard." />
        <div className="container flex min-h-screen items-center justify-center py-16">
          <form onSubmit={signIn} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
            <ShieldCheck className="mb-5 text-[#F5C96A]" size={36} />
            <h1 className="font-serif text-4xl font-bold">Admissions Admin</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">Enter an approved admin email and password to access applications.</p>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="admin@affidexacademy.com.ng" className="mt-6 w-full rounded-2xl border border-white/10 px-4 py-3 text-[#0B1C2E] outline-none" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required placeholder="Password" className="mt-3 w-full rounded-2xl border border-white/10 px-4 py-3 text-[#0B1C2E] outline-none" />
            <button className="btn-gold mt-4 w-full rounded-full px-6 py-3 text-sm">Sign in</button>
            <button type="button" onClick={sendMagicLink} className="mt-3 w-full rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white">Send magic link instead</button>
            {message && <p className="mt-4 text-sm text-[#F5C96A]">{message}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F1]">
      <SEO title="Admissions Dashboard | AFFIDEX Academy" description="AFFIDEX admissions dashboard." />
      <header className="bg-[#0B1C2E] text-white">
        <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">AFFIDEX Admissions</p><h1 className="text-3xl font-black">Online Skills Applications</h1></div>
          <button onClick={() => supabase?.auth.signOut()} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm"><LogOut size={16} /> Sign out</button>
        </div>
      </header>
      <main className="container py-8">
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {[["Total", stats.total], ["Today", stats.today], ["Accepted", stats.accepted], ["Enrolled", stats.enrolled]].map(([label, value]) => <div key={label} className="rounded-3xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p><p className="mt-2 text-3xl font-black text-[#0B1C2E]">{value}</p></div>)}
        </div>
        <div className="mb-6 flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm md:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-2xl border px-4"><Search size={16} className="text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, ID, course, email, phone..." className="w-full py-3 text-sm outline-none" /></div>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-2xl border px-4 py-3 text-sm"><option>All</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select>
          <button onClick={exportCsv} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0B1C2E] px-4 py-3 text-sm font-bold text-white"><Download size={16} /> Export CSV</button>
        </div>
        {message && <div className="mb-5 rounded-2xl bg-[#FBF5E8] p-4 text-sm font-semibold text-[#8A6517]">{message}</div>}
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            {loading ? <p className="p-5">Loading...</p> : filtered.map((application) => (
              <button key={application.id} onClick={() => setSelected(application)} className={`block w-full border-b p-5 text-left hover:bg-slate-50 ${selected?.id === application.id ? "bg-[#FBF5E8]" : ""}`}>
                <div className="flex items-center justify-between gap-3"><strong className="text-[#0B1C2E]">{application.first_name} {application.last_name}</strong><span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold">{application.status}</span></div>
                <p className="mt-1 text-xs text-slate-500">{application.application_id} · {application.primary_course}</p>
                <p className="mt-1 text-xs text-slate-500">{application.email} · {application.phone}</p>
              </button>
            ))}
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            {selected ? <div className="space-y-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">{selected.application_id}</p><h2 className="text-2xl font-black text-[#0B1C2E]">{selected.first_name} {selected.middle_name} {selected.last_name}</h2><p className="text-sm text-slate-600">{selected.primary_course}</p></div><select value={selected.status} onChange={(event) => updateSelected({ status: event.target.value as ApplicationStatus })} className="rounded-2xl border px-4 py-3 text-sm font-bold">{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
              <div className="grid gap-3 text-sm md:grid-cols-2">{[["Email", selected.email], ["Phone", selected.phone], ["Location", `${selected.city}, ${selected.state}`], ["Source", selected.source], ["Education", selected.education], ["Current status", selected.current_status], ["Experience", selected.experience], ["Internet", selected.internet], ["Computer", selected.computer], ["Hours/week", selected.hours]].map(([label, value]) => <div key={label} className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p><p className="mt-1 font-semibold text-[#0B1C2E]">{value}</p></div>)}</div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Goal</p><p className="mt-2 text-sm leading-7 text-slate-700">{selected.goal}</p></div>
              <label className="block"><span className="mb-2 block text-sm font-bold text-[#0B1C2E]">Admissions notes</span><textarea value={selected.notes || ""} onChange={(event) => setSelected({ ...selected, notes: event.target.value })} rows={4} className="w-full rounded-2xl border p-4 text-sm outline-none" /></label>
              <button onClick={() => updateSelected({ notes: selected.notes })} className="btn-gold rounded-full px-6 py-3 text-sm">Save notes</button>
            </div> : <p>Select an application.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
