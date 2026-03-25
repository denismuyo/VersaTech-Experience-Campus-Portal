// VersaTech Experience Campus – Course Access Keys

const COURSE_KEYS = {
  python: {
    key: 'VTXPYTHON2026',
    redirect: 'python-course.html',
  },
  design: {
    key: 'VTXDESIGN2026',
    redirect: 'design-course.html',
  },
};

function initAccessPage(courseId) {
  const config = COURSE_KEYS[courseId];
  if (!config) return;

  const input = document.getElementById('enrolment-key');
  const btn = document.getElementById('unlock-btn');
  const errorMsg = document.getElementById('error-msg');

  if (!input || !btn) return;

  function attemptUnlock() {
    const entered = input.value.trim().toUpperCase();
    if (entered === config.key) {
      btn.innerHTML = '<span class="spinner"></span> Unlocking...';
      btn.disabled = true;
      input.style.borderColor = '#22c55e';
      input.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.15)';
      setTimeout(() => {
        window.location.href = config.redirect;
      }, 900);
    } else {
      input.classList.add('error');
      if (errorMsg) errorMsg.classList.add('show');
      setTimeout(() => input.classList.remove('error'), 500);
      input.focus();
    }
  }

  btn.addEventListener('click', attemptUnlock);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') attemptUnlock();
    if (errorMsg) errorMsg.classList.remove('show');
    input.style.borderColor = '';
    input.style.boxShadow = '';
  });

  // Auto uppercase
  input.addEventListener('input', () => {
    const pos = input.selectionStart;
    input.value = input.value.toUpperCase();
    input.setSelectionRange(pos, pos);
  });
}
