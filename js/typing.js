// VersaTech Experience Campus – Terminal Typing Effect (FIXED)

const lines = [
  { type: 'prompt', text: 'vtx@campus:~$ ' },
  { type: 'cmd', text: 'init versatech-experience-campus --mode=production' },
  { type: 'blank', text: '' },
  { type: 'output', text: '[ OK ] Loading campus infrastructure...' },
  { type: 'output', text: '[ OK ] Connecting to African learning grid...' },
  { type: 'output', text: '[ OK ] Initializing course modules...' },
  { type: 'output', text: '[ OK ] Activating mentorship network...' },
  { type: 'blank', text: '' },
  { type: 'accent', text: '██╗   ██╗████████╗██╗  ██╗' },
  { type: 'accent', text: '██║   ██║╚══██╔══╝╚██╗██╔╝' },
  { type: 'accent', text: '██║   ██║   ██║    ╚███╔╝ ' },
  { type: 'accent', text: '╚██╗ ██╔╝   ██║    ██╔██╗ ' },
  { type: 'accent', text: ' ╚████╔╝    ██║   ██╔╝ ██╗' },
  { type: 'accent', text: '  ╚═══╝     ╚═╝   ╚═╝  ╚═╝' },
  { type: 'blank', text: '' },
  { type: 'big', text: 'VersaTech Experience Campus' },
  { type: 'dim', text: 'Version 1.0.0 • Narok, Kenya • Built for Africa' },
  { type: 'blank', text: '' },
  { type: 'output', text: 'Welcome to the future of tech skills.' },
  { type: 'output', text: 'Building the next generation of developers, creators,' },
  { type: 'output', text: 'and innovators across Africa and beyond.' },
  { type: 'blank', text: '' },
  { type: 'cyan', text: 'Learn.  Build.  Launch.' },
  { type: 'blank', text: '' },
  { type: 'output', text: 'Your journey into the digital future starts here.' },
  { type: 'blank', text: '' },
  { type: 'prompt', text: 'vtx@campus:~$ ' },
  { type: 'cmd', text: 'open --campus --ui' },
];

const TYPING_SPEED = 22;
const LINE_DELAY = 80;
const END_PAUSE = 1200;

function buildTerminal() {
  const body = document.getElementById('terminal-text');
  if (!body) return;

  let lineIndex = 0;
  let charIndex = 0;
  let currentSpan = null;

  const cursor = document.getElementById('terminal-cursor');

  function typeChar() {
    if (lineIndex >= lines.length) {
      setTimeout(finishIntro, END_PAUSE);
      return;
    }

    const line = lines[lineIndex];

    if (!currentSpan) {
      if (line.text === '') {
        body.appendChild(document.createElement('br'));
        lineIndex++;
        setTimeout(typeChar, LINE_DELAY);
        return;
      }

      currentSpan = document.createElement('span');
      currentSpan.className = getLineClass(line.type);
      body.appendChild(currentSpan);

      if (line.type !== 'prompt' && line.type !== 'cmd') {
        currentSpan.style.display = 'block';
      }
    }

    if (charIndex < line.text.length) {
      currentSpan.textContent += line.text[charIndex];
      charIndex++;

      if (cursor) body.parentNode.appendChild(cursor);

      setTimeout(typeChar, TYPING_SPEED);
    } else {
      if (line.type !== 'prompt') {
        body.appendChild(document.createElement('br'));
      }

      currentSpan = null;
      charIndex = 0;
      lineIndex++;

      setTimeout(typeChar, LINE_DELAY);
    }
  }

  typeChar();
}

function getLineClass(type) {
  const map = {
    prompt: 'prompt',
    cmd: 'output',
    output: 'output',
    accent: 'accent',
    big: 'big',
    dim: 'dim',
    cyan: 'accent',
    blank: '',
  };
  return map[type] || 'output';
}

// 🔥 FIXED FUNCTION (IMPORTANT)
function finishIntro() {
  const intro = document.getElementById('terminal-intro');
  const main = document.getElementById('main-site');

  if (intro) {
    // Smooth fade
    intro.style.transition = "opacity 0.5s ease";
    intro.style.opacity = "0";

    // 🔥 CRITICAL: Disable interaction immediately
    intro.style.pointerEvents = "none";

    // Remove from DOM flow after animation
    setTimeout(() => {
      intro.style.display = "none";
    }, 500);
  }

  if (main) {
    main.style.display = 'block';

    // Smooth appearance
    setTimeout(() => {
      main.classList.add('visible');
    }, 50);
  }
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('terminal-intro');

  // Click anywhere to skip
  if (intro) {
    intro.addEventListener('click', finishIntro);
  }

  buildTerminal();
});