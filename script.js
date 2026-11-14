/**
 * DANIEL FOTOGRAFIA - AGÊNCIA RIDA
 * Plano Essencial: Script Enxuto de Interatividade, Filtro de Abas e Engenharia Tátil
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar ícones Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 3. Efeito Spotlight nos Cards de Portfólio
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 4. Sistema de Abas do Catálogo / Portfólio
  const tabs = document.querySelectorAll('.portfolio-tab');
  const portfolioItems = document.querySelectorAll('#portfolioGrid > div');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCategory = tab.getAttribute('data-category');

      tabs.forEach(t => {
        t.classList.remove('active', 'bg-brand-dark', 'text-white', 'font-semibold', 'shadow-sm');
        t.classList.add('bg-white/80', 'text-brand-dark');
      });

      tab.classList.add('active', 'bg-brand-dark', 'text-white', 'font-semibold', 'shadow-sm');
      tab.classList.remove('bg-white/80');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (targetCategory === 'all' || itemCategory === targetCategory) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. Interação no Leque de Cards do Hero
  const deckCards = document.querySelectorAll('.fanned-card');
  deckCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      deckCards.forEach(c => {
        if (c !== card) {
          c.style.opacity = '0.7';
          c.style.filter = 'blur(0.5px)';
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      deckCards.forEach(c => {
        c.style.opacity = '1';
        c.style.filter = 'none';
      });
    });
  });

  // 6. Fechar modal com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePhotoModal();
    }
  });
});

// Funções Globais do Modal de Visualização de Foto
function openPhotoModal(imgSrc, title, subtitle) {
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');

  if (!modal || !modalImg) return;

  modalImg.src = imgSrc;
  modalTitle.textContent = title || 'Fotografia Daniel';
  modalSub.textContent = subtitle || 'Ensaio Autoral';

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
  const modal = document.getElementById('photoModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}
