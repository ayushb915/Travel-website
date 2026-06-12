/* ============================================================
   Devbhumi Cabs – Main JavaScript
   File: script.js
   ============================================================ */

/* ── WHATSAPP FORM SUBMISSION ── */
function submitToWhatsApp() {
  const name  = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const route = document.getElementById('froute').value.trim();
  const date  = document.getElementById('fdate').value.trim();
  const pax   = document.getElementById('fpax').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();

  // Validation
  if (!name)  { alert('Please enter your name!'); return; }
  if (!phone) { alert('Please enter your mobile number!'); return; }
  if (!route) { alert('Please select a route!'); return; }

  // Build WhatsApp message
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

  // Show success message after opening WhatsApp
  document.getElementById('formBox').style.display   = 'none';
  document.getElementById('successMsg').style.display = 'block';
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
