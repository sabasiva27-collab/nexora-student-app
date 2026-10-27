# NEXORA — Personalised Student Growth & Opportunity Discovery Platform

> **Tagline:** Discover your potential. Find your next opportunity.  
> **Vision:** A personalized student growth and opportunity discovery platform supporting students across **ALL college degree departments**.

---

## 🚀 Live Local Server
The development server is running and accessible at:
- **Local:** [http://localhost:3000/](http://localhost:3000/)

---

## 🌟 Universal Department Support & Updated Features

### 1. Universal Department Architecture (All Degree Programmes)
- **28+ Specific Departments Supported:**
  - **Engineering & Computing:** Computer Science and Engineering (CSE), Information Technology (IT), Artificial Intelligence & Data Science (AI & DS), Artificial Intelligence & Machine Learning (AI & ML), Electronics & Communication Engineering (ECE), Electrical & Electronics Engineering (EEE), Mechanical Engineering, Civil Engineering, Biomedical Engineering, Biotechnology, Chemical Engineering, Aeronautical & Aerospace Engineering, BCA, MCA, B.Tech (General).
  - **Commerce & Management:** Bachelor of Commerce (B.Com), Bachelor of Business Administration (BBA), Master of Business Administration (MBA).
  - **Sciences & Health:** Bachelor of Science (B.Sc), Master of Science (M.Sc), Pharmacy (B.Pharm / M.Pharm), Nursing & Allied Health Sciences, Pure & Applied Science.
  - **Law, Agriculture & Humanities:** Law (LL.B / B.A. LL.B), Agricultural Sciences (B.Sc Agriculture), Bachelor of Arts (BA), Arts & Humanities.
  - **Custom Degree ('Other'):** Provides an animated custom text input allowing students from any specialized discipline (e.g. Marine Engineering, Nanotechnology, Applied Physics) to input their degree.
- **Onboarding & Profile Editing:** Students select their department during the 4-step onboarding wizard and can edit or change it anytime under **My Profile**.
- **Interactive Persona Presets:** Test diverse student profiles with 1 click:
  - **Biomedical Engineering** (Ananya Sen — Medical Devices & Healthcare AI)
  - **Mechanical Engineering** (Vikram Malhotra — CAD & Prototyping)
  - **Computer Science & IT** (Aarav Sharma — Full-Stack & DSA)
  - **Commerce & Management** (Neha Gupta — Financial Modeling & Strategy)
  - **Applied Sciences & Research** (Dr. Rahul Verma — Life Sciences & Statistics)

---

### 2. Expanded Opportunity Discovery (13 Categories)
- **Supported Opportunity Types:**
  1. **Workshops** (e.g., Medical Device Instrumentation Workshop, Production React Masterclass)
  2. **Symposiums** (e.g., AeroMech National Mechanical Symposium, FuturEdge Tech Symposium)
  3. **Internships** (e.g., Medical Devices R&D Intern, Frontend Engineering Intern, Financial Strategy Intern)
  4. **Hackathons** (e.g., InnovateX National Student Hackathon)
  5. **Conferences** (e.g., International Student Research Conference ISRCET 2026)
  6. **Research Opportunities** (e.g., Additive Manufacturing Fellowship, Genomics Research Fellowship)
  7. **Project Competitions** (e.g., MedTech Challenge 2026, AgriTech Precision Drone Competition)
  8. **Scholarships** (e.g., NextGen Student Innovators National Merit Scholarship)
  9. **Online Courses** (e.g., Parametric CAD, GD&T & DFM Masterclass)
  10. **Certifications** (e.g., Certified Biomedical Quality & Regulatory BMQR)
  11. **Industrial Training** (e.g., CNC Machining, Robotics & Automation Plant Training)
  12. **Placement Preparation** (e.g., Campus-to-Corporate Interview Accelerator)
  13. **Entrepreneurship Programmes** (e.g., VentureLaunch Student Startup Incubation)
- **Comprehensive Filters:**
  - Category (all 13 types)
  - Target Department (all departments + "All Departments" option)
  - Academic Year Eligibility (1st, 2nd, 3rd, 4th, Postgraduate)
  - Location Mode (Online / Offline)
  - Proximity Distance Slider (5 km to 50+ km)
  - Required Skills
  - Registration Fee (Free vs. Paid)
  - Registration Deadline (Closing in 7, 14, 30 days)
  - Bookmarked-only toggle
  - Live Search & Multi-criteria Sorting
- **Honest Demo Notice:** Every sample event is explicitly labeled with a demo tag. Official registration links open external portals, and unavailable links show a clear disabled badge.

---

### 3. Department-Tailored Learning Roadmaps
- **Dynamic Department Roadmaps:**
  - **Computer Science & IT:** Core DSA, Strict TypeScript, Scalable Web Architecture, Node.js & System Design.
  - **Mechanical Engineering:** Parametric 3D CAD (SolidWorks/AutoCAD), ASME Y14.5 GD&T, FEA Structural Stress Simulation (ANSYS), Design for Manufacturing (DFM) & CFD.
  - **Biomedical Engineering:** Medical Instrumentation Analog Front-Ends, Biosignal Processing (ECG/EMG DSP & Pan-Tompkins), Medical Device Regulations (ISO 13485 & FDA 510(k)), and Medical AI / DICOM Diagnostic Imaging.
  - **Commerce & Management:** 3-Statement Dynamic Financial Modeling (DCF), SQL & Power BI Executive Dashboards, TAM/SAM/SOM Market Sizing & Unit Economics.
  - **Applied Sciences & Research:** PRISMA Literature Reviews, Statistical Hypothesis Testing (Python/R), Empirical Field Trials, and Scientific Conference Poster Design.
- **Track Switcher:** Students can switch between department roadmap tracks in real time on the **My Roadmap** page.
- **Task Management:** Interactive checkboxes, progress tracking, and custom task additions with local storage persistence.

---

### 4. Department-Aware Recommendation Engine
- Heuristic scoring factoring:
  - Skill Overlap (0–30 pts)
  - Interest Alignment (0–25 pts)
  - Department Relevance (0–20 pts)
  - Format & Proximity (0–15 pts)
  - Deadline Urgency (0–10 pts)
- **"Your Next Best Move" Hero Card:** Automatically suggests the next highest-value action tailored to the student's department, goal, and nearest deadline.
- **Department Skill Gap Analysis:** Recommends targeted skills for the student's specific field (e.g., SolidWorks for Mechanical, Medical Instrumentation for Biomedical, Financial Modeling for Commerce, DSA for CSE).

---

## 🛠️ Tech Stack & Architecture
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **State & Storage:** React Context (`AppContext.tsx`), typed `localStorage` persistence (`storageService.ts`)
- **Validation:** TypeScript type checking (`tsc`) + Vite production bundling
