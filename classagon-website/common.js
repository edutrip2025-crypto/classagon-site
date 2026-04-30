const APP_URL = 'http://127.0.0.1:8000/';
const LOCAL_USER_KEY = 'classagon_user_name';

function getUserName() {
  return window.localStorage.getItem(LOCAL_USER_KEY) || '';
}

function setUserName(name) {
  if (!name) {
    window.localStorage.removeItem(LOCAL_USER_KEY);
    return;
  }
  window.localStorage.setItem(LOCAL_USER_KEY, name);
}

function syncUserUI() {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const userPill = document.getElementById('userPill');
  const userNameText = document.getElementById('userNameText');

  if (!loginBtn || !logoutBtn || !userPill || !userNameText) return;

  const name = getUserName();
  if (name) {
    userNameText.textContent = `Hi, ${name}`;
    userPill.classList.remove('hidden');
    loginBtn.classList.add('hidden');
  } else {
    userPill.classList.add('hidden');
    loginBtn.classList.remove('hidden');
  }

  loginBtn.onclick = () => {
    const promptDefault = getUserName() || 'Learner';
    const typed = window.prompt('Enter your name to continue on Classagon:', promptDefault);
    if (!typed || !typed.trim()) return;
    setUserName(typed.trim());
    syncUserUI();
  };

  logoutBtn.onclick = () => {
    setUserName('');
    syncUserUI();
  };
}

document.querySelectorAll('.app-link').forEach((link) => {
  link.setAttribute('href', APP_URL);
});

syncUserUI();

const revealNodes = document.querySelectorAll('.reveal');
if (revealNodes.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealNodes.forEach((node, index) => {
    node.style.transitionDelay = `${index * 90}ms`;
    revealObserver.observe(node);
  });
}

const carouselRoot = document.querySelector('[data-carousel]');
if (carouselRoot) {
  const slides = Array.from(carouselRoot.querySelectorAll('.carousel-slide'));
  const prevBtn = carouselRoot.querySelector('[data-prev]');
  const nextBtn = carouselRoot.querySelector('[data-next]');
  const dotsWrap = document.querySelector('[data-dots]');
  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('button')) : [];
  let index = 0;

  const render = () => {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  };

  prevBtn?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  nextBtn?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      render();
    });
  });

  render();
}
