'use strict';
(() => {
  const $ = selector => document.querySelector(selector);
  const nav = $('#main-nav');
  const menuButton = $('#menu-button');
  if (nav && menuButton) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded','false');
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.focus();
      }
    });
  }
  const tabs = [...document.querySelectorAll('[role="tab"][data-day]')];
  const activate = id => {
    tabs.forEach(tab => {
      const current = tab.dataset.day === id;
      tab.classList.toggle('selected', current);
      tab.setAttribute('aria-selected', String(current));
      tab.tabIndex = current ? 0 : -1;
      const panel = document.getElementById(tab.dataset.day);
      if (panel) panel.hidden = !current;
    });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(tab.dataset.day));
    tab.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
        activate(next.dataset.day);next.focus();
      }
    });
  });
  const email='contact@affidexacademy.com.ng';
  const makeEmail=(subject,content)=>`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`;
  document.querySelectorAll('.sponsor-link').forEach(link => {
    const pkg = link.dataset.package || 'Sponsorship partnership';
    link.href = makeEmail(`TECHFORGE 2027 — ${pkg} Enquiry`, `Dear TECHFORGE Partnerships Team,\n\nWe would like to explore the ${pkg} sponsorship opportunity.\n\nOrganisation:\nContact person:\nPreferred meeting date/time:\n\nKind regards,`);
  });
  const form=$('#contact-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();if (!form.reportValidity()) return;
    const interest=$('#interest').value, name=$('#organisation').value.trim(), reply=$('#email').value.trim(), message=$('#message').value.trim();
    const body=`Dear TECHFORGE Partnerships Team,\n\nI am interested in: ${interest}\nName or organisation: ${name}\nReply email: ${reply}\n\nMessage: ${message || 'Please share next steps and your availability for a conversation.'}\n\nKind regards,\n${name}`;
    window.location.href=makeEmail(`TECHFORGE 2027 — ${interest}`,body);
  });
  const year=$('#year');if(year) year.textContent=String(new Date().getFullYear());
})();
