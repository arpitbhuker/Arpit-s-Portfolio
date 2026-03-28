// ============================================================
// src/lib/constants.ts
//
// Single source of truth for all personal & contact data.
// Update here → updates everywhere automatically.
//
// Usage:
//   import { PERSONAL, LINKS, NAV_SECTIONS } from "@/lib/constants"
// ============================================================

export const PERSONAL = {
  name:         "Arpit",
  fullName:     "Arpit Bhuker",
  role:         "AI/ML Engineer & Data Analyst",
  stack:        "Python · SQL · Machine Learning · Power BI",
  location:     "Chandigarh, India",
  university:   "Chandigarh University",
  degree:       "B.E. CSE (AI & ML)",
  cgpa:         "8.06",
  responseTime: "Within 24 hours ⚡",
  available:    true,
} as const;

export const LINKS = {
  linkedin:  "https://www.linkedin.com/in/arpitbhuker/",
  github:    "https://github.com/arpitbhuker",
  portfolio: "https://arpitbhuker.vercel.app",

  email: {
    address: "arpitkumarbhuker@gmail.com",
    gmailCompose:
      "https://mail.google.com/mail/?view=cm&fs=1&to=arpitkumarbhuker@gmail.com&subject=Opportunity%20Regarding%20Your%20Portfolio",
  },

  phone: {
    display:  "+91 8168759378",
    whatsapp: "https://wa.me/918168759378",
  },
} as const;

// Drives Navigation active tracking + Footer quick links
export const NAV_SECTIONS = [
  { id: "home",     label: "Home"     },
  { id: "about",    label: "About"    },
  { id: "skills",   label: "Skills"   },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact"  },
] as const;