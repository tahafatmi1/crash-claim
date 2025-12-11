import React, { useEffect, useRef, useState } from 'react';

/**
 * TrustedFormReact.tsx
 * Single-file React + TypeScript component that renders a form matching the JSON payload
 * you provided. It injects the TrustedForm script, keeps hidden inputs for cert & ping,
 * attempts to capture user IP (via ipify as a best-effort fallback), validates required
 * fields, and submits the JSON payload to /api/submit-claim (replace with your backend).
 *
 * Usage: drop this file into your React app and import where needed.
 * Tailwind / design tokens are not required — plain classes are used for clarity.
 */

type Payload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  summary: string;
  address_1: string;
  address_2: string;
  postal_code: string;
  state: string;
  accident_state: string;
  incident_date: string; // YYYY-MM-DD
  injuries: string;
  test_lead: boolean;
  trustedform_cert_url?: string | null;
  trustedform_ping_url?: string | null;
  publisher_id?: number | null;
  city: string;
  type_of_delivery: string;

  // intake gates
  occurred_within_30_days: boolean;
  occurred_31_to_60_days: boolean;
  occurred_61_to_90_days: boolean;
  occurred_3_to_6_months: boolean;
  occurred_6_to_9_months: boolean;
  occurred_9_to_12_months: boolean;
  has_physical_injuries: boolean;
  had_medical_treatment_within_14_days_of_accident: boolean;
  medical_documentation_confirms_treatment_timing_continuity_from_lead_submission: string | number;
  has_ongoing_medical_treatment_once_a_month_at_least: boolean;
  medical_report_available_or_can_be_obtained_on_request: boolean;
  was_not_at_fault: boolean;
  has_no_current_attorney: boolean;
  has_not_been_dropped: boolean;
  has_not_settled: boolean;
  has_insurance_or_uninsured_motorist_coverage: boolean;
  has_police_investigated: boolean;
  police_report_confirms_accident_and_date: boolean;
  police_report_available_or_can_be_obtained_on_request: boolean;
  verified_email_matches_pc: boolean;
  verified_phone_matches_pc: boolean;

  // extra: ip
  ip_address?: string | null;
};

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

const TrustedFormReact: React.FC = () => {
  // form state (flat)
  const [data, setData] = useState<Payload>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    summary: '',
    address_1: '',
    address_2: '',
    postal_code: '',
    state: 'CA',
    accident_state: 'CA',
    incident_date: '',
    injuries: '',
    test_lead: false,
    trustedform_cert_url: null,
    trustedform_ping_url: null,
    publisher_id: 2,
    city: '',
    type_of_delivery: 'warm_transfer',

    occurred_within_30_days: false,
    occurred_31_to_60_days: false,
    occurred_61_to_90_days: false,
    occurred_3_to_6_months: false,
    occurred_6_to_9_months: false,
    occurred_9_to_12_months: false,
    has_physical_injuries: false,
    had_medical_treatment_within_14_days_of_accident: false,
    medical_documentation_confirms_treatment_timing_continuity_from_lead_submission: '',
    has_ongoing_medical_treatment_once_a_month_at_least: false,
    medical_report_available_or_can_be_obtained_on_request: false,
    was_not_at_fault: false,
    has_no_current_attorney: false,
    has_not_been_dropped: false,
    has_not_settled: false,
    has_insurance_or_uninsured_motorist_coverage: false,
    has_police_investigated: false,
    police_report_confirms_accident_and_date: false,
    police_report_available_or_can_be_obtained_on_request: false,
    verified_email_matches_pc: false,
    verified_phone_matches_pc: false,
    ip_address: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const certRef = useRef<HTMLInputElement | null>(null);
  const pingRef = useRef<HTMLInputElement | null>(null);

  // inject TrustedForm script once
  useEffect(() => {
    if (!document.getElementById('trustedform-js')) {
      const script = document.createElement('script');
      script.id = 'trustedform-js';
      script.src = 'https://api.trustedform.com/trustedform.js?field=trustedform_cert_url&ping_field=trustedform_ping_url&l=' + Date.now();
      script.async = true;
      document.head.appendChild(script);
    }

    // try to pre-fill IP using a public IP service (best-effort). This may fail in some environments.
    (async () => {
      try {
        const resp = await fetch('https://api.ipify.org?format=json');
        if (resp.ok) {
          const json = await resp.json();
          setData((prev) => ({ ...prev, ip_address: json.ip }));
        }
      } catch (e) {
        // ignore — TrustedForm will collect the IP server-side; this is only a client-side best-effort
      }
    })();
  }, []);

  // small helper: map input change
  const onChange = (k: keyof Payload, v: any) => {
    setData((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k as string]: '' }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!data.first_name.trim()) e.first_name = 'First name required';
    if (!data.last_name.trim()) e.last_name = 'Last name required';
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Valid email required';
    if (!data.phone.trim()) e.phone = 'Phone required';
    if (!data.incident_date) e.incident_date = 'Incident date required';
    if (!data.summary.trim()) e.summary = 'Short summary required';
    if (!data.injuries.trim()) e.injuries = 'Please list injuries or "None"';
    // basic intake gate check example: at least one occurred_* should be true
    const occurredAny = [
      data.occurred_within_30_days,
      data.occurred_31_to_60_days,
      data.occurred_61_to_90_days,
      data.occurred_3_to_6_months,
      data.occurred_6_to_9_months,
      data.occurred_9_to_12_months,
    ].some(Boolean);
    if (!occurredAny) e.occurred_within_30_days = 'Please indicate when the incident occurred (choose one)';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // helper to wait for TrustedForm cert (up to timeoutMs)
  const waitForCert = (timeoutMs = 2000): Promise<string | null> => {
    const start = Date.now();
    return new Promise((resolve) => {
      const tick = setInterval(() => {
        // TrustedForm places a global; try common names used earlier
        // window.trustedform, window.xxTrustedForm, window.trustedform_cert_url etc are possible
        const w = window as any;
        const cert = w.trustedform?.certUrl || w.xxTrustedForm?.certUrl || (w.trustedform_cert_url || null);
        const ping = w.trustedform?.pingUrl || w.xxTrustedForm?.pingUrl || (w.trustedform_ping_url || null);
        if (cert) {
          clearInterval(tick);
          // update local state & hidden inputs
          onChange('trustedform_cert_url', cert);
          onChange('trustedform_ping_url', ping || null);
          if (certRef.current) certRef.current.value = cert;
          if (pingRef.current) pingRef.current.value = ping || '';
          resolve(cert);
          return;
        }
        if (Date.now() - start >= timeoutMs) {
          clearInterval(tick);
          resolve(null);
        }
      }, 150);
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // wait briefly for TrustedForm
      await waitForCert(2000);

      // final payload
      const payload: Payload = { ...data };

      // POST to backend - replace URL if needed
      const resp = await fetch('/api/submit-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error('Network error');

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Failed to submit form, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold">Thanks — claim submitted</h2>
        <p>We received your information. You should receive a confirmation soon.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Trusted Form Intake</h1>
      <p className="text-sm mb-4">This form collects information about your incident. For fraud prevention we also collect IP and TrustedForm certification.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hidden fields for TrustedForm script to fill */}
        <input ref={certRef} type="hidden" name="trustedform_cert_url" />
        <input ref={pingRef} type="hidden" name="trustedform_ping_url" />

        {/* Personal */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">First name *</label>
            <input value={data.first_name} onChange={(s) => onChange('first_name', s.target.value)} className="w-full p-2 border" />
            {errors.first_name && <p className="text-xs text-red-600">{errors.first_name}</p>}
          </div>
          <div>
            <label className="block text-sm">Last name *</label>
            <input value={data.last_name} onChange={(s) => onChange('last_name', s.target.value)} className="w-full p-2 border" />
            {errors.last_name && <p className="text-xs text-red-600">{errors.last_name}</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm">Email *</label>
            <input value={data.email} onChange={(s) => onChange('email', s.target.value)} className="w-full p-2 border" />
            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm">Phone *</label>
            <input value={data.phone} onChange={(s) => onChange('phone', s.target.value)} className="w-full p-2 border" />
            {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm">City</label>
            <input value={data.city} onChange={(s) => onChange('city', s.target.value)} className="w-full p-2 border" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm">State</label>
            <select value={data.state} onChange={(s) => onChange('state', s.target.value)} className="w-full p-2 border">
              {US_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm">Postal Code</label>
            <input value={data.postal_code} onChange={(s) => onChange('postal_code', s.target.value)} className="w-full p-2 border" />
          </div>
          <div>
            <label className="block text-sm">Address 1</label>
            <input value={data.address_1} onChange={(s) => onChange('address_1', s.target.value)} className="w-full p-2 border" />
          </div>
        </div>

        <div>
          <label className="block text-sm">Address 2</label>
          <input value={data.address_2} onChange={(s) => onChange('address_2', s.target.value)} className="w-full p-2 border" />
        </div>

        {/* Accident */}
        <div>
          <label className="block text-sm">Incident Date *</label>
          <input type="date" value={data.incident_date} onChange={(s) => onChange('incident_date', s.target.value)} className="p-2 border" max={new Date().toISOString().split('T')[0]} />
          {errors.incident_date && <p className="text-xs text-red-600">{errors.incident_date}</p>}
        </div>

        <div>
          <label className="block text-sm">Accident State</label>
          <select value={data.accident_state} onChange={(s) => onChange('accident_state', s.target.value)} className="w-full p-2 border">
            {US_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm">Summary *</label>
          <textarea value={data.summary} onChange={(s) => onChange('summary', s.target.value)} className="w-full p-2 border" rows={3} />
          {errors.summary && <p className="text-xs text-red-600">{errors.summary}</p>}
        </div>

        <div>
          <label className="block text-sm">Injuries *</label>
          <input value={data.injuries} onChange={(s) => onChange('injuries', s.target.value)} className="w-full p-2 border" />
          {errors.injuries && <p className="text-xs text-red-600">{errors.injuries}</p>}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm">Type of delivery</label>
            <select value={data.type_of_delivery} onChange={(s) => onChange('type_of_delivery', s.target.value)} className="w-full p-2 border">
              <option value="warm_transfer">warm_transfer</option>
              <option value="lead">lead</option>
              <option value="email">email</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Publisher ID</label>
            <input type="number" value={String(data.publisher_id || '')} onChange={(s) => onChange('publisher_id', parseInt(s.target.value || '0'))} className="w-full p-2 border" />
          </div>

          <div className="flex items-center gap-2">
            <input id="test_lead" type="checkbox" checked={data.test_lead} onChange={(s) => onChange('test_lead', s.target.checked)} />
            <label htmlFor="test_lead" className="text-sm">Test lead</label>
          </div>
        </div>

        {/* Intake gates - many booleans */}
        <div className="grid grid-cols-2 gap-3">
          <fieldset className="p-3 border">
            <legend className="font-semibold">When did the incident occur? (pick one)</legend>
            <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_within_30_days} onChange={() => onChange('occurred_within_30_days', true)} /> <label>Within 30 days</label></div>
            <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_31_to_60_days} onChange={() => onChange('occurred_31_to_60_days', true)} /> <label>31–60 days</label></div>
            <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_61_to_90_days} onChange={() => onChange('occurred_61_to_90_days', true)} /> <label>61–90 days</label></div>
            <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_3_to_6_months} onChange={() => onChange('occurred_3_to_6_months', true)} /> <label>3–6 months</label></div>
            <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_6_to_9_months} onChange={() => onChange('occurred_6_to_9_months', true)} /> <label>6–9 months</label></div>
            <div className="flex gap-2 items-center"><input type="radio" checked={data.occurred_9_to_12_months} onChange={() => onChange('occurred_9_to_12_months', true)} /> <label>9–12 months</label></div>
            {errors.occurred_within_30_days && <p className="text-xs text-red-600">{errors.occurred_within_30_days}</p>}
          </fieldset>

          <fieldset className="p-3 border">
            <legend className="font-semibold">Medical / Legal</legend>
            <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_physical_injuries} onChange={(s) => onChange('has_physical_injuries', s.target.checked)} /> <label>Has physical injuries</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={data.had_medical_treatment_within_14_days_of_accident} onChange={(s) => onChange('had_medical_treatment_within_14_days_of_accident', s.target.checked)} /> <label>Had treatment within 14 days</label></div>
            <div>
              <label className="block text-sm">Medical documentation continuity (e.g. 60)</label>
              <input value={String(data.medical_documentation_confirms_treatment_timing_continuity_from_lead_submission)} onChange={(s) => onChange('medical_documentation_confirms_treatment_timing_continuity_from_lead_submission', s.target.value)} className="w-full p-2 border" />
            </div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_ongoing_medical_treatment_once_a_month_at_least} onChange={(s) => onChange('has_ongoing_medical_treatment_once_a_month_at_least', s.target.checked)} /> <label>Ongoing monthly treatment</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={data.medical_report_available_or_can_be_obtained_on_request} onChange={(s) => onChange('medical_report_available_or_can_be_obtained_on_request', s.target.checked)} /> <label>Medical report available</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={data.was_not_at_fault} onChange={(s) => onChange('was_not_at_fault', s.target.checked)} /> <label>Was not at fault</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_no_current_attorney} onChange={(s) => onChange('has_no_current_attorney', s.target.checked)} /> <label>Has no current attorney</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_not_been_dropped} onChange={(s) => onChange('has_not_been_dropped', s.target.checked)} /> <label>Has not been dropped</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_not_settled} onChange={(s) => onChange('has_not_settled', s.target.checked)} /> <label>Has not settled</label></div>
          </fieldset>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_insurance_or_uninsured_motorist_coverage} onChange={(s) => onChange('has_insurance_or_uninsured_motorist_coverage', s.target.checked)} /> <label>Has insurance / UM</label></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={data.has_police_investigated} onChange={(s) => onChange('has_police_investigated', s.target.checked)} /> <label>Police investigated</label></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={data.police_report_confirms_accident_and_date} onChange={(s) => onChange('police_report_confirms_accident_and_date', s.target.checked)} /> <label>Police report confirms date</label></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={data.police_report_available_or_can_be_obtained_on_request} onChange={(s) => onChange('police_report_available_or_can_be_obtained_on_request', s.target.checked)} /> <label>Police report available</label></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2"><input type="checkbox" checked={data.verified_email_matches_pc} onChange={(s) => onChange('verified_email_matches_pc', s.target.checked)} /> <label>Verified email matches PC</label></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={data.verified_phone_matches_pc} onChange={(s) => onChange('verified_phone_matches_pc', s.target.checked)} /> <label>Verified phone matches PC</label></div>
        </div>

        {/* IP display (optional) */}
        <div>
          <label className="block text-sm">IP (collected by TrustedForm & optionally by ipify)</label>
          <input value={String(data.ip_address || '')} readOnly className="w-full p-2 border bg-gray-50" />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
          <button type="button" onClick={() => { /* reset */ setData((d) => ({ ...d, first_name: '', last_name: '', email: '', phone: '' })); }} className="px-4 py-2 border">Clear</button>
        </div>
      </form>

      <p className="text-xs text-gray-600 mt-3">Note: TrustedForm script will attempt to populate the certification URL & ping fields. We also attempt to fetch public IP using a third-party (ipify) as a best-effort; if you prefer not to use that, remove the fetch call in useEffect.</p>
    </div>
  );
};

export default TrustedFormReact;
