const APP_URL = 'http://127.0.0.1:8000/';

const CATEGORIES = [
  'all', 'programming', 'design', 'business', 'marketing', 'finance',
  'health', 'music', 'photography', 'science', 'language'
];

const COURSES = [
  { id: 1, title: 'Python for Academic Assessment', short_description: 'Build strong Python foundations for test-ready workflows.', category: 'programming', rating: '4.8', level: 'All levels', modules: '12 modules', instructor: 'Classagon Academy', price: 'INR 1,499' },
  { id: 2, title: 'UI Design Essentials for Learning Apps', short_description: 'Design polished learning interfaces and course pages.', category: 'design', rating: '4.7', level: 'Beginner', modules: '10 modules', instructor: 'Nisha Arora', price: 'INR 1,299' },
  { id: 3, title: 'Provider Onboarding Operations', short_description: 'Run document checks and onboarding approvals at scale.', category: 'business', rating: '4.9', level: 'Intermediate', modules: '9 modules', instructor: 'Ops Studio', price: 'INR 1,899' },
  { id: 4, title: 'Growth Marketing for Course Launches', short_description: 'Launch and optimize learner acquisition campaigns.', category: 'marketing', rating: '4.6', level: 'Intermediate', modules: '8 modules', instructor: 'Rhea Kapoor', price: 'INR 999' },
  { id: 5, title: 'Finance Basics for Creators', short_description: 'Understand pricing, margins, and recurring revenue models.', category: 'finance', rating: '4.5', level: 'Beginner', modules: '7 modules', instructor: 'Vikram Iyer', price: 'INR 899' },
  { id: 6, title: 'Fundamentals of Wellness Coaching', short_description: 'Deliver outcome-driven wellness learning programs.', category: 'health', rating: '4.8', level: 'All levels', modules: '11 modules', instructor: 'Asha Verma', price: 'INR 1,299' },
  { id: 7, title: 'Music Production Starter Kit', short_description: 'Create tracks, edit audio, and publish confidently.', category: 'music', rating: '4.7', level: 'Beginner', modules: '9 modules', instructor: 'SoundLab India', price: 'INR 1,199' },
  { id: 8, title: 'Photography Masterclass', short_description: 'Master camera settings, composition, and editing flow.', category: 'photography', rating: '4.8', level: 'All levels', modules: '10 modules', instructor: 'Arjun Mehta', price: 'INR 1,399' },
  { id: 9, title: 'Applied Data Science Concepts', short_description: 'Core science topics for practical data projects.', category: 'science', rating: '4.9', level: 'Advanced', modules: '13 modules', instructor: 'Data Guild', price: 'INR 2,199' },
  { id: 10, title: 'Spoken English Accelerator', short_description: 'Improve fluency through structured communication drills.', category: 'language', rating: '4.7', level: 'All levels', modules: '8 modules', instructor: 'Fluent Path', price: 'INR 1,099' }
];

document.querySelectorAll('.app-link').forEach((link) => {
  link.setAttribute('href', APP_URL);
});

(function initCourseListing() {
  const categoryRow = document.getElementById('categoryRow');
  const searchInput = document.getElementById('courseSearch');
  const loadingState = document.getElementById('loadingState');
  const emptyState = document.getElementById('emptyState');
  const courseGrid = document.getElementById('courseGrid');
  const statCourses = document.getElementById('statCourses');

  if (!categoryRow || !searchInput || !loadingState || !emptyState || !courseGrid || !statCourses) {
    return;
  }

  let search = '';
  let category = 'all';

  function renderCategories() {
    categoryRow.innerHTML = CATEGORIES.map((cat) => {
      const activeClass = cat === category ? 'active' : '';
      const label = cat === 'all' ? 'All Courses' : cat;
      return `<button class="cat-btn ${activeClass}" data-cat="${cat}">${label}</button>`;
    }).join('');

    categoryRow.querySelectorAll('.cat-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        category = btn.dataset.cat || 'all';
        renderCategories();
        renderCourses();
      });
    });
  }

  function courseRow(course) {
    return `
      <article class="course-card">
        <div class="thumb"></div>
        <div class="body">
          <p class="tag">${course.category}</p>
          <h3>${course.title}</h3>
          <p>${course.short_description}</p>
          <p class="instructor">${course.instructor}</p>
          <div class="meta">
            <span>★ ${course.rating}</span>
            <span>${course.level}</span>
            <span>${course.modules}</span>
          </div>
          <div class="foot">
            <span class="price">${course.price}</span>
            <span class="cta">View Details</span>
          </div>
        </div>
      </article>
    `;
  }

  function renderSkeletons(count = 6) {
    loadingState.innerHTML = Array.from({ length: count }).map(() => `
      <div class="skeleton-body">
        <div class="skel-line"></div>
        <div class="skel-line"></div>
        <div class="skel-line short"></div>
      </div>
    `).join('');
  }

  function renderCourses() {
    const filtered = COURSES.filter((c) => {
      const text = `${c.title} ${c.short_description}`.toLowerCase();
      const matchSearch = !search || text.includes(search.toLowerCase());
      const matchCat = category === 'all' || c.category === category;
      return matchSearch && matchCat;
    });

    if (!filtered.length) {
      courseGrid.classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    courseGrid.classList.remove('hidden');
    courseGrid.innerHTML = filtered.map(courseRow).join('');
  }

  searchInput.addEventListener('input', (event) => {
    search = event.target.value;
    renderCourses();
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      window.location.href = APP_URL;
    }
  });

  statCourses.textContent = `${COURSES.length}+`;
  renderCategories();
  renderSkeletons();

  setTimeout(() => {
    loadingState.classList.add('hidden');
    renderCourses();
  }, 450);
})();
