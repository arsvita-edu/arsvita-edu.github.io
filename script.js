const routes = [...document.querySelectorAll('[data-route]')];
const pages = [...document.querySelectorAll('.page')];
const nav = document.getElementById('mainNav');
const toggle = document.getElementById('menuToggle');
const backTop = document.getElementById('backTop');

function go(route){
  const target = document.getElementById(route) || document.getElementById('inicio');
  pages.forEach(p => p.classList.toggle('active', p === target));
  document.title = `ARS VITA | ${target.dataset.title || 'Atendiendo a la diversidad'}`;
  window.scrollTo({top:0, behavior:'smooth'});
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  history.replaceState(null,'',`#${target.id}`);
}

routes.forEach(el => el.addEventListener('click', () => go(el.dataset.route)));

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

window.addEventListener('hashchange', () => go(location.hash.replace('#','') || 'inicio'));
go(location.hash.replace('#','') || 'inicio');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 500);
});
backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

const form = document.getElementById('admissionForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  const msg = [
    'Hola ARS VITA, quisiera recibir información sobre admisión.',
    '',
    `Padre/madre/tutor: ${data.get('parent')}`,
    `Relación: ${data.get('relation')}`,
    `WhatsApp: ${data.get('phone')}`,
    `Correo: ${data.get('email') || 'No indicado'}`,
    `Estudiante: ${data.get('child')}`,
    `Edad: ${data.get('age')}`,
    `Distrito: ${data.get('district') || 'No indicado'}`,
    `Institución actual: ${data.get('school') || 'No indicada'}`,
    `Necesidad/condición comentada: ${data.get('need') || 'Prefiero comentarlo personalmente'}`,
    `Servicio de interés: ${data.get('service')}`,
    `Consulta: ${data.get('message') || 'No indicada'}`,
  ].join('\n');
  const url = `https://wa.me/51924918620?text=${encodeURIComponent(msg)}`;
  status.textContent = 'Preparando WhatsApp institucional…';
  window.open(url, '_blank', 'noopener');
});

const institutionalVideo = document.getElementById('institutionalVideo');
const videoModal = document.getElementById('videoModal');
const closeVideo = document.getElementById('closeVideo');
const videoPoster = document.getElementById('videoPoster');
const playInstitutionalVideo = document.getElementById('playInstitutionalVideo');
const institutionalVideoFrame = document.getElementById('institutionalVideoFrame');

if (institutionalVideo && videoModal && closeVideo) {
  institutionalVideo.addEventListener('click', (event) => {
    event.preventDefault();
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');

    if (videoPoster) videoPoster.style.display = 'flex';
    if (institutionalVideoFrame) {
      institutionalVideoFrame.style.display = 'none';
      institutionalVideoFrame.src = 'about:blank';
    }
  });

  function hideInstitutionalVideo() {
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');

    if (videoPoster) videoPoster.style.display = 'flex';
    if (institutionalVideoFrame) {
      institutionalVideoFrame.src = 'about:blank';
      institutionalVideoFrame.style.display = 'none';
    }
  }

  if (playInstitutionalVideo && institutionalVideoFrame && videoPoster) {
    playInstitutionalVideo.addEventListener('click', () => {
      institutionalVideoFrame.src = institutionalVideoFrame.dataset.src;
      institutionalVideoFrame.style.display = 'block';
      videoPoster.style.display = 'none';
    });
  }

  closeVideo.addEventListener('click', hideInstitutionalVideo);

  videoModal.addEventListener('click', (event) => {
    if (event.target === videoModal) hideInstitutionalVideo();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && videoModal.classList.contains('open')) {
      hideInstitutionalVideo();
    }
  });
}
