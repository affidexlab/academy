import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const base = readFileSync('dist/index.html', 'utf8');
const pages = {
  'programmes': {
    title: 'Programmes & Services — Affidex Academy',
    description: "Explore Affidex Academy's digital, vocational, automotive, energy, creative, ICT, GSM repair, consultancy, manpower development, and procurement services across Southern Nigeria.",
    canonical: 'https://affidexacademy.com.ng/programmes',
  },
  'about': {
    title: 'About Us — Affidex Academy',
    description: 'Learn about Affidex Academy Limited, its leadership, governance, quality standards, facilities, and mission to build practical skills, workforce systems, and enterprise pathways across Southern Nigeria.',
    canonical: 'https://affidexacademy.com.ng/about',
  },
  'corporate-government': {
    title: 'Corporate, Government & Donor Partnerships — Affidex Academy',
    description: 'Partner with Affidex Academy for workforce training, TVET programme delivery, consultancy, manpower development, training-centre setup, and procurement across Southern Nigeria.',
    canonical: 'https://affidexacademy.com.ng/corporate-government',
  },
  'partnerships-accreditations': {
    title: 'Accreditations, Certifications & Partnerships — Affidex Academy',
    description: "Affidex Academy's verified registrations, active partnerships, accreditations, permits, and in-progress institutional engagements, clearly separated for institutional credibility.",
    canonical: 'https://affidexacademy.com.ng/partnerships-accreditations',
  },
  'contact': {
    title: 'Contact & Application — Affidex Academy',
    description: "Apply for Affidex Academy's vocational, digital, technical, and TVET programmes or contact admissions, partnerships, consultancy, and procurement support in Uyo, Akwa Ibom State.",
    canonical: 'https://affidexacademy.com.ng/contact',
  },
};

function replaceMeta(html, { title, description, canonical }) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`);
}

for (const [route, meta] of Object.entries(pages)) {
  const path = join('dist', route, 'index.html');
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, replaceMeta(base, meta));
}
