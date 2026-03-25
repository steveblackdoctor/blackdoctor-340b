import { useState, useRef, useEffect } from "react";

const B = {
  offwhite: "#F4F1ED",
  black: "#000000",
  brown: "#9d9488",
  yellow: "#EFB14D",
  text: "#0e0e0e",
  textMuted: "#5a5650",
  border: "#d4d0c8",
  cardBg: "#fff",
};

const STATE_INFO = {
  "Alabama": { protections: "AL safety-net hospitals and FQHCs participate broadly in 340B. No state-specific PBM reform laws yet, but federal protections apply.", resources: "https://www.alabamapublichealth.gov" },
  "Alaska": { protections: "AK rural and critical access hospitals have strong 340B participation. Tribal health programs are key covered entities.", resources: "https://health.alaska.gov" },
  "Arizona": { protections: "AZ covers 340B entities under Medicaid managed care with carve-in policies for most covered entity types.", resources: "https://www.azdhs.gov" },
  "Arkansas": { protections: "AR rural referral centers and critical access hospitals are significant 340B participants. State is expanding FQHC networks.", resources: "https://www.healthy.arkansas.gov" },
  "California": { protections: "CA requires 340B contract pharmacies to be honored by all PBMs. The state also funds additional drug assistance through the California Drug Price Relief Act.", resources: "https://www.dhcs.ca.gov" },
  "Colorado": { protections: "CO has enacted PBM transparency and reform legislation protecting 340B contract pharmacy access for covered entities.", resources: "https://cdphe.colorado.gov" },
  "Connecticut": { protections: "CT prohibits PBMs from reimbursing 340B covered entities at lower rates than non-340B pharmacies.", resources: "https://portal.ct.gov/dph" },
  "Delaware": { protections: "DE has PBM reform laws requiring equal reimbursement for 340B claims and prohibiting discriminatory practices.", resources: "https://dhss.delaware.gov" },
  "Florida": { protections: "FL has enacted PBM reform legislation protecting 340B contract pharmacy access. FQHCs have broad network access.", resources: "https://www.floridahealth.gov" },
  "Georgia": { protections: "GA has introduced PBM transparency laws. Safety-net hospitals and FQHCs have strong 340B participation.", resources: "https://dph.georgia.gov" },
  "Hawaii": { protections: "HI community health centers and Native Hawaiian health systems are key 340B covered entities with broad Medicaid coverage.", resources: "https://health.hawaii.gov" },
  "Idaho": { protections: "ID rural hospitals and critical access hospitals have strong 340B participation. PBM reform legislation is pending.", resources: "https://healthandwelfare.idaho.gov" },
  "Illinois": { protections: "IL requires health plans to reimburse 340B drugs at the same rate as non-340B drugs and prohibits discriminatory PBM policies.", resources: "https://www.dph.illinois.gov" },
  "Indiana": { protections: "IN has enacted legislation requiring PBMs to reimburse 340B covered entities at non-discriminatory rates.", resources: "https://www.in.gov/isdh" },
  "Iowa": { protections: "IA rural health clinics and FQHCs are key 340B participants. State has PBM oversight legislation in place.", resources: "https://idph.iowa.gov" },
  "Kansas": { protections: "KS critical access hospitals and rural referral centers participate broadly in 340B. PBM reform efforts are ongoing.", resources: "https://www.kdhe.ks.gov" },
  "Kentucky": { protections: "KY has strong FQHC and rural health clinic 340B participation. State Medicaid includes 340B carve-in provisions.", resources: "https://chfs.ky.gov" },
  "Louisiana": { protections: "LA safety-net hospitals and FQHCs have significant 340B access. State has enacted some PBM transparency requirements.", resources: "https://ldh.la.gov" },
  "Maine": { protections: "ME has enacted strong PBM reform protecting 340B contract pharmacy access and prohibiting discriminatory reimbursement.", resources: "https://www.maine.gov/dhhs" },
  "Maryland": { protections: "MD prohibits PBMs from restricting 340B covered entities and requires equivalent reimbursement for 340B claims.", resources: "https://health.maryland.gov" },
  "Massachusetts": { protections: "MA has robust 340B participation among safety-net hospitals and community health centers. Strong PBM oversight laws.", resources: "https://www.mass.gov/orgs/department-of-public-health" },
  "Michigan": { protections: "MI has enacted legislation prohibiting discriminatory PBM practices against 340B entities and requiring transparency.", resources: "https://www.michigan.gov/mdhhs" },
  "Minnesota": { protections: "MN has strong PBM reform laws protecting 340B contract pharmacy access and requiring equal reimbursement.", resources: "https://www.health.state.mn.us" },
  "Mississippi": { protections: "MS safety-net hospitals and rural health centers are major 340B participants. PBM reform legislation is in progress.", resources: "https://msdh.ms.gov" },
  "Missouri": { protections: "MO has enacted PBM transparency requirements. FQHCs and disproportionate share hospitals have broad 340B access.", resources: "https://health.mo.gov" },
  "Montana": { protections: "MT critical access hospitals and tribal health programs are key 340B covered entities. Rural access is a priority.", resources: "https://dphhs.mt.gov" },
  "Nebraska": { protections: "NE rural hospitals and FQHCs participate broadly in 340B. State is pursuing PBM reform legislation.", resources: "https://dhhs.ne.gov" },
  "Nevada": { protections: "NV has enacted PBM reform laws protecting 340B access. Safety-net hospitals have broad covered entity status.", resources: "https://dpbh.nv.gov" },
  "New Hampshire": { protections: "NH has enacted legislation prohibiting discriminatory PBM reimbursement practices targeting 340B covered entities.", resources: "https://www.dhhs.nh.gov" },
  "New Jersey": { protections: "NJ prohibits PBMs from reimbursing 340B entities at lower rates and has strong safety-net hospital participation.", resources: "https://www.nj.gov/health" },
  "New Mexico": { protections: "NM has strong tribal health program and FQHC 340B participation. State Medicaid includes 340B-friendly carve-in provisions.", resources: "https://www.nmhealth.org" },
  "New York": { protections: "NY has strong Medicaid 340B carve-in policies and requires insurers to reimburse 340B claims at standard rates.", resources: "https://www.health.ny.gov" },
  "North Carolina": { protections: "NC has enacted legislation prohibiting PBMs from discriminating against 340B entities. FQHCs have broad coverage.", resources: "https://www.ncdhhs.gov" },
  "North Dakota": { protections: "ND critical access hospitals and rural health clinics are key 340B participants. Tribal programs also participate.", resources: "https://www.health.nd.gov" },
  "Ohio": { protections: "OH prohibits PBMs from restricting 340B covered entity access to contract pharmacies.", resources: "https://odh.ohio.gov" },
  "Oklahoma": { protections: "OK has enacted PBM reform protecting 340B contract pharmacy access. Tribal health systems are major participants.", resources: "https://oklahoma.gov/health.html" },
  "Oregon": { protections: "OR has strong PBM oversight laws and robust FQHC and safety-net hospital 340B participation.", resources: "https://www.oregon.gov/oha" },
  "Pennsylvania": { protections: "PA has enacted PBM transparency laws and has broad safety-net hospital participation in 340B.", resources: "https://www.health.pa.gov" },
  "Rhode Island": { protections: "RI has enacted PBM reform prohibiting discriminatory reimbursement for 340B covered entities.", resources: "https://health.ri.gov" },
  "South Carolina": { protections: "SC safety-net hospitals and FQHCs have significant 340B participation. PBM reform legislation is advancing.", resources: "https://www.scdhec.gov" },
  "South Dakota": { protections: "SD critical access hospitals and tribal health programs are key 340B participants in rural communities.", resources: "https://doh.sd.gov" },
  "Tennessee": { protections: "TN has enacted PBM transparency requirements. Safety-net hospitals and FQHCs have broad 340B access.", resources: "https://www.tn.gov/health.html" },
  "Texas": { protections: "TX has legislative protections limiting PBM restrictions on 340B contract pharmacies. Safety-net hospitals have expanded covered entity access.", resources: "https://www.dshs.texas.gov" },
  "Utah": { protections: "UT has enacted PBM reform legislation. FQHCs and rural health clinics have broad 340B participation.", resources: "https://health.utah.gov" },
  "Vermont": { protections: "VT has strong PBM oversight and community health center 340B participation. State Medicaid is 340B-friendly.", resources: "https://www.healthvermont.gov" },
  "Virginia": { protections: "VA prohibits PBMs from restricting 340B covered entities and requires equal reimbursement for 340B claims.", resources: "https://www.vdh.virginia.gov" },
  "Washington": { protections: "WA prohibits PBMs from imposing restrictions on 340B covered entities and requires equal reimbursement.", resources: "https://www.doh.wa.gov" },
  "West Virginia": { protections: "WV has strong safety-net hospital and FQHC 340B participation. Rural and critical access hospitals are key participants.", resources: "https://dhhr.wv.gov" },
  "Wisconsin": { protections: "WI has enacted PBM reform protecting 340B contract pharmacy access and prohibiting discriminatory practices.", resources: "https://www.dhs.wisconsin.gov" },
  "Wyoming": { protections: "WY critical access hospitals and rural health clinics are key 340B covered entities. Tribal programs also participate.", resources: "https://health.wyo.gov" },
};
const STATES = Object.keys(STATE_INFO).sort();

const buildSystem = (lang) => `You are a 340B Drug Pricing Program expert assistant embedded in a tool for oncologists. Your role is to help oncologists clearly explain the 340B program to patients in under-resourced communities. ${lang === "es" ? "Always respond in Spanish, using simple and compassionate language." : "Always respond in English."}
Key facts: 340B requires drug manufacturers to sell outpatient drugs at discounted prices to covered entities (FQHCs, DSH hospitals, CAHs, children's hospitals, Ryan White clinics, rural referral centers). Patients do NOT need to be uninsured. For cancer: reduces costs for chemo, immunotherapy, targeted therapy, and supportive care.
When answering: plain empathetic language, no jargon (define terms), actionable next step at end, 3–5 short paragraphs, remind patients this is a federal entitlement.`;

const STARTERS = {
  en: ["What is the 340B program?","Will this reduce my medication costs?","Do I qualify for 340B savings?","How do I use 340B at my pharmacy?","Does insurance affect my 340B benefits?","What cancer drugs are covered?"],
  es: ["¿Qué es el programa 340B?","¿Reducirá mis costos de medicamentos?","¿Califico para ahorros 340B?","¿Cómo uso 340B en la farmacia?","¿Afecta el seguro mis beneficios 340B?","¿Qué medicamentos para el cáncer están cubiertos?"],
};

const ENTITY_TYPES = { "CAH":"Critical Access Hospital","DSH":"Disproportionate Share Hospital","CHC":"Community Health Center","RRC":"Rural Referral Center","PED":"Children's Hospital","FP":"Family Planning","SCH":"Sole Community Hospital","LCA":"Look-Alike FQHC","MHC":"Migrant Health Center" };

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  body { background: ${B.offwhite}; margin: 0; }
  .app { font-family: 'Cormorant Garamond', Georgia, serif; background: ${B.offwhite}; color: ${B.text}; max-width: 720px; margin: 0 auto; padding: 1.5rem 1rem 2rem; min-height: 100vh; }
  .serif { font-family: 'EB Garamond', Georgia, serif; }
  input, select, textarea { font-family: 'EB Garamond', Georgia, serif; font-size: 15px; }
  button { font-family: 'EB Garamond', Georgia, serif; cursor: pointer; }
  .pill { display: inline-block; font-size: 11px; padding: 2px 10px; border-radius: 20px; letter-spacing: 0.04em; }
  .chip-btn { padding: 6px 14px; font-size: 13px; border-radius: 20px; border: 1px solid ${B.border}; background: ${B.offwhite}; color: ${B.textMuted}; transition: background 0.15s; }
  .chip-btn:hover { background: ${B.yellow}22; border-color: ${B.yellow}; color: ${B.text}; }
  .tab-btn { padding: 6px 16px; font-size: 14px; border-radius: 0; border: none; background: transparent; color: ${B.textMuted}; border-bottom: 2px solid transparent; transition: all 0.15s; }
  .tab-btn.active { color: ${B.text}; border-bottom: 2px solid ${B.black}; font-weight: 500; }
  .card { background: #fff; border: 1px solid ${B.border}; border-radius: 2px; padding: 1rem 1.25rem; }
  .input-base { width: 100%; padding: 9px 12px; font-size: 15px; border: 1px solid ${B.border}; border-radius: 2px; background: #fff; color: ${B.text}; outline: none; }
  .input-base:focus { border-color: ${B.brown}; }
  .btn-primary { padding: 9px 20px; font-size: 14px; border: 1px solid ${B.black}; border-radius: 2px; background: ${B.black}; color: #fff; letter-spacing: 0.03em; transition: background 0.15s; }
  .btn-primary:hover { background: #222; }
  .btn-ghost { padding: 6px 14px; font-size: 13px; border: 1px solid ${B.border}; border-radius: 2px; background: transparent; color: ${B.textMuted}; transition: background 0.15s; }
  .btn-ghost:hover { background: ${B.yellow}22; }
  .btn-yellow { padding: 6px 14px; font-size: 13px; border: 1px solid ${B.yellow}; border-radius: 2px; background: ${B.yellow}; color: ${B.text}; transition: opacity 0.15s; }
  .btn-yellow:hover { opacity: 0.85; }
  .state-banner { background: ${B.yellow}22; border-left: 3px solid ${B.yellow}; border-radius: 0; padding: 0.65rem 1rem; margin-bottom: 1rem; font-size: 14px; }
  .bubble-user { background: ${B.black}; color: #fff; border-radius: 16px 16px 4px 16px; padding: 0.6rem 0.9rem; font-size: 15px; line-height: 1.6; max-width: 72%; white-space: pre-wrap; }
  .bubble-ai { background: #fff; border: 1px solid ${B.border}; border-radius: 16px 16px 16px 4px; padding: 0.6rem 0.9rem; font-size: 15px; line-height: 1.6; max-width: 72%; white-space: pre-wrap; color: ${B.text}; }
  .avatar { width: 30px; height: 30px; border-radius: 50%; background: ${B.yellow}; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 500; color: ${B.text}; flex-shrink: 0; margin-top: 2px; letter-spacing: 0.02em; }
  .stat-card { background: ${B.brown}22; border: 1px solid ${B.border}; border-radius: 2px; padding: 1rem; text-align: center; }
  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: flex-start; justify-content: center; z-index: 1000; padding: 1.5rem 1rem; overflow-y: auto; }
  .modal { background: ${B.offwhite}; border: 1px solid ${B.border}; width: 100%; max-width: 620px; padding: 2rem; }
  .divider { border: none; border-top: 1px solid ${B.border}; margin: 1rem 0; }
`;

function PharmacyLookup({ lang }) {
  const t = lang === "es";
  const [zip, setZip] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (!/^\d{5}$/.test(zip)) { setError(t ? "Ingrese un código postal de 5 dígitos." : "Please enter a valid 5-digit zip code."); return; }
    setError(""); setLoading(true); setResults(null);
    try {
      const res = await fetch(`https://340bopais.hrsa.gov/api/coveredentities/search?zipCode=${zip}&radius=25&pageSize=20&pageNumber=1`, { headers: { "Accept": "application/json" } });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResults({ ai: false, items: data.items || data.data || data || [] });
    } catch {
      try {
        const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000,
            system: "You are a 340B covered entity lookup assistant. Respond ONLY with a JSON array (no markdown) of up to 8 likely 340B covered entities near the given zip code. Each object: {name, type, city, state, phone, address}. type: one of FQHC, DSH, CAH, RRC, Children's Hospital.",
            messages: [{ role: "user", content: `340B covered entities near zip ${zip}` }] })
        });
        const aiData = await aiRes.json();
        const text = aiData.content?.map(b => b.text || "").join("") || "[]";
        setResults({ ai: true, items: JSON.parse(text.replace(/```json|```/g, "").trim()) });
      } catch { setError(t ? "No se pudo conectar. Visite hrsa.gov/opa." : "Could not connect. Visit hrsa.gov/opa to search directly."); }
    }
    setLoading(false);
  };

  const items = results?.items || [];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
        <input className="input-base" value={zip} onChange={e => setZip(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder={t ? "Código postal (5 dígitos)" : "Zip code (5 digits)"} maxLength={5} style={{ maxWidth: 180 }} />
        <button className="btn-primary" onClick={search}>{loading ? (t ? "Buscando..." : "Searching...") : (t ? "Buscar" : "Search")}</button>
      </div>
      {error && <p style={{ fontSize: 13, color: "#a33", margin: "0 0 0.75rem" }}>{error}</p>}
      {results?.ai && items.length > 0 && (
        <div style={{ background: `${B.yellow}33`, border: `1px solid ${B.yellow}`, padding: "0.5rem 0.85rem", marginBottom: "0.75rem", fontSize: 13, color: B.text }}>
          {t ? "Resultados aproximados generados por IA — confirme con su equipo de atención o en hrsa.gov/opa." : "Approximate AI-generated results — confirm with your care team or verify at hrsa.gov/opa."}
        </div>
      )}
      {items.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1rem" }}>
          {items.map((e, i) => {
            const name = e.entityName || e.name || "Unknown";
            const type = e.entityTypeCd ? (ENTITY_TYPES[e.entityTypeCd] || e.entityTypeCd) : (e.type || "");
            const city = e.city || ""; const st = e.stateCode || e.state || ""; const addr = e.address1 || e.address || ""; const phone = e.phone || e.phoneNumber || "";
            return (
              <div key={i} className="card" style={{ padding: "0.75rem 1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 2px" }}>{name}</p>
                  {type && <span className="pill" style={{ background: `${B.yellow}44`, color: B.text, border: `1px solid ${B.yellow}`, flexShrink: 0 }}>{type}</span>}
                </div>
                {(addr || city) && <p style={{ fontSize: 13, color: B.textMuted, margin: "2px 0 0" }}>{[addr, city, st].filter(Boolean).join(", ")}</p>}
                {phone && <p style={{ fontSize: 13, color: B.textMuted, margin: "2px 0 0" }}>{phone}</p>}
              </div>
            );
          })}
        </div>
      )}
      {results && items.length === 0 && !error && <p style={{ fontSize: 14, color: B.textMuted }}>{t ? "No se encontraron entidades cercanas." : "No covered entities found nearby. Try a different zip code."}</p>}
      <div className="card" style={{ marginTop: "0.5rem" }}>
        <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 4px" }}>{t ? "Buscar directamente en HRSA" : "Search HRSA directly"}</p>
        <a href="https://340bopais.hrsa.gov/coveredentitysearch" target="_blank" rel="noreferrer" style={{ fontSize: 14, color: B.brown }}>340bopais.hrsa.gov/coveredentitysearch →</a>
      </div>
    </div>
  );
}

function EligibilityChecker({ onClose, lang }) {
  const t = lang === "es";
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const questions = [
    { id: "facility", label: t ? "¿Su atención se brinda en un centro de salud comunitario u hospital de seguridad?" : "Is your care provided at a community health center, safety-net hospital, or FQHC?" },
    { id: "insured", label: t ? "¿No tiene seguro o tiene gastos altos de bolsillo?" : "Are you uninsured or underinsured (high out-of-pocket costs)?" },
    { id: "income", label: t ? "¿Ingreso del hogar bajo el 200% del nivel federal de pobreza?" : "Is your household income below 200% of the federal poverty level?" },
    { id: "rx", label: t ? "¿Tiene recetas ambulatorias para el tratamiento del cáncer?" : "Are you currently prescribed outpatient medications for cancer treatment?" },
  ];
  const handle = (id, val) => {
    const updated = { ...answers, [id]: val };
    setAnswers(updated);
    if (Object.keys(updated).length === questions.length) setResult(Object.values(updated).reduce((a, b) => a + b, 0) >= 2 ? "likely" : "possible");
  };
  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
        <span style={{ fontWeight: 500, fontSize: 15 }}>{t ? "Verificación de elegibilidad" : "Eligibility check"}</span>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, color: B.textMuted, cursor: "pointer", lineHeight: 1 }}>×</button>
      </div>
      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: "0.75rem" }}>
          <p style={{ fontSize: 14, color: B.textMuted, margin: "0 0 6px" }}>{q.label}</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[t ? "Sí" : "Yes", "No"].map((opt, idx) => {
              const selected = answers[q.id] === (idx === 0 ? 1 : 0) && answers[q.id] !== undefined;
              return (
                <button key={opt} onClick={() => handle(q.id, idx === 0 ? 1 : 0)}
                  style={{ padding: "4px 18px", fontSize: 14, borderRadius: 2, cursor: "pointer",
                    background: selected ? (idx === 0 ? B.yellow : B.brown + "33") : "transparent",
                    border: `1px solid ${selected ? (idx === 0 ? B.yellow : B.brown) : B.border}`,
                    color: B.text }}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {result && (
        <div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", background: result === "likely" ? `${B.yellow}33` : `${B.brown}22`, border: `1px solid ${result === "likely" ? B.yellow : B.brown}` }}>
          <p style={{ margin: 0, fontSize: 14, color: B.text }}>
            {result === "likely"
              ? (t ? "Este paciente probablemente es elegible. Pregunte al equipo de atención sobre farmacias 340B." : "This patient is likely eligible for 340B benefits. Ask your care team about 340B contract pharmacies at this facility.")
              : (t ? "Este paciente puede tener acceso a 340B. Confirme con su oncólogo." : "This patient may have some 340B access. Ask your oncologist or financial counselor to confirm.")}
          </p>
        </div>
      )}
    </div>
  );
}

function PrintSummary({ lang, state, onClose }) {
  const t = lang === "es";
  const si = STATE_INFO[state];
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const [patientName, setPatientName] = useState("");
  const [visitDate, setVisitDate] = useState(today);
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <span style={{ fontWeight: 500, fontSize: 16 }}>{t ? "Resumen para el paciente" : "Patient summary"}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-yellow" onClick={() => window.print()}>{t ? "Imprimir / PDF" : "Print / Save PDF"}</button>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: B.textMuted, cursor: "pointer" }}>×</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.25rem" }}>
          <div>
            <label style={{ fontSize: 13, color: B.textMuted, display: "block", marginBottom: 4 }}>{t ? "Nombre del paciente" : "Patient name"}</label>
            <input className="input-base" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder={t ? "Nombre completo" : "Full name"} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: B.textMuted, display: "block", marginBottom: 4 }}>{t ? "Fecha de visita" : "Visit date"}</label>
            <input className="input-base" value={visitDate} onChange={e => setVisitDate(e.target.value)} />
          </div>
        </div>
        <hr className="divider" />
        <div style={{ fontSize: 15, lineHeight: 1.8, color: B.text }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "0.75rem", marginBottom: "0.85rem", borderBottom: `1px solid ${B.border}` }}>
            <div>
              <p style={{ fontWeight: 500, fontSize: 18, margin: "0 0 2px" }}>{t ? "Programa 340B: Lo que usted necesita saber" : "The 340B Program: What You Need to Know"}</p>
              <p style={{ fontSize: 13, color: B.textMuted, margin: 0 }}>{t ? "Proporcionado por su equipo de oncología" : "Provided by your oncology care team"}</p>
            </div>
            <div style={{ textAlign: "right", fontSize: 13, color: B.textMuted, flexShrink: 0, marginLeft: 16 }}>
              {patientName && <p style={{ margin: "0 0 2px", fontWeight: 500, color: B.text }}>{patientName}</p>}
              <p style={{ margin: 0 }}>{visitDate}</p>
            </div>
          </div>
          {[
            { h: t ? "¿Qué es el programa 340B?" : "What is the 340B program?", b: t ? "El programa 340B es una ley federal que obliga a los fabricantes de medicamentos a vender medicamentos a precios muy reducidos a clínicas que atienden a pacientes de bajos recursos, reduciendo significativamente sus costos de medicamentos para el cáncer." : "The 340B program is a federal law requiring drug manufacturers to sell medications at deeply discounted prices to clinics that serve low-income patients — significantly reducing your cancer medication costs." },
            { h: t ? "¿Necesito estar sin seguro?" : "Do I need to be uninsured?", b: t ? "No. Los pacientes con seguro, sin seguro, o con gastos altos pueden beneficiarse. Este no es un programa de caridad — es un derecho federal." : "No. Patients with insurance, without insurance, or with high out-of-pocket costs can all benefit. This is not charity — it is a federal benefit you are entitled to ask about." },
            { h: t ? "Cómo acceder" : "How to access 340B", list: t ? ["Pregunta a tu equipo: '¿Esta clínica participa en el programa 340B?'","En la farmacia: '¿Puede preparar esta receta a precio 340B?'","Pide un navegador de pacientes o asesor financiero si necesitas ayuda"] : ["Ask your care team: 'Is this clinic enrolled in the 340B program?'","At the pharmacy: 'Can this prescription be filled under 340B pricing?'","Ask for a patient navigator or financial counselor if you need help"] },
          ].map(s => (
            <div key={s.h} style={{ marginBottom: "0.85rem" }}>
              <p style={{ fontWeight: 500, margin: "0 0 3px" }}>{s.h}</p>
              {s.b ? <p style={{ margin: 0, color: B.textMuted }}>{s.b}</p> : (
                <div>{s.list.map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 5 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: B.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: B.text, flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ fontSize: 14, margin: 0, color: B.textMuted, lineHeight: 1.5 }}>{tip}</p>
                  </div>
                ))}</div>
              )}
            </div>
          ))}
          {si && (
            <div style={{ background: `${B.yellow}22`, borderLeft: `3px solid ${B.yellow}`, padding: "0.75rem 1rem", marginBottom: "0.85rem" }}>
              <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 3px" }}>{t ? `Información de ${state}:` : `${state} information:`}</p>
              <p style={{ fontSize: 14, margin: "0 0 4px", color: B.textMuted }}>{si.protections}</p>
              <a href={si.resources} style={{ fontSize: 13, color: B.brown }}>{si.resources}</a>
            </div>
          )}
          <hr className="divider" />
          <p style={{ fontSize: 13, color: B.textMuted, margin: 0 }}>HRSA 340B: hrsa.gov/opa · NeedyMeds: needymeds.org · 340B Health: 340bhealth.org</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showElig, setShowElig] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [tab, setTab] = useState("chat");
  const [lang, setLang] = useState("en");
  const [state, setState] = useState("");
  const bottomRef = useRef(null);
  const t = lang === "es";
  const si = STATE_INFO[state];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    const next = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: buildSystem(lang), messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "Sorry, no response." }]);
    } catch { setMessages([...next, { role: "assistant", content: t ? "Algo salió mal." : "Something went wrong." }]); }
    setLoading(false);
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {showPrint && <PrintSummary lang={lang} state={state} onClose={() => setShowPrint(false)} />}

        <div style={{ background: B.yellow, margin: "0 -1rem", padding: "1.25rem 1.5rem 1.25rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <img src="/BlackDoctor_PrimaryLogo_Black.svg" alt="BlackDoctor — Where Culture Meets Care" style={{ height: 64, display: "block", filter: "brightness(0)" }} />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select value={state} onChange={e => setState(e.target.value)}
              style={{ fontSize: 13, padding: "5px 8px", border: `1px solid ${B.border}`, background: "#fff", color: B.textMuted, borderRadius: 2, maxWidth: 140, fontFamily: "inherit" }}>
              <option value="">{t ? "Estado" : "Select state"}</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="btn-ghost" onClick={() => { setLang(l => l === "en" ? "es" : "en"); setMessages([]); }}>{t ? "English" : "Español"}</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 0, marginBottom: "1.5rem", borderBottom: `1px solid ${B.border}` }}>
          {["chat","about","pharmacies"].map(k => (
            <button key={k} className={`tab-btn${tab === k ? " active" : ""}`} onClick={() => setTab(k)}>
              {{ chat: t ? "Chat" : "Patient chat", about: t ? "Sobre 340B" : "About 340B", pharmacies: t ? "Farmacias" : "Find pharmacy" }[k]}
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, paddingBottom: 4 }}>
            <button className="btn-ghost" onClick={() => setShowPrint(true)}>{t ? "Imprimir" : "Print summary"}</button>
            <button className={showElig ? "btn-yellow" : "btn-ghost"} onClick={() => setShowElig(v => !v)}>{t ? "Elegibilidad" : "Eligibility"}</button>
          </div>
        </div>

        {state && si && (
          <div className="state-banner">
            <span style={{ fontWeight: 500 }}>{state}: </span>{si.protections}
          </div>
        )}

        {showElig && <EligibilityChecker onClose={() => setShowElig(false)} lang={lang} />}

        {tab === "chat" && (
          <div>
            {messages.length === 0 && (
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontSize: 14, color: B.textMuted, margin: "0 0 0.75rem" }}>{t ? "Preguntas frecuentes — haga clic para comenzar:" : "Common questions — click to ask:"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {STARTERS[lang].map(q => <button key={q} className="chip-btn" onClick={() => send(q)}>{q}</button>)}
                </div>
              </div>
            )}
            <div style={{ minHeight: 180, marginBottom: "0.85rem" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: "0.75rem", gap: 8 }}>
                  {m.role === "assistant" && <div className="avatar">340B</div>}
                  <div className={m.role === "user" ? "bubble-user" : "bubble-ai"}>{m.content}</div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                  <div className="avatar">340B</div>
                  <div className="bubble-ai" style={{ color: B.textMuted }}>{t ? "Pensando..." : "Thinking..."}</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input className="input-base" value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                placeholder={t ? "Haga una pregunta sobre 340B..." : "Ask a question about 340B..."} />
              <button className="btn-primary" onClick={() => send()}>{t ? "Enviar" : "Send"}</button>
            </div>
            {messages.length > 0 && <button onClick={() => setMessages([])} style={{ marginTop: 8, fontSize: 13, color: B.textMuted, background: "none", border: "none", cursor: "pointer" }}>{t ? "Limpiar" : "Clear conversation"}</button>}
          </div>
        )}

        {tab === "about" && (
          <div style={{ fontSize: 15, lineHeight: 1.8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 12, marginBottom: "1.5rem" }}>
              {[{ l: t ? "Ahorro estimado" : "Est. savings", v: "25–50%", s: t ? "en medicamentos" : "on eligible drugs" },
                { l: t ? "Desde" : "Since", v: "1992", s: t ? "ley federal" : "federal law" },
                { l: t ? "Entidades" : "Covered entities", v: "50,000+", s: t ? "en EE.UU." : "nationwide" }].map(c => (
                <div key={c.l} className="stat-card">
                  <p style={{ fontSize: 11, color: B.textMuted, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.l}</p>
                  <p style={{ fontSize: 24, fontWeight: 400, margin: "0 0 2px" }}>{c.v}</p>
                  <p style={{ fontSize: 12, color: B.textMuted, margin: 0 }}>{c.s}</p>
                </div>
              ))}
            </div>
            {(t ? [
              { h: "¿Qué es el programa 340B?", b: "El programa 340B es una ley federal que obliga a los fabricantes de medicamentos a vender medicamentos ambulatorios a precios muy reducidos a organizaciones de salud elegibles — incluyendo centros de salud comunitarios, hospitales de seguridad y clínicas de cáncer." },
              { h: "¿Quién se beneficia?", b: "Los pacientes no necesitan estar sin seguro. Los pacientes asegurados y no asegurados pueden recibir medicamentos 340B. Los ahorros permiten reducir copagos y ampliar el acceso." },
              { h: "Cómo ayuda a los pacientes con cáncer", b: "Los medicamentos para el cáncer están entre los más costosos. El programa 340B puede reducir significativamente los costos para pacientes en comunidades con recursos limitados." },
              { h: "Cómo acceder", b: "Pregúntele a su oncólogo si su clínica es una entidad cubierta por 340B y solicite que sus recetas se surtan en una farmacia participante." },
            ] : [
              { h: "What is the 340B program?", b: "The 340B Drug Pricing Program is a federal law requiring drug manufacturers to sell outpatient medications at deeply discounted prices to eligible health care organizations — including community health centers, safety-net hospitals, and cancer clinics." },
              { h: "Who benefits?", b: "Patients do not need to be uninsured to benefit. Both insured and uninsured patients can receive 340B medications. The savings allow covered entities to reduce patient copays and expand access to care." },
              { h: "How it helps cancer patients", b: "Cancer drugs — chemotherapy, immunotherapy, targeted therapy, and supportive care — are among the most expensive in medicine. 340B can reduce costs significantly for patients in under-resourced communities." },
              { h: "How to access it", b: "Ask your oncologist or patient navigator whether your facility is a 340B covered entity. If so, ask that your prescriptions be filled through a 340B-participating pharmacy." },
            ]).map(s => (
              <div key={s.h} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: `1px solid ${B.border}` }}>
                <p style={{ fontWeight: 500, margin: "0 0 4px", fontSize: 16 }}>{s.h}</p>
                <p style={{ margin: 0, color: B.textMuted }}>{s.b}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "pharmacies" && (
          <div>
            <p style={{ fontSize: 14, color: B.textMuted, margin: "0 0 1rem" }}>{t ? "Busque entidades cubiertas por 340B cerca de un código postal." : "Search for 340B covered entities near a zip code."}</p>
            <PharmacyLookup lang={lang} />
          </div>
        )}
      </div>
    </>
  );
}