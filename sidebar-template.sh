#!/bin/bash

# Sidebar HTML for pages in /pages/ directory (uses ../ paths)
SIDEBAR_PAGES='    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <a href="../index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;">
            <div class="sidebar-logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="sidebar-logo-text">
              <h1>myfirstpro</h1>
              <span>Detection Engineering</span>
            </div>
          </a>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-section-title">Getting Started</div>
          <a href="../index.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span>Command Center</span>
          </a>
          <a href="day1.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
            <span>Day 1 Checklist</span>
          </a>
          <a href="client-comm.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>Client Communication</span>
          </a>
        </div>
        <div class="nav-section">
          <div class="nav-section-title">Data Sources</div>
          <a href="vendor-akamai.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Akamai WAF</span>
            <span class="badge akamai" style="margin-left:auto;font-size:0.6rem;">WAF</span>
          </a>
          <a href="vendor-cyberark.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>CyberArk Identity</span>
            <span class="badge cyberark" style="margin-left:auto;font-size:0.6rem;">MFA</span>
          </a>
          <a href="vendor-entra.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>Entra ID</span>
            <span class="badge microsoft" style="margin-left:auto;font-size:0.6rem;">SSO</span>
          </a>
        </div>
        <div class="nav-section">
          <div class="nav-section-title">WAF/DDoS Project</div>
          <a href="waf-overview.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Project Overview</span>
          </a>
          <a href="waf-onboarding.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span>Log Onboarding</span>
          </a>
          <a href="waf-usecases.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span>Use Cases (UC1-8)</span>
          </a>
        </div>
        <div class="nav-section">
          <div class="nav-section-title">MFA Project</div>
          <a href="mfa-overview.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Project Overview</span>
          </a>
          <a href="mfa-usecases.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span>Use Cases (UC1-5)</span>
          </a>
        </div>
        <div class="nav-section">
          <div class="nav-section-title">Splunk Operations</div>
          <a href="splunk-ops.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            <span>Splunk Cloud Ops</span>
          </a>
          <a href="parsing-cim.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            <span>Parsing &amp; CIM</span>
          </a>
          <a href="lookups.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
            <span>Lookups Deep Dive</span>
          </a>
          <a href="spl-reference.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <span>SPL Reference</span>
          </a>
        </div>
        <div class="nav-section">
          <div class="nav-section-title">Response &amp; Support</div>
          <a href="decision-trees.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="14"/><circle cx="6" cy="19" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.5" y1="16.5" x2="10" y2="14"/><line x1="15.5" y1="16.5" x2="14" y2="14"/></svg>
            <span>Decision Trees</span>
          </a>
          <a href="troubleshooting.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Troubleshooting</span>
          </a>
          <a href="runbooks.html" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            <span>SOC Runbooks</span>
          </a>
        </div>
      </nav>
      <div class="sidebar-footer">
        <p>Detection Engineering v2.0</p>
      </div>
    </aside>'

echo "$SIDEBAR_PAGES"
