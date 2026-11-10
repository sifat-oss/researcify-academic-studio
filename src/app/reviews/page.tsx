import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: "Work Review | Researcify Academic Studio",
  description: "A review of academic projects, research reports and technical work completed by Researcify Academic Studio.",
};

const projects = [
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

export default function ReviewsPage() {
  return (
    <main className="review-page">
      <header className="site-header">
        <Link className="brand" href="/"><span className="brand-mark"><Sparkles size={17} /></span><span>RESEARCIFY <small>ACADEMIC STUDIO</small></span></Link>
        <Link className="text-link" href="/"><ArrowLeft size={16} /> Back home</Link>
      </header>
      <section className="review-hero">
        <div className="section-label">Work review / 2021 — present</div>
        <h1>A record of<br /><em>work completed.</em></h1>
        <p>Explore a selection of academic projects, research reports and technical work developed across multiple disciplines. Each project reflects structured research, clear documentation and practical problem-solving.</p>
        <div className="review-stats"><span><b>15</b> Projects reviewed</span><span><b>04</b> Academic areas</span><span><b>01</b> Clear standard</span></div>
      </section>
      <section className="review-list-section">
        <div className="review-list">
          {projects.map(([category, number, title, department, report]) => (
            <article className="review-item" key={number}>
              <div className="review-index"><span>{number}</span><CheckCircle2 size={17} /></div>
              <div className="review-title"><span>{category}</span><h2>{title}</h2><p>{department}</p></div>
              <div className="review-focus"><small>Project / report focus</small><p>{report}</p><Link className="text-link" href="/#top">Start a similar project <ArrowRight size={15} /></Link></div>
            </article>
          ))}
        </div>
      </section>
      <section className="review-footer-cta"><p className="section-label">Have a project in mind?</p><h2>Let&apos;s make your<br /><em>next one stronger.</em></h2><Link className="button button-dark" href="/#top">Start a conversation <ArrowRight size={17} /></Link></section>
      <footer><div className="footer-bottom"><span>© 2026 Researcify Academic Studio</span><span>Academic guidance, always ethical.</span></div></footer>
    </main>
  );
}
