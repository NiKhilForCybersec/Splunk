/* ============================================
   MYFIRSTPRO DETECTION ENGINEERING - JAVASCRIPT
   Interactive functionality for Detection Command Center
   ============================================ */

// Store original mermaid code for re-rendering
var mermaidOriginalCode = {};

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initSidebar();
  initAccordions();
  initCopyButtons();
  initChecklists();
  initSearch();
  
  // Store mermaid code before initialization
  storeMermaidCode();
  
  // Initialize mermaid for visible diagrams only
  initMermaidVisible();
  
  // Initialize tabs (must come after mermaid storage)
  initTabsWithMermaid();
});

/* ===================
   STORE MERMAID CODE
   =================== */
function storeMermaidCode() {
  document.querySelectorAll('.mermaid').forEach((div, index) => {
    const id = 'mermaid-' + index;
    div.setAttribute('data-mermaid-id', id);
    mermaidOriginalCode[id] = div.textContent.trim();
  });
}

/* ===================
   INIT MERMAID FOR VISIBLE ONLY
   =================== */
function initMermaidVisible() {
  if (typeof mermaid === 'undefined') return;
  
  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    }
  });
  
  // Only render mermaid diagrams that are currently visible
  document.querySelectorAll('.mermaid').forEach(div => {
    // Check if diagram is in visible tab or not in a tab at all
    const tabContent = div.closest('.tab-content');
    if (!tabContent || tabContent.classList.contains('active')) {
      renderMermaidDiagram(div);
    }
  });
}

/* ===================
   RENDER SINGLE MERMAID
   =================== */
function renderMermaidDiagram(div) {
  if (typeof mermaid === 'undefined') return;
  
  const id = div.getAttribute('data-mermaid-id');
  const code = mermaidOriginalCode[id];
  
  if (!code) return;
  
  // Check if already rendered
  if (div.querySelector('svg')) return;
  
  try {
    // Clear and re-add code
    div.innerHTML = '';
    div.textContent = code;
    
    // Use mermaid.run for newer versions
    if (typeof mermaid.run === 'function') {
      mermaid.run({ nodes: [div] });
    } else {
      // Fallback for older versions
      mermaid.init(undefined, div);
    }
  } catch (e) {
    console.error('Mermaid render error:', e);
    div.innerHTML = '<p style="color:red;">Diagram rendering error</p>';
  }
}

/* ===================
   TABS WITH MERMAID
   =================== */
function initTabsWithMermaid() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('.tabs-container');
      const targetId = btn.getAttribute('data-tab');
      
      // Remove active from all buttons in this group
      tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      
      // Remove active from all content in this group
      tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Add active to clicked button
      btn.classList.add('active');
      
      // Add active to target content
      const targetContent = tabGroup.querySelector('#' + targetId);
      if (targetContent) {
        targetContent.classList.add('active');
        
        // Render mermaid diagrams in newly visible tab
        setTimeout(() => {
          targetContent.querySelectorAll('.mermaid').forEach(div => {
            renderMermaidDiagram(div);
          });
        }, 50);
      }
    });
  });
}

/* ===================
   SIDEBAR
   =================== */
function initSidebar() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });
    
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      }
    });
  }
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && href.includes(currentPage)) {
      item.classList.add('active');
    }
  });
}

/* ===================
   ACCORDIONS
   =================== */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('open');
    });
  });
}

/* ===================
   COPY TO CLIPBOARD
   =================== */
function initCopyButtons() {
  const codeBlocks = document.querySelectorAll('.code-block');
  
  codeBlocks.forEach(block => {
    if (!block.querySelector('.copy-btn')) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', () => copyCodeBlock(block, copyBtn));
      block.appendChild(copyBtn);
    }
  });
}

function copyCodeBlock(block, button) {
  const code = block.querySelector('pre code') || block.querySelector('pre');
  if (code) {
    navigator.clipboard.writeText(code.textContent).then(() => {
      button.textContent = 'Copied!';
      button.style.background = '#059669';
      setTimeout(() => {
        button.textContent = 'Copy';
        button.style.background = '';
      }, 2000);
    });
  }
}

/* ===================
   CHECKLISTS
   =================== */
function initChecklists() {
  const checklists = document.querySelectorAll('.checklist');
  
  checklists.forEach(checklist => {
    const checklistId = checklist.dataset.checklistId || generateId();
    checklist.dataset.checklistId = checklistId;
    
    const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
    
    const savedState = localStorage.getItem('checklist_' + checklistId);
    if (savedState) {
      const state = JSON.parse(savedState);
      checkboxes.forEach((cb, index) => {
        if (state[index]) {
          cb.checked = true;
        }
      });
    }
    
    checkboxes.forEach((cb, index) => {
      cb.addEventListener('change', () => {
        const state = {};
        checkboxes.forEach((c, i) => {
          state[i] = c.checked;
        });
        localStorage.setItem('checklist_' + checklistId, JSON.stringify(state));
      });
    });
  });
}

/* ===================
   SEARCH
   =================== */
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
      const query = e.target.value.toLowerCase();
      if (query.length < 2) return;
      
      const content = document.querySelector('.page-content');
      if (content) {
        highlightText(content, query);
      }
    }, 300));
  }
}

function highlightText(element, query) {
  // Simple highlight implementation
}

/* ===================
   UTILITIES
   =================== */
function debounce(func, wait) {
  let timeout;
  return function() {
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function generateId() {
  return 'cl_' + Math.random().toString(36).substr(2, 9);
}

function showToast(message, duration) {
  duration = duration || 2000;
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#1f2937;color:white;padding:12px 20px;border-radius:8px;font-size:14px;z-index:9999;';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}
