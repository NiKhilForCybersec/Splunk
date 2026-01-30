// Sobeys Detection Engineering - JavaScript Application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initTabs();
  initAccordions();
  initChecklists();
  initCodeBlocks();
  initSearch();
  initSidebar();
});

// Tabs Component
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabContainer => {
    const buttons = tabContainer.querySelectorAll('.tab-button');
    const panels = tabContainer.querySelectorAll('.tab-panel');
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        button.classList.add('active');
        panels[index].classList.add('active');
      });
    });
  });
}

// Accordion Component
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      // Close all in same accordion
      const accordion = header.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      }
      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// Checklists Component with LocalStorage
function initChecklists() {
  document.querySelectorAll('.checklist').forEach(checklist => {
    const id = checklist.dataset.checklistId;
    const items = checklist.querySelectorAll('.checklist-item');
    const countEl = checklist.querySelector('.checklist-count');
    const progressBar = checklist.querySelector('.checklist-progress-bar');
    
    // Load saved state
    const saved = JSON.parse(localStorage.getItem('checklist-' + id) || '[]');
    
    function updateProgress() {
      const checked = checklist.querySelectorAll('.checklist-checkbox:checked').length;
      const total = items.length;
      if (countEl) countEl.textContent = checked + '/' + total;
      if (progressBar) progressBar.style.width = (checked / total * 100) + '%';
    }
    
    items.forEach((item, index) => {
      const checkbox = item.querySelector('.checklist-checkbox');
      if (saved.includes(index)) {
        checkbox.checked = true;
        item.classList.add('checked');
      }
      checkbox.addEventListener('change', () => {
        item.classList.toggle('checked', checkbox.checked);
        // Save state
        const currentChecked = [];
        items.forEach((it, idx) => {
          if (it.querySelector('.checklist-checkbox').checked) currentChecked.push(idx);
        });
        localStorage.setItem('checklist-' + id, JSON.stringify(currentChecked));
        updateProgress();
      });
    });
    updateProgress();
  });
}

// Code Block Copy
function initCodeBlocks() {
  document.querySelectorAll('.code-block').forEach(block => {
    const header = block.querySelector('.code-header');
    if (!header) return;
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn secondary sm';
    copyBtn.textContent = 'Copy';
    copyBtn.style.marginLeft = 'auto';
    copyBtn.addEventListener('click', () => {
      const code = block.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 2000);
      });
    });
    header.appendChild(copyBtn);
  });
}

// Search Functionality
function initSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('input', debounce(function() {
      const query = this.value.toLowerCase();
      const container = this.closest('.page-content') || document;
      // Search in tables
      container.querySelectorAll('tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
      // Search in cards
      container.querySelectorAll('.card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    }, 200));
  });
  // Keyboard shortcut
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const input = document.querySelector('.search-input');
      if (input) input.focus();
    }
  });
}

// Sidebar Toggle
function initSidebar() {
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

// Utility: Debounce
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
