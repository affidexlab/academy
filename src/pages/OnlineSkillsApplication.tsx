import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Award, BarChart3, CheckCircle2, Clock, Mail, MessageCircle, Phone, Search, ShieldCheck, Sparkles, Users } from "lucide-react";
import SEO from "../components/SEO";
import { isSupabaseConfigured, supabase, type AdmissionApplication } from "../lib/supabase";

const courses = [
  { title: "Cybersecurity Fundamentals", category: "Cybersecurity", tag: "Hot course", desc: "Learn core cyber hygiene, threat awareness, safe systems use, and security foundations for entry-level roles." },
  { title: "App Development", category: "Software / Mobile", tag: "Hot course", desc: "Build practical mobile-first applications and understand the workflow from idea to deployable product." },
  { title: "Web Development", category: "Software / Web", tag: "Hot course", desc: "Create responsive websites with modern frontend foundations, Git/GitHub, and portfolio-ready projects." },
  { title: "Data Analysis & Business Intelligence", category: "Data / Analytics", tag: "Hot course", desc: "Use spreadsheets, dashboards, and business intelligence tools to turn data into decisions." },
  { title: "Digital Marketing", category: "Marketing", tag: "Hot course", desc: "Plan campaigns, create content, read analytics, and grow brands across digital channels." },
  { title: "Graphic Design & Creative Media", category: "Creative", tag: "Hot course", desc: "Develop visual communication skills for social media, business branding, and campaign assets." },
  { title: "UI/UX Design", category: "Design", tag: "Recommended", desc: "Design accessible interfaces, user journeys, wireframes, and prototypes for digital products." },
  { title: "Social Media Management", category: "Marketing", tag: "Recommended", desc: "Manage content calendars, communities, reporting, and brand voice across social platforms." },
  { title: "Virtual Assistance & Remote Work", category: "Business Support", tag: "Recommended", desc: "Build admin, productivity, communication, and remote-work skills for global support roles." },
  { title: "Software Development / Coding", category: "Software", tag: "Recommended", desc: "Strengthen programming foundations, problem-solving, and practical development workflows." },
  { title: "IT Support & Computer Hardware", category: "Technical / ICT", tag: "Recommended", desc: "Learn user support, troubleshooting, computer hardware basics, and workplace IT operations." },
  { title: "Software QA / Testing", category: "Software", tag: "Recommended", desc: "Understand manual testing, bug reporting, quality workflows, and product release confidence." },
];

const states = ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"];

const initialForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  phone: "",
  email: "",
  state: "",
  city: "",
  ageRange: "",
  education: "",
  currentStatus: "",
  occupation: "",
  experience: "",
  primaryCourse: "",
  secondChoice: "",
  smartphone: "",
  computer: "",
  internet: "",
  hours: "",
  format: "",
  goal: "",
  source: "",
  referral: "",
  accurate: false,
  terms: false,
  updates: true,
};

type FormState = typeof initialForm;
type FieldName = keyof FormState;
type StoredApplication = FormState & { id: string; submittedAt: string; status: string; campaign: Record<string, string> };

function generateApplicationId() {
  const year = new Date().getFullYear();
  const sequence = String(Math.floor(100000 + Math.random() * 900000));
  return `AFF-${year}-${sequence}`;
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("234")) return `+${digits}`;
  if (digits.startsWith("0")) return `+234${digits.slice(1)}`;
  return phone.trim();
}

function loadApplications(): StoredApplication[] {
  try {
    return JSON.parse(localStorage.getItem("affidexOnlineSkillsApplications") || "[]");
  } catch {
    return [];
  }
}

function Field({ label, name, value, onChange, type = "text", required = false, error, placeholder }: {
  label: string;
  name: FieldName;
  value: string;
  onChange: (name: FieldName, value: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold" style={{ color: "var(--navy)" }}>{label}{required && <span className="text-red-600"> *</span>}</span>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(event) => onChange(name, event.target.value)}
        className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C8922A] focus:ring-4 focus:ring-[#C8922A]/15"
        style={{ borderColor: error ? "#DC2626" : "var(--border)" }}
      />
      {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}

function SelectField({ label, name, value, onChange, options, required = false, error }: {
  label: string;
  name: FieldName;
  value: string;
  onChange: (name: FieldName, value: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold" style={{ color: "var(--navy)" }}>{label}{required && <span className="text-red-600"> *</span>}</span>
      <select
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C8922A] focus:ring-4 focus:ring-[#C8922A]/15"
        style={{ borderColor: error ? "#DC2626" : "var(--border)" }}
      >
        <option value="">Select an option</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}

export default function OnlineSkillsApplication() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName | "duplicate", string>>>({});
  const [submitted, setSubmitted] = useState<StoredApplication | null>(null);
  const [statusQuery, setStatusQuery] = useState({ id: "", contact: "" });
  const [statusResult, setStatusResult] = useState<StoredApplication | null | "missing">(null);

  const campaign = useMemo(() => ({
    utm_source: searchParams.get("utm_source") || "",
    utm_medium: searchParams.get("utm_medium") || "",
    utm_campaign: searchParams.get("utm_campaign") || "",
    utm_content: searchParams.get("utm_content") || "",
  }), [searchParams]);

  useEffect(() => {
    const saved = localStorage.getItem("affidexOnlineSkillsDraft");
    if (saved) setForm({ ...initialForm, ...JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem("affidexOnlineSkillsDraft", JSON.stringify(form));
  }, [form]);

  const update = (name: FieldName, value: string | boolean) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined, duplicate: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<FieldName | "duplicate", string>> = {};
    const required: FieldName[] = ["firstName", "lastName", "phone", "email", "state", "city", "ageRange", "education", "currentStatus", "experience", "primaryCourse", "smartphone", "computer", "internet", "hours", "format", "goal", "source"];
    required.forEach((field) => {
      if (!form[field]) next[field] = "This field is required.";
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.phone && !/^(\+?234|0)[789][01]\d{8}$/.test(form.phone.replace(/\s/g, ""))) next.phone = "Enter a valid Nigerian phone number.";
    if (form.secondChoice && form.secondChoice === form.primaryCourse) next.secondChoice = "Second choice must be different from primary course.";
    if (!form.accurate) next.accurate = "Please confirm the information is accurate.";
    if (!form.terms) next.terms = "Please accept the privacy policy and terms.";

    const normalizedPhone = normalizePhone(form.phone).toLowerCase();
    const duplicate = loadApplications().find((application) => application.email.toLowerCase() === form.email.toLowerCase() || normalizePhone(application.phone).toLowerCase() === normalizedPhone);
    if (duplicate) next.duplicate = `An application already exists for this email or phone. Use the status checker with ${duplicate.id}.`;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const application: StoredApplication = {
      ...form,
      phone: normalizePhone(form.phone),
      id: generateApplicationId(),
      submittedAt: new Date().toISOString(),
      status: "Submitted",
      campaign,
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.rpc("submit_admission_application", {
        payload: {
          application_id: application.id,
          status: application.status,
          payment_status: "Pending",
          first_name: application.firstName,
          middle_name: application.middleName || null,
          last_name: application.lastName,
          phone: application.phone,
          email: application.email,
          state: application.state,
          city: application.city,
          age_range: application.ageRange,
          education: application.education,
          current_status: application.currentStatus,
          occupation: application.occupation || null,
          experience: application.experience,
          primary_course: application.primaryCourse,
          second_choice: application.secondChoice || null,
            smartphone: application.smartphone,
          computer: application.computer,
          internet: application.internet,
          hours: application.hours,
          format: application.format,
          goal: application.goal,
          source: application.source,
          referral: application.referral || null,
          campaign,
          updates: application.updates,
        },
      });

      if (error) {
        setErrors({ duplicate: error.message.includes("duplicate") ? "An application already exists for this email or phone." : `Submission failed: ${error.message}` });
        return;
      }
    }

    localStorage.setItem("affidexOnlineSkillsApplications", JSON.stringify([application, ...loadApplications()]));
    localStorage.removeItem("affidexOnlineSkillsDraft");
    setSubmitted(application);
    setForm(initialForm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkStatus = async (event: FormEvent) => {
    event.preventDefault();
    const contact = statusQuery.contact.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.rpc("check_application_status", {
        lookup_application_id: statusQuery.id.trim(),
        lookup_contact: contact,
      }).maybeSingle<Pick<AdmissionApplication, "application_id" | "status" | "primary_course" | "created_at">>();

      if (data) {
        setStatusResult({
          ...initialForm,
          id: data.application_id,
          status: data.status,
          primaryCourse: data.primary_course,
          submittedAt: data.created_at,
          campaign: {},
        });
        return;
      }
    }

    const result = loadApplications().find((application) => application.id.toLowerCase() === statusQuery.id.trim().toLowerCase() && (application.email.toLowerCase() === contact || normalizePhone(application.phone).toLowerCase() === normalizePhone(contact).toLowerCase()));
    setStatusResult(result || "missing");
  };

  return (
    <>
      <SEO title="Online Skills Accelerator Application | AFFIDEX Academy" description="Apply for the AFFIDEX Online Skills Accelerator. Choose an in-demand course, submit your application, and receive a unique application ID." />

      <section className="relative overflow-hidden bg-[#0B1C2E] text-white noise-overlay">
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 20% 20%, rgba(245,201,106,.45), transparent 28%), radial-gradient(circle at 80% 10%, rgba(255,255,255,.18), transparent 24%)" }} />
        <div className="container relative grid gap-10 py-16 md:grid-cols-[1.05fr_.95fr] md:py-24">
          <div className="flex flex-col justify-center">
            <span className="label mb-5">Applications now open</span>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl">AFFIDEX Online Skills Accelerator</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Build in-demand skills. Work with confidence. Prepare for real opportunities through practical, industry-relevant online training.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#apply" className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm">Apply now <ArrowRight size={16} /></a>
              <a href="#courses" className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm">View courses</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              {[{ label: "Delivery", value: "100% Online" }, { label: "Fee", value: "₦100,000" }, { label: "Learning", value: "Live + resources" }, { label: "Support", value: "Admissions team" }].map((item) => (
                <div key={item.label} className="rounded-3xl bg-white/10 p-5">
                  <div className="text-xs uppercase tracking-[.18em] text-slate-400">{item.label}</div>
                  <div className="mt-2 text-xl font-extrabold">{item.value}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-2xl border border-[#C8922A]/30 bg-[#C8922A]/10 p-4 text-sm leading-7 text-slate-200">Submit your application in a few minutes. You’ll receive a unique Application ID immediately after completion, and AFFIDEX admissions will see it in the dashboard.</p>
          </div>
        </div>
      </section>

      {submitted && (
        <section className="bg-[#FBF5E8] py-10">
          <div className="container">
            <div className="rounded-[2rem] border border-[#C8922A]/30 bg-white p-6 shadow-xl md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700"><CheckCircle2 size={18} /> Application received</div>
                  <h2 className="font-serif text-3xl font-bold text-[#0B1C2E]">Thank you, {submitted.firstName} {submitted.lastName}.</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">Please keep your Application ID safe. Our admissions team will review your application and contact you with the next step.</p>
                </div>
                <div className="rounded-2xl bg-[#0B1C2E] px-6 py-4 text-center text-white">
                  <div className="text-xs uppercase tracking-[.2em] text-slate-400">Application ID</div>
                  <div className="mt-1 text-2xl font-black text-[#F5C96A]">{submitted.id}</div>
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
                <p><strong>Selected course:</strong> {submitted.primaryCourse}</p>
                <p><strong>Submitted:</strong> {new Date(submitted.submittedAt).toLocaleString()}</p>
                <p><strong>Status:</strong> {submitted.status}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="https://wa.me/2348133985352" target="_blank" rel="noreferrer" className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm"><MessageCircle size={16} /> WhatsApp admissions</a>
                <a href="mailto:contact@affidexacademy.com.ng" className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-bold text-[#0B1C2E]"><Mail size={16} /> Email admissions</a>
                <a href="#status" className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-bold text-[#0B1C2E]"><Search size={16} /> Check application status</a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-4">
            {[{ icon: ShieldCheck, title: "Practical training", text: "Industry-relevant tasks and portfolio-focused learning." }, { icon: Users, title: "Learner support", text: "Admissions and learner support throughout the journey." }, { icon: Award, title: "Completion certificate", text: "Certificate of completion subject to programme requirements." }, { icon: BarChart3, title: "Career confidence", text: "Skills for jobs, freelance work, business, and growth." }].map(({ icon: Icon, title, text }) => (
              <div key={title} className="card rounded-3xl border bg-white p-6" style={{ borderColor: "var(--border)" }}>
                <Icon className="mb-4 text-[#C8922A]" size={28} />
                <h3 className="font-bold text-[#0B1C2E]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="bg-[#FAF8F4] py-16">
        <div className="container">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label">Hot courses</span>
              <h2 className="mt-3 font-serif text-4xl font-bold text-[#0B1C2E]">Choose your online skills track</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">Only open courses should be selectable in the final admissions system. This launch page presents the current AFFIDEX catalogue for fast applications.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <button key={course.title} onClick={() => { update("primaryCourse", course.title); document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }); }} className="card rounded-3xl border bg-white p-5 text-left" style={{ borderColor: "var(--border)" }}>
                <div className="mb-4 flex items-center justify-between gap-3"><span className="rounded-full bg-[#FBF5E8] px-3 py-1 text-xs font-bold text-[#9A6C16]">{course.tag}</span><Sparkles size={18} className="text-[#C8922A]" /></div>
                <h3 className="font-bold text-[#0B1C2E]">{course.title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[.14em] text-slate-400">{course.category}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{course.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="py-16">
        <div className="container grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <span className="label">Step 1 of 4</span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#0B1C2E]">Start your application</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">No account is required. Complete the form, review your details, and receive your Application ID immediately.</p>
            <div className="mt-6 space-y-3 rounded-3xl bg-[#0B1C2E] p-6 text-sm text-slate-300">
              <p className="flex items-center gap-3"><Clock size={16} className="text-[#F5C96A]" /> Takes about 4 minutes</p>
              <p className="flex items-center gap-3"><Phone size={16} className="text-[#F5C96A]" /> WhatsApp: +234 813 398 5352</p>
              <p className="flex items-center gap-3"><Mail size={16} className="text-[#F5C96A]" /> contact@affidexacademy.com.ng</p>
            </div>
          </aside>

          <form onSubmit={submit} className="rounded-[2rem] border bg-white p-5 shadow-xl md:p-8" style={{ borderColor: "var(--border)" }}>
            {errors.duplicate && <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{errors.duplicate}</div>}
            <div className="space-y-10">
              <div>
                <h3 className="mb-5 text-xl font-extrabold text-[#0B1C2E]">Personal information</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="First name" name="firstName" value={form.firstName} onChange={update} required error={errors.firstName} />
                  <Field label="Last name" name="lastName" value={form.lastName} onChange={update} required error={errors.lastName} />
                  <Field label="Middle name" name="middleName" value={form.middleName} onChange={update} />
                  <Field label="WhatsApp / phone" name="phone" value={form.phone} onChange={update} required error={errors.phone} placeholder="08012345678" />
                  <Field label="Email address" name="email" value={form.email} onChange={update} type="email" required error={errors.email} />
                  <SelectField label="State of residence" name="state" value={form.state} onChange={update} options={states} required error={errors.state} />
                  <Field label="City / LGA" name="city" value={form.city} onChange={update} required error={errors.city} />
                  <SelectField label="Age range" name="ageRange" value={form.ageRange} onChange={update} options={["Under 18", "18-24", "25-34", "35-44", "45+"]} required error={errors.ageRange} />
                </div>
              </div>

              <div>
                <h3 className="mb-5 text-xl font-extrabold text-[#0B1C2E]">Education and background</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <SelectField label="Highest education level" name="education" value={form.education} onChange={update} options={["Secondary", "OND/NCE", "HND", "Bachelor", "Postgraduate", "Other"]} required error={errors.education} />
                  <SelectField label="Current status" name="currentStatus" value={form.currentStatus} onChange={update} options={["Student", "Job seeker", "Employed", "Entrepreneur", "Freelancer", "Career changer", "Other"]} required error={errors.currentStatus} />
                  <Field label="Current occupation / field" name="occupation" value={form.occupation} onChange={update} />
                  <SelectField label="Prior experience in selected course" name="experience" value={form.experience} onChange={update} options={["None", "Beginner", "Some experience", "Intermediate", "Advanced"]} required error={errors.experience} />
                </div>
              </div>

              <div>
                <h3 className="mb-5 text-xl font-extrabold text-[#0B1C2E]">Programme choice</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <SelectField label="Primary course" name="primaryCourse" value={form.primaryCourse} onChange={update} options={courses.map((course) => course.title)} required error={errors.primaryCourse} />
                  <SelectField label="Second choice" name="secondChoice" value={form.secondChoice} onChange={update} options={courses.map((course) => course.title)} error={errors.secondChoice} />
                </div>
              </div>

              <div>
                <h3 className="mb-5 text-xl font-extrabold text-[#0B1C2E]">Readiness questions</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <SelectField label="Do you have access to a smartphone?" name="smartphone" value={form.smartphone} onChange={update} options={["Yes", "No"]} required error={errors.smartphone} />
                  <SelectField label="Do you have access to a laptop or desktop?" name="computer" value={form.computer} onChange={update} options={["Yes", "No", "Shared access"]} required error={errors.computer} />
                  <SelectField label="How reliable is your internet access?" name="internet" value={form.internet} onChange={update} options={["Reliable", "Sometimes unstable", "Very limited"]} required error={errors.internet} />
                  <SelectField label="Hours per week you can commit" name="hours" value={form.hours} onChange={update} options={["Less than 3", "3-5", "6-10", "10+"]} required error={errors.hours} />
                  <SelectField label="Preferred learning format" name="format" value={form.format} onChange={update} options={["Live sessions", "Recordings", "Both"]} required error={errors.format} />
                  <SelectField label="How did you hear about AFFIDEX?" name="source" value={form.source} onChange={update} options={["Facebook", "Instagram", "TikTok", "WhatsApp", "Google", "Friend or Family", "School or Campus", "Event", "Website", "Other"]} required error={errors.source} />
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field label="Referral name or code" name="referral" value={form.referral} onChange={update} />
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-bold text-[#0B1C2E]">What do you want to achieve from this programme? <span className="text-red-600">*</span></span>
                    <textarea value={form.goal} onChange={(event) => update("goal", event.target.value)} rows={4} className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C8922A] focus:ring-4 focus:ring-[#C8922A]/15" style={{ borderColor: errors.goal ? "#DC2626" : "var(--border)" }} />
                    {errors.goal && <span className="mt-1 block text-xs font-semibold text-red-600">{errors.goal}</span>}
                  </label>
                </div>
              </div>

              <div className="space-y-3 rounded-3xl bg-[#FAF8F4] p-5">
                {[["accurate", "I confirm that the information supplied is accurate to the best of my knowledge."], ["terms", "I agree to the AFFIDEX Privacy Policy and Terms of Application."], ["updates", "I would like to receive updates about AFFIDEX programmes, opportunities and related training."]].map(([name, label]) => (
                  <label key={name} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <input type="checkbox" checked={Boolean(form[name as FieldName])} onChange={(event) => update(name as FieldName, event.target.checked)} className="mt-1 h-4 w-4 accent-[#C8922A]" />
                    <span>{label} {name === "terms" && <span>(<Link className="text-[#9A6C16] underline" to="/privacy-policy">Privacy Policy</Link> · <Link className="text-[#9A6C16] underline" to="/terms-and-conditions">Terms</Link>)</span>}</span>
                  </label>
                ))}
                {(errors.accurate || errors.terms) && <p className="text-xs font-semibold text-red-600">{errors.accurate || errors.terms}</p>}
              </div>

              <button type="submit" className="btn-gold flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm">Submit application <ArrowRight size={16} /></button>
            </div>
          </form>
        </div>
      </section>

      <section id="status" className="bg-[#0B1C2E] py-16 text-white">
        <div className="container grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-center">
          <div>
            <span className="label">Application status</span>
            <h2 className="mt-3 font-serif text-4xl font-bold">Check your application status</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Enter your Application ID plus the email or phone used on your application. The production admissions dashboard can later update these statuses as applications move through review, acceptance, payment, and enrollment.</p>
          </div>
          <form onSubmit={checkStatus} className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <div className="grid gap-4 md:grid-cols-2">
              <input value={statusQuery.id} onChange={(event) => setStatusQuery((current) => ({ ...current, id: event.target.value }))} placeholder="AFF-2026-000123" className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-[#0B1C2E] outline-none" />
              <input value={statusQuery.contact} onChange={(event) => setStatusQuery((current) => ({ ...current, contact: event.target.value }))} placeholder="Email or phone" className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-[#0B1C2E] outline-none" />
            </div>
            <button className="btn-gold mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm"><Search size={16} /> Check status</button>
            {statusResult && <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-[#0B1C2E]">{statusResult === "missing" ? "No matching application was found on this device. Please confirm your Application ID and contact detail." : <span><strong>Status:</strong> {statusResult.status}. Your selected course is {statusResult.primaryCourse}.</span>}</div>}
          </form>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden" style={{ borderColor: "var(--border)" }}>
        <a href="#apply" className="btn-gold flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm">Apply now <ArrowRight size={16} /></a>
      </div>
    </>
  );
}
