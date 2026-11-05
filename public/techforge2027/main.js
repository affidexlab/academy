'use strict';
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}
const tabs = [...document.querySelectorAll('[role="tab"][data-day]')];
const switchDay = (target) => {
  tabs.forEach(tab => {
    const selected = tab.dataset.day === target;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(tab.dataset.day);
    if (panel) panel.hidden = !selected;
  });
};
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => switchDay(tab.dataset.day));
  tab.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      switchDay(next.dataset.day);
      next.focus();
    }
  });
});
// Countdown uses the event calendar date in WAT; the opening time is not yet announced.
const targetDate = new Date('2027-01-28T00:00:00+01:00');
const pad = value => String(value).padStart(2, '0');
const updateCountdown = () => {
  const remaining = Math.max(0, targetDate.getTime() - Date.now());
  const sec = Math.floor(remaining / 1000);
  const values = { d: Math.floor(sec / 86400), h: Math.floor(sec % 86400 / 3600), m: Math.floor(sec % 3600 / 60), s: sec % 60 };
  Object.entries(values).forEach(([key, value]) => { const el = document.getElementById(key); if (el) el.textContent = pad(value); });
  if (remaining === 0) { const el = document.querySelector('.countdown-label span:last-child'); if (el) el.textContent = 'THE EVENT HAS BEGUN'; }
};
updateCountdown();
setInterval(updateCountdown, 1000);
const contact = 'contact@affidexacademy.com.ng';
const mailto = (subject, lines) => `mailto:${contact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
document.querySelectorAll('.sponsor-link').forEach(el => {
  const tier = el.dataset.package;
  el.href = mailto(`TECHFORGE 2027 - ${tier} Enquiry`, [`Dear TECHFORGE Partnerships Team,`, ``, `We would like to discuss the ${tier} package for TECHFORGE 2027.`, ``, `Our organisation:`, `Contact name:`, `Preferred meeting time:`, ``, `Kind regards,`]);
});
const enquiry = document.getElementById('enquiry-form');
if (enquiry) enquiry.addEventListener('submit', event => {
  event.preventDefault();
  if (!enquiry.reportValidity()) return;
  const type = document.getElementById('inquiry-type').value;
  const name = document.getElementById('org-name').value.trim();
  const email = document.getElementById('enquiry-email').value.trim();
  const body = [`Dear TECHFORGE Partnerships Team,`, ``, `I'm interested in: ${type}`, `Name or organisation: ${name}`, `Email: ${email}`, ``, `Please share the appropriate next steps for TECHFORGE 2027.`, ``, `Kind regards,`, name];
  window.location.href = mailto(`TECHFORGE 2027 - ${type}`, body);
});
document.getElementById('year').textContent = String(new Date().getFullYear());
