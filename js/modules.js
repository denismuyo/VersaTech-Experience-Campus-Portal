// VersaTech Experience Campus – Module System

document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initModuleNav();
  initNetworkBackground();
});

// ─── ACCORDION ───
function initAccordions() {
  const accordions = document.querySelectorAll('.module-accordion');

  accordions.forEach((acc) => {
    const header = acc.querySelector('.accordion-header');
    const body = acc.querySelector('.accordion-body');
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = acc.classList.contains('active');

      // Close all others
      accordions.forEach((other) => {
        if (other !== acc) {
          other.classList.remove('active');
          const ob = other.querySelector('.accordion-body');
          if (ob) ob.classList.remove('open');
        }
      });

      // Toggle this one
      if (isOpen) {
        acc.classList.remove('active');
        body.classList.remove('open');
      } else {
        acc.classList.add('active');
        body.classList.add('open');
        // Smooth scroll into view
        setTimeout(() => {
          acc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });

  // Open first by default
  if (accordions.length > 0) {
    accordions[0].classList.add('active');
    const firstBody = accordions[0].querySelector('.accordion-body');
    if (firstBody) firstBody.classList.add('open');
  }
}

// ─── MODULE NAV SIDEBAR ───
function initModuleNav() {
  const navItems = document.querySelectorAll('.module-nav-item');
  const accordions = document.querySelectorAll('.module-accordion');
  const progressFill = document.querySelector('.progress-fill');
  const progressPct = document.querySelector('.progress-pct');

  let completedCount = 0;
  const total = navItems.length;

  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Activate nav item
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Open corresponding accordion
      accordions.forEach((acc, i) => {
        acc.classList.remove('active');
        const b = acc.querySelector('.accordion-body');
        if (b) b.classList.remove('open');
        if (i === index) {
          acc.classList.add('active');
          if (b) b.classList.add('open');
          // On mobile, scroll content into view
          acc.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });

  // Progress update on task interaction
  document.querySelectorAll('.action-btn.submit-task').forEach((btn) => {
    btn.addEventListener('click', () => {
      const accordion = btn.closest('.module-accordion');
      const moduleIndex = [...accordions].indexOf(accordion);
      const navItem = navItems[moduleIndex];

      if (navItem && !navItem.classList.contains('completed')) {
        navItem.classList.add('completed');
        const numEl = navItem.querySelector('.module-num');
        if (numEl) numEl.textContent = '✓';
        completedCount++;

        const pct = Math.round((completedCount / total) * 100);
        if (progressFill) progressFill.style.width = pct + '%';
        if (progressPct) progressPct.textContent = pct + '%';
      }
    });
  });
}

// ─── ANIMATED NETWORK BACKGROUND ───
function initNetworkBackground() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes, animFrame;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createNodes(count) {
    return Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Move nodes
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const alpha = (1 - dist / 160) * 0.12;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.35)';
      ctx.fill();
    });

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  nodes = createNodes(60);
  draw();

  window.addEventListener('resize', () => {
    resize();
    nodes = createNodes(60);
  });
}
