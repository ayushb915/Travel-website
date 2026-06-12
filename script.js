/* ============================================================
   Devbhumi Cabs – Main JavaScript
   File: script.js
   ============================================================ */

/* ── TAB TOGGLE ── */
let activeTab = 'whatsapp';

function showTab(tab) {
  activeTab = tab;

  // Toggle button styles
  document.getElementById('btnWhatsapp').classList.toggle('active', tab === 'whatsapp');
  document.getElementById('btnEmail').classList.toggle('active', tab === 'email');

  // Toggle submit buttons
  document.getElementById('submitWhatsapp').style.display = tab === 'whatsapp' ? 'block' : 'none';
  document.getElementById('submitEmail').style.display    = tab === 'email'     ? 'block' : 'none';

  // Toggle email input field
  document.getElementById('emailFieldGroup').style.display = tab === 'email' ? 'block' : 'none';
}

/* ── WHATSAPP SUBMISSION ── */
function submitToWhatsApp() {
  const name  = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const route = document.getElementById('froute').value.trim();
  const date  = document.getElementById('fdate').value.trim();
  const pax   = document.getElementById('fpax').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();

  if (!name)  { alert('Please enter your name!'); return; }
  if (!phone) { alert('Please enter your mobile number!'); return; }
  if (!route) { alert('Please select a route!'); return; }

  const message =
`*New Enquiry -- Pahadi Travels*

*Name:* ${name}
*Mobile:* ${phone}
*Route:* ${route}
*Travel Date:* ${date || 'Not specified'}
*Passengers:* ${pax || 'Not specified'}
*Message:* ${msg || 'No additional message'}`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/919217682499?text=${encoded}`, '_blank');

  document.getElementById('formBox').style.display    = 'none';
  document.getElementById('successMsg').style.display = 'block';
}

/* ── EMAIL SUBMISSION (Formspree) ── */
async function submitToEmail() {
  const name  = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const route = document.getElementById('froute').value.trim();
  const email = document.getElementById('femail').value.trim();
  const date  = document.getElementById('fdate').value.trim();
  const pax   = document.getElementById('fpax').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();

  if (!name)  { alert('Please enter your name!'); return; }
  if (!phone) { alert('Please enter your mobile number!'); return; }
  if (!route) { alert('Please select a route!'); return; }
  if (!email) { alert('Please enter your email address!'); return; }

  const btn = document.getElementById('submitEmail');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/xykander', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, phone, route,
        email, travel_date: date || 'Not specified',
        passengers: pax || 'Not specified',
        message: msg || 'No additional message'
      })
    });

    if (response.ok) {
      document.getElementById('formBox').style.display    = 'none';
      document.getElementById('successMsg').style.display = 'block';
    } else {
      alert('Something went wrong. Please try WhatsApp instead!');
      btn.textContent = '📧 Send via Email';
      btn.disabled = false;
    }
  } catch (err) {
    alert('Network error. Please try WhatsApp instead!');
    btn.textContent = '📧 Send via Email';
    btn.disabled = false;
  }
}

/* ── SCROLL REVEAL ── */
document.addEventListener('DOMContentLoaded', () => {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.route-card, .why-card').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(22px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });
});
