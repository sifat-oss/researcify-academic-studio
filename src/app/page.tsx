"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  FileText,
  FlaskConical,
  GraduationCap,
  Menu,
  MessageCircle,
  PenLine,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Thesis & Dissertation",
    description: "Structured guidance from topic selection to final defense preparation.",
  },
  {
    icon: FlaskConical,
    title: "Research & Projects",
    description: "Turn complex ideas into clear, achievable academic project plans.",
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    description: "Make confident decisions with support for SPSS, Excel and Python.",
  },
  {
    icon: PenLine,
    title: "Academic Editing",
    description: "Refine your writing, structure and references without losing your voice.",
  },
  {
    icon: BookOpen,
    title: "Research Assistance",
    description: "Find research gaps, shape questions and build a strong foundation.",
  },
  {
    icon: GraduationCap,
    title: "Presentation & Defense",
    description: "Present your work with clarity, confidence and academic precision.",
  },
];

const steps = [
  ["01", "Share your requirements", "Tell us about your research, deadline and the support you need."],
  ["02", "Connect with a specialist", "We review your goals and arrange a focused consultation."],
  ["03", "Build your plan", "Receive a clear roadmap tailored to your academic level and timeline."],
  ["04", "Make meaningful progress", "Work through each milestone with structured, ethical guidance."],
];

const workSamples = [
  {
    number: "01",
    type: "Undergraduate project",
    title: "Improving customer experience through service design",
    report: ["Project report", "Survey questionnaire", "Findings chapter", "Presentation slides"],
    detail: "Research framing · Survey design · Findings presentation",
    tone: "work-sand",
  },
  {
    number: "02",
    type: "Master's thesis",
    title: "A practical study of digital learning adoption",
    report: ["Thesis proposal", "Literature review", "Methodology chapter", "Data analysis guidance"],
    detail: "Literature review · Methodology · Data interpretation",
    tone: "work-blue",
  },
  {
    number: "03",
    type: "Internship report",
    title: "From placement experience to a clear academic report",
    report: ["Company overview", "Weekly activities", "Reflection", "Recommendations"],
    detail: "Report structure · Academic editing · Viva preparation",
    tone: "work-gold",
  },
];

const portfolioProjects = [
  ["Software Engineering & Computer Science", "01", "Smart Student Management System", "Web Development", "Design and Development of a Web-Based Smart Student Management System"],
  ["Software Engineering & Computer Science", "02", "AI-Powered Academic Assistant", "Artificial Intelligence", "Development of an AI-Based Academic Assistance and Student Support System"],
  ["Software Engineering & Computer Science", "03", "E-Commerce Management Platform", "Full-Stack Development", "Design and Implementation of a Secure E-Commerce Management Platform"],
  ["Software Engineering & Computer Science", "04", "Network Intrusion Detection System", "Cybersecurity", "Machine Learning-Based Network Intrusion Detection and Prevention System"],
  ["Software Engineering & Computer Science", "05", "Smart Health & Fitness Tracker", "Mobile Application", "Development of a Mobile-Based Health Monitoring and Fitness Tracking Application"],
  ["Food Engineering & Nutrition", "06", "Banana Peel Powder Fortified Biscuits", "Food Technology", "Development and Quality Evaluation of Biscuits Fortified with Banana Peel Powder"],
  ["Food Engineering & Nutrition", "07", "Natural Fruit-Based Functional Beverage", "Food Product Development", "Formulation and Physicochemical Evaluation of a Natural Functional Fruit Beverage"],
  ["Food Engineering & Nutrition", "08", "Microbial Quality Assessment of Street Foods", "Food Microbiology", "Assessment of Microbiological Safety and Hygiene Practices of Street Foods"],
  ["Food Engineering & Nutrition", "09", "Nutrient-Enriched Wheat Bread", "Food Processing", "Development and Nutritional Analysis of Fiber-Enriched Wheat Bread"],
  ["Business Administration & Management", "10", "Business Performance Analysis", "Business Analytics", "An Analytical Study of Business Performance and Organizational Productivity"],
  ["Business Administration & Management", "11", "Digital Marketing Strategies", "Marketing", "Impact of Social Media Marketing on Consumer Purchasing Behavior"],
  ["Business Administration & Management", "12", "Employee Satisfaction & Productivity", "Human Resource Management", "An Investigation into Employee Satisfaction and Its Relationship with Organizational Performance"],
  ["Electrical & Civil Engineering", "13", "Solar-Powered Smart Irrigation System", "Electrical Engineering", "Design and Implementation of an Automated Solar-Powered Irrigation System"],
  ["Electrical & Civil Engineering", "14", "Sustainable Concrete Development", "Civil Engineering", "Experimental Investigation of Sustainable Concrete Using Recycled Materials"],
  ["Electrical & Civil Engineering", "15", "Intelligent Traffic Management System", "Smart Technology", "Design of an Intelligent Traffic Management System Using IoT Technology"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Unable to submit your request.");
      setSubmitted(true);
      form.reset();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Researcify home">
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>RESEARCIFY <small>ACADEMIC STUDIO</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#resources" onClick={() => setMenuOpen(false)}>Resources</a>
          <button className="nav-cta" onClick={() => setFormOpen(true)}>Get started <ArrowRight size={16} /></button>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Academic support, thoughtfully delivered</p>
          <h1>Where ideas<br /><em>become impact.</em></h1>
          <p className="hero-description">
            Professional research guidance for students and researchers ready to move from uncertainty to confident academic progress.
          </p>
          <div className="hero-actions">
            <button className="button button-dark" onClick={() => setFormOpen(true)}>Explore support <ArrowRight size={17} /></button>
            <a className="text-link" href="#services">View our services <ArrowRight size={16} /></a>
          </div>
          <div className="trust-row">
            <span><ShieldCheck size={17} /> Confidential by design</span>
            <span><MessageCircle size={17} /> English & Bangla support</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract academic illustration">
          <div className="art-ring ring-one" />
          <div className="art-ring ring-two" />
          <div className="art-card">
            <div className="art-card-top"><span>RESEARCH / 01</span><span>✦</span></div>
            <div className="art-lines"><i /><i /><i /><i /></div>
            <div className="art-chart"><span /><span /><span /><span /><span /></div>
            <small>ideas → insight → impact</small>
          </div>
          <div className="art-note"><span>✦</span><b>Think<br />deeper.</b></div>
          <div className="art-stamp">R<br /><small>AS</small></div>
        </div>
      </section>

      <section className="intro section-wrap" id="about">
        <div className="section-label">01 / The studio</div>
        <div>
          <h2>Academic progress<br /><em>with a clear direction.</em></h2>
          <p className="large-copy">Researcify Academic Studio is a research and educational support platform for the moments when your next academic step needs a little more clarity.</p>
          <p>We help you develop your own ideas, strengthen your methodology and communicate your work with confidence. Every engagement is structured around ethical guidance, practical feedback and your goals.</p>
          <a className="text-link" href="#process">Discover our approach <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-wrap">
          <div className="section-heading">
            <div><div className="section-label">02 / What we do</div><h2>Support for every<br /><em>stage of research.</em></h2></div>
            <p>From the first spark of a topic to the final presentation, get focused support that helps your work become stronger.</p>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, title, description }) => (
              <article className="service-card" key={title}>
                <Icon size={24} strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{description}</p>
                <button onClick={() => setFormOpen(true)}>Learn more <ArrowRight size={15} /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process section-wrap" id="process">
        <div className="section-label">03 / A better way forward</div>
        <div className="process-heading"><h2>Less overwhelm.<br /><em>More momentum.</em></h2><p>A simple, transparent process designed around your research—not a one-size-fits-all package.</p></div>
        <div className="steps">
          {steps.map(([number, title, description]) => <div className="step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-wrap">
          <div className="section-heading">
            <div><div className="section-label">04 / What we help create</div><h2>Work that feels<br /><em>ready to share.</em></h2></div>
            <p>Every research journey is different. Here are the kinds of academic work we help students plan, strengthen and present.</p>
          </div>
          <div className="work-grid">
            {workSamples.map((sample) => (
              <article className={`work-card ${sample.tone}`} key={sample.number}>
                <div className="work-card-top"><span>{sample.number}</span><span>{sample.type}</span></div>
                <div className="work-visual">
                  <div className="work-paper"><span /><i /><i /><i /><b /></div>
                  <div className="work-badge">RESEARCH<br /><small>STUDIO</small></div>
                </div>
                <h3>{sample.title}</h3>
                <p>{sample.detail}</p>
                <button onClick={() => setFormOpen(true)}>Discuss your work <ArrowRight size={15} /></button>
                <div className="work-report"><span>Included in support</span><ul>{sample.report.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </article>
            ))}
          </div>
          <p className="work-note"><ShieldCheck size={16} /> These are representative work types. We protect client privacy and do not publish student names or private reports.</p>
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="section-wrap">
          <div className="section-heading">
            <div><div className="section-label">05 / Selected work</div><h2>Ideas across<br /><em>every discipline.</em></h2></div>
            <p>Explore project and research report work completed across technology, food science, business and engineering.</p>
          </div>
          <div className="portfolio-list">
            {portfolioProjects.map(([category, number, title, department, report]) => (
              <article className="portfolio-item" key={number}>
                <span className="portfolio-number">{number}</span>
                <div><span className="portfolio-category">{category}</span><h3>{title}</h3><p>{department}</p></div>
                <div className="portfolio-report"><span>Report focus</span><strong>{report}</strong></div>
                <button onClick={() => setFormOpen(true)} aria-label={`Discuss ${title}`}>Discuss topic <ArrowRight size={15} /></button>
              </article>
            ))}
          </div>
          <p className="work-note"><ShieldCheck size={16} /> View the full work review for project scope, discipline and report focus.</p>
          <a className="button button-dark portfolio-link" href="/reviews">View full work review <ArrowRight size={17} /></a>
        </div>
      </section>

      <section className="quote-section" id="resources">
        <div className="quote-mark">“</div>
        <blockquote>Good research is not just about finding answers.<br /><em>It is about asking better questions.</em></blockquote>
        <p>— The Researcify principle</p>
      </section>

      <section className="cta-section">
        <div><p className="eyebrow light"><span /> Your next chapter starts here</p><h2>Ready to take your<br /><em>research further?</em></h2></div>
        <button className="button button-light" onClick={() => setFormOpen(true)}>Start a conversation <ArrowRight size={17} /></button>
      </section>

      <footer>
        <div className="footer-main">
          <div><a className="brand brand-footer" href="#top"><span className="brand-mark"><Sparkles size={17} /></span><span>RESEARCIFY <small>ACADEMIC STUDIO</small></span></a><p>Your partner in academic research.<br />Where ideas become impact.</p></div>
          <div className="footer-links"><div><b>Explore</b><a href="#about">About us</a><a href="#services">Services</a><a href="#work">Selected work</a><a href="/reviews">Work review</a><a href="#process">How it works</a></div><div><b>Connect</b><a href="mailto:hello@researcify.com">Email us</a><a href="#top">WhatsApp</a><a href="#resources">Resources</a></div></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Researcify Academic Studio</span><span>Academic guidance, always ethical.</span></div>
      </footer>

      {formOpen && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setFormOpen(false)}>
        <div className="inquiry-modal">
          <button className="modal-close" onClick={() => setFormOpen(false)} aria-label="Close"><X size={20} /></button>
          {submitted ? <div className="success-state"><div className="success-icon"><Check /></div><h2>Request received.</h2><p>Thank you for reaching out. Our team will review your requirements and respond shortly.</p><button className="button button-dark" onClick={() => { setSubmitted(false); setFormOpen(false); }}>Done</button></div> : <>
            <p className="section-label">Start a conversation</p><h2>Tell us about your<br /><em>research goals.</em></h2>
            <form onSubmit={submitInquiry}>
              <div className="form-grid"><label>Full name<input name="fullName" required placeholder="Your name" /></label><label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label></div>
              <div className="form-grid"><label>Academic level<select name="academicLevel" required defaultValue=""><option value="" disabled>Select level</option><option>Undergraduate</option><option>Postgraduate</option><option>Master&apos;s</option><option>PhD</option><option>Researcher</option></select></label><label>Support needed<select name="serviceCategory" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label></div>
              <label>Research or project title<input name="projectTitle" required placeholder="What are you working on?" /></label>
              <label>How can we help? <textarea name="description" required minLength={10} placeholder="Share a little about your goals, challenges or deadline (at least 10 characters)..." rows={4} /></label>
              {formError && <p className="form-error">{formError}</p>}<button className="button button-dark submit-button" type="submit">Send inquiry <ArrowRight size={17} /></button>
            </form>
          </>}
        </div>
      </div>}
    </main>
  );
}
