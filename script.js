/* ============================================================
   Devbhumi Cabs – Main JavaScript
   File: script.js
   ============================================================ */

/* ── FORM SUBMISSION ── */
function submitForm() {
  const name  = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const route = document.getElementById('froute').value;

  if (!name || !phone || !route) {
    alert('Please fill in your Name, Mobile Number, and Route.');
    return;
  }

  document.getElementById('formBox').style.display  = 'none';
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
