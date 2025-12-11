// import React, { useEffect, useRef, useState } from 'react';

// /**
//  * TrustedFormReact.tsx
//  * Single-file React + TypeScript component that renders a form matching the JSON payload
//  * you provided. It injects the TrustedForm script, keeps hidden inputs for cert & ping,
//  * attempts to capture user IP (via ipify as a best-effort fallback), validates required
//  * fields, and submits the JSON payload to /api/submit-claim (replace with your backend).
//  *
//  * Usage: drop this file into your React app and import where needed.
//  * Tailwind / design tokens are not required — plain classes are used for clarity.
//  */

// type Payload = {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   summary: string;
//   address_1: string;
//   address_2: string;
//   postal_code: string;
//   state: string;
//   accident_state: string;
//   incident_date: string; // YYYY-MM-DD
//   injuries: string;
//   test_lead: boolean;
//   trustedform_cert_url?: string | null;
//   trustedform_ping_url?: string | null;
//   publisher_id?: number | null;
//   city: string;
//   type_of_delivery: string;

//   // intake gates
//   occurred_within_30_days: boolean;
//   occurred_31_to_60_days: boolean;
//   occurred_61_to_90_days: boolean;
//   occurred_3_to_6_months: boolean;
//   occurred_6_to_9_months: boolean;
//   occurred_9_to_12_months: boolean;
//   has_physical_injuries: boolean;
//   had_medical_treatment_within_14_days_of_accident: boolean;
//   medical_documentation_confirms_treatment_timing_continuity_from_lead_submission: string | number;
//   has_ongoing_medical_treatment_once_a_month_at_least: boolean;
//   medical_report_available_or_can_be_obtained_on_request: boolean;
//   was_not_at_fault: boolean;
//   has_no_current_attorney: boolean;
//   has_not_been_dropped: boolean;
//   has_not_settled: boolean;
//   has_insurance_or_uninsured_motorist_coverage: boolean;
//   has_police_investigated: boolean;
//   police_report_confirms_accident_and_date: boolean;
//   police_report_available_or_can_be_obtained_on_request: boolean;
//   verified_email_matches_pc: boolean;
//   verified_phone_matches_pc: boolean;

//   // extra: ip
//   ip_address?: string | null;
// };

// const US_STATES = [
//   'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
// ];

// const TrustedFormReact: React.FC = () => {
//   // form state (flat)
//   const [data, setData] = useState<Payload>({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone: '',
//     summary: '',
//     address_1: '',
//     address_2: '',
//     postal_code: '',
//     state: 'CA',
//     accident_state: 'CA',
//     incident_date: '',
//     injuries: '',
//     test_lead: false,
//     trustedform_cert_url: null,
//     trustedform_ping_url: null,
//     publisher_id: 2,
//     city: '',
//     type_of_delivery: 'warm_transfer',

//     occurred_within_30_days: false,
//     occurred_31_to_60_days: false,
//     occurred_61_to_90_days: false,
//     occurred_3_to_6_months: false,
//     occurred_6_to_9_months: false,
//     occurred_9_to_12_months: false,
//     has_physical_injuries: false,
//     had_medical_treatment_within_14_days_of_accident: false,
//     medical_documentation_confirms_treatment_timing_continuity_from_lead_submission: '',
//     has_ongoing_medical_treatment_once_a_month_at_least: false,
//     medical_report_available_or_can_be_obtained_on_request: false,
//     was_not_at_fault: false,
//     has_no_current_attorney: false,
//     has_not_been_dropped: false,
//     has_not_settled: false,
//     has_insurance_or_uninsured_motorist_coverage: false,
//     has_police_investigated: false,
//     police_report_confirms_accident_and_date: false,
//     police_report_available_or_can_be_obtained_on_request: false,
//     verified_email_matches_pc: false,
//     verified_phone_matches_pc: false,
//     ip_address: null,
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const certRef = useRef<HTMLInputElement | null>(null);
//   const pingRef = useRef<HTMLInputElement | null>(null);

//   // inject TrustedForm script once
//   useEffect(() => {
//     if (!document.getElementById('trustedform-js')) {
//       const script = document.createElement('script');
//       script.id = 'trustedform-js';
//       script.src = 'https://api.trustedform.com/trustedform.js?field=trustedform_cert_url&ping_field=trustedform_ping_url&l=' + Date.now();
//       script.async = true;
//       document.head.appendChild(script);
//     }

//     // try to pre-fill IP using a public IP service (best-effort). This may fail in some environments.
//     (async () => {
//       try {
//         const resp = await fetch('https://api.ipify.org?format=json');
//         if (resp.ok) {
//           const json = await resp.json();
//           setData((prev) => ({ ...prev, ip_address: json.ip }));
//         }
//       } catch (e) {
//         // ignore — TrustedForm will collect the IP server-side; this is only a client-side best-effort
//       }
//     })();
//   }, []);

//   // small helper: map input change
//   const onChange = (k: keyof Payload, v: any) => {
//     setData((p) => ({ ...p, [k]: v }));
//     setErrors((e) => ({ ...e, [k as string]: '' }));
//   };

//   const validate = (): boolean => {
//     const e: Record<string, string> = {};
//     if (!data.first_name.trim()) e.first_name = 'First name required';
//     if (!data.last_name.trim()) e.last_name = 'Last name required';
//     if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Valid email required';
//     if (!data.phone.trim()) e.phone = 'Phone required';
//     if (!data.incident_date) e.incident_date = 'Incident date required';
//     if (!data.summary.trim()) e.summary = 'Short summary required';
//     if (!data.injuries.trim()) e.injuries = 'Please list injuries or "None"';
//     // basic intake gate check example: at least one occurred_* should be true
//     const occurredAny = [
//       data.occurred_within_30_days,
//       data.occurred_31_to_60_days,
//       data.occurred_61_to_90_days,
//       data.occurred_3_to_6_months,
//       data.occurred_6_to_9_months,
//       data.occurred_9_to_12_months,
//     ].some(Boolean);
//     if (!occurredAny) e.occurred_within_30_days = 'Please indicate when the incident occurred (choose one)';

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // helper to wait for TrustedForm cert (up to timeoutMs)
//   const waitForCert = (timeoutMs = 2000): Promise<string | null> => {
//     const start = Date.now();
//     return new Promise((resolve) => {
//       const tick = setInterval(() => {
//         // TrustedForm places a global; try common names used earlier
//         // window.trustedform, window.xxTrustedForm, window.trustedform_cert_url etc are possible
//         const w = window as any;
//         const cert = w.trustedform?.certUrl || w.xxTrustedForm?.certUrl || (w.trustedform_cert_url || null);
//         const ping = w.trustedform?.pingUrl || w.xxTrustedForm?.pingUrl || (w.trustedform_ping_url || null);
//         if (cert) {
//           clearInterval(tick);
//           // update local state & hidden inputs
//           onChange('trustedform_cert_url', cert);
//           onChange('trustedform_ping_url', ping || null);
//           if (certRef.current) certRef.current.value = cert;
//           if (pingRef.current) pingRef.current.value = ping || '';
//           resolve(cert);
//           return;
//         }
//         if (Date.now() - start >= timeoutMs) {
//           clearInterval(tick);
//           resolve(null);
//         }
//       }, 150);
//     });
//   };

//   const handleSubmit = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!validate()) return;

//     setIsSubmitting(true);
//     try {
//       // wait briefly for TrustedForm
//       await waitForCert(2000);

//       // final payload
//       const payload: Payload = { ...data };

//       // POST to backend - replace URL if needed
//       const resp = await fetch('/api/submit-claim', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!resp.ok) throw new Error('Network error');

//       setIsSuccess(true);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to submit form, please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isSuccess) {
//     return (
//       <div className="p-6 max-w-2xl mx-auto">
//         <h2 className="text-2xl font-semibold">Thanks — claim submitted</h2>
//         <p>We received your information. You should receive a confirmation soon.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Trusted Form Intake</h1>
//       <p className="text-sm mb-4">This form collects information about your incident. For fraud prevention we also collect IP and TrustedForm certification.</p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Hidden fields for TrustedForm script to fill */}
//         <input ref={certRef} type="hidden" name="trustedform_cert_url" />
//         <input ref={pingRef} type="hidden" name="trustedform_ping_url" />

//         {/* Personal */}
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="block text-sm">First name *</label>
//             <input value={data.first_name} onChange={(s) => onChange('first_name', s.target.value)} className="w-full p-2 border" />
//             {errors.first_name && <p className="text-xs text-red-600">{errors.first_name}</p>}
//           </div>
//           <div>
//             <label className="block text-sm">Last name *</label>
//             <input value={data.last_name} onChange={(s) => onChange('last_name', s.target.value)} className="w-full p-2 border" />
//             {errors.last_name && <p className="text-xs text-red-600">{errors.last_name}</p>}
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3">
//           <div>
//             <label className="block text-sm">Email *</label>
//             <input value={data.email} onChange={(s) => onChange('email', s.target.value)} className="w-full p-2 border" />
//             {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
//           </div>
//           <div>
//             <label className="block text-sm">Phone *</label>
//             <input value={data.phone} onChange={(s) => onChange('phone', s.target.value)} className="w-full p-2 border" />
//             {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
//           </div>
//           <div>
//             <label className="block text-sm">City</label>
//             <input value={data.city} onChange={(s) => onChange('city', s.target.value)} className="w-full p-2 border" />
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3">
//           <div>
//             <label className="block text-sm">State</label>
//             <select value={data.state} onChange={(s) => onChange('state', s.target.value)} className="w-full p-2 border">
//               {US_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm">Postal Code</label>
//             <input value={data.postal_code} onChange={(s) => onChange('postal_code', s.target.value)} className="w-full p-2 border" />
//           </div>
//           <div>
//             <label className="block text-sm">Address 1</label>
//             <input value={data.address_1} onChange={(s) => onChange('address_1', s.target.value)} className="w-full p-2 border" />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm">Address 2</label>
//           <input value={data.address_2} onChange={(s) => onChange('address_2', s.target.value)} className="w-full p-2 border" />
//         </div>

//         {/* Accident */}
//         <div>
//           <label className="block text-sm">Incident Date *</label>
//           <input type="date" value={data.incident_date} onChange={(s) => onChange('incident_date', s.target.value)} className="p-2 border" max={new Date().toISOString().split('T')[0]} />
//           {errors.incident_date && <p className="text-xs text-red-600">{errors.incident_date}</p>}
//         </div>

//         <div>
//           <label className="block text-sm">Accident State</label>
//           <select value={data.accident_state} onChange={(s) => onChange('accident_state', s.target.value)} className="w-full p-2 border">
//             {US_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm">Summary *</label>
//           <textarea value={data.summary} onChange={(s) => onChange('summary', s.target.value)} className="w-full p-2 border" rows={3} />
//           {errors.summary && <p className="text-xs text-red-600">{errors.summary}</p>}
//         </div>

//         <div>
//           <label className="block text-sm">Injuries *</label>
//           <input value={data.injuries} onChange={(s) => onChange('injuries', s.target.value)} className="w-full p-2 border" />
//           {errors.injuries && <p className="text-xs text-red-600">{errors.injuries}</p>}
//         </div>

//         <div className="grid grid-cols-3 gap-3">
//           <div>
//             <label className="block text-sm">Type of delivery</label>
//             <select value={data.type_of_delivery} onChange={(s) => onChange('type_of_delivery', s.target.value)} className="w-full p-2 border">
//               <option value="warm_transfer">warm_transfer</option>
//               <option value="lead">lead</option>
//               <option value="email">email</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm">Publisher ID</label>
//             <input type="number" value={String(data.publisher_id || '')} onChange={(s) => onChange('publisher_id', parseInt(s.target.value || '0'))} className="w-full p-2 border" />
//           </div>

//           <div className="flex items-center gap-2">
//             <input id="test_lead" type="checkbox" checked={data.test_lead} onChange={(s) => onChange('test_lead', s.target.checked)} />
//             <label htmlFor="test_lead" className="text-sm">Test lead</label>
//           </div>
//         </div>

//         {/* Intake gates - many booleans */}
//         <div className="grid grid-cols-2 gap-3">
//           <fieldset className="p-3 border">
//             <legend className="font-semibold">When did the incident occur? (pick one)</legend>
//             <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_within_30_days} onChange={() => onChange('occurred_within_30_days', true)} /> <label>Within 30 days</label></div>
//             <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_31_to_60_days} onChange={() => onChange('occurred_31_to_60_days', true)} /> <label>31–60 days</label></div>
//             <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_61_to_90_days} onChange={() => onChange('occurred_61_to_90_days', true)} /> <label>61–90 days</label></div>
//             <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_3_to_6_months} onChange={() => onChange('occurred_3_to_6_months', true)} /> <label>3–6 months</label></div>
//             <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_6_to_9_months} onChange={() => onChange('occurred_6_to_9_months', true)} /> <label>6–9 months</label></div>
//             <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_9_to_12_months} onChange={() => onChange('occurred_9_to_12_months', true)} /> <label>9–12 months</label></div>
//             {errors.occurred_within_30_days && <p className="text-xs text-red-600">{errors.occurred_within_30_days}</p>}
//           </fieldset>

//           <fieldset className="p-3 border">
//             <legend className="font-semibold">Medical / Legal</legend>
//             <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_physical_injuries} onChange={(s) => onChange('has_physical_injuries', s.target.checked)} /> <label>Has physical injuries</label></div>
//             <div className="flex items-center gap-2"><input type="checkbox" checked={data.had_medical_treatment_within_14_days_of_accident} onChange={(s) => onChange('had_medical_treatment_within_14_days_of_accident', s.target.checked)} /> <label>Had treatment within 14 days</label></div>
//             <div>
//               <label className="block text-sm">Medical documentation continuity (e.g. 60)</label>
//               <input value={String(data.medical_documentation_confirms_treatment_timing_continuity_from_lead_submission)} onChange={(s) => onChange('medical_documentation_confirms_treatment_timing_continuity_from_lead_submission', s.target.value)} className="w-full p-2 border" />
//             </div>
//             <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_ongoing_medical_treatment_once_a_month_at_least} onChange={(s) => onChange('has_ongoing_medical_treatment_once_a_month_at_least', s.target.checked)} /> <label>Ongoing monthly treatment</label></div>
//             <div className="flex items-center gap-2"><input type="checkbox" checked={data.medical_report_available_or_can_be_obtained_on_request} onChange={(s) => onChange('medical_report_available_or_can_be_obtained_on_request', s.target.checked)} /> <label>Medical report available</label></div>
//             <div className="flex items-center gap-2"><input type="checkbox" checked={data.was_not_at_fault} onChange={(s) => onChange('was_not_at_fault', s.target.checked)} /> <label>Was not at fault</label></div>
//             <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_no_current_attorney} onChange={(s) => onChange('has_no_current_attorney', s.target.checked)} /> <label>Has no current attorney</label></div>
//             <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_not_been_dropped} onChange={(s) => onChange('has_not_been_dropped', s.target.checked)} /> <label>Has not been dropped</label></div>
//             <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_not_settled} onChange={(s) => onChange('has_not_settled', s.target.checked)} /> <label>Has not settled</label></div>
//           </fieldset>
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_insurance_or_uninsured_motorist_coverage} onChange={(s) => onChange('has_insurance_or_uninsured_motorist_coverage', s.target.checked)} /> <label>Has insurance / UM</label></div>
//           <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_police_investigated} onChange={(s) => onChange('has_police_investigated', s.target.checked)} /> <label>Police investigated</label></div>
//           <div className="flex items-center gap-2"><input type="checkbox" checked={data.police_report_confirms_accident_and_date} onChange={(s) => onChange('police_report_confirms_accident_and_date', s.target.checked)} /> <label>Police report confirms date</label></div>
//           <div className="flex items-center gap-2"><input type="checkbox" checked={data.police_report_available_or_can_be_obtained_on_request} onChange={(s) => onChange('police_report_available_or_can_be_obtained_on_request', s.target.checked)} /> <label>Police report available</label></div>
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <div className="flex items-center gap-2"><input type="checkbox" checked={data.verified_email_matches_pc} onChange={(s) => onChange('verified_email_matches_pc', s.target.checked)} /> <label>Verified email matches PC</label></div>
//           <div className="flex items-center gap-2"><input type="checkbox" checked={data.verified_phone_matches_pc} onChange={(s) => onChange('verified_phone_matches_pc', s.target.checked)} /> <label>Verified phone matches PC</label></div>
//         </div>

//         {/* IP display (optional) */}
//         <div>
//           <label className="block text-sm">IP (collected by TrustedForm & optionally by ipify)</label>
//           <input value={String(data.ip_address || '')} readOnly className="w-full p-2 border bg-gray-50" />
//         </div>

//         <div className="flex gap-3">
//           <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
//           <button type="button" onClick={() => { /* reset */ setData((d) => ({ ...d, first_name: '', last_name: '', email: '', phone: '' })); }} className="px-4 py-2 border">Clear</button>
//         </div>
//       </form>

//       <p className="text-xs text-gray-600 mt-3">Note: TrustedForm script will attempt to populate the certification URL & ping fields. We also attempt to fetch public IP using a third-party (ipify) as a best-effort; if you prefer not to use that, remove the fetch call in useEffect.</p>
//     </div>
//   );
// };

// export default TrustedFormReact;
// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useToast } from '@/hooks/use-toast';
// import { Loader2, CheckCircle2, Shield } from 'lucide-react';

// declare global {
//   interface Window {
//     xxTrustedForm?: {
//       certUrl?: string;
//       pingUrl?: string;
//     };
//   }
// }

// interface FormData {
//   fullName: string;
//   email: string;
//   phone: string;
//   dateOfIncident: string;
//   accidentSeverity: string;
//   lastMedicalTreatment: string;
//   wasYourFault: string;
//   acceptedSettlement: string;
//   workingWithAttorney: string;
//   location: string;
// }

// const US_STATES = [
//   'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
//   'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
//   'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
//   'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
//   'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
//   'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
//   'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
//   'Wisconsin', 'Wyoming'
// ];

// const FormPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [trustedFormCertUrl, setTrustedFormCertUrl] = useState('');
//   const [trustedFormPingUrl, setTrustedFormPingUrl] = useState('');
//   const certInputRef = useRef<HTMLInputElement | null>(null);
//   const pingInputRef = useRef<HTMLInputElement | null>(null);

//   const [formData, setFormData] = useState<FormData>({
//     fullName: '',
//     email: '',
//     phone: '',
//     dateOfIncident: '',
//     accidentSeverity: '',
//     lastMedicalTreatment: '',
//     wasYourFault: '',
//     acceptedSettlement: '',
//     workingWithAttorney: '',
//     location: '',
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});

//   // === Option B TrustedForm injection & polling (production) ===
//   useEffect(() => {
//     // inject script once
//     if (!document.getElementById('trustedform-js')) {
//       const tf = document.createElement('script');
//       tf.id = 'trustedform-js';
//       tf.type = 'text/javascript';
//       tf.async = true;
//       // provide_referrer true gives more metadata, field param tells script which hidden field to fill
//       tf.src = 'https://api.trustedform.com/trustedform.js?provide_referrer=true&field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl';
//       document.head.appendChild(tf);
//       // Note: do not remove the script on cleanup for SPA stability
//     }

//     // Poll briefly for the cert URL that the script will set on window.xxTrustedForm.certUrl
//     const start = Date.now();
//     const timeoutMs = 5000; // wait up to 5s
//     const interval = window.setInterval(() => {
//       const cert = window.xxTrustedForm?.certUrl;
//       const ping = window.xxTrustedForm?.pingUrl;

//       if (cert) {
//         setTrustedFormCertUrl(cert);
//         if (certInputRef.current) certInputRef.current.value = cert;
//       }
//       if (ping) {
//         setTrustedFormPingUrl(ping);
//         if (pingInputRef.current) pingInputRef.current.value = ping;
//       }

//       if (cert || Date.now() - start > timeoutMs) {
//         clearInterval(interval);
//       }
//     }, 150);

//     // immediate check in case the script already set it
//     if (window.xxTrustedForm?.certUrl) {
//       const immediateCert = window.xxTrustedForm.certUrl;
//       setTrustedFormCertUrl(immediateCert);
//       if (certInputRef.current) certInputRef.current.value = immediateCert;
//     }
//     if (window.xxTrustedForm?.pingUrl) {
//       const immediatePing = window.xxTrustedForm.pingUrl;
//       setTrustedFormPingUrl(immediatePing);
//       if (pingInputRef.current) pingInputRef.current.value = immediatePing;
//     }

//     return () => {
//       clearInterval(interval);
//       // intentionally not removing the script element
//     };
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name as keyof FormData]: value }));
//     if (errors[name as keyof FormData]) {
//       setErrors(prev => ({ ...prev, [name as keyof FormData]: '' }));
//     }
//   };

//   const handleSelectChange = (name: keyof FormData, value: string) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormData> = {};

//     // Full Name validation
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     } else if (formData.fullName.trim().length < 2) {
//       newErrors.fullName = 'Full name must be at least 2 characters';
//     }

//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email address is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     // Phone validation
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^[\d\s\-\(\)\+]+$/.test(formData.phone)) {
//       newErrors.phone = 'Please enter a valid phone number';
//     }

//     // Date of Incident validation
//     if (!formData.dateOfIncident) {
//       newErrors.dateOfIncident = 'Date of incident is required';
//     } else {
//       const incidentDate = new Date(formData.dateOfIncident);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (incidentDate > today) {
//         newErrors.dateOfIncident = 'Date cannot be in the future';
//       }
//     }

//     // Accident Severity validation
//     if (!formData.accidentSeverity) {
//       newErrors.accidentSeverity = 'Please select accident severity';
//     }

//     // Last Medical Treatment validation
//     if (!formData.lastMedicalTreatment) {
//       newErrors.lastMedicalTreatment = 'Please select when you last received treatment';
//     }

//     // Was Your Fault validation
//     if (!formData.wasYourFault) {
//       newErrors.wasYourFault = 'Please indicate if the accident was your fault';
//     }

//     // Accepted Settlement validation
//     if (!formData.acceptedSettlement) {
//       newErrors.acceptedSettlement = 'Please indicate if you accepted a settlement';
//     }

//     // Working With Attorney validation
//     if (!formData.workingWithAttorney) {
//       newErrors.workingWithAttorney = 'Please indicate if you are working with an attorney';
//     }

//     // Location validation
//     if (!formData.location) {
//       newErrors.location = 'Please select your location';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast({
//         title: 'Validation Error',
//         description: 'Please fill in all required fields correctly.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Prepare payload to send to your backend
//       const payload = {
//         ...formData,
//         xxTrustedFormCertUrl: trustedFormCertUrl || null,
//         xxTrustedFormPingUrl: trustedFormPingUrl || null,
//         submittedAt: new Date().toISOString(),
//       };

//       // Frontend logging - helpful for testing
//       console.log('Submitting form with payload:', payload);

//       // Replace '/api/submit-claim' with your actual endpoint
//       const resp = await fetch('/api/submit-claim', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!resp.ok) {
//         throw new Error('Network response not ok');
//       }

//       setIsSuccess(true);
//       toast({
//         title: 'Success!',
//         description: 'Your claim has been submitted successfully.',
//       });
//     } catch (error) {
//       console.error('submit error', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to submit claim. Please try again.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isSuccess) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
//         <Card className="max-w-md w-full">
//           <CardContent className="pt-6">
//             <div className="text-center space-y-4">
//               <div className="flex justify-center">
//                 <CheckCircle2 className="w-16 h-16 text-primary" />
//               </div>
//               <h2 className="text-2xl font-bold text-foreground">Claim Submitted!</h2>
//               <p className="text-muted-foreground">
//                 Thank you for submitting your crash claim. We have received your information and will review it shortly.
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 You will receive a confirmation email at <strong>{formData.email}</strong>
//               </p>
//               <Button onClick={() => navigate('/')} className="w-full">
//                 Return to Home
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4">
//             Submit Your Crash Claim
//           </h1>
//           <p className="text-lg text-muted-foreground">
//             Please fill out all required fields accurately
//           </p>
//         </div>

//         {/* IP Address Collection Notice */}
//         <Card className="mb-6 border-primary/20 bg-accent/50">
//           <CardContent className="pt-6">
//             <div className="flex items-start gap-3">
//               <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
//               <div>
//                 <h3 className="font-semibold text-foreground mb-2">Secure Form Verification</h3>
//                 <p className="text-sm text-muted-foreground">
//                   For security and fraud prevention purposes, your IP address will be automatically collected when you submit this form.
//                   This information is used solely for verification and to ensure the authenticity of your claim submission.
//                   Your IP address is protected in accordance with our Privacy Policy.
//                 </p>
//                 {trustedFormCertUrl && (
//                   <p className="text-xs text-primary mt-2 font-medium">
//                     ✓ Trusted Form verification active
//                   </p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Claim Information</CardTitle>
//             <CardDescription>
//               All fields marked with * are required
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Hidden fields for Trusted Form - uncontrolled so script can set them too */}
//               <input
//                 type="hidden"
//                 name="xxTrustedFormCertUrl"
//                 ref={certInputRef}
//                 defaultValue={trustedFormCertUrl}
//               />
//               <input
//                 type="hidden"
//                 name="xxTrustedFormPingUrl"
//                 ref={pingInputRef}
//                 defaultValue={trustedFormPingUrl}
//               />

//               {/* Personal Information */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Personal Information</h3>

//                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//                   {/* Full Name */}
//                   <div className="space-y-2">
//                     <Label htmlFor="fullName">Full Name *</Label>
//                     <Input
//                       id="fullName"
//                       name="fullName"
//                       type="text"
//                       placeholder="John Doe"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       className={errors.fullName ? 'border-destructive' : ''}
//                     />
//                     {errors.fullName && (
//                       <p className="text-sm text-destructive">{errors.fullName}</p>
//                     )}
//                   </div>

//                   {/* Email Address */}
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email Address *</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       placeholder="john.doe@example.com"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={errors.email ? 'border-destructive' : ''}
//                     />
//                     {errors.email && (
//                       <p className="text-sm text-destructive">{errors.email}</p>
//                     )}
//                   </div>

//                   {/* Phone Number */}
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number *</Label>
//                     <Input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       placeholder="(555) 123-4567"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className={errors.phone ? 'border-destructive' : ''}
//                     />
//                     {errors.phone && (
//                       <p className="text-sm text-destructive">{errors.phone}</p>
//                     )}
//                   </div>

//                   {/* Date of Incident */}
//                   <div className="space-y-2">
//                     <Label htmlFor="dateOfIncident">Date of Incident *</Label>
//                     <Input
//                       id="dateOfIncident"
//                       name="dateOfIncident"
//                       type="date"
//                       value={formData.dateOfIncident}
//                       onChange={handleInputChange}
//                       max={new Date().toISOString().split('T')[0]}
//                       className={errors.dateOfIncident ? 'border-destructive' : ''}
//                     />
//                     {errors.dateOfIncident && (
//                       <p className="text-sm text-destructive">{errors.dateOfIncident}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Accident Details */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Accident Details</h3>

//                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//                   {/* Accident Severity */}
//                   <div className="space-y-2">
//                     <Label htmlFor="accidentSeverity">Please select the severity of your accident *</Label>
//                     <Select
//                       value={formData.accidentSeverity}
//                       onValueChange={(value) => handleSelectChange('accidentSeverity', value)}
//                     >
//                       <SelectTrigger className={errors.accidentSeverity ? 'border-destructive' : ''}>
//                         <SelectValue placeholder="Select severity" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="major">Major</SelectItem>
//                         <SelectItem value="moderate">Moderate</SelectItem>
//                         <SelectItem value="minor">Minor</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {errors.accidentSeverity && (
//                       <p className="text-sm text-destructive">{errors.accidentSeverity}</p>
//                     )}
//                   </div>

//                   {/* Last Medical Treatment */}
//                   <div className="space-y-2">
//                     <Label htmlFor="lastMedicalTreatment">When was the last time you received medical treatment *</Label>
//                     <p className="text-xs text-muted-foreground">(Ambulance, Hospital, ER, Chiropractor, Doctor, etc)</p>
//                     <Select
//                       value={formData.lastMedicalTreatment}
//                       onValueChange={(value) => handleSelectChange('lastMedicalTreatment', value)}
//                     >
//                       <SelectTrigger className={errors.lastMedicalTreatment ? 'border-destructive' : ''}>
//                         <SelectValue placeholder="Select timeframe" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="today">Today</SelectItem>
//                         <SelectItem value="this_week">This Week</SelectItem>
//                         <SelectItem value="this_month">This Month</SelectItem>
//                         <SelectItem value="more_than_month">More than a Month Ago</SelectItem>
//                         <SelectItem value="never">Never Received Treatment</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {errors.lastMedicalTreatment && (
//                       <p className="text-sm text-destructive">{errors.lastMedicalTreatment}</p>
//                     )}
//                   </div>

//                   {/* Was Your Fault */}
//                   <div className="space-y-2">
//                     <Label htmlFor="wasYourFault">Was the accident your fault *</Label>
//                     <Select
//                       value={formData.wasYourFault}
//                       onValueChange={(value) => handleSelectChange('wasYourFault', value)}
//                     >
//                       <SelectTrigger className={errors.wasYourFault ? 'border-destructive' : ''}>
//                         <SelectValue placeholder="Select answer" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="yes">Yes</SelectItem>
//                         <SelectItem value="no">No</SelectItem>
//                         <SelectItem value="not_sure">Not Sure</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {errors.wasYourFault && (
//                       <p className="text-sm text-destructive">{errors.wasYourFault}</p>
//                     )}
//                   </div>

//                   {/* Accepted Settlement */}
//                   <div className="space-y-2">
//                     <Label htmlFor="acceptedSettlement">Have you accepted a settlement for your accident *</Label>
//                     <Select
//                       value={formData.acceptedSettlement}
//                       onValueChange={(value) => handleSelectChange('acceptedSettlement', value)}
//                     >
//                       <SelectTrigger className={errors.acceptedSettlement ? 'border-destructive' : ''}>
//                         <SelectValue placeholder="Select answer" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="yes">Yes</SelectItem>
//                         <SelectItem value="no">No</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {errors.acceptedSettlement && (
//                       <p className="text-sm text-destructive">{errors.acceptedSettlement}</p>
//                     )}
//                   </div>

//                   {/* Working With Attorney */}
//                   <div className="space-y-2">
//                     <Label htmlFor="workingWithAttorney">Are you currently working with an attorney *</Label>
//                     <Select
//                       value={formData.workingWithAttorney}
//                       onValueChange={(value) => handleSelectChange('workingWithAttorney', value)}
//                     >
//                       <SelectTrigger className={errors.workingWithAttorney ? 'border-destructive' : ''}>
//                         <SelectValue placeholder="Select answer" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="yes">Yes</SelectItem>
//                         <SelectItem value="no">No</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {errors.workingWithAttorney && (
//                       <p className="text-sm text-destructive">{errors.workingWithAttorney}</p>
//                     )}
//                   </div>

//                   {/* Location */}
//                   <div className="space-y-2">
//                     <Label htmlFor="location">Location *</Label>
//                     <Select
//                       value={formData.location}
//                       onValueChange={(value) => handleSelectChange('location', value)}
//                     >
//                       <SelectTrigger className={errors.location ? 'border-destructive' : ''}>
//                         <SelectValue placeholder="Select state" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {US_STATES.map((state) => (
//                           <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '_')}>
//                             {state}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     {errors.location && (
//                       <p className="text-sm text-destructive">{errors.location}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* TCPA / consent */}
//               <p className="text-xs text-muted-foreground mt-2">
//                 By submitting this form, you consent to receive communications regarding your claim,
//                 including calls or text messages, in accordance with the TCPA (Telephone Consumer Protection Act).
//               </p>

//               {/* Submit Button */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-6">
//                 <Button
//                   type="submit"
//                   size="lg"
//                   className="flex-1"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     'Submit Claim'
//                   )}
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="lg"
//                   onClick={() => navigate('/')}
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default FormPage;



// COMPLETE AND FINAL Form.tsx — WITH AUTO-LOGIC FIELDS
// Fully integrated, ready to paste into your project
// Includes: First/Last Name, Injuries, Fault, Address, Summary, Auto‑Derived Logic Fields
// // 
import React, { useState, useEffect, useRef } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

// --------------------------------------------------
// INTERFACE
// --------------------------------------------------
interface ExtendedFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfIncident: string
  accidentSeverity: string
  lastMedicalTreatment: string
  wasYourFault: string
  acceptedSettlement: string
  workingWithAttorney: string
  location: string

  summary: string
  injuries: string
  address1: string
  address2: string
  postalCode: string
  city: string
  state: string
  accidentState: string

  occurred_within_30_days: string
  occurred_31_to_60_days: string
  occurred_61_to_90_days: string
  occurred_3_to_6_months: string
  occurred_6_to_9_months: string
  occurred_9_to_12_months: string

  has_physical_injuries: string
  had_medical_treatment_within_14_days_of_accident: string
  medical_documentation_confirms_treatment_timing_continuity_from_lead_submission: string
  has_ongoing_medical_treatment_once_a_month_at_least: string
  medical_report_available_or_can_be_obtained_on_request: string
  was_not_at_fault: string
  has_no_current_attorney: string
  has_not_been_dropped: string
  has_not_settled: string
  has_insurance_or_uninsured_motorist_coverage: string
  has_police_investigated: string
  police_report_confirms_accident_and_date: string
  police_report_available_or_can_be_obtained_on_request: string
}

// --------------------------------------------------
// DEFAULT FORM
// --------------------------------------------------
const defaultForm: ExtendedFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfIncident: '',
  accidentSeverity: '',
  lastMedicalTreatment: '',
  wasYourFault: '',
  acceptedSettlement: '',
  workingWithAttorney: '',
  location: '',

  summary: '',
  injuries: '',
  address1: '',
  address2: '',
  postalCode: '',
  city: '',
  state: '',
  accidentState: '',

  occurred_within_30_days: 'false',
  occurred_31_to_60_days: 'false',
  occurred_61_to_90_days: 'false',
  occurred_3_to_6_months: 'false',
  occurred_6_to_9_months: 'false',
  occurred_9_to_12_months: 'false',

  has_physical_injuries: 'false',
  had_medical_treatment_within_14_days_of_accident: 'false',
  medical_documentation_confirms_treatment_timing_continuity_from_lead_submission: 'false',
  has_ongoing_medical_treatment_once_a_month_at_least: 'false',
  medical_report_available_or_can_be_obtained_on_request: 'false',
  was_not_at_fault: 'false',
  has_no_current_attorney: 'false',
  has_not_been_dropped: 'false',
  has_not_settled: 'false',
  has_insurance_or_uninsured_motorist_coverage: 'false',
  has_police_investigated: 'false',
  police_report_confirms_accident_and_date: 'false',
  police_report_available_or_can_be_obtained_on_request: 'false',
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------
export default function FormPage() {
  const [formData, setFormData] = useState(defaultForm)

  const certInputRef = useRef<HTMLInputElement | null>(null)
  const pingInputRef = useRef<HTMLInputElement | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  // -----------------------------
  // Auto-derived logic
  // -----------------------------
  useEffect(() => {
    if (!formData.dateOfIncident) return
    const today = new Date()
    const incident = new Date(formData.dateOfIncident)
    const diffDays = Math.floor((today.getTime() - incident.getTime()) / (1000 * 3600 * 24))
    const updated = { ...formData }
    updated.occurred_within_30_days = (diffDays <= 30).toString()
    updated.occurred_31_to_60_days = (diffDays > 30 && diffDays <= 60).toString()
    updated.occurred_61_to_90_days = (diffDays > 60 && diffDays <= 90).toString()
    updated.occurred_3_to_6_months = (diffDays > 90 && diffDays <= 180).toString()
    updated.occurred_6_to_9_months = (diffDays > 180 && diffDays <= 270).toString()
    updated.occurred_9_to_12_months = (diffDays > 270 && diffDays <= 365).toString()
    setFormData(updated)
  }, [formData.dateOfIncident])

  useEffect(() => {
    setFormData(prev => ({ ...prev, has_physical_injuries: (prev.injuries !== 'none' && prev.injuries !== '').toString() }))
  }, [formData.injuries])

  useEffect(() => {
    setFormData(prev => ({ ...prev, was_not_at_fault: (prev.wasYourFault === 'no').toString() }))
  }, [formData.wasYourFault])

  // -----------------------------
  // TrustedForm polling (hidden inputs)
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).xxTrustedForm?.certUrl && certInputRef.current) {
        certInputRef.current.value = (window as any).xxTrustedForm.certUrl
      }
      if ((window as any).xxTrustedForm?.pingUrl && pingInputRef.current) {
        pingInputRef.current.value = (window as any).xxTrustedForm.pingUrl
      }
    }, 150)

    const timeout = setTimeout(() => clearInterval(interval), 5000)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  // -----------------------------
  // Submit handler
  // -----------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    console.log('TrustedForm Cert URL:', certInputRef.current?.value)
    console.log('TrustedForm Ping URL:', pingInputRef.current?.value)
    // send formData + trustedform URLs to backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 p-6 max-w-3xl mx-auto">
      {/* TrustedForm hidden fields */}
      <input type="hidden" name="xxTrustedFormCertUrl" ref={certInputRef} />
      <input type="hidden" name="xxTrustedFormPingUrl" ref={pingInputRef} />

      {/* PERSONAL DETAILS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Details</h2>
        <div className="space-y-2">
          <Label>First Name *</Label>
          <Input name="firstName" value={formData.firstName} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label>Last Name *</Label>
          <Input name="lastName" value={formData.lastName} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label>Email *</Label>
          <Input name="email" type="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label>Phone *</Label>
          <Input name="phone" value={formData.phone} onChange={handleInputChange} />
        </div>
      </div>

      {/* ACCIDENT DETAILS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Accident Details</h2>
        <div className="space-y-2">
          <Label>Accident Summary *</Label>
          <Input name="summary" value={formData.summary} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label>Injuries Sustained *</Label>
          <Select value={formData.injuries} onValueChange={(v) => handleSelectChange('injuries', v)}>
            <SelectTrigger><SelectValue placeholder="Select injury severity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="minor">Minor Injury (Cuts, scrapes, bruises)</SelectItem>
              <SelectItem value="mild">Mild Injury (Soreness, aches, pains)</SelectItem>
              <SelectItem value="moderate">Moderate Injury (Broken bones, dislocations)</SelectItem>
              <SelectItem value="severe">Severe Injury (Extensive treatment or surgery)</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Was the accident your fault?</Label>
          <Select value={formData.wasYourFault} onValueChange={(v) => handleSelectChange('wasYourFault', v)}>
            <SelectTrigger><SelectValue placeholder="Select one" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date of Incident *</Label>
          <Input type="date" name="dateOfIncident" value={formData.dateOfIncident} onChange={handleInputChange} />
        </div>
      </div>

      {/* ADDRESS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Address</h2>
        <Input name="address1" value={formData.address1} onChange={handleInputChange} placeholder="Address Line 1" />
        <Input name="address2" value={formData.address2} onChange={handleInputChange} placeholder="Address Line 2" />
        <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
        <Input name="state" value={formData.state} onChange={handleInputChange} placeholder="State" />
        <Input name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Postal Code" />
      </div>

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  )
}
