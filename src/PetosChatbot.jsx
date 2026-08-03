import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PawPrint,
  Send,
  MessageCircle,
  Clock,
  ChevronRight,
  Sparkles,
} from "lucide-react";

/* ---------------------------------------------------------
   Petos Concierge — Perfectly Responsive
   Flawless on desktop and mobile.
   No black bars, no overflow, polished UI everywhere.
--------------------------------------------------------- */

// ---------- Knowledge Base (JSX answers) ----------
const QUICK_TOPICS = [
  { id: "plans", label: "Plans & Pricing" },
  { id: "coverage", label: "Coverage" },
  { id: "claim", label: "Claims" },
  { id: "cashback", label: "Cashback" },
  { id: "exclusions", label: "Exclusions" },
];

const KNOWLEDGE = {
  greeting: (
    <>
      Hi, I'm the Petos Concierge ✨
      <br /><br />
      Ask me about plans & pricing, coverage limits, wellness, cashback, claims, or exclusions. If I don't know something, I'll connect you straight to our team.
    </>
  ),

  plans: (
    <>
      <strong>Petos Insurance Plans</strong>
      <br /><br />
      We offer four plans tailored to your pet's needs:
      <ul>
        <li><strong>Basic</strong> — Accident-only cover · ₹499/mo</li>
        <li><strong>Silver</strong> — Accidents + illness · ₹799/mo</li>
        <li><strong>Gold</strong> — Comprehensive including dental & wellness · ₹1299/mo</li>
        <li><strong>Platinum</strong> — All-inclusive with 24/7 vet chat · ₹1799/mo</li>
      </ul>
      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>✅ All plans include unlimited vet visits, diagnostics & prescribed medication.</span>
    </>
  ),

  plans_premium: (
    <>
      <strong>Platinum Plan — Full Coverage</strong>
      <ul>
        <li>Accidents & illness</li>
        <li>Dental cleanings & treatments</li>
        <li>Wellness exams & vaccinations</li>
        <li>Behavioural therapy</li>
        <li>24/7 vet helpline</li>
      </ul>
      <span>💰 Annual limit: <strong>₹1,00,000</strong></span>
      <br />
      <span>📌 No waiting period for accidents.</span>
    </>
  ),

  plans_switch: (
    <>
      <strong>Switching Plans</strong>
      <ul>
        <li><strong>Upgrade</strong> — Takes effect immediately</li>
        <li><strong>Downgrade</strong> — Applies at your next renewal</li>
      </ul>
      <span>✅ Your claim history carries over either way — no loss of benefits.</span>
    </>
  ),

  plans_discount: (
    <>
      <strong>Multi‑Pet Discount</strong>
      <br /><br />
      Insure two or more pets on one account and get <strong>10% off</strong> every plan after the first pet.
      <br />
      🐾 The discount applies automatically at checkout.
    </>
  ),

  coverage: (
    <>
      <strong>What's Covered Across All Plans</strong>
      <ul>
        <li>Accidents & injuries</li>
        <li>Illnesses & infections</li>
        <li>Diagnostics (X‑ray, blood work, etc.)</li>
        <li>Surgery & hospitalisation</li>
        <li>Prescribed medication</li>
      </ul>
      <strong>Gold & Platinum add:</strong>
      <ul>
        <li>Dental care</li>
        <li>Wellness & routine check‑ups</li>
        <li>Alternative therapies (acupuncture, physio)</li>
      </ul>
    </>
  ),

  coverage_wellness: (
    <>
      <strong>Wellness Coverage</strong> (Gold & Platinum)
      <ul>
        <li>Annual wellness exams</li>
        <li>Vaccinations</li>
        <li>Flea/tick prevention</li>
        <li>Heartworm prevention</li>
        <li>Annual blood work</li>
      </ul>
      <span>📋 Up to ₹5,000 per year for wellness services.</span>
    </>
  ),

  coverage_limit: (
    <>
      <strong>Annual Coverage Limits</strong>
      <table>
        <thead>
          <tr><th>Plan</th><th>Annual Limit</th></tr>
        </thead>
        <tbody>
          <tr><td>Basic</td><td>₹25,000</td></tr>
          <tr><td>Silver</td><td>₹50,000</td></tr>
          <tr><td>Gold</td><td>₹75,000</td></tr>
          <tr><td>Platinum</td><td>₹1,00,000</td></tr>
        </tbody>
      </table>
      <span>📌 Per‑incident sub‑limits apply. Check your policy document for full details.</span>
    </>
  ),

  claim: (
    <>
      <strong>How to File a Claim</strong>
      <ol>
        <li>Open the <strong>Claims</strong> tab in your Petos dashboard</li>
        <li>Upload the vet invoice &amp; diagnosis</li>
        <li>Add your pet's policy number</li>
        <li>Submit — reimbursement hits your account in <strong>3–5 business days</strong></li>
      </ol>
      <span>📱 You can also file via the Petos mobile app.</span>
    </>
  ),

  claim_rejected: (
    <>
      <strong>Claim Rejected?</strong>
      <br /><br />
      If a claim is rejected, you'll see the reason in your Claims tab.
      <br />
      Common reasons:
      <ul>
        <li>Missing invoice or diagnosis code</li>
        <li>Treatment for a pre‑existing condition</li>
        <li>Services not covered under your plan</li>
      </ul>
      <span>✅ You can re‑submit corrected documents within <strong>30 days</strong> at no extra cost.</span>
    </>
  ),

  claim_time: (
    <>
      <strong>Reimbursement Timeline</strong>
      <ul>
        <li>Simple claims — <strong>3–5 business days</strong></li>
        <li>Complex claims (vet review needed) — up to <strong>10 business days</strong></li>
      </ul>
      <span>💰 Payments are made via direct bank transfer or Petos wallet.</span>
    </>
  ),

  claim_app: (
    <>
      <strong>File from the App</strong>
      <br /><br />
      Yes! The Petos app lets you:
      <ul>
        <li>📸 Snap a photo of your invoice</li>
        <li>📋 Submit a claim in under <strong>2 minutes</strong></li>
        <li>🔍 Track claim status in real time</li>
      </ul>
      <span>No desktop needed – everything is mobile‑first.</span>
    </>
  ),

  cashback: (
    <>
      <strong>Petos Cashback</strong>
      <br /><br />
      Earn up to <strong>10% cashback</strong> on out‑of‑pocket expenses (OoPE) when you pay with Petos Pay at partner clinics.
      <br />
      <span>💰 Cashback is credited to your Petos wallet within <strong>48 hours</strong>.</span>
      <br />
      <span>📌 Minimum cashback: ₹50 per transaction.</span>
    </>
  ),

  cashback_how: (
    <>
      <strong>How to Get Cashback</strong>
      <ol>
        <li>Open the Petos app</li>
        <li>Pay your vet bill using <strong>Petos Pay</strong></li>
        <li>Cashback is applied instantly to your wallet</li>
      </ol>
      <span>🏥 Works at 500+ partner clinics across India.</span>
      <br />
      <span>✅ No paperwork – fully digital.</span>
    </>
  ),

  cashback_partners: (
    <>
      <strong>Partner Clinics</strong>
      <br /><br />
      We partner with <strong>500+ clinics</strong> across India.
      <br />
      To find a clinic near you:
      <ul>
        <li>Open the Petos app</li>
        <li>Tap <strong>Find a Vet</strong></li>
        <li>View nearby partners with cashback eligibility</li>
      </ul>
      <span>New clinics are added every month.</span>
    </>
  ),

  exclusions: (
    <>
      <strong>What's Not Covered</strong>
      <ul>
        <li>❌ Pre‑existing conditions</li>
        <li>❌ Cosmetic procedures</li>
        <li>❌ Breeding &amp; pregnancy costs</li>
        <li>❌ Elective treatments</li>
        <li>❌ Experimental therapies</li>
      </ul>
      <span>📋 Full exclusion list is in your policy document. Always read the fine print before treatment.</span>
    </>
  ),

  exclusions_preexisting: (
    <>
      <strong>Pre‑Existing Conditions</strong>
      <br /><br />
      Any condition diagnosed or showing symptoms <strong>before</strong> your policy start date is excluded.
      <br />
      <span>✅ Anything new that develops after enrollment is fully covered.</span>
      <br />
      <span>⏳ Waiting period: 30 days for illness, 15 days for accidents.</span>
    </>
  ),

  exclusions_breeds: (
    <>
      <strong>Breed Eligibility</strong>
      <br /><br />
      🐕 <strong>All breeds are welcome</strong> – no breed exclusions.
      <br />
      We cover:
      <ul>
        <li>Pure breeds</li>
        <li>Mixed breeds</li>
        <li>Cross breeds</li>
      </ul>
      <span>📌 Only pre‑existing conditions matter, not breed or size.</span>
    </>
  ),

  register: (
    <>
      <strong>Register Your Pet</strong> — 5‑Minute Setup
      <ol>
        <li>Create your Petos account</li>
        <li>Add your pet's name, breed &amp; age</li>
        <li>Upload a photo (optional)</li>
        <li>Upload prior vet records (if any)</li>
        <li>Choose a plan &amp; confirm</li>
      </ol>
      <span>✅ Registration takes under <strong>5 minutes</strong> and you'll get instant coverage confirmation.</span>
    </>
  ),

  register_age: (
    <>
      <strong>Age Eligibility</strong>
      <ul>
        <li>🐶 Dogs: <strong>3 months – 10 years</strong> at enrollment</li>
        <li>🐱 Cats: <strong>3 months – 12 years</strong> at enrollment</li>
      </ul>
      <span>📌 After the max age, only renewal is possible (no new enrollments).</span>
      <br />
      <span>🔄 Existing pets can renew without age restrictions.</span>
    </>
  ),

  register_multiple: (
    <>
      <strong>Multiple Pets – One Account</strong>
      <br /><br />
      You can add <strong>unlimited pets</strong> under one account.
      <br />
      Each pet gets:
      <ul>
        <li>Its own policy</li>
        <li>Its own plan</li>
        <li>Its own claim history</li>
      </ul>
      <span>🐾 Multi‑pet discount applies automatically (10% off after the first pet).</span>
    </>
  ),

  register_docs: (
    <>
      <strong>Documents Required</strong>
      <br />
      <strong>Essential:</strong>
      <ul>
        <li>Pet's name, breed, age</li>
        <li>Your contact details</li>
      </ul>
      <strong>Recommended:</strong>
      <ul>
        <li>Previous vet records</li>
        <li>Vaccination history</li>
        <li>Microchip number (if available)</li>
      </ul>
      <span>📸 A clear photo of your pet helps us personalise the policy.</span>
    </>
  ),

  faq: (
    <>
      <strong>Frequently Asked Questions</strong>
      <ul>
        <li>❌ Pre‑existing conditions are not covered</li>
        <li>🔄 You can switch plans anytime (upgrades are instant)</li>
        <li>🐾 All breeds are eligible (3 months – 10/12 yrs)</li>
        <li>❌ Cancel anytime from Settings → Manage Plan</li>
        <li>💰 Cashback is credited within 48 hours</li>
        <li>📋 Claims are paid in 3–5 business days</li>
      </ul>
    </>
  ),

  faq_cancel: (
    <>
      <strong>How to Cancel</strong>
      <ol>
        <li>Go to <strong>Settings</strong></li>
        <li>Tap <strong>Manage Plan</strong></li>
        <li>Select <strong>Cancel Subscription</strong></li>
      </ol>
      <span>✅ Your coverage stays active until the end of the period you've already paid for.</span>
      <br />
      <span>📌 No cancellation fees – prorated refunds are issued for unused periods.</span>
    </>
  ),

  faq_preexisting: (
    <>
      <strong>Pre‑Existing Conditions FAQ</strong>
      <ul>
        <li>❌ Excluded from coverage</li>
        <li>✅ Any new condition after enrollment is covered</li>
        <li>⏳ Waiting period: 30 days for illness, 15 days for accidents</li>
      </ul>
      <span>📋 If you're unsure, upload your pet's medical history during registration and we'll confirm coverage.</span>
    </>
  ),

  faq_breeds: (
    <>
      <strong>Breed FAQ</strong>
      <br /><br />
      🐕 All breeds eligible – no exclusions
      <br />
      🐾 Mixed breeds welcome
      <br /><br />
      We cover dogs, cats, and exotic pets (on select plans).
      <br />
      <span>📌 Pre‑existing conditions are the only factor that may affect coverage, not breed or size.</span>
    </>
  ),

  fallback: (
    <>
      I didn't quite catch that. Here's what I can help with:
      <ul>
        <li>📋 Plans &amp; Pricing</li>
        <li>🛡️ Coverage &amp; Wellness</li>
        <li>💰 Cashback &amp; Claims</li>
        <li>❌ Exclusions &amp; FAQ</li>
      </ul>
      Just ask, or tap a topic below to get started.
    </>
  ),
};

// ---------- Follow-ups ----------
const FOLLOWUPS = {
  greeting: [
    { id: "plans", label: "What plans do you offer?" },
    { id: "coverage", label: "What is covered under Gold?" },
    { id: "cashback", label: "How does cashback work?" },
    { id: "exclusions", label: "What's excluded from cover?" },
  ],
  plans: [
    { id: "plans_premium", label: "What does Platinum include?" },
    { id: "plans_switch", label: "Can I switch plans later?" },
    { id: "plans_discount", label: "Any multi‑pet discount?" },
  ],
  coverage: [
    { id: "coverage_wellness", label: "What does wellness cover?" },
    { id: "coverage_limit", label: "What are the annual limits?" },
    { id: "claim", label: "How do I file a claim?" },
  ],
  claim: [
    { id: "claim_rejected", label: "What if my claim is rejected?" },
    { id: "claim_time", label: "How long does reimbursement take?" },
    { id: "claim_app", label: "Can I file from the app?" },
  ],
  cashback: [
    { id: "cashback_how", label: "How do I get cashback?" },
    { id: "cashback_partners", label: "Which clinics are partners?" },
    { id: "plans", label: "View plans" },
  ],
  exclusions: [
    { id: "exclusions_preexisting", label: "What are pre‑existing conditions?" },
    { id: "exclusions_breeds", label: "Are all breeds eligible?" },
    { id: "faq", label: "General FAQ" },
  ],
  register: [
    { id: "register_age", label: "Is there an age limit?" },
    { id: "register_multiple", label: "Can I add multiple pets?" },
    { id: "register_docs", label: "What documents do I need?" },
  ],
  faq: [
    { id: "faq_cancel", label: "How do I cancel?" },
    { id: "faq_preexisting", label: "Are pre‑existing conditions covered?" },
    { id: "faq_breeds", label: "Which breeds are eligible?" },
  ],
  fallback: [
    { id: "plans", label: "Plans & Pricing" },
    { id: "claim", label: "Claims" },
    { id: "cashback", label: "Cashback" },
  ],
};
["plans_premium", "plans_switch", "plans_discount"].forEach((k) => (FOLLOWUPS[k] = FOLLOWUPS.plans));
["coverage_wellness", "coverage_limit"].forEach((k) => (FOLLOWUPS[k] = FOLLOWUPS.coverage));
["claim_rejected", "claim_time", "claim_app"].forEach((k) => (FOLLOWUPS[k] = FOLLOWUPS.claim));
["cashback_how", "cashback_partners"].forEach((k) => (FOLLOWUPS[k] = FOLLOWUPS.cashback));
["exclusions_preexisting", "exclusions_breeds"].forEach((k) => (FOLLOWUPS[k] = FOLLOWUPS.exclusions));
["register_age", "register_multiple", "register_docs"].forEach((k) => (FOLLOWUPS[k] = FOLLOWUPS.register));
["faq_cancel", "faq_preexisting", "faq_breeds"].forEach((k) => (FOLLOWUPS[k] = FOLLOWUPS.faq));

// ---------- Intent Matching ----------
function matchIntent(text) {
  const t = text.toLowerCase();
  if (/reject|denied|declin/.test(t)) return "claim_rejected";
  if (/how long|days|time.*reimburse/.test(t)) return "claim_time";
  if (/app\b/.test(t) && /claim/.test(t)) return "claim_app";
  if (/platinum/.test(t) && /includ|cover|what/.test(t)) return "plans_premium";
  if (/switch|upgrade|downgrade/.test(t)) return "plans_switch";
  if (/discount|multi.?pet/.test(t)) return "plans_discount";
  if (/age limit|how old|months|years/.test(t)) return "register_age";
  if (/multiple pet|more than one pet|second pet/.test(t)) return "register_multiple";
  if (/document|paperwork|vet record/.test(t)) return "register_docs";
  if (/cancel/.test(t)) return "faq_cancel";
  if (/pre.?exist/.test(t)) return "exclusions_preexisting";
  if (/breed/.test(t)) return "exclusions_breeds";
  if (/wellness/.test(t)) return "coverage_wellness";
  if (/limit|cap|max/.test(t)) return "coverage_limit";
  if (/cashback/.test(t)) return "cashback";
  if (/plan|price|cost|cover|premium|basic|silver|gold|platinum/.test(t)) return "plans";
  if (/claim|reimburse|invoice|refund/.test(t)) return "claim";
  if (/regist|sign ?up|add.*pet|new pet|onboard/.test(t)) return "register";
  if (/faq|question/.test(t)) return "faq";
  if (/coverage|cover|include/.test(t)) return "coverage";
  if (/exclusion|exclude/.test(t)) return "exclusions";
  if (/hi|hello|hey|woof/.test(t)) return "greeting";
  return "fallback";
}

// ---------- Main Component ----------
export default function PetosChatbot() {
  const [messages, setMessages] = useState([
    {
      id: "m0",
      from: "bot",
      text: KNOWLEDGE.greeting,
      followups: FOLLOWUPS.greeting,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const idRef = useRef(1);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function nextId() {
    const id = `m${idRef.current}`;
    idRef.current += 1;
    return id;
  }

  function pushBotReply(intent) {
    setTyping(true);
    const delay = 550 + Math.random() * 400;
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          from: "bot",
          text: KNOWLEDGE[intent] || KNOWLEDGE.fallback,
          followups: FOLLOWUPS[intent] || FOLLOWUPS.fallback,
          timestamp: new Date(),
        },
      ]);
    }, delay);
  }

  function sendMessage(text, intentOverride) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const intent = intentOverride || matchIntent(trimmed);
    setMessages((prev) => [
      ...prev,
      { id: nextId(), from: "user", text: trimmed, timestamp: new Date() },
    ]);
    setInput("");
    pushBotReply(intent);
  }

  function handleChip(id, label) {
    sendMessage(label, id);
  }

  const lastMessage = messages[messages.length - 1];

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  };

  const followupVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, duration: 0.2 },
    }),
  };

  const typingDotVariants = {
    animate: {
      y: [0, -4, 0],
      transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Left panel content
  const InfoPanel = () => (
    <div className="info-panel">
      <div className="info-header">
        <div className="info-badge">
          <PawPrint size={18} color="#F97316" />
          <span>Petos Concierge</span>
        </div>
        <h1>Answers about your Petos Cover, on your terms.</h1>
        <p className="info-description">
          This concierge answers the questions we hear most – plans &amp; pricing,
          coverage limits, wellness, cashback, claims, exclusions and Petos Pay.
          Anything it can’t confidently answer gets handed straight to a human on
          WhatsApp, no dead ends.
        </p>
      </div>

      <div className="info-stats">
        <div className="stat-card">
          <div className="stat-icon">🐾</div>
          <div className="stat-content">
            <div className="stat-label">Dogs &amp; Cats</div>
            <div className="stat-value">3 months – 10/12 yrs</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Up to 10%</div>
            <div className="stat-value">Cashback on OoPE</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-label">4 Plans</div>
            <div className="stat-value">Basic · Silver · Gold · Platinum</div>
          </div>
        </div>
      </div>

      <div className="info-footer">
        <span className="info-footnote">
          <Sparkles size={14} />
          Petos Concierge answers from official Petos info only
        </span>
      </div>
    </div>
  );

  return (
    <div className="petos-root">
      <style>{`
        /* ----- Global Reset (critical for removing black lines) ----- */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
          padding: 0;
          background: #f5f0ec;
          overflow-x: hidden;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .petos-root {
          --brand: #F97316;
          --brand-dark: #d95c0e;
          --brand-light: #ffedd5;
          --ink: #1e1b1a;
          --shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: var(--ink);
          width: 100%;
          min-height: 100vh;
          background: #f5f0ec;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          margin: 0;
          overflow-x: hidden;
        }
        .petos-root * { box-sizing: border-box; }

        .main-container {
          width: 100%;
          max-width: 1400px;
          display: flex;
          gap: 40px;
          align-items: stretch;
          min-height: 100vh;
          padding: 24px 40px;
          margin: 0 auto;
        }

        /* ----- Left Info Panel ----- */
        .info-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 0;
          min-width: 280px;
        }
        .info-header {
          margin-bottom: 32px;
        }
        .info-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--brand-dark);
          margin-bottom: 16px;
          background: rgba(249, 115, 22, 0.08);
          padding: 6px 16px;
          border-radius: 40px;
          width: fit-content;
        }
        .info-header h1 {
          font-size: 38px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin: 0 0 16px 0;
          color: var(--ink);
        }
        .info-description {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
          margin: 0;
          max-width: 500px;
        }

        .info-stats {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 14px 20px;
          border-radius: 12px;
          border: 1px solid #f0e8e3;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
          flex: 1 1 140px;
        }
        .stat-icon { font-size: 24px; }
        .stat-content {
          display: flex;
          flex-direction: column;
        }
        .stat-label {
          font-size: 12px;
          font-weight: 500;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .stat-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
        }

        .info-footer {
          margin-top: 8px;
        }
        .info-footnote {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #888;
          background: rgba(0,0,0,0.02);
          padding: 6px 12px;
          border-radius: 40px;
          width: fit-content;
        }
        .info-footnote svg { color: var(--brand); }

        /* ----- Right Chat Widget ----- */
        .widget-wrapper {
          flex: 1.2;
          max-width: 480px;
          min-width: 340px;
          display: flex;
          align-items: stretch;
        }
        .widget {
          width: 100%;
          height: 100%;
          min-height: 500px;
          max-height: 90vh;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #e8e0da;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ----- Header ----- */
        .header {
          background: linear-gradient(135deg, var(--brand), var(--brand-dark));
          padding: 16px 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          color: white;
          flex-shrink: 0;
        }
        .header-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .header-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .header-text {
          flex: 1;
        }
        .header-text h1 {
          font-size: 17px;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.2px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .header-text h1 .sparkle { color: #fde047; }
        .header-sub {
          font-size: 11px;
          opacity: 0.85;
          letter-spacing: 0.3px;
          font-weight: 500;
          margin: 0;
        }
        .header-tagline {
          font-size: 12px;
          font-weight: 400;
          opacity: 0.9;
          margin-top: 1px;
        }
        .status-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          opacity: 0.8;
          margin-top: 2px;
        }
        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #7dffb3;
          box-shadow: 0 0 0 2px rgba(125,255,179,0.3);
        }

        /* ----- Messages ----- */
        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 18px 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #faf8f6;
        }
        .messages::-webkit-scrollbar {
          width: 4px;
        }
        .messages::-webkit-scrollbar-track { background: transparent; }
        .messages::-webkit-scrollbar-thumb {
          background: var(--brand);
          border-radius: 8px;
        }

        .message-row {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .message-row.user { flex-direction: row-reverse; }

        .avatar-bot {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--brand-light);
          border: 1px solid rgba(249,115,22,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--brand);
          margin-top: 2px;
        }

        .bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.6;
          word-break: break-word;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .bubble.bot {
          background: white;
          border: 1px solid #eee;
          border-bottom-left-radius: 4px;
          color: var(--ink);
        }
        .bubble.bot strong { color: var(--brand-dark); font-weight: 600; }
        .bubble.bot ul, .bubble.bot ol {
          margin: 4px 0 4px 18px;
          padding: 0;
        }
        .bubble.bot li { margin-bottom: 2px; }
        .bubble.bot table {
          border-collapse: collapse;
          width: 100%;
          margin: 6px 0;
          font-size: 13px;
        }
        .bubble.bot td, .bubble.bot th {
          padding: 4px 8px;
          border: 1px solid #eee;
          text-align: left;
        }
        .bubble.bot th {
          background: var(--brand-light);
          font-weight: 600;
        }

        .bubble.user {
          background: var(--brand);
          color: white;
          border-bottom-right-radius: 4px;
        }
        .bubble .timestamp {
          font-size: 10px;
          opacity: 0.5;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
          justify-content: flex-end;
        }
        .bubble.user .timestamp { color: rgba(255,255,255,0.7); }

        /* ----- Follow-up cards ----- */
        .followups {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding-left: 40px;
          margin-top: 2px;
        }
        .followup-card {
          background: white;
          border: 1px solid #e0d6cf;
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 500;
          color: var(--brand-dark);
          cursor: pointer;
          transition: all 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .followup-card:hover {
          background: var(--brand-light);
          border-color: var(--brand);
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(249,115,22,0.12);
        }

        /* ----- Quick topics ----- */
        .topics {
          display: flex;
          gap: 8px;
          padding: 12px 16px 10px;
          flex-wrap: wrap;
          justify-content: center;
          border-top: 1px solid #ece4de;
          background: #fcfaf8;
          flex-shrink: 0;
        }
        .topic-card {
          background: white;
          border: 1px solid #e0d6cf;
          border-radius: 30px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          color: var(--brand-dark);
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .topic-card:hover {
          background: var(--brand-light);
          border-color: var(--brand);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(249,115,22,0.1);
        }

        /* ----- Input ----- */
        .input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px 14px;
          border-top: 1px solid #ece4de;
          background: white;
          flex-shrink: 0;
        }
        .input-row input {
          flex: 1;
          border: 1px solid #dcd2ca;
          border-radius: 30px;
          padding: 10px 16px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          background: #faf8f6;
          transition: all 0.15s;
        }
        .input-row input:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
          background: white;
        }
        .send-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: var(--brand);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.15s;
          box-shadow: 0 2px 8px rgba(249,115,22,0.25);
        }
        .send-btn:hover:not(:disabled) {
          background: var(--brand-dark);
          transform: scale(1.02);
        }
        .send-btn:active:not(:disabled) { transform: scale(0.95); }
        .send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .footer-note {
          text-align: center;
          font-size: 10px;
          padding: 4px 0 8px;
          background: white;
          border-top: 1px solid #ece4de;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #7a5c4a;
          flex-shrink: 0;
        }
        .footer-note .brand-highlight {
          font-weight: 600;
          color: var(--brand-dark);
        }

        /* ----- PERFECTED RESPONSIVE STYLES ----- */
        @media (max-width: 900px) {
          .main-container {
            flex-direction: column;
            gap: 24px;
            min-height: auto;
            padding: 20px;
          }
          .info-panel {
            padding: 8px 0;
            min-width: unset;
          }
          .widget-wrapper {
            max-width: 100%;
            min-width: unset;
            width: 100%;
          }
          .widget {
            height: 600px;
            max-height: 80vh;
            min-height: 400px;
          }
          .info-header h1 {
            font-size: 32px;
          }
          .info-stats {
            gap: 16px;
          }
          .stat-card {
            flex: 1 1 140px;
          }
        }

        @media (max-width: 480px) {
          .main-container {
            padding: 12px;
            gap: 16px;
          }
          .info-panel {
            padding: 4px 0;
          }
          .info-header {
            margin-bottom: 20px;
          }
          .info-header h1 {
            font-size: 24px;
            margin-bottom: 12px;
          }
          .info-description {
            font-size: 14px;
            line-height: 1.5;
          }
          .info-stats {
            gap: 10px;
            margin-bottom: 20px;
          }
          .stat-card {
            padding: 10px 14px;
            flex: 1 1 100%;
          }
          .stat-value {
            font-size: 13px;
          }
          .info-footnote {
            font-size: 12px;
          }

          .widget-wrapper {
            min-width: unset !important;
            max-width: 100% !important;
          }
          .widget {
            max-height: 65vh !important;
            min-height: 380px !important;
            border-radius: 16px !important;
            height: auto !important;
          }

          .header {
            padding: 12px 16px !important;
          }
          .header-avatar {
            width: 34px;
            height: 34px;
          }
          .header-text h1 {
            font-size: 15px !important;
          }
          .header-sub {
            font-size: 10px;
          }
          .header-tagline {
            font-size: 11px;
          }

          .messages {
            padding: 12px !important;
            gap: 10px;
          }

          .avatar-bot {
            width: 26px;
            height: 26px;
          }
          .avatar-bot svg {
            width: 14px;
            height: 14px;
          }

          .bubble {
            max-width: 90% !important;
            padding: 10px 14px !important;
            font-size: 13px !important;
            line-height: 1.5 !important;
          }
          .bubble.bot ul, .bubble.bot ol {
            margin: 2px 0 2px 16px;
          }
          .bubble.bot table {
            font-size: 12px;
          }
          .bubble.bot td, .bubble.bot th {
            padding: 3px 6px;
          }

          .followups {
            padding-left: 16px !important;
            gap: 4px;
          }
          .followup-card {
            font-size: 11px !important;
            padding: 5px 12px !important;
          }

          .topics {
            padding: 8px 12px !important;
            gap: 6px !important;
          }
          .topic-card {
            font-size: 11px !important;
            padding: 6px 12px !important;
          }

          .input-row {
            padding: 8px 12px 12px !important;
            gap: 6px !important;
          }
          .input-row input {
            font-size: 13px !important;
            padding: 8px 14px !important;
          }
          .send-btn {
            width: 38px !important;
            height: 38px !important;
          }
          .send-btn svg {
            width: 16px;
            height: 16px;
          }

          .footer-note {
            font-size: 9px !important;
            padding: 3px 0 6px !important;
          }
        }

        @media (max-width: 380px) {
          .main-container {
            padding: 8px;
          }
          .info-header h1 {
            font-size: 20px !important;
          }
          .info-description {
            font-size: 13px !important;
          }
          .widget {
            max-height: 60vh !important;
            min-height: 340px !important;
          }
          .bubble {
            font-size: 12px !important;
            padding: 8px 12px !important;
          }
          .header-text h1 {
            font-size: 14px !important;
          }
          .header-tagline {
            font-size: 10px !important;
          }
          .topic-card {
            font-size: 10px !important;
            padding: 4px 10px !important;
          }
          .followup-card {
            font-size: 10px !important;
            padding: 4px 10px !important;
          }
          .input-row input {
            font-size: 12px !important;
            padding: 6px 12px !important;
          }
          .send-btn {
            width: 34px !important;
            height: 34px !important;
          }
        }
      `}</style>

      <div className="main-container">
        {/* Left Info Panel */}
        <InfoPanel />

        {/* Right Chat Widget */}
        <div className="widget-wrapper">
          <div className="widget">
            {/* Header */}
            <div className="header">
              <div className="header-top">
                <div className="header-avatar">
                  <PawPrint size={20} color="white" />
                </div>
                <div className="header-text">
                  <h1>
                    Petos Concierge
                    <Sparkles size={14} className="sparkle" />
                  </h1>
                  <div className="header-sub">PET INSURANCE &amp; WELLNESS · INDIA</div>
                </div>
              </div>
              <div className="header-tagline">
                Answers about your Petos Cover, on your terms.
              </div>
              <div className="status-row">
                <span className="status-dot" />
                <span>Online · mypetos.com</span>
              </div>
            </div>

            {/* Messages */}
            <div className="messages" ref={scrollRef}>
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`message-row ${m.from === "user" ? "user" : ""}`}
                  >
                    {m.from === "bot" && (
                      <div className="avatar-bot">
                        <PawPrint size={14} />
                      </div>
                    )}
                    <div className={`bubble ${m.from}`}>
                      {m.text}
                      <div className="timestamp">
                        <Clock size={10} />
                        {formatTime(m.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="message-row"
                >
                  <div className="avatar-bot">
                    <PawPrint size={14} />
                  </div>
                  <div className="bubble bot">
                    <div className="typing-row" style={{ display: "flex", gap: 4 }}>
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="typing-dot"
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: "var(--brand)",
                          }}
                          variants={typingDotVariants}
                          animate="animate"
                          transition={{ delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {lastMessage.from === "bot" && !typing && lastMessage.followups && (
                <div className="followups">
                  {lastMessage.followups.map((f, index) => (
                    <motion.button
                      key={f.id}
                      custom={index}
                      variants={followupVariants}
                      initial="hidden"
                      animate="visible"
                      className="followup-card"
                      onClick={() => handleChip(f.id, f.label)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ChevronRight size={12} />
                      {f.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Topics */}
            <div className="topics">
              {QUICK_TOPICS.map((t) => (
                <motion.button
                  key={t.id}
                  className="topic-card"
                  onClick={() => handleChip(t.id, t.label)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageCircle size={13} />
                  {t.label}
                </motion.button>
              ))}
            </div>

            {/* Input Area */}
            <div className="input-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about plans, coverage, claims, cashback…"
                aria-label="Message Petos Concierge"
              />
              <motion.button
                className="send-btn"
                disabled={!input.trim()}
                onClick={() => sendMessage(input)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send message"
              >
                <Send size={16} />
              </motion.button>
            </div>

            <div className="footer-note">
              <PawPrint size={10} color="#F97316" />
              <span><span className="brand-highlight">Petos Concierge</span></span>
              <span style={{ opacity: 0.4 }}>|</span>
              <span style={{ fontSize: "9px" }}>mypetos.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}