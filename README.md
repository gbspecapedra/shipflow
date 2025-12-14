<p align="center">ShipFlow</p>
<p align="center">Shipping Label Creator</p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/gbspecapedra/shipflow">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/gbspecapedra/shipflow">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/gbspecapedra/shipflow">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/gbspecapedra/shipflow">
  <img alt="Github license" src="https://img.shields.io/github/license/gbspecapedra/shipflow">
</p>

## 💬 Project

A minimal shipping label creation flow built with **Next.js App Router**, focused on correctness, scalability, and a clean user experience.  
This project simulates creating and purchasing **USPS shipping labels** using the **EasyPost API**, including address validation, rate selection, label purchase, and PDF preview.

The goal of this MVP is to demonstrate solid frontend architecture, type safety, and clear separation of concerns — not to be a full production-ready shipping platform.

## 🚀 Live Demo

[See live demo](https://shipflow-tau.vercel.app/) - Deployed this project on [Vercel](https://vercel.com).

## 🧰 Tech Stack

### Core

- **Next.js 16 (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**

### Forms & Validation

- **react-hook-form**
- **Zod** (schema-first validation)

### API & Domain

- **EasyPost API** (shipping abstraction)
- Typed API routes (`app/api/*`)

### Testing

- **Vitest**
- Focused unit tests for:
  - Zod schemas
  - EasyPost mappers
  - Key UI logic (Stepper)

## 📦 Features

- US-only **From / To address** input with validation
- Address verification flow (simulated via API)
- Parcel details (dimensions & weight)
- Carrier rate selection (USPS)
- Purchase label flow
- **PDF label preview**
- Clear loading and success states during label generation
- Scalable, step-based UI flow
- Unit-tested core domain logic

## ℹ️ How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [NPM](https://www.npmjs.com/package/npm), [Node.js](https://nodejs.org/en/) >= 23.6.1 and an EasyPost API key (test key is sufficient). From your command line:

```bash
# Clone the repository
$ git clone https://github.com/gbspecapedra/shipflow.git

# Go into the repository
$ cd shipflow

# Install dependencies
$ npm install

# Run the development server
$ npm run dev

# Navigate to http://localhost:3000
# The app will automatically reload if you change any of the source files.
```

### Environment Variables

Create a `.env.local` file in the root of the project:

```env
EASYPOST_API_KEY=your_test_api_key_here
```

## 🧠 Architecture Overview

This project intentionally separates responsibilities:

- Schemas (Zod): Validate and protect all external/user input.
- Mappers: Convert validated domain data into EasyPost-compatible payloads.
- UI Components: Stateless and focused on presentation.
- Flow Orchestration: Step-based logic lives in the page layer, not in components.

This keeps the app easy to extend without creating hidden coupling.

## 📌 Assumptions

- Only US addresses are supported
- Label format is PDF only
- Authentication is out of scope
- EasyPost API keys are assumed to be configured via environment variables
- This is a frontend-focused MVP, not a full logistics system
- The MVP focuses on the happy path for label creation and purchase

## 🔮 What I’d Do Next

If this were extended beyond the MVP:

- Add authentication & user accounts
- Persist shipment history
- Support multiple carriers (UPS, FedEx)
- Add insurance & signature options
- Improve address autocomplete (USPS / Google Places)
- Add E2E tests (Playwright)
- Improve accessibility audits
- Add server-side caching for rates
- Add explicit error and retry handling for failed label purchases

## 📝 License

This project is under the MIT license. See the <a href="https://github.com/gbspecapedra/shipflow/blob/main/LICENSE" rel="nofollow">LICENSE</a> for more information.

---

<p align="center">Made with ♥ by Gisele Pecapedra 👋 <a href="https://www.linkedin.com/in/giselepecapedra/" rel="nofollow">Get in touch!</a></p>
