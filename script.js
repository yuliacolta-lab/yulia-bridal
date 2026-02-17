<script>
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    status.style.display = 'block';
    status.textContent = 'Envoi en cours...';

    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        status.textContent = 'Merci — votre demande a bien été envoyée !';
        form.reset();
      } else {
        const json = await res.json();
        status.textContent = json?.error || 'Erreur lors de l\'envoi, réessayez.';
      }
    } catch (err) {
      status.textContent = 'Erreur réseau — merci de réessayer plus tard.';
    }
    setTimeout(()=> { status.style.display = 'none'; }, 7000);
  })
}
</script>