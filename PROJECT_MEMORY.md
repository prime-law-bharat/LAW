# PROJECT_MEMORY.md — Prime Law Bharat Website

> **Purpose**: Single source of truth for all project context, decisions, and content.
> Read this file instead of re-scanning PDFs or image folders.

---

## 1. Firm Identity

| Field | Value |
|---|---|
| **Name** | PRIME LAW BHARAT |
| **Tagline 1** | Comprehensive Legal Solutions \| Trusted Advocacy Across Forums |
| **Tagline 2** | You seek justice. We deliver it |
| **Tagline 3** | You bring us the problem. We bring the strategy, the preparation, and the persistence to see it through. |
| **Phone 1** | +91 9109101055 |
| **Phone 2** | +91 86000 12001 |
| **Website** | www.primelawbharat.com |
| **Address** | Office No. 801, Anjani Buildcon, Chamber 63 |
| **States** | Maharashtra \| Karnataka \| Gujarat \| Delhi \| Haryana |

---

## 2. Team Profiles

### Adv. Reetika Kamthan
- **Experience**: Over 8 years of litigation
- **Courts**: Pune District Court, Bombay High Court; exposure across Pune, Mumbai, Nagpur, Delhi, Bangalore
- **Bio**: (see PDF page 2–3 verbatim text)
- **Expertise**: Civil & Property Litigation · Criminal Litigation & Trial Advocacy · High Court & Supreme Court Matters · DRT/DRAT & Financial Disputes · RERA & Real Estate Litigation · Corporate & Commercial Litigation · Consumer & Family Matters · MPID & Regulatory Proceedings · Cheque Bounce & Recovery Matters · Injunction & Interim Relief Proceedings · Franchisee & Business Disputes · Banking & Financial Litigation

### Adv. Abhishek Motewar
- **Specialisation**: Financial, regulatory, and criminal litigation
- **Forums**: SEBI, ED, CBI, MPID, DRT, High Courts, Supreme Court
- **Bio**: (see PDF page 3 verbatim text)
- **Expertise**: Financial & Economic Offences · SEBI & Regulatory Matters · ED & PMLA Proceedings · CBI & Criminal Litigation · MPID & Investor Disputes · DRT & Financial Disputes · High Court & Supreme Court Litigation

---

## 3. Three Core Commitments

1. **Integrity** — Honest assessment of case risks and prospects, not false promises.
2. **Diligence** — Thorough drafting, research, and preparation behind every filing and hearing.
3. **Accessibility** — Clear communication in plain language with proactive updates.

---

## 4. "Why Clients Choose Us" Pillars

1. One Team, Every Forum
2. Honest Case Assessment
3. Meticulous Drafting
4. Proactive Communication
5. Multi-State Presence
6. Experience Across Specialized Forums
7. Client-First Approach, Not Case-First

---

## 5. Practice Areas (16 total)

1. Criminal Law & Sessions Court Matters
2. Civil Litigation
3. Matrimonial & Divorce Matters
4. Property & Real Estate Law
5. Corporate Law
6. Commercial Contracts & Agreement Drafting
7. Franchise Law
8. Consumer Protection
9. RERA Matters
10. DRT / DRAT (Debt Recovery)
11. SEBI Matters
12. MPID Act Matters
13. Multi-State Co-operative Societies Act Matters
14. Enforcement Directorate (ED) Matters
15. Appellate & Tribunal Practice
16. High Court & Supreme Court Litigation

> Full descriptions for each are in the PDF verbatim text (pages 3–6). Use those exact words.

---

## 6. About Us Text (verbatim from PDF page 2)

> Legal problems rarely stay simple. A property dispute can turn into a criminal complaint. A business disagreement can end up before a tribunal, then an appellate body, then the High Court. Most clients don't need a lawyer who knows one subject — they need a team that can follow their case wherever it goes, without losing time or context by switching firms midway.
>
> That is the foundation Prime Law Bharat is built on. We are a full-service legal practice representing clients before Lower and Sessions Courts, specialized Tribunals (DRT, DRAT, RERA, Consumer Commissions, SAT), the High Court, and the Supreme Court of India. Whatever forum your matter needs to go through, we are already positioned to take it there — with the same team, the same case knowledge, and the same commitment from day one to resolution.

---

## 7. Commitment Closing Text (verbatim from PDF page 8)

> Legal disputes are stressful — often because clients don't know what's happening or why. At Prime Law Bharat, we make it our job to change that. We explain your options in plain terms, prepare your case with the seriousness it deserves, and stand with you through every hearing, adjournment, and appeal until your matter is resolved.

---

## 8. Image Inventory

| Folder | Files | Notes |
|---|---|---|
| `logo/` | `logo.jpeg` | Firm logo |
| `hero/` | `hero-law-office.jpg` | Hero background |
| `owner/` | `owner.jpg` | Owner portrait (convert to B&W via CSS) |
| `conference-room/` | `conference-room-01.jpg`, `conference-room-02.jpg` | |
| `corridor/` | `corridor.jpg` | |
| `executive cabin/` | `executive-cabin-01.jpg` … `05.jpg` | 5 images |
| `gallery/` | `gallary.jpg` | Note: typo "gallary" |
| `workstation/` | `workstation.jpg` | |
| `misc/` | *(empty)* | |
| `practice/` | *(empty)* | Will use Unsplash for practice-area images |

**Total**: 12 images in 8 folders; 2 folders empty.

---

## 9. Website Structure (Final)

| # | Page | Key Sections |
|---|---|---|
| 1 | **Home** | Hero · About Preview · Practice Areas Preview · Owner/Strategy Section · Commitments · CTA |
| 2 | **About** | Full About · Team Profiles · Why Choose Us · Multi-State Presence |
| 3 | **Practice Areas** | All 16 practice areas with images and descriptions |
| 4 | **Gallery** | Firm gallery (office images) |
| 5 | **Contact** | Contact info, address, form |

**Removed**: Legal Insights (page, route, component, nav link, assets).

---

## 10. Design Decisions (Khaitan & Co Style Reference)

| Decision | Value |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS + Custom Viewport Components |
| **Theme** | Luxury dark navy theme (`#0F1B2D`), white text, rich red accent (`#8B2232`) |
| **Typography** | Playfair Display (headings) + Inter (body) |
| **Navigation** | Minimal header (logo + custom hamburger) opening full-screen overlay menu |
| **Homepage Layout** | Full-viewport (100vh) snap-like sections with dark overlay backgrounds |
| **Owner image** | Single image in editorial layout with CSS `grayscale contrast-110` |
| **Practice Cards** | Expandable interactive accordion cards with professional imagery |
| **Our office Gallery** | Responsive masonry grid + full-screen keyboard-navigable lightbox |
| **Footer** | Ultra-minimal single line footer |

---

## 11. Constraints

- **PDF = only source of truth** for written content. No invented stats, testimonials, or marketing copy.
- **PDFs are NOT deployed** — reference only, never committed or uploaded.
- **No Legal Insights** section anywhere.
- **Owner section** uses exactly ONE image, converted to B&W.
- **Practice area images** use drive assets or professional royalty-free legal imagery.
- **No heavy gradients, flashy animations, unnecessary cards, or clutter.**

---

## 12. Folder Structure (Planned)

```
LAW/
├── public/
│   └── images/          (existing assets)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          (Home)
│   │   ├── about/page.tsx
│   │   ├── practice-areas/page.tsx
│   │   ├── gallery/page.tsx
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── AboutPreview.tsx
│   │   │   ├── PracticeAreasPreview.tsx
│   │   │   ├── OwnerSection.tsx
│   │   │   └── Commitments.tsx
│   │   ├── about/
│   │   │   ├── TeamProfiles.tsx
│   │   │   └── WhyChooseUs.tsx
│   │   ├── practice/
│   │   │   └── PracticeAreaCard.tsx
│   │   ├── gallery/
│   │   │   └── GalleryGrid.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── SectionHeading.tsx
│   └── lib/
│       └── constants.ts    (all PDF content centralized)
├── PROJECT_MEMORY.md
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```
