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

        <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
          <div class="skill-category-box">
            <div class="skill-category-title">🎓 ACADEMIC_CREDENTIALS</div>
            ${PROFILE_DATA.education
              .map(
                (edu) => `
              <div style="margin-bottom: 0.85rem;">
                <div style="font-weight: 600; color: var(--color-text-primary); font-size: 0.88rem;">${edu.degree}</div>
                <div style="color: var(--color-blue-cobalt); font-size: 0.78rem; margin: 2px 0;">${edu.institution} (${edu.year})</div>
                <div style="color: var(--color-status-green); font-size: 0.78rem;">★ ${edu.grade}</div>
              </div>
            `
              )
              .join("")}
          </div>

          <div class="skill-category-box">
            <div class="skill-category-title">🏆 ACHIEVEMENTS & IMPACT</div>
            ${PROFILE_DATA.achievements
              .map(
                (ach) => `
              <div style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.6rem; line-height: 1.55;">
                • ${ach}
              </div>
            `
              )
              .join("")}
            <div style="margin-top: 0.75rem; font-size: 0.78rem; color: var(--color-text-dim); line-height: 1.5;">
              Delivered 7 production systems across BFSI, retail, healthcare, and logistics.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  public static renderProjects(): string {
    return `
      <div class="section-content" id="section-projects">
        <div class="section-title-line">02 // PRODUCTION_PROJECTS & ARCHITECTURES</div>
        <div class="projects-grid">
          ${PROFILE_DATA.projects
            .map(
              (p) => `
            <div class="project-card">
              <div>
                <div class="card-category">${p.category}</div>
                <div class="card-title">${p.title}</div>
                <div class="card-desc">${p.description}</div>
                <div class="card-metrics">⚡ ${p.metrics}</div>
              </div>
              <div>
                <div class="card-tags">
                  ${p.stack.map((s) => `<span class="tag-badge">${s}</span>`).join("")}
                </div>
                <div style="display: flex; gap: 0.75rem; font-size: 0.8rem; margin-top: 0.5rem;">
                  <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer">↗ SOURCE / CODE</a>
                  <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">↗ LIVE DEMO</a>
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
    const skillProficiencies = [
      { name: "LangGraph & Agentic Orchestration", pct: "95%", fill: 95 },
      { name: "Celery / Asynchronous Evaluation Sidecars", pct: "92%", fill: 92 },
      { name: "Graph RAG & Neo4j Multi-Hop Retrieval", pct: "90%", fill: 90 },
      { name: "LiteLLM Multi-Provider Gateways", pct: "94%", fill: 94 },
      { name: "FastAPI & Python 3.12+ Microservices", pct: "96%", fill: 96 },
      { name: "Kubernetes, Helm, Terraform & Cloud (AWS/GCP)", pct: "88%", fill: 88 },
      { name: "Demand Forecasting (TFT) & ML Pricing (XGBoost)", pct: "89%", fill: 89 },
      { name: "LLM Guardrails & Observability (LangFuse/RAGAS)", pct: "93%", fill: 93 },
    ];

    return `
      <div class="section-content" id="section-skills">
        <div class="section-title-line">03 // TECHNICAL_ARSENAL & PROFICIENCY_MATRIX</div>
        
        <!-- Animated Proficiency Meters -->
        <div style="background: rgba(11, 15, 23, 0.85); border: 1px solid var(--border-dim); border-radius: 4px; padding: 1.25rem; margin-bottom: 1.5rem;">
          <div style="font-size: 0.8rem; color: var(--color-blue-primary); margin-bottom: 1rem; font-weight: 700;">
            CORE SPECIALIZATION PROFICIENCY METERS
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            ${skillProficiencies
              .map(
                (sp) => `
              <div class="skill-meter-item">
                <div class="skill-meter-header">
                  <span class="skill-name">${sp.name}</span>
                  <span class="skill-pct" style="color: var(--color-status-green); font-weight: 700;">${sp.pct}</span>
                </div>
                <div class="skill-bar-track">
                  <div class="skill-bar-fill" style="width: ${sp.fill}%;"></div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Verified Certifications -->
        <div style="margin-bottom: 1.5rem;">
          <div style="font-size: 0.8rem; color: var(--color-blue-primary); margin-bottom: 0.5rem; font-weight: 600;">VERIFIED CREDENTIALS & CERTIFICATIONS</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${PROFILE_DATA.certifications
              .map(
                (c) => `
              <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 4px; padding: 0.4rem 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: var(--color-status-green); font-size: 0.75rem;">✔</span>
                <span style="font-size: 0.8rem; color: var(--color-text-primary);">${c.title}</span>
                <span style="font-size: 0.65rem; background: var(--bg-void); color: var(--color-blue-primary); padding: 1px 4px; border-radius: 2px;">[${c.tag}]</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Full Skills Categorized Grid -->
        <div class="skills-grid">
          ${PROFILE_DATA.skillCategories
            .map(
              (cat) => `
            <div class="skill-category-box">
              <div class="skill-category-title">${cat.category}</div>
              <div class="skill-chips">
                ${cat.skills.map((s) => `<span class="skill-chip">${s}</span>`).join("")}
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  public static renderExperience(): string {
    return `
      <div class="section-content" id="section-experience">
        <div class="section-title-line">04 // PRODUCTION_EXPERIENCE & KEY_METRICS</div>
        <div class="timeline">
          <!-- Role 1: Software Engineer / Analyst - AI -->
          <div class="timeline-item">
            <div class="timeline-period">JAN 2026 — PRESENT</div>
            <div class="timeline-role">Software Engineer / Analyst – AI</div>
            <div class="timeline-company">PibyThree Consulting Services Pvt. Ltd. // Mumbai, India</div>
            <div style="font-size: 0.8rem; color: var(--color-blue-primary); margin-bottom: 0.75rem; font-style: italic;">
              Promoted within 18 months. Leading agentic architecture, evaluation pipelines, and LLM infrastructure.
            </div>

            <!-- Key Metric Progress Bars in Green -->
            <div style="background: rgba(8, 12, 18, 0.7); border: 1px solid var(--border-dim); border-radius: 4px; padding: 0.75rem 1rem; margin-bottom: 1rem;">
              <div class="exp-metric-row">
                <div class="exp-metric-header">
                  <span class="exp-metric-label">Asynchronous Agent Scoring Capacity:</span>
                  <span class="exp-metric-val">~25,000 evals/day (p95 &lt; 9s)</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 95%;"></div>
                </div>
              </div>

              <div class="exp-metric-row">
                <div class="exp-metric-header">
                  <span class="exp-metric-label">Enterprise RAG/Agent SDLC Acceleration:</span>
                  <span class="exp-metric-val">14w → 5w (-64% time-to-market)</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 92%;"></div>
                </div>
              </div>

              <div class="exp-metric-row">
                <div class="exp-metric-header">
                  <span class="exp-metric-label">LLM Infrastructure Cost Reduction:</span>
                  <span class="exp-metric-val">-38% spend (within 2% baseline score)</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 88%;"></div>
                </div>
              </div>
            </div>

            <div class="timeline-bullet">• Designed a Celery-based evaluation sidecar with isolated per-tenant queues scaling async agent scoring across 6 tenants on 12 workers.</div>
            <div class="timeline-bullet">• Pi-Agent-IDP: built core SDK and scoring modules for on-premise agent identity and safety guardrails across 6 client deployments.</div>
            <div class="timeline-bullet">• GenAI-in-a-Box: co-built internal MLOps/LLMOps platform standardizing RAG and agent delivery across cloud and on-premise.</div>
            <div class="timeline-bullet">• LiteLLM Gateway: routed traffic across 4 LLM providers with per-tenant fallbacks and quality gates.</div>
          </div>

          <!-- Role 2: Associate Software Engineer -->
          <div class="timeline-item">
            <div class="timeline-period">JUL 2024 — DEC 2025</div>
            <div class="timeline-role">Associate Software Engineer</div>
            <div class="timeline-company">PibyThree Consulting Services Pvt. Ltd. // Mumbai, India</div>

            <!-- Key Metric Progress Bars in Green -->
            <div style="background: rgba(8, 12, 18, 0.7); border: 1px solid var(--border-dim); border-radius: 4px; padding: 0.75rem 1rem; margin-bottom: 1rem;">
              <div class="exp-metric-row">
                <div class="exp-metric-header">
                  <span class="exp-metric-label">Production Request Volume &amp; Latency:</span>
                  <span class="exp-metric-val">~40,000 req/day (p95 2.4s on K8s)</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 94%;"></div>
                </div>
              </div>

              <div class="exp-metric-row">
                <div class="exp-metric-header">
                  <span class="exp-metric-label">Retail Demand Forecasting Accuracy:</span>
                  <span class="exp-metric-val">13% WAPE across 2,400 SKUs</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 90%;"></div>
                </div>
              </div>

              <div class="exp-metric-row">
                <div class="exp-metric-header">
                  <span class="exp-metric-label">Hybrid RAG Recall Lift:</span>
                  <span class="exp-metric-val">0.62 → 0.81 recall@5 (+30.6%)</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 85%;"></div>
                </div>
              </div>
            </div>

            <div class="timeline-bullet">• Built modular, decoupled RAG and agent pipelines serving ~40K requests/day at p95 2.4s on Kubernetes across cloud and on-premise.</div>
            <div class="timeline-bullet">• Shipped LangGraph multi-agent sales platform (forecasting, transcription, market research) used by 12 reps, removing ~30 hrs/week manual work.</div>
            <div class="timeline-bullet">• Built domain booking agent completing 90% of ~1,800 monthly bookings without human handoff.</div>
            <div class="timeline-bullet">• Multimodal GenAI: cash-flow analysis on Claude 3.5 Sonnet; VGG16 + Gemini diagnostic imaging.</div>
          </div>
        </div>
      </div>
    `;
  }

  public static renderContact(): string {
    return `
      <div class="section-content" id="section-contact">
        <div class="section-title-line">05 // TRANSMIT_INQUIRY</div>
        <div class="contact-container">
          <div class="contact-info-panel">
            <div style="font-weight: 700; color: var(--color-blue-primary); margin-bottom: 0.75rem;">DIRECT TRANSMISSION CHANNELS</div>
            <p class="bio-paragraph" style="font-size: 0.85rem;">
              Open for high-impact AI Software Engineering roles, agentic evaluations consulting, and production LLM infrastructure opportunities.
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1rem; font-size: 0.85rem;">
              <div><span style="color: var(--color-text-dim);">LOCATION:</span> Mumbai, India (Global Remote / Hybrid)</div>
              <div><span style="color: var(--color-text-dim);">EMAIL:</span> <a href="mailto:${PROFILE_DATA.socials.email}">${PROFILE_DATA.socials.email}</a></div>
              <div><span style="color: var(--color-text-dim);">PHONE:</span> <a href="tel:${PROFILE_DATA.phone}">${PROFILE_DATA.phone}</a></div>
              <div><span style="color: var(--color-text-dim);">GITHUB:</span> <a href="${PROFILE_DATA.socials.github}" target="_blank" rel="noopener">github.com/intragalactic-stranger</a></div>
              <div><span style="color: var(--color-text-dim);">LINKEDIN:</span> <a href="${PROFILE_DATA.socials.linkedin}" target="_blank" rel="noopener">linkedin.com/in/ganeshannainar</a></div>
              <div><span style="color: var(--color-text-dim);">WEBSITE:</span> <a href="${PROFILE_DATA.socials.website}" target="_blank" rel="noopener">ganeshan.dev</a></div>
            </div>
            <div style="margin-top: 1.25rem;">
              <a href="https://ganeshan.dev" target="_blank" class="cv-nav-btn" style="display: inline-flex; padding: 0.5rem 1rem;">
                <span>⬇</span> DOWNLOAD_CURRICULUM_VITAE.PDF
              </a>
            </div>
          </div>

          <form class="contact-form" id="contact-form">
            <div class="form-group">
              <label class="form-label" for="c-name">IDENTITY / NAME</label>
              <input type="text" id="c-name" class="form-input" placeholder="Your Name" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="c-email">CONTACT EMAIL</label>
              <input type="email" id="c-email" class="form-input" placeholder="name@company.com" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="c-subject">SUBJECT</label>
              <input type="text" id="c-subject" class="form-input" value="Production AI Engineering Inquiry" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="c-message">TRANSMISSION MESSAGE</label>
              <textarea id="c-message" class="form-textarea" placeholder="Discuss multi-agent architectures, evaluation pipelines, or collaboration..." required></textarea>
            </div>
            <button type="submit" class="submit-btn" id="contact-submit-btn">TRANSMIT PACKET ➔</button>
            <div id="contact-status-msg" style="font-size: 0.8rem; margin-top: 0.5rem;"></div>
          </form>
        </div>
      </div>
    `;
  }
}
