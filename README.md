ProspectDossier AI
ProspectDossier AI is an intelligence engine designed to generate comprehensive advancement briefs and professional profiles for prospect research. It streamlines the discovery process by synthesizing data into a structured, confidential format suitable for major gift officers and advancement teams.

Features
• Intelligent Research: Automatically compiles professional profiles, wealth indicators, and philanthropic interests.

• Dynamic Input Form: Easy-to-use interface for capturing prospect details, target locations, and assigned officers.

• Professional Formatting: Integrated Tailwind CSS typography for beautiful, readable dossiers.

• Reliable Export: Built-in "Print / Save as PDF" functionality with a robust fallback mechanism for secure environments.

Technical Fixes & Improvements
• Printing Reliability: Implemented a "New Window Fallback" to ensure `window.print()` works reliably within secure iframes (like AI Studio).

• Form Interactivity: Resolved React version conflicts and state management issues to ensure all input fields (Prospect Name, Location, etc.) are fully interactive.

• Styling Engine: Optimized Tailwind CSS v3 configuration for consistent print and screen layouts.

Getting Started
1. Clone the repository.

2. Install dependencies: `npm install`

3. Run the development server: `npm run dev`

4. Enter prospect details into the input form and click Generate to create a dossier.

Configuration
Ensure you have a valid Gemini API key. The application supports both `API_KEY` and `GEMINI_API_KEY` environment variables.

---

© 2026 ProspectDossier AI • Confidential Advancement Tool
