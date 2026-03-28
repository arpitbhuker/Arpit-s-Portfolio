import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail, Phone, MapPin, Clock,
  Github, Linkedin, MessageCircle,
  Briefcase, Users, GraduationCap, HelpCircle,
  ArrowUpRight, CheckCircle,
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS — consistent with Skills + Projects
   ============================================================ */
const ACCENTS = {
  violet:  { text: "hsl(262 83% 75%)",  border: "rgba(167,139,250,0.22)", borderH: "rgba(167,139,250,0.55)", bg: "rgba(167,139,250,0.07)", glow: "rgba(167,139,250,0.18)", hex: "#A78BFA" },
  emerald: { text: "hsl(160 70% 55%)",  border: "rgba(52,211,153,0.22)",  borderH: "rgba(52,211,153,0.55)",  bg: "rgba(52,211,153,0.07)",  glow: "rgba(52,211,153,0.18)",  hex: "#34D399" },
  amber:   { text: "hsl(38 95% 62%)",   border: "rgba(245,158,11,0.22)",  borderH: "rgba(245,158,11,0.55)",  bg: "rgba(245,158,11,0.07)",  glow: "rgba(245,158,11,0.18)",  hex: "#F59E0B" },
  rose:    { text: "hsl(0 86% 70%)",    border: "rgba(248,113,113,0.22)", borderH: "rgba(248,113,113,0.55)", bg: "rgba(248,113,113,0.07)", glow: "rgba(248,113,113,0.18)", hex: "#F87171" },
  orange:  { text: "hsl(25 95% 65%)",   border: "rgba(249,115,22,0.22)",  borderH: "rgba(249,115,22,0.55)",  bg: "rgba(249,115,22,0.07)",  glow: "rgba(249,115,22,0.18)",  hex: "#F97316" },
  lime:    { text: "hsl(84 81% 55%)",   border: "rgba(132,204,22,0.22)",  borderH: "rgba(132,204,22,0.55)",  bg: "rgba(132,204,22,0.07)",  glow: "rgba(132,204,22,0.18)",  hex: "#84CC16"  },
} as const;
type AccentKey = keyof typeof ACCENTS;

/* ============================================================
   STATIC DATA
   ============================================================ */
const INTENT_CARDS = [
  {
    icon:    Briefcase,
    title:   "Collaboration",
    desc:    "Let's build something meaningful together with data & AI",
    accent:  "violet" as AccentKey,
  },
  {
    icon:    Users,
    title:   "Job Opportunities",
    desc:    "Internships & full-time roles matching my skills",
    accent:  "emerald" as AccentKey,
  },
  {
    icon:    GraduationCap,
    title:   "Mentorship",
    desc:    "AI/ML guidance, learning paths & knowledge exchange",
    accent:  "amber" as AccentKey,
  },
  {
    icon:    HelpCircle,
    title:   "General Inquiry",
    desc:    "Any questions about my work, projects, or experience",
    accent:  "rose" as AccentKey,
  },
] as const;

const INFO_ROWS = [
  { icon: Mail,    label: "Email",         value: "arpitkumarbhuker@gmail.com", accent: "violet" as AccentKey, href: "https://mail.google.com/mail/?view=cm&fs=1&to=arpitkumarbhuker@gmail.com&subject=Opportunity%20Regarding%20Your%20Portfolio" },
  { icon: Phone,   label: "Phone",         value: "+91 8168759378",             accent: "amber"  as AccentKey, href: "tel:+918168759378" },
  { icon: MapPin,  label: "Location",      value: "Chandigarh, India",          accent: "emerald"as AccentKey, href: null },
  { icon: Clock,   label: "Response Time", value: "Within 24 hours",            accent: "lime"   as AccentKey, href: null },
] as const;

const SOCIAL_BUTTONS = [
  {
    icon:   Mail,
    label:  "Email Me",
    accent: "violet" as AccentKey,
    href:   "https://mail.google.com/mail/?view=cm&fs=1&to=arpitkumarbhuker@gmail.com&subject=Opportunity%20Regarding%20Your%20Portfolio",
  },
  {
    icon:   Linkedin,
    label:  "LinkedIn",
    accent: "amber" as AccentKey,
    href:   "https://www.linkedin.com/in/arpitbhuker/",
  },
  {
    icon:   Github,
    label:  "GitHub",
    accent: "rose" as AccentKey,
    href:   "https://github.com/arpitbhuker",
  },
  {
    icon:   MessageCircle,
    label:  "WhatsApp",
    accent: "emerald" as AccentKey,
    href:   "https://wa.me/918168759378",
  },
] as const;

/* ============================================================
   BACKGROUND
   Horizontal signal-wave lines — evokes "sending a message /
   reaching out". Completely different from:
     Hero (particles), About (dot grid), Skills (circuit traces),
     Projects (diagonal mesh).
   Pure CSS repeating pattern — zero JS overhead.
   ============================================================ */
const ContactBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Sinusoidal wave lines using SVG filter turbulence trick */}
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ opacity: 0.06 }}>
      <defs>
        <filter id="wave-distort">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.08" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      {/* Horizontal lines that get wave-distorted */}
      {[10, 22, 34, 46, 58, 70, 82, 94].map((y) => (
        <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`}
          stroke="rgba(167,139,250,0.8)" strokeWidth="1"
          filter="url(#wave-distort)" />
      ))}
    </svg>

    {/* Second set — different color, offset phase */}
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ opacity: 0.04 }}>
      <defs>
        <filter id="wave-distort2">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="7" result="noise2" />
          <feDisplacementMap in="SourceGraphic" in2="noise2" scale="22" xChannelSelector="G" yChannelSelector="R" />
        </filter>
      </defs>
      {[16, 28, 40, 52, 64, 76, 88].map((y) => (
        <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`}
          stroke="rgba(52,211,153,0.9)" strokeWidth="1"
          filter="url(#wave-distort2)" />
      ))}
    </svg>

    {/* Ambient blobs */}
    <div className="absolute pointer-events-none" style={{ width: "40%", height: "50%", top: "0%", left: "-5%", background: "radial-gradient(ellipse, rgba(167,139,250,0.05) 0%, transparent 65%)", filter: "blur(72px)" }} />
    <div className="absolute pointer-events-none" style={{ width: "35%", height: "40%", bottom: "0%", right: "-4%", background: "radial-gradient(ellipse, rgba(52,211,153,0.04) 0%, transparent 65%)", filter: "blur(68px)" }} />
    <div className="absolute pointer-events-none" style={{ width: "28%", height: "35%", top: "35%", right: "25%", background: "radial-gradient(ellipse, rgba(245,158,11,0.03) 0%, transparent 65%)", filter: "blur(55px)" }} />
  </div>
);

/* ============================================================
   GLASS CARD — reusable wrapper
   ============================================================ */
const GlassCard = ({
  children,
  accentKey = "violet",
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  accentKey?: AccentKey;
  className?: string;
  hover?: boolean;
}) => {
  const a = ACCENTS[accentKey];
  const [hovered, setHovered] = useState(false);
  const active = hover && hovered;

  return (
    <div
      className={`relative rounded-xl overflow-hidden ${className}`}
      style={{
        background:     "rgba(5,5,8,0.72)",
        border:         `1px solid ${active ? a.borderH : a.border}`,
        backdropFilter: "blur(14px)",
        boxShadow:      active
          ? `0 0 28px ${a.glow}, 0 6px 28px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)`
          : `0 2px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)`,
        transform:      active ? "translateY(-3px)" : "translateY(0)",
        transition:     "all 0.28s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-5 right-5 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${a.text}, transparent)`, opacity: active ? 0.5 : 0.18, transition: "opacity 0.28s" }} />
      {/* Inner hover glow */}
      <div className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse 70% 45% at 0% 0%, ${a.bg} 0%, transparent 60%)`, opacity: active ? 1 : 0 }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/* ============================================================
   INTENT CARD — what you can reach out about
   ============================================================ */
const IntentCard = ({ item, index, isInView }: {
  item: typeof INTENT_CARDS[number];
  index: number;
  isInView: boolean;
}) => {
  const a    = ACCENTS[item.accent];
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard accentKey={item.accent} className="h-full">
        <div className="p-4 flex items-start gap-3 min-h-[88px]">
          {/* Icon badge */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: a.bg, border: `1px solid ${a.border}` }}
          >
            <Icon size={16} style={{ color: a.text }} strokeWidth={1.8} />
          </div>
          {/* Text */}
          <div className="min-w-0">
            <h4 className="font-semibold text-sm text-foreground mb-0.5">{item.title}</h4>
            <p className="text-xs leading-relaxed" style={{ color: "hsl(210 10% 52%)" }}>{item.desc}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

/* ============================================================
   CONTACT INFO ROW
   ============================================================ */
const InfoRow = ({ row, index, isInView }: {
  row: typeof INFO_ROWS[number];
  index: number;
  isInView: boolean;
}) => {
  const a    = ACCENTS[row.accent];
  const Icon = row.icon;
  const content = (
    <div className="flex items-center gap-3 py-3 px-1 group">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: a.bg, border: `1px solid ${a.border}` }}>
        <Icon size={14} style={{ color: a.text }} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "hsl(210 10% 42%)" }}>{row.label}</p>
        <p className="text-sm font-medium text-foreground truncate">{row.value}</p>
      </div>
      {row.href && (
        <ArrowUpRight size={14} style={{ color: a.text, opacity: 0.6 }} className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.5 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={index < INFO_ROWS.length - 1 ? "border-b" : ""}
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      {row.href ? (
        <a href={row.href} target="_blank" rel="noopener noreferrer" className="block">{content}</a>
      ) : (
        <div>{content}</div>
      )}
    </motion.div>
  );
};

/* ============================================================
   SOCIAL ACTION BUTTON
   ============================================================ */
const SocialButton = ({ item, index, isInView }: {
  item: typeof SOCIAL_BUTTONS[number];
  index: number;
  isInView: boolean;
}) => {
  const a    = ACCENTS[item.accent];
  const Icon = item.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
      style={{
        background:  hovered ? a.bg : "rgba(255,255,255,0.04)",
        border:      `1px solid ${hovered ? a.borderH : a.border}`,
        color:       a.text,
        boxShadow:   hovered ? `0 0 18px ${a.glow}` : "none",
        transition:  "all 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.7 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
    >
      <Icon size={16} strokeWidth={1.8} />
      {item.label}
    </motion.a>
  );
};

/* ============================================================
   AVAILABILITY BADGE — top of section, eye-catching
   ============================================================ */
const AvailabilityBadge = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    className="flex justify-center mb-8"
    initial={{ opacity: 0, y: -12 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.1 }}
  >
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
      style={{
        background:     "rgba(52,211,153,0.07)",
        border:         "1px solid rgba(52,211,153,0.28)",
        backdropFilter: "blur(12px)",
        boxShadow:      "0 0 14px rgba(52,211,153,0.08)",
      }}
    >
      <span className="relative inline-flex rounded-full h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: "#34D399" }} />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5"
          style={{ background: "#34D399", boxShadow: "0 0 8px #34D399" }} />
      </span>
      <span className="text-xs font-semibold" style={{ color: "hsl(160 70% 62%)" }}>
        Open to Opportunities
      </span>
      <span className="text-[11px] px-2 py-[2px] rounded-full" style={{ background: "rgba(52,211,153,0.12)", color: "hsl(160 70% 55%)", border: "1px solid rgba(52,211,153,0.22)" }}>
        AI/ML · Data Science
      </span>
    </div>
  </motion.div>
);

/* ============================================================
   MAIN SECTION
   ============================================================ */
const Contact = () => {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="relative py-20 md:py-24 overflow-hidden">

      <ContactBackground />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* ── Availability badge ── */}
        <AvailabilityBadge isInView={isInView} />

        {/* ── Section heading ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Let's discuss opportunities, collaborations, or anything AI/ML related.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start max-w-6xl mx-auto">

          {/* ═══ LEFT COLUMN ═══ */}
          <div className="space-y-6">

            {/* Big left statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                What can I help with?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(210 10% 52%)" }}>
                Whether you have an idea, a role, or just want to connect — here are the best ways to reach out.
              </p>
            </motion.div>

            {/* Intent cards — 2×2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTENT_CARDS.map((item, i) => (
                <IntentCard key={item.title} item={item} index={i} isInView={isInView} />
              ))}
            </div>

            {/* Response time promise */}
            <motion.div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              <CheckCircle size={16} style={{ color: "#34D399", flexShrink: 0 }} strokeWidth={2} />
              <p className="text-xs" style={{ color: "hsl(210 10% 55%)" }}>
                I typically respond within <span className="font-semibold text-foreground">24 hours</span>. 
                For urgent matters, WhatsApp or email works best.
              </p>
            </motion.div>
          </div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <div className="space-y-5">

            {/* Contact info card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <GlassCard accentKey="violet" hover={false}>
                <div className="px-5 py-1">
                  <p className="text-xs font-bold uppercase tracking-widest pt-4 pb-1" style={{ color: "rgba(167,139,250,0.55)" }}>
                    Contact Information
                  </p>
                  {INFO_ROWS.map((row, i) => (
                    <InfoRow key={row.label} row={row} index={i} isInView={isInView} />
                  ))}
                  <div className="pb-3" />
                </div>
              </GlassCard>
            </motion.div>

            {/* Social action buttons — 2×2 grid */}
            <div>
              <motion.p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "hsl(210 10% 42%)" }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.65 }}
              >
                Reach out directly
              </motion.p>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_BUTTONS.map((item, i) => (
                  <SocialButton key={item.label} item={item} index={i} isInView={isInView} />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;