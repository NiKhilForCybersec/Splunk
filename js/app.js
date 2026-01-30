/* ============================================
   MYFIRSTPRO DETECTION ENGINEERING - JAVASCRIPT
   Interactive functionality for Detection Command Center
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initSidebar();
  initTabs();
  initAccordions();
  initCopyButtons();
  initChecklists();
  initSearch();
  initMermaid();
});

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
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      }
    });
  }
  
  // Highlight active nav item based on current page
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
   TABS
   =================== */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');
  
  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-button');
    const panels = container.querySelectorAll('.tab-panel');
    
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Remove active class from all
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked
        button.classList.add('active');
        if (panels[index]) {
          panels[index].classList.add('active');
        }
      });
    });
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
      const isOpen = item.classList.contains('open');
      
      // Optional: close other items in same accordion
      const accordion = item.parentElement;
      if (accordion.classList.contains('accordion')) {
        accordion.querySelectorAll('.accordion-item').forEach(i => {
          if (i !== item) {
            // i.classList.remove('open'); // Uncomment for single-open behavior
          }
        });
      }
      
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
    // Create copy button if not exists
    if (!block.querySelector('.copy-btn')) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', () => copyCodeBlock(block, copyBtn));
      block.appendChild(copyBtn);
    }
  });
  
  // Also add click-to-copy for inline code elements marked as copyable
  document.querySelectorAll('code.copyable').forEach(code => {
    code.style.cursor = 'pointer';
    code.title = 'Click to copy';
    code.addEventListener('click', () => {
      navigator.clipboard.writeText(code.textContent).then(() => {
        showToast('Copied to clipboard!');
      });
    });
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
    }).catch(err => {
      console.error('Failed to copy:', err);
      button.textContent = 'Error';
    });
  }
}

/* ===================
   CHECKLISTS (with localStorage)
   =================== */
function initChecklists() {
  const checklists = document.querySelectorAll('.checklist');
  
  checklists.forEach(checklist => {
    const checklistId = checklist.dataset.checklistId || generateId();
    checklist.dataset.checklistId = checklistId;
    
    const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
    
    // Load saved state
    const savedState = localStorage.getItem(`checklist_${checklistId}`);
    if (savedState) {
      const state = JSON.parse(savedState);
      checkboxes.forEach((cb, index) => {
        if (state[index]) {
          cb.checked = true;
          cb.closest('.checklist-item')?.classList.add('checked');
        }
      });
    }
    
    // Update progress bar if exists
    updateChecklistProgress(checklist);
    
    // Save state on change
    checkboxes.forEach((cb, index) => {
      cb.addEventListener('change', () => {
        const state = {};
        checkboxes.forEach((c, i) => {
          state[i] = c.checked;
          c.closest('.checklist-item')?.classList.toggle('checked', c.checked);
        });
        localStorage.setItem(`checklist_${checklistId}`, JSON.stringify(state));
        updateChecklistProgress(checklist);
      });
    });
  });
}

function updateChecklistProgress(checklist) {
  const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
  const progressBar = checklist.parentElement?.querySelector('.progress-fill');
  const progressText = checklist.parentElement?.querySelector('.progress-text');
  
  if (progressBar || progressText) {
    const total = checkboxes.length;
    const checked = checklist.querySelectorAll('input[type="checkbox"]:checked').length;
    const percent = Math.round((checked / total) * 100);
    
    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }
    if (progressText) {
      progressText.textContent = `${checked}/${total} (${percent}%)`;
    }
  }
}

/* ===================
   SEARCH
   =================== */
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
      const query = e.target.value.toLowerCase();
      performSearch(query);
    }, 300));
    
    // Keyboard shortcut (Cmd/Ctrl + K)
    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }
}

function performSearch(query) {
  // Simple page content search
  if (query.length < 2) {
    clearHighlights();
    return;
  }
  
  // Highlight matches in current page
  const content = document.querySelector('.page-content');
  if (content) {
    clearHighlights();
    highlightText(content, query);
  }
}

function highlightText(element, query) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }
  
  textNodes.forEach(node => {
    const text = node.textContent;
    const lowerText = text.toLowerCase();
    const index = lowerText.indexOf(query);
    
    if (index !== -1 && node.parentElement.tagName !== 'SCRIPT' && node.parentElement.tagName !== 'STYLE') {
      const span = document.createElement('span');
      span.innerHTML = text.substring(0, index) + 
        '<mark class="search-highlight" style="background:#fef08a;padding:0 2px;border-radius:2px;">' + 
        text.substring(index, index + query.length) + 
        '</mark>' + 
        text.substring(index + query.length);
      node.parentElement.replaceChild(span, node);
    }
  });
}

function clearHighlights() {
  document.querySelectorAll('.search-highlight').forEach(mark => {
    const parent = mark.parentElement;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

/* ===================
   MERMAID DIAGRAMS
   =================== */
function initMermaid() {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    });
  }
}

/* ===================
   UTILITIES
   =================== */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function generateId() {
  return 'cl_' + Math.random().toString(36).substr(2, 9);
}

function showToast(message, duration = 2000) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1f2937;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 9999;
    animation: fadeIn 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(20px); }
  }
`;
document.head.appendChild(style);

/* ===================
   SPL SYNTAX HIGHLIGHTING
   =================== */
function highlightSPL(code) {
  const keywords = ['index', 'sourcetype', 'earliest', 'latest', 'stats', 'eval', 'where', 'search', 
                    'table', 'sort', 'head', 'tail', 'fields', 'rename', 'dedup', 'lookup', 'spath',
                    'bin', 'timechart', 'eventstats', 'streamstats', 'transaction', 'append', 'join',
                    'rex', 'replace', 'if', 'case', 'coalesce', 'isnotnull', 'isnull', 'mvexpand',
                    'count', 'dc', 'avg', 'sum', 'min', 'max', 'values', 'list', 'first', 'last',
                    'BY', 'AS', 'AND', 'OR', 'NOT', 'IN'];
  
  let highlighted = code;
  
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
    highlighted = highlighted.replace(regex, '<span style="color:#93c5fd;">$1</span>');
  });
  
  // Highlight strings
  highlighted = highlighted.replace(/"([^"]*)"/g, '<span style="color:#86efac;">"$1"</span>');
  
  // Highlight field names
  highlighted = highlighted.replace(/(\w+)=/g, '<span style="color:#fcd34d;">$1</span>=');
  
  // Highlight comments
  highlighted = highlighted.replace(/```(.*)$/gm, '<span style="color:#6b7280;">```$1</span>');
  
  return highlighted;
}

/* ===================
   DATA EXPORT
   =================== */
function exportToCSV(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) return;
  
  const rows = table.querySelectorAll('tr');
  const csv = [];
  
  rows.forEach(row => {
    const cols = row.querySelectorAll('th, td');
    const rowData = [];
    cols.forEach(col => {
      rowData.push('"' + col.textContent.replace(/"/g, '""') + '"');
    });
    csv.push(rowData.join(','));
  });
  
  const csvContent = csv.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || 'export.csv';
  link.click();
}

/* ===================
   PRINT FUNCTIONALITY
   =================== */
function printPage() {
  window.print();
}

// Tab functionality
function initTabs() {
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
      const targetContent = tabGroup.querySelector(`#${targetId}`);
      if (targetContent) {
        targetContent.classList.add('active');
        // Re-render mermaid diagrams in the newly visible tab
        if (typeof mermaid !== 'undefined') {
          mermaid.init(undefined, targetContent.querySelectorAll('.mermaid'));
        }
      }
    });
  });
}

// Initialize tabs on page load
document.addEventListener('DOMContentLoaded', initTabs);
