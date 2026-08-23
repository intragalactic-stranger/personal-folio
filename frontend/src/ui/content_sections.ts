import { PROFILE_DATA } from "../data/profile";

export class ContentSections {
  public static getAsciiBanner(): string {
    return `
 ██████   █████  ███    ██ ███████ ███████ ██   ██  █████  ███    ██
██       ██   ██ ████   ██ ██      ██      ██   ██ ██   ██ ████   ██
██   ███ ███████ ██ ██  ██ █████   ███████ ███████ ███████ ██ ██  ██
██    ██ ██   ██ ██  ██ ██ ██           ██ ██   ██ ██   ██ ██  ██ ██
 ██████  ██   ██ ██   ████ ███████ ███████ ██   ██ ██   ██ ██   ████`;
  }

  public static getStatChips(): string {
    return `
      <div class="stat-chips-strip">
        <div class="stat-chip">
          <span class="chip-dot">◉</span>
          <span class="chip-num" data-target="7">7</span>
          <span class="chip-txt">PROD SYSTEMS</span>
        </div>
        <div class="stat-chip">
          <span class="chip-dot">◉</span>
          <span class="chip-num" data-target="6">6</span>
          <span class="chip-txt">ENTERPRISE CLIENTS</span>
        </div>
        <div class="stat-chip">
          <span class="chip-dot">◉</span>
          <span class="chip-num" data-target="25000" data-suffix="/DAY">25K/DAY</span>
          <span class="chip-txt">AGENT EVALS</span>
        </div>
        <div class="stat-chip">
          <span class="chip-dot">◉</span>
          <span class="chip-num" data-target="2" data-suffix="+ YRS">2+ YRS</span>
          <span class="chip-txt">PRODUCTION EXP</span>
        </div>
      </div>
    `;
  }

  public static getMetaGrid(): string {
    return `
      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-label">OPERATOR</span>
          <span class="meta-val">${PROFILE_DATA.name}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">SPECIALIZATION</span>
          <span class="meta-val">${PROFILE_DATA.headline}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">NODE_STATUS</span>
          <span class="meta-val"><span style="color: var(--color-status-green)">●</span> ${PROFILE_DATA.status}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">LOCATION</span>
          <span class="meta-val">${PROFILE_DATA.nodeLocation}</span>
        </div>
      </div>
    `;
  }

  public static renderAbout(): string {
    return `
      <div class="section-content" id="section-about">
        <div class="section-title-line">01 // OPERATOR_SUMMARY</div>
        ${PROFILE_DATA.bio.map((b) => `<p class="bio-paragraph">${b}</p>`).join("")}

        <div class="two-col-cards">
          <!-- Academic Credentials Card -->
          <div class="info-card">
            <div class="info-card-title">🎓 ACADEMIC_CREDENTIALS</div>
            ${PROFILE_DATA.education
              .map(
                (edu) => `
              <div class="edu-item">
                <div class="edu-degree">${edu.degree}</div>
                <div class="edu-inst">${edu.institution} (${edu.year})</div>
                <div><span class="teal-badge">★ ${edu.grade}</span></div>
              </div>
            `
              )
              .join("")}
          </div>

          <!-- Achievements & Impact Card -->
          <div class="info-card">
            <div class="info-card-title">🏆 ACHIEVEMENTS & IMPACT</div>
            ${PROFILE_DATA.achievements
              .map(
                (ach) => `
              <div class="achieve-bullet">
                <span class="achieve-bullet-dot">◈</span>
                <span>${ach}</span>
              </div>
            `
              )
              .join("")}
            <div class="achieve-subtext">
              Delivered 7 production systems across BFSI, retail, healthcare, and logistics.
            </div>
          </div>
        </div>

        <div class="scroll-hint-bar">
          <span class="scroll-hint-text">▼ [ SCROLL TO EXPLORE ARSENAL &amp; SYSTEMS ]</span>
        </div>
      </div>
    `;
  }

  public static renderProjects(): string {
    return `
      <div class="section-content" id="section-projects">
        <div class="section-title-line">02 // PRODUCTION_PROJECTS &amp; ARCHITECTURES</div>
        <div class="projects-grid">
          ${PROFILE_DATA.projects
            .map(
              (p) => `
            <div class="project-card" style="border-top: 3px solid ${p.categoryColor};">
              <div>
                <div class="card-header-row">
                  <span class="card-category" style="color: ${p.categoryColor};">${p.category}</span>
                </div>
                <div class="card-title">${p.title}</div>
                <div class="card-arch-sketch">${p.archIcon}</div>
                <div class="card-desc">${p.description}</div>
                <div class="card-metric-highlight" style="border-left: 3px solid ${p.categoryColor};">
                  <strong>PERF_METRICS:</strong> ${p.metrics}
                </div>
              </div>
              <div class="card-footer">
                <div class="card-tags">
                  ${p.stack.map((s) => `<span class="tag-badge">${s}</span>`).join("")}
                </div>
                <div class="card-pill-links">
                  <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="pill-btn">↗ SOURCE / CODE</a>
                  <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="pill-btn">↗ LIVE DEMO</a>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  public static renderSkills(): string {
    return `
      <div class="section-content" id="section-skills">
        <div class="section-title-line">03 // TECHNICAL_ARSENAL &amp; PROFICIENCY_RINGS</div>
        
        <!-- Radial Proficiency Rings Cluster (Widget 1) -->
        <div class="radial-cluster-box" id="skills-rings">
          <div class="cluster-heading">CORE ARCHITECTURAL PROFICIENCY RINGS</div>
          <div class="radial-rings-grid">
            ${PROFILE_DATA.skillRadials
              .map((sr) => {
                const radius = 40;
                const circumference = 2 * Math.PI * radius; // ~251.3
                const targetOffset = circumference - (circumference * sr.pct) / 100;
                return `
                <div class="radial-ring-card" title="${sr.detail}">
                  <svg viewBox="0 0 100 100" class="radial-ring-svg">
                    <circle cx="50" cy="50" r="${radius}" class="ring-bg" />
                    <circle
                      cx="50"
                      cy="50"
                      r="${radius}"
                      class="ring-progress"
                      style="stroke: ${sr.color}; stroke-dasharray: ${circumference}; stroke-dashoffset: ${targetOffset};"
                      data-target-offset="${targetOffset}"
                    />
                    <text x="50" y="46" text-anchor="middle" class="ring-pct" style="fill: ${sr.color};">${sr.pct}%</text>
                    <text x="50" y="60" text-anchor="middle" class="ring-name">${sr.shortName}</text>
                  </svg>
                  <div class="radial-card-footer">${sr.category}</div>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>

        <!-- Verified Monospace Certifications -->
        <div class="certifications-box">
          <div class="cluster-heading">VERIFIED CREDENTIALS &amp; CERTIFICATIONS</div>
          <div class="cert-badges-grid">
            ${PROFILE_DATA.certifications
              .map(
                (c) => `
              <div class="cert-badge cert-${c.tint}">
                <span class="cert-check">✔</span>
                <span class="cert-tag">[${c.tag}]</span>
                <span class="cert-name">${c.title}</span>
                <span class="cert-year">${c.year}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Categorized Skills Grid -->
        <div class="skills-categorized-grid">
          ${PROFILE_DATA.skillCategories
            .map(
              (cat) => `
            <div class="skill-cat-card">
              <div class="skill-cat-title">${cat.category}</div>
              <div class="skill-chips-row">
                ${cat.skills.map((s) => `<span class="uniform-skill-chip">${s}</span>`).join("")}
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Active Learning Section -->
        <div class="active-learning-box">
          <div class="active-learning-title">
            <span class="active-learning-dot">●</span>
            ACTIVE_LEARNING &amp; APPLIED RESEARCH
          </div>
          <div class="active-learning-items">
            ${PROFILE_DATA.activeLearning
              .map(
                (al) => `
              <div class="learning-item">
                <span class="learning-status">[${al.status}]</span>
                <span class="learning-text">${al.title}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  }

  public static renderExperience(): string {
    return `
      <div class="section-content" id="section-experience">
        <div class="section-title-line">04 // PRODUCTION_EXPERIENCE &amp; METRICS_DASHBOARD</div>
        
        <div class="timeline-wrapper">
          <!-- Timeline connector vertical line -->
          <div class="timeline-line"></div>

          <!-- Role 1: Software Engineer / Analyst - AI -->
          <div class="timeline-block">
            <div class="timeline-node-bullet">⌬</div>
            <div class="timeline-header-group">
              <div class="timeline-period-badge">JAN 2026 — PRESENT</div>
              <div class="role-badge-chip">⬡ PROMOTED_WITHIN: 18M</div>
            </div>
            <div class="timeline-role-title">Software Engineer / Analyst – AI</div>
            <div class="timeline-company-title">PibyThree Consulting Services Pvt. Ltd. // Mumbai, India</div>

            <!-- Role 1 Dashboard (Widget 2) -->
            <div class="metrics-dashboard-card">
              <div class="dashboard-top-label">PRODUCTION_METRICS // AGENTIC EVALS &amp; INFRASTRUCTURE</div>
              <div class="dashboard-grid">
                <div class="dash-stat-box">
                  <div class="dash-stat-num" style="color: #4ade80;" id="evals-count">25K</div>
                  <div class="dash-stat-sub">EVALS / DAY (ASYNC)</div>
                  <div class="dash-progress-track"><div class="dash-progress-fill" style="width: 95%; background: #4ade80;"></div></div>
                </div>
                <div class="dash-stat-box">
                  <div class="dash-stat-num" style="color: #3888ff;" id="latency-p95">&lt; 9s</div>
                  <div class="dash-stat-sub">p95 SCORING LATENCY</div>
                  <div class="dash-progress-track"><div class="dash-progress-fill" style="width: 92%; background: #3888ff;"></div></div>
                </div>
                <div class="dash-stat-box">
                  <div class="dash-stat-num" style="color: #f59e0b;" id="cost-reduction">-38%</div>
                  <div class="dash-stat-sub">LLM INFRA SPEND CUT</div>
                  <div class="dash-progress-track"><div class="dash-progress-fill" style="width: 88%; background: #f59e0b;"></div></div>
                </div>
              </div>
              <div class="dashboard-meta-footer">
                6 enterprise tenants · 12 Celery workers · 7 production systems delivered
              </div>
            </div>

            <!-- 2-Column Achievement Cards -->
            <div class="achievements-two-col">
              <div class="achieve-card">
                <div class="achieve-card-head">Celery Evaluation Sidecar</div>
                <div class="achieve-card-body">Isolated per-tenant queues scaling async agent scoring across 6 tenants with strict PII &amp; safety gates.</div>
              </div>
              <div class="achieve-card">
                <div class="achieve-card-head">Pi-Agent-IDP Core SDK</div>
                <div class="achieve-card-body">Built core identity and evaluation scoring modules for on-premise multi-agent deployments.</div>
              </div>
              <div class="achieve-card">
                <div class="achieve-card-head">GenAI-in-a-Box MLOps</div>
                <div class="achieve-card-body">Standardized agent &amp; RAG delivery across cloud and on-prem, reducing time-to-market by 64% (14w → 5w).</div>
              </div>
              <div class="achieve-card">
                <div class="achieve-card-head">LiteLLM Multi-Provider Gateway</div>
                <div class="achieve-card-body">Unified routing across 4 LLM providers with automated quality gates and zero-downtime fallbacks.</div>
              </div>
            </div>
          </div>

          <!-- Role 2: Associate Software Engineer -->
          <div class="timeline-block" style="margin-top: 2rem;">
            <div class="timeline-node-bullet">⌬</div>
            <div class="timeline-header-group">
              <div class="timeline-period-badge">JUL 2024 — DEC 2025</div>
            </div>
            <div class="timeline-role-title">Associate Software Engineer</div>
            <div class="timeline-company-title">PibyThree Consulting Services Pvt. Ltd. // Mumbai, India</div>

            <!-- Role 2 Dashboard -->
            <div class="metrics-dashboard-card">
              <div class="dashboard-top-label">PRODUCTION_METRICS // RAG &amp; FORECASTING PIPELINES</div>
              <div class="dashboard-grid">
                <div class="dash-stat-box">
                  <div class="dash-stat-num" style="color: #4ade80;">~40K</div>
                  <div class="dash-stat-sub">REQUESTS / DAY (K8s)</div>
                  <div class="dash-progress-track"><div class="dash-progress-fill" style="width: 94%; background: #4ade80;"></div></div>
                </div>
                <div class="dash-stat-box">
                  <div class="dash-stat-num" style="color: #3888ff;">2.4s</div>
                  <div class="dash-stat-sub">p95 API LATENCY</div>
                  <div class="dash-progress-track"><div class="dash-progress-fill" style="width: 90%; background: #3888ff;"></div></div>
                </div>
                <div class="dash-stat-box">
                  <div class="dash-stat-num" style="color: #00cccc;">+30.6%</div>
                  <div class="dash-stat-sub">HYBRID RAG RECALL LIFT</div>
                  <div class="dash-progress-track"><div class="dash-progress-fill" style="width: 86%; background: #00cccc;"></div></div>
                </div>
              </div>
              <div class="dashboard-meta-footer">
                13% WAPE demand forecasting across 2,400 SKUs · 90% autonomous domain bookings handled
              </div>
            </div>

            <!-- 2-Column Achievement Cards -->
            <div class="achievements-two-col">
              <div class="achieve-card">
                <div class="achieve-card-head">LangGraph Sales Platform</div>
                <div class="achieve-card-body">Shipped multi-agent sales platform used by 12 reps, eliminating ~30 hrs/week of manual forecasting.</div>
              </div>
              <div class="achieve-card">
                <div class="achieve-card-head">Autonomous Booking Agent</div>
                <div class="achieve-card-body">Completed 90% of ~1,800 monthly domain bookings autonomously without human handoff.</div>
              </div>
              <div class="achieve-card">
                <div class="achieve-card-head">Hybrid Insurance Assistant</div>
                <div class="achieve-card-body">Delivered hybrid RAG search improving recall from 0.62 to 0.81 with low latency chunking.</div>
              </div>
              <div class="achieve-card">
                <div class="achieve-card-head">Multimodal GenAI Diagnostics</div>
                <div class="achieve-card-body">Implemented financial document processing on Claude 3.5 Sonnet and VGG16+Gemini imaging pipelines.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  public static renderContact(): string {
    return `
      <div class="section-content" id="section-contact">
        <div class="section-title-line">05 // TRANSMIT_INQUIRY &amp; REACH</div>
        
        <div class="contact-container">
          <!-- Contact Info Panel with SVG Icons -->
          <div class="contact-info-panel">
            <div class="contact-status-chip">
              <span class="status-pulse-green">●</span> STATUS: OPEN_TO_OPPORTUNITIES · RESPONSE: ~24H
            </div>
            
            <div class="panel-heading">DIRECT TRANSMISSION CHANNELS</div>
            <p class="bio-paragraph" style="font-size: 0.85rem;">
              Open for high-impact AI Software Engineering roles, agentic evaluations consulting, and production LLM infrastructure opportunities.
            </p>
            
            <div class="contact-links-list">
              <div class="contact-link-row">
                <svg class="contact-icon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"/><path fill="none" stroke="currentColor" stroke-width="2" d="M3 7l9 6l9 -6"/></svg>
                <span class="c-label">EMAIL:</span>
                <a href="mailto:${PROFILE_DATA.socials.email}" class="c-val">${PROFILE_DATA.socials.email}</a>
              </div>
              <div class="contact-link-row">
                <svg class="contact-icon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"/></svg>
                <span class="c-label">PHONE:</span>
                <a href="tel:${PROFILE_DATA.phone}" class="c-val">${PROFILE_DATA.phone}</a>
              </div>
              <div class="contact-link-row">
                <svg class="contact-icon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/></svg>
                <span class="c-label">GITHUB:</span>
                <a href="${PROFILE_DATA.socials.github}" target="_blank" rel="noopener" class="c-val">github.com/intragalactic-stranger</a>
              </div>
              <div class="contact-link-row">
                <svg class="contact-icon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/><path fill="none" stroke="currentColor" stroke-width="2" d="M8 11l0 5"/><path fill="none" stroke="currentColor" stroke-width="2" d="M8 8l0 .01"/><path fill="none" stroke="currentColor" stroke-width="2" d="M12 16l0 -5"/><path fill="none" stroke="currentColor" stroke-width="2" d="M16 16v-3a2 2 0 0 0 -4 0"/></svg>
                <span class="c-label">LINKEDIN:</span>
                <a href="${PROFILE_DATA.socials.linkedin}" target="_blank" rel="noopener" class="c-val">linkedin.com/in/ganeshannainar</a>
              </div>
              <div class="contact-link-row">
                <svg class="contact-icon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/><path fill="none" stroke="currentColor" stroke-width="2" d="M3.6 9h16.8"/><path fill="none" stroke="currentColor" stroke-width="2" d="M3.6 15h16.8"/><path fill="none" stroke="currentColor" stroke-width="2" d="M11.5 3a17 17 0 0 0 0 18"/><path fill="none" stroke="currentColor" stroke-width="2" d="M12.5 3a17 17 0 0 1 0 18"/></svg>
                <span class="c-label">WEBSITE:</span>
                <a href="${PROFILE_DATA.socials.website}" target="_blank" rel="noopener" class="c-val">ganeshan.dev</a>
              </div>
            </div>

            <div style="margin-top: 1.5rem;">
              <a href="https://ganeshan.dev" target="_blank" class="contact-secondary-btn" title="Download Verified Curriculum Vitae">
                <span>⬇</span> DOWNLOAD_CURRICULUM_VITAE.PDF
              </a>
            </div>
          </div>

          <!-- Transmission Form with Terminal Validation -->
          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-group">
              <label class="form-label" for="c-name">IDENTITY / NAME <span class="required-star">*</span></label>
              <input type="text" id="c-name" class="form-input" placeholder="Your Name or Organisation" required />
              <div class="field-error" id="err-c-name"></div>
            </div>
            <div class="form-group">
              <label class="form-label" for="c-email">CONTACT EMAIL <span class="required-star">*</span></label>
              <input type="email" id="c-email" class="form-input" placeholder="name@company.com" required />
              <div class="field-error" id="err-c-email"></div>
            </div>
            <div class="form-group">
              <label class="form-label" for="c-subject">TRANSMISSION SUBJECT</label>
              <input type="text" id="c-subject" class="form-input" value="Production AI Engineering Inquiry" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="c-message">TRANSMISSION PACKET / MESSAGE <span class="required-star">*</span></label>
              <textarea id="c-message" class="form-textarea" placeholder="Discuss agentic architectures, evaluation pipelines, or collaboration..." required></textarea>
              <div class="field-error" id="err-c-message"></div>
            </div>
            <button type="submit" class="contact-primary-btn" id="contact-submit-btn">TRANSMIT PACKET ➔</button>
            <div id="contact-status-msg"></div>
          </form>
        </div>
      </div>
    `;
  }
}
