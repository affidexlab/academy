import { Link } from "react-router-dom";
import { CEO_PHOTO } from "../../assets/logos";
import { GLORY_PHOTO, EDIDIONG_PHOTO, EDIKAN_PHOTO } from "../../assets/team_photos";
import SEO from "../../components/SEO";
import { ArrowRight, CheckCircle2, Target, Eye, MapPin, Mail, Globe, Phone, Building2, TrendingUp, Zap, Award, Shield, Users, BookOpen } from "lucide-react";

const CAC_B64  = "data:image/jpeg;base64,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";
const IPPN_B64 = "data:image/png;base64,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";

const values = [
  { icon:<Zap size={22}/>,    title:"Practicality",     body:"We teach what works in the real market, not what looks good on paper. 70% hands-on, every session." },
  { icon:<Users size={22}/>,  title:"Inclusion",        body:"We actively serve those excluded by cost, location, and systemic barriers — especially women, youth, and underserved communities." },
  { icon:<Award size={22}/>,  title:"Excellence",       body:"Our graduates represent Affidex everywhere they go. We protect that standard through rigorous curriculum and ongoing assessment." },
  { icon:<Shield size={22}/>, title:"Integrity",        body:"Transparency toward every student, partner, donor, and regulator. No hidden fees, no false promises, no shortcuts." },
  { icon:<TrendingUp size={22}/>, title:"Impact",       body:"We measure success in incomes earned, not certificates printed. Post-graduation income tracking defines our KPIs." },
  { icon:<BookOpen size={22}/>, title:"Lifelong Learning", body:"Alumni networks, post-graduation business continuity support, and enterprise mentorship — the journey doesn't end at demo day." },
];


const regs = [
  { cat:"Corporate Registration", items:["CAC RC: 9316934","Private Limited Liability Company (Ltd)","Tax Identification Number (TIN)","SMEDAN MSME Certificate: SUID-5998-5813-3500-9105"] },
  { cat:"International Affiliations", items:["Microsoft AI Cloud Partner — Verified Global Partner","UNESCO-UNEVOC Active Member","GIZ TVET Academy — Registered Institution","Cisco Networking Academy — Partner Application Under Review"] },
];

export default function AcademyAbout() {
  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <SEO
        title="About Us — Affidex Academy"
        description="Meet the team behind Affidex Academy and learn about our mission to deliver world-class vocational and professional training in Uyo, Akwa Ibom State, Nigeria."
        path="/academy/about"
      />

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden noise-overlay py-28"
        style={{background:"linear-gradient(150deg,#060F1A 0%,#0B1C2E 45%,#102236 100%)"}}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute" style={{top:"-10%",right:"-5%",width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(circle,rgba(200,146,42,0.11) 0%,transparent 65%)"}}/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="g2" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M 72 0 L 0 0 0 72" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#g2)"/>
          </svg>
        </div>
        <div className="container relative z-10 max-w-[780px] text-white">
          <div className="label mb-6">About Affidex Academy</div>
          <h1 className="font-black leading-[1.08] mb-6"
            style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.8rem,6vw,4.8rem)",fontWeight:700}}>
            Built to close Nigeria's{" "}
            <span className="italic" style={{color:"var(--gold-2)"}}>digital skills gap.</span>
          </h1>
          <p className="text-[17px] leading-relaxed mb-8 max-w-[600px]" style={{color:"rgba(255,255,255,0.6)"}}>
            Affidex Academy Limited is a federally registered vocational and digital skills institution headquartered in Uyo, Akwa Ibom State, Nigeria. We exist to build sustainable employability, enterprise development, and income pathways for youth and women across Southern Nigeria through practical, internationally-aligned technology and vocational training.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Microsoft AI Cloud Partner","UNESCO-UNEVOC","SMEDAN Certified","CAC RC-9316934"].map((b,i)=>(
              <span key={i} className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
                style={{background:"rgba(200,146,42,0.15)",border:"1px solid rgba(200,146,42,0.35)",color:"var(--gold-2)"}}>
                ✓ {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MISSION & VISION ════════════════════════════════════════ */}
      <section className="py-24" style={{background:"#FFFFFF",borderBottom:"1px solid var(--border)"}}>
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 max-w-[860px]">
            {[
              {icon:<Target size={20}/>, title:"Our Mission",
               body:"To deliver practical, affordable, and market-linked ICT and vocational training that equips young Nigerians — especially women, youth, and underserved communities — with the skills, credentials, and networks needed to access dignified and sustainable digital livelihoods."},
              {icon:<Eye size={20}/>, title:"Our Vision",
               body:"To become the leading practical technology and vocational training institution in Southern Nigeria — a trusted pipeline of digital talent, women-led enterprises, and community-level economic transformation across Akwa Ibom, Cross River, Abia, Delta, and beyond."},
            ].map((m,i)=>(
              <div key={i} className="rounded-2xl border p-8" style={{borderColor:"var(--border)",background:"var(--cream)"}}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                    style={{background:"var(--navy)"}}>{m.icon}</div>
                  <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"var(--navy)"}}>{m.title}</h2>
                </div>
                <p className="text-[14.5px] leading-relaxed" style={{color:"var(--text-mid)"}}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES ═════════════════════════════════════════════ */}
      <section className="py-24" style={{background:"var(--cream)",borderBottom:"1px solid var(--border)"}}>
        <div className="container">
          <div className="label mb-5">Core Values</div>
          <h2 className="mb-16 max-w-lg" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:700,lineHeight:1.15,color:"var(--navy)"}}>
            Values that are<br/><span className="italic" style={{color:"var(--gold)"}}>operational, not decorative.</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-[1000px]">
            {values.map((v,i)=>(
              <div key={i} className="card rounded-2xl border bg-white p-7" style={{borderColor:"var(--border)"}}>
                <div className="mb-5 inline-flex rounded-2xl p-3.5" style={{background:"rgba(11,28,46,0.06)"}}>
                  <span style={{color:"var(--navy)"}}>{v.icon}</span>
                </div>
                <h3 className="text-[15px] font-bold mb-2.5" style={{color:"var(--navy)"}}>{v.title}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{color:"var(--text-mid)"}}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REGISTRATIONS ════════════════════════════════════════════ */}
      <section className="py-24" style={{background:"#FFFFFF",borderBottom:"1px solid var(--border)"}}>
        <div className="container">
          <div className="label mb-5">Accreditations & Affiliations</div>
          <h2 className="mb-16 max-w-lg" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:700,lineHeight:1.15,color:"var(--navy)"}}>
            Credentials &<br/><span className="italic" style={{color:"var(--gold)"}}>verified standing.</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 max-w-[860px]">
            {regs.map((r,i)=>(
              <div key={i} className="rounded-2xl border p-7" style={{borderColor:"var(--border)",background:"var(--cream)"}}>
                <h3 className="label mb-5" style={{color:"var(--gold)"}}>{r.cat}</h3>
                <ul className="space-y-2.5">
                  {r.items.map((item,j)=>(
                    <li key={j} className="flex items-start gap-2.5 text-[13.5px]" style={{color:"var(--navy)"}}>
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{color:"var(--gold)"}}/>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LEADERSHIP ══════════════════════════════════════════════ */}
      <section className="py-24" style={{background:"#FFFFFF",borderBottom:"1px solid var(--border)"}}>
        <div className="container">
          <div className="label mb-5">Leadership</div>
          <h2 className="mb-16 max-w-lg" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:700,lineHeight:1.15,color:"var(--navy)"}}>
            The people behind<br/><span className="italic" style={{color:"var(--gold)"}}>the mission.</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-[1000px]">
            {[
              {photo:CEO_PHOTO,initials:"UES",name:"Utibe-Abasi Emmanuel Samuel, FIPPN",role:"Chairman & CEO",bio:"Founder and Chief Executive. Technology entrepreneur and vocational education advocate based in Uyo. Drove the institution from incorporation to internationally affiliated standing in under 90 days."},
              {photo:EDIDIONG_PHOTO,name:"Mr. Edidiong Samuel",role:"Managing Director / Head, Training and Curriculum Development",bio:"Oversees all academic operations and curriculum development. Bridges Affidex Academy with the university community and drives campus outreach and institutional partnerships."},
              {photo:GLORY_PHOTO,initials:"GS",name:"Barr. Glory Samuel",role:"Company Legal Representative",bio:"Serves as the Academy's legal representative, overseeing compliance, contracts, and governance matters on behalf of the institution."},
              {photo:EDIKAN_PHOTO,initials:"EM",name:"Mr. Edikan Michael",role:"Head, Partnerships and Business Development",bio:"Leads sponsor and investor engagement, corporate outreach, and community partnerships — securing resources and visibility for each programme cycle."},
            ].map((t,i)=>(
              <div key={i} className="card rounded-2xl border overflow-hidden" style={{borderColor:"var(--border)"}}>
                {/* Photo or initials */}
                <div className="relative" style={{height:"180px",background:"linear-gradient(135deg,var(--navy),var(--navy-3))"}}>
                  {(t as any).photo ? (
                    <img src={(t as any).photo} alt={t.name}
                      className="w-full h-full object-cover object-top"/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-black" style={{color:"var(--gold-2)",fontFamily:"'Cormorant Garamond',serif",opacity:0.7}}>
                        {t.initials}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h4 className="text-[14px] font-bold leading-snug mb-1" style={{color:"var(--navy)"}}>{t.name}</h4>
                  <p className="text-[11.5px] font-bold mb-3" style={{color:"var(--gold)"}}>{t.role}</p>
                  <p className="text-[12.5px] leading-relaxed" style={{color:"var(--text-mid)"}}>{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AFFILIATIONS LOGOS ══════════════════════════════════════ */}
      <section className="py-24" style={{background:"var(--cream)",borderBottom:"1px solid var(--border)"}}>
        <div className="container">
          <div className="label mb-5">Confirmed Partners & Affiliates</div>
          <h2 className="mb-16 max-w-lg" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:700,lineHeight:1.15,color:"var(--navy)"}}>
            Backed by institutions<br/><span className="italic" style={{color:"var(--gold)"}}>that shape the world.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[900px]">
            {[
              {name:"Microsoft",    logo:"https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"},
              {name:"UNESCO",       logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_UNESCO_2021.svg/400px-Logo_UNESCO_2021.svg.png"},
              {name:"SMEDAN",       logo:"https://smedan.gov.ng/wp-content/uploads/2024/03/Group-1.png"},
              {name:"CAC Nigeria",  logo:CAC_B64},
              {name:"IPPN",         logo:IPPN_B64},
            ].map((p,i)=>(
              <div key={i} className="card rounded-xl border bg-white flex flex-col items-center justify-center gap-3 p-6" style={{borderColor:"var(--border)"}}>
                <div className="flex items-center justify-center rounded-xl overflow-hidden" style={{width:"100%",height:"56px",padding:"6px"}}>
                  <img src={p.logo} alt={p.name}
                    style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}}
                    onError={(e)=>{
                      const t=e.currentTarget;
                      t.style.display="none";
                      const par=t.parentElement;
                      if(par){par.style.background="var(--navy)";par.innerHTML=`<span style="color:var(--gold-2);font-size:10px;font-weight:800;text-align:center">${p.name}</span>`;}
                    }}/>
                </div>
                <p className="text-[11px] font-bold text-center" style={{color:"var(--text-light)"}}>{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═════════════════════════════════════════════════ */}
      <section className="py-24" style={{background:"#FFFFFF",borderBottom:"1px solid var(--border)"}}>
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 max-w-[860px]">
            <div>
              <div className="label mb-5">Our Training Centres</div>
              <h2 className="mb-8" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,3vw,2.5rem)",fontWeight:700,lineHeight:1.2,color:"var(--navy)"}}>
                Two campuses.<br/><span className="italic" style={{color:"var(--gold)"}}>One city.</span>
              </h2>
              {[
                {name:"Affidex Academy — Main Campus",tag:"Headquarters",note:"150-seat capacity · Computer labs · Hardware workstations · Uyo, Akwa Ibom State"},
                {name:"IPPN — Institute of Practising Professionals Nigeria",tag:"Centre 2",note:"50 Udo Udoma Avenue, Uyo, Akwa Ibom State, Nigeria"},
              ].map((loc,i)=>(
                <div key={i} className="flex items-start gap-3.5 rounded-xl border bg-white px-5 py-4 mb-3" style={{borderColor:"var(--border)"}}>
                  <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{color:"var(--gold)"}}/>
                  <div>
                    <span className="text-[13.5px] font-bold" style={{color:"var(--navy)"}}>{loc.name}</span>
                    <span className="ml-2 text-[10.5px] font-bold px-2 py-0.5 rounded-full" style={{background:"rgba(200,146,42,0.12)",color:"var(--gold)"}}>{loc.tag}</span>
                    <p className="text-[12px] mt-1" style={{color:"var(--text-light)"}}>{loc.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="label mb-5">Get In Touch</div>
              <h2 className="mb-8" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,3vw,2.5rem)",fontWeight:700,lineHeight:1.2,color:"var(--navy)"}}>
                Contact us<br/><span className="italic" style={{color:"var(--gold)"}}>anytime.</span>
              </h2>
              {[
                {icon:<Mail size={15}/>,label:"Email",content:<><a href="mailto:academy@affidexlab.com" className="hover:underline block" style={{color:"var(--navy)"}}>academy@affidexlab.com</a><a href="mailto:affidexacademy@gmail.com" className="hover:underline block" style={{color:"var(--navy)"}}>affidexacademy@gmail.com</a></>},
                {icon:<Phone size={15}/>,label:"Phone / WhatsApp",content:<a href="tel:+2348133985352" className="hover:underline" style={{color:"var(--navy)"}}>+234 813 398 5352</a>},
                {icon:<Globe size={15}/>,label:"Website",content:<a href="https://www.affidexlab.com/academy" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color:"var(--navy)"}}>www.affidexlab.com/academy</a>},
                {icon:<Building2 size={15}/>,label:"Registration",content:<span style={{color:"var(--navy)"}}>RC: 9316934 · SMEDAN: SUID-5998-5813-3500-9105</span>},
              ].map((c,i)=>(
                <div key={i} className="flex items-start gap-3.5 rounded-xl border bg-white px-5 py-4 mb-3" style={{borderColor:"var(--border)"}}>
                  <span className="mt-0.5 flex-shrink-0" style={{color:"var(--gold)"}}>{c.icon}</span>
                  <div>
                    <p className="text-[11px] mb-1 font-semibold" style={{color:"var(--text-light)"}}>{c.label}</p>
                    <div className="text-[13.5px]">{c.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden noise-overlay py-24"
        style={{background:"linear-gradient(150deg,#060F1A 0%,#0B1C2E 50%,#102236 100%)"}}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{width:"700px",height:"350px",background:"radial-gradient(ellipse,rgba(200,146,42,0.13) 0%,transparent 65%)"}}/>
        </div>
        <div className="container relative z-10 text-center text-white">
          <h2 className="font-black max-w-2xl mx-auto mb-5"
            style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.2rem,4.5vw,3.5rem)",fontWeight:700,lineHeight:1.1}}>
            Be part of the<br/><span className="italic" style={{color:"var(--gold-2)"}}>founding generation.</span>
          </h2>
          <p className="mb-10 text-[15.5px] max-w-lg mx-auto" style={{color:"rgba(255,255,255,0.45)"}}>
            Apply today and join the first cohort of Affidex Academy graduates — people who chose to act while others waited.
          </p>
          <Link to="/academy/apply"
            className="btn-gold inline-flex items-center gap-2.5 rounded-full px-10 text-[15px]"
            style={{paddingTop:"18px",paddingBottom:"18px"}}>
            Apply Now — It's Free <ArrowRight size={17}/>
          </Link>
        </div>
      </section>
    </div>
  );
}

