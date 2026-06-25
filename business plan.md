# EcoTrace  
## Democratising Carbon Accounting for India’s Small Businesses  

**Business Plan**  
**Version:** June 2026  
**Founder:** Ankita Banerjee  

---

## 1. Executive Summary

EcoTrace is a concierge‑MVP carbon footprint estimation tool built for India’s 63 million small and medium enterprises (SMEs). Using just four inputs — monthly electricity consumption, number of employees, primary commute type, and industry — a business receives a personalised email report within 48 hours containing its estimated carbon footprint, a sector benchmark, and three to five tailored cost‑saving reduction tips.

The project is currently in a pre‑pilot stage with a fully functional prototype, an automated reporting engine, a public GitHub repository, and structured market validation based on interviews with 10 small business owners in Patna. EcoTrace addresses a critical gap: existing carbon accounting tools are too expensive, too complex, and designed for large corporations. By contrast, EcoTrace is free, takes sixty seconds to use, and requires no technical knowledge.

The long‑term vision is to evolve EcoTrace into a freemium SaaS platform serving thousands of SMEs, enabling them to measure, reduce, and report their carbon impact while cutting operational costs. This business plan outlines the market opportunity, the sustainable business model, validation results, operational roadmap, and the path to scale.

---

## 2. Problem Statement

### 2.1. The Carbon Blind Spot
India’s SME sector accounts for approximately 30‑40% of the country’s industrial greenhouse gas emissions, yet almost none of these businesses have a clear picture of their carbon footprint. Unlike large corporations, SMEs lack:
- **Affordable tools:** Commercial carbon accounting platforms (e.g., Persefoni, Watershed, Carbon Trail) cost between ₹50,000 and ₹5,00,000 annually, putting them far out of reach for small enterprises.
- **Simple interfaces:** Most tools require months of training, integration with ERP systems, and dedicated sustainability teams — resources that an independent shop, café, or small manufacturer simply does not have.
- **Cultural relevance:** Existing tools are built around Western corporate frameworks; they do not speak the language, values, or operational realities of Indian small business owners.

### 2.2. The Consequences
Without accessible measurement, SMEs remain invisible in climate conversations. They cannot:
- Apply for green certifications or preferential loan rates tied to ESG performance.
- Respond to downstream buyers (especially export partners) who increasingly demand carbon disclosures.
- Identify operational inefficiencies that inflate both emissions and costs.
- Contribute to India’s Nationally Determined Contributions (NDCs) and the LiFE (Lifestyle for Environment) mission.

EcoTrace exists to close this gap.

---

## 3. Solution Overview

EcoTrace is a **concierge Minimum Viable Product** that makes carbon footprint estimation as easy as filling a short online form.

### 3.1. How It Works
1. **User side:** A small business owner visits the EcoTrace landing page and enters four pieces of information: monthly electricity usage (kWh), number of employees, primary commute type (walk/bicycle, public transport, two‑wheeler, car), and industry (café, retail, manufacturing, services, etc.). The entire process takes less than 60 seconds.
2. **Backend:** The data flows into a Google Sheet connected to a secure form. EPA emission factors (e.g., 0.92 kg CO₂ per kWh) and a Random Forest machine learning model, trained on open datasets and refined with local assumptions, compute the estimated monthly carbon footprint.
3. **Delivery:** A Google Apps Script automatically emails the business a personalised report containing:
   - Estimated footprint (kg CO₂/month).
   - A comparison with anonymised averages for similar businesses.
   - Three to five practical reduction tips, many of which translate directly into electricity or fuel cost savings.
4. **Human touch:** In the concierge phase, the founder personally reviews each report before it is sent, adding tailored observations and ensuring quality.

### 3.2. Why Concierge First?
The deliberate choice of a manual‑first model follows Lean Startup principles. Instead of investing months in building a full SaaS before any customer feedback, the concierge MVP allows EcoTrace to:
- Learn exactly what small business owners find valuable.
- Refine the reduction tips based on real conversations.
- Build a body of anonymised case studies that will inform the eventual automated product.
- Demonstrate early traction and validation for grant applications, academic research, and partnership discussions.

---

## 4. Market Validation

In June 2026, EcoTrace conducted ten structured interviews with small business owners in and around Patna, Bihar, spanning food services, retail, coaching, tailoring, and light manufacturing. The full findings are documented in the **EcoTrace Validation Memo**. Key insights include:

| Finding | Implication for EcoTrace |
|---------|---------------------------|
| **90% willingness to try** — almost all respondents said they would use a four‑question carbon tool if it was free. | Confirms latent demand; low barrier is the primary driver. |
| **60‑second rule** — every respondent stated they would not spend more than a minute on any such form. | The four‑field design is not just a convenience; it is a hard requirement. |
| **Cost savings, not just carbon** — 70% wanted the report to highlight how reducing emissions could lower their electricity or fuel bills. | Reduction tips must always include a ₹‑savings angle alongside environmental messaging. |
| **Institutional trust matters** — four respondents initially worried about sharing data, but said the IIT Patna name would reassure them. | Branding the project as “IIT Patna Research” is essential for credibility. |
| **Email preferred** — nine out of ten preferred email over any app, dashboard, or WhatsApp bot. | The email‑first delivery model is validated; no need for a dashboard in the early stages. |

This validation replaces passive sign‑up numbers with active, voice‑of‑customer evidence. It confirms that EcoTrace’s design choices — extreme simplicity, cost‑saving focus, institutional branding, and email delivery — are precisely aligned with the target market’s needs.

---

## 5. Market Analysis

### 5.1. Total Addressable Market (TAM)
India is home to approximately **63 million MSMEs**, of which roughly 15 million are active in non‑agricultural sectors (services, manufacturing, retail, hospitality). Each of these businesses contributes to greenhouse gas emissions, yet only a tiny fraction has ever attempted to measure them. Even if we consider only the 1.5 million MSMEs that are GST‑registered and operate in urban/peri‑urban areas, the addressable market remains vast.

### 5.2. Serviceable Obtainable Market (SOM)
In the initial phases (pilot and early SaaS), EcoTrace will target:
- Small, owner‑operated businesses in Tier‑2 and Tier‑3 cities that are digitally literate enough to fill an online form but not large enough to afford enterprise tools.
- Early adopters who are already feeling pressure from export buyers, green certification bodies, or local environmental regulations.
- Estimate for Year 2‑3: 500‑2,000 paying users, growing through partnerships and word‑of‑mouth.

### 5.3. Market Trends
- **ESG push:** Large corporations are increasingly mandating carbon disclosures from their supply chains; SMEs that serve as vendors will need basic reporting.
- **Government schemes:** The Indian government’s MSME Sustainable Development initiatives and the LiFE mission are creating awareness and demand for simple environmental tools.
- **Green consumerism:** End‑consumers are rewarding environmentally conscious businesses, especially in urban food and retail segments.
- **No dominant player in the SME space:** The carbon accounting market is crowded at the enterprise level but empty at the low‑end, four‑question simplicity tier that EcoTrace occupies.

---

## 6. Sustainable Business Model

EcoTrace’s business model is designed to remain accessible to the smallest businesses while generating sufficient revenue to sustain and scale operations.

### Phase 1: Pre‑Revenue (Current – Pilot)
- **Model:** Fully free. All costs (server, domain, tools, time) are borne by the founder as part of her independent research and personal project.
- **Revenue:** None.
- **Objective:** Validate demand, collect data, publish research, build case studies, and strengthen the founder’s entrepreneurial profile.

### Phase 2: Freemium SaaS (Year 2‑3, post‑pilot)
- **Free tier:** One basic carbon estimate per quarter, with generic reduction tips.
- **Pro tier (₹299/month):** Monthly tracking, a user dashboard showing footprint trends, certification‑ready reports, and AI‑powered personalised recommendations.
- **Enterprise tier (custom pricing):** For small chains (3‑10 outlets) or cooperatives, offering aggregated reporting and API access.
- **Revenue projection (Year 2):** With 500 Pro users, annual recurring revenue (ARR) ≈ ₹1,80,000. This covers basic infrastructure and part‑time support.
- **Path to breakeven:** Breakeven is projected by Year 3 with 2,000 Pro users (ARR ≈ ₹7,20,000), assuming lean operations and heavy automation.

### Phase 3: Partnerships & Alternative Revenue (Year 3+)
- **White‑label licensing:** Integrate EcoTrace’s engine into accounting platforms (Tally, Zoho Books) or SME‑focused fintech apps; charge a per‑seat or transaction fee.
- **Carbon offset facilitation:** Once a critical mass of users is achieved, EcoTrace could facilitate the purchase of verified carbon offsets, earning a small commission.
- **Data insights (anonymised):** Aggregate, anonymised industry‑level reports could be sold to policymakers, development agencies, or impact investors.

---

## 7. Marketing & Sales Strategy

### 7.1. Pilot Phase (0‑20 users)
- **Direct outreach:** Founder’s personal network, IIT Patna contacts, family‑owned businesses, and local associations.
- **Social media:** LinkedIn posts detailing the journey; Instagram stories targeting eco‑conscious small brands.
- **Local partnerships:** Tie‑up with one or two local business chambers or traders’ associations to pilot the tool.
- **Incentive:** Early participants receive a printed “EcoTrace Pilot Partner” certificate, appealing to their sense of recognition.

### 7.2. Growth Phase (20‑1,000 users)
- **Content marketing:** Free “Carbon Footprint 101 for Small Businesses” guides in English, Hindi, and Bengali, distributed via blogs, LinkedIn, and YouTube shorts.
- **Case‑study storytelling:** Publish real (anonymised) success stories — e.g., “How a Patna café cut its electricity bill by 14% after using EcoTrace.”
- **Partnerships with aggregators:** Collaborate with Zoho, Vyapar, or OkCredit to embed EcoTrace as a value‑added feature.
- **Referral programme:** Pro users get one free month for every new paying user they refer.
- **Academic credibility:** Leverage the founder’s IIT Patna affiliation and published research; present at academic conferences and industry webinars.

### 7.3. Trust Building
- Display the IIT Patna logo and any institutional affiliations prominently on the website and in all reports.
- Publish the research papers behind the methodology.
- Ensure all data collection and privacy practices are transparent and minimal (the form collects no personally identifiable business information beyond email).

---

## 8. Operations & Technology

### 8.1. Current Tech Stack (Concierge MVP)
- **Frontend:** Landing page with an embedded secure form.
- **Data collection:** Google Sheets linked to the form, with EPA emission factor constants in a separate reference tab.
- **Calculation engine:** Formula columns compute footprint; a Random Forest model (trained in Python on open datasets) provides initial benchmark values. In the MVP phase, model outputs are reviewed manually.
- **Email automation:** Google Apps Script sends personalised reports via Gmail.
- **Code repository:** GitHub (`ecotrace-mvp`) contains all scripts, documentation, and version history.
- **Video demonstration:** A walkthrough video explains the entire flow, uploaded online.

### 8.2. Future Tech Stack (SaaS)
- **Backend:** Python (Flask/FastAPI) or Node.js with a PostgreSQL database to handle user accounts, historical data, and model serving.
- **Machine learning pipeline:** Train a robust Random Forest (or XGBoost) model on the EcoTrace pilot data enriched with public datasets; deploy via an API endpoint.
- **Frontend:** React or Vue.js web app with user dashboard, form, and report visualisation.
- **Infrastructure:** Hosted on AWS/GCP with CI/CD pipelines; monitoring for uptime and email delivery.
- **Automation:** Fully automated report generation and delivery; no manual intervention required once validated.

### 8.3. Operational Workflow (Pilot Phase)
1. User submits form.
2. New row appears in Google Sheet.
3. Apps Script calculates footprint using emission factors and ML benchmark.
4. Founder reviews the draft email (quality check) and clicks “Send.”
5. User receives report within 48 hours.
6. Founder logs interaction for future case study.

---

## 9. Financial Projections (Illustrative)

These projections are conservative and based on a bootstrapped, lean‑startup approach. All figures in ₹.

| Year | Phase | Users (Pro) | Revenue (₹) | Costs (₹) | Notes |
|------|-------|-------------|--------------|------------|-------|
| Y1 (2026‑27) | Pre‑revenue Pilot | 20 (free) | 0 | 5,000 (domain, tools) | Research phase; no monetisation. |
| Y2 (2027‑28) | SaaS Launch | 500 | 1,80,000 | 50,000 (hosting, email service) | Freemium model active. |
| Y3 (2028‑29) | Growth | 2,000 | 7,20,000 | 1,50,000 (part‑time dev, marketing) | Breakeven expected. |
| Y4 (2029‑30) | Scale | 5,000+ | 18,00,000+ | 5,00,000+ (team expansion) | Profitability; partnership revenue begins. |

*Costs are estimated for a solo founder with occasional freelance support. Revenue projections assume a steady conversion rate from free to Pro and a monthly subscription price of ₹299. Enterprise and partnership revenues are not included in these baseline numbers but represent upside potential.*

---

## 10. SDG Alignment

EcoTrace directly contributes to the United Nations Sustainable Development Goals:

- **SDG 13 – Climate Action:** Empowers SMEs to measure and reduce their greenhouse gas emissions, contributing to national and global climate targets.
- **SDG 9 – Industry, Innovation and Infrastructure:** Promotes inclusive and sustainable industrialisation by providing an innovation‑driven, affordable tool for the smallest enterprises.
- **SDG 12 – Responsible Consumption and Production:** Encourages resource efficiency through practical reduction recommendations that lower both carbon output and operational costs.

Additionally, by making sustainability accessible to grassroots businesses, EcoTrace indirectly supports **SDG 8 (Decent Work and Economic Growth)** through cost savings and **SDG 17 (Partnerships for the Goals)** by fostering collaborations with academia, government schemes, and the private sector.

---

## 11. Pilot Roadmap

### Current Stage (June‑December 2026): Pre‑Pilot
- [x] Functional prototype (landing page + Google Sheets + Apps Script) built and tested.
- [x] Validation Memo based on 10 SME interviews.
- [x] Business Plan and Concept Note completed.
- [x] Public GitHub repository with documentation.
- [x] Pitch video and prototype walkthrough recorded.
- [ ] Onboard first 5 pilot users for real‑world feedback.
- [ ] Publish second research paper on the methodology.

### Stage 2 (Early‑2027): Pilot with Real Users
- Onboard 20 small businesses through direct outreach, local associations, and social media.
- Collect real‑world data: electricity patterns, user feedback, reduction outcomes.
- Publish a research paper on the pilot results.
- Refine the machine learning model based on actual Indian SME data.

### Stage 3 (Late‑2027): SaaS Development
- Build and launch the freemium web application.
- Migrate the first cohort of pilot users to the free tier.
- Begin marketing to Indian SMEs through content, partnerships, and referrals.
- Establish a legal entity (e.g., sole proprietorship or Section 8 company) in India.

### Stage 4 (2028 and Beyond): Scale & Partnerships
- Reach 500 paying users and achieve breakeven.
- Sign first white‑label deal with an SME accounting platform.
- Explore carbon offset facilitation as an additional revenue stream.
- Publish sector‑level carbon insights for policymakers.
- Expand into Southeast Asian markets with localised emission factors.

---

## 12. Founder Background

Ankita Banerjee is an undergraduate student at the Indian Institute of Technology Patna (IIT Patna), pursuing an integrated B.S‑M.S in Computer Science and Data Analytics. She has published research on rural digital infrastructure at the Indian Statistical Institute, won the Penrose Bronze Award for STEM writing, and completed eight global job simulations in data analytics, risk, and software engineering with EY, Deloitte, JPMorgan, and Bloomberg. She is the sole founder of EcoTrace and has built the entire MVP herself, from the landing page to the machine learning pipeline to the automated reporting engine. She also organised a sustainability‑focused hackathon with 8 participants and volunteers as a data analyst for local businesses.

---

*This business plan is a living document. It will be updated as EcoTrace moves from pre‑pilot to full‑scale operations.*
