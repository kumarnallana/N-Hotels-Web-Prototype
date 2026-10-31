# [N] Hotel's - Luxury Rooms | Pithapuram

> 3rd Floor, VVS Grand, Park Centre, Pithapuram, Andhra Pradesh 533450  
> Direct Desk: +91 95158 44616 | 24/7 Operations | 250 Metres to Sri Pada Sri Vallabha Temple

---

## Design Showcase Overview

This repository features two distinct design architectures created to showcase the digital presence for **[N] Hotel's, Park Centre, Pithapuram**:

1. **`Html-Version/` - Standalone Luxury Prototype**
2. **`NextJs-Version/` - Enterprise Full-Stack Application**

Both versions are engineered with verified ground-truth tariffs:
* **Deluxe AC Room**: Flat ₹1,800 / 24-hour stay cycle (Net direct rate, zero GST)
* **Executive Family Suite**: Flat ₹2,500 / 24-hour stay cycle (Net direct rate, zero GST)
* **24-Hour Stay Cycle**: 07:00 AM check-in flexibility to accommodate morning express trains without penalties

---

## 1. Version 1: Standalone HTML / React Architecture (`Html-Version/`)

A zero-build, ultra-fast, single-file luxury prototype built with React 18, HTM, and Tailwind CSS. Ideal for instant stakeholder reviews, client presentations, and lightweight hosting.

### Key Highlights
* **Glassmorphic Sticky Navbar**: Automatically tracks scroll depth, morphing into a frosted-glass navigation bar.
* **Cinematic Ken Burns Hero**: Auto-advancing room carousel with active progress bar indicators.
* **Overlapping Floating Booking Engine**: Bridges the fold with check-in, check-out, and stay-slot selection.
* **Interactive Room Photo Switchers**: Toggle between bedroom and ensuite geyser bathroom views directly on cards.
* **Live Front Desk Extranet**: In-browser booking queue management for hotel operations.

### Quick Start
Open `Html-Version/n_hotels_luxury_prototype.html` directly in any web browser or serve via VS Code Live Server:
```bash
# Serve via any static web server
npx serve Html-Version
```

---

## 2. Version 2: Next.js Enterprise Application (`NextJs-Version/`)

A production-ready web application built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed for scale, SEO, dynamic routing, and modular component reuse.

### Directory Structure
* **`hotel-next/`**: Full Next.js App Router codebase
  * `src/app/`: Main hotel landing page and `/desk` queue management route
  * `src/components/`: Reusable modular UI components (Hero, Rooms, Amenities, BookingPanel, Reviews, LocationSection, MobileCallBar)
  * `src/components/providers/`: Global `StayProvider` context managing reservation state
  * `src/lib/`: Typed constants, date helpers, and enquiry formatting utilities
* **`site/`**: Semantic multi-page HTML / CSS / JS implementation with dedicated `/desk.html`
* **`prototype/`**: Integrated Next.js prototype reference build

### Quick Start
```bash
cd NextJs-Version/hotel-next
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Feature Comparison Matrix

| Capability | Html-Version (Standalone) | NextJs-Version (App Router) |
| :--- | :--- | :--- |
| **Framework** | React 18 (CDN + HTM) | Next.js 15 + TypeScript |
| **Build Dependency** | None (Runs directly in browser) | Node.js 18+ / npm |
| **State Management** | React Hooks (`useState`, `useMemo`) | Context API (`StayProvider`) |
| **Styling** | Scoped Tailwind CSS + Custom CSS | Tailwind CSS + CSS Modules |
| **Front Desk Queue** | Extranet Modal & View | Dedicated `/desk` Page & State |
| **Best Used For** | Rapid Demos, Stakeholder Reviews | Production Deployment, SEO, Integrations |

---

## Ground Truth & Property Specifications
* **Location Advantage**: 250 metres walking distance (3 mins) to Sri Pada Sri Vallabha Sacred Sansthan.
* **Building Floor**: 3rd Floor of VVS Grand above Canara Bank with dedicated elevator access.
* **Climate & Utilities**: Whisper-quiet split air conditioning, 24/7 geyser hot water in ensuite marble bathrooms.
* **Pricing Guarantee**: Direct rates guaranteed with zero hidden fees, zero booking commissions, and zero extra GST.

