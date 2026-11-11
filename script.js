// Scroll-reveal animations
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Seamless contact form: send via FormSubmit AJAX, fall back to normal POST
const krForm = document.getElementById('kr-form');
if (krForm) {
  krForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const btn = krForm.querySelector('.submit-btn');
    status.className = 'form-status';
    status.textContent = 'Sending…';
    btn.disabled = true;
    const data = {};
    new FormData(krForm).forEach((v, k) => { data[k] = v; });
    try {
      const res = await fetch('https://formsubmit.co/ajax/krbssconsulting@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('send failed');
      krForm.reset();
      status.className = 'form-status ok';
      status.textContent = 'Sent — thank you. We’ll reply from krbssconsulting@gmail.com shortly.';
    } catch (err) {
      status.className = 'form-status err';
      status.textContent = 'Sending the direct way…';
      krForm.submit();
    } finally {
      btn.disabled = false;
    }
  });
}
