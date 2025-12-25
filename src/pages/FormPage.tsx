// import React, { useState, useEffect, useRef } from 'react'

// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Button } from '@/components/ui/button'
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select'
// const US_STATES = [
//   'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
//   'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
//   'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
//   'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
//   'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
// ]


// // --------------------------------------------------
// // INTERFACE
// // --------------------------------------------------
// interface ExtendedFormData {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   dateOfIncident: string
//   wasYourFault: string
//   acceptedSettlement: string
//   workingWithAttorney: string

//   summary: string
//   injuries: string
//   address1: string
//   address2: string
//   postalCode: string
//   city: string
//   state: string
//   accidentState: string

//   test_lead: string
//   publisher_id: string
//   type_of_delivery: string

//   occurred_within_30_days: string
//   occurred_31_to_60_days: string
//   occurred_61_to_90_days: string
//   occurred_3_to_6_months: string
//   occurred_6_to_9_months: string
//   occurred_9_to_12_months: string

//   has_physical_injuries: string
//   had_medical_treatment_within_14_days_of_accident: string
//   medical_documentation_confirms_treatment_timing_continuity_from_lead_submission: string
//   has_ongoing_medical_treatment_once_a_month_at_least: string
//   medical_report_available_or_can_be_obtained_on_request: string
//   was_not_at_fault: string
//   has_no_current_attorney: string
//   has_not_been_dropped: string
//   has_not_settled: string
//   has_insurance_or_uninsured_motorist_coverage: string
//   has_police_investigated: string
//   police_report_confirms_accident_and_date: string
//   police_report_available_or_can_be_obtained_on_request: string
//   verified_email_matches_pc: string
//   verified_phone_matches_pc: string
// }

// // --------------------------------------------------
// // DEFAULT FORM
// // --------------------------------------------------
// const defaultForm: ExtendedFormData = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   phone: '',
//   dateOfIncident: '',
//   wasYourFault: '',
//   acceptedSettlement: '',
//   workingWithAttorney: '',

//   summary: '',
//   injuries: '',
//   address1: '',
//   address2: '',
//   postalCode: '',
//   city: '',
//   state: '',
//   accidentState: 'CA',

//   test_lead: 'false',
//   publisher_id: '15',
//   type_of_delivery: 'warm_transfer',

//   occurred_within_30_days: 'false',
//   occurred_31_to_60_days: 'false',
//   occurred_61_to_90_days: 'false',
//   occurred_3_to_6_months: 'false',
//   occurred_6_to_9_months: 'false',
//   occurred_9_to_12_months: 'false',

//   has_physical_injuries: 'false',
//   had_medical_treatment_within_14_days_of_accident: 'false',
//   medical_documentation_confirms_treatment_timing_continuity_from_lead_submission: '',
//   has_ongoing_medical_treatment_once_a_month_at_least: 'false',
//   medical_report_available_or_can_be_obtained_on_request: 'true',
//   was_not_at_fault: 'false',
//   has_no_current_attorney: 'false',
//   has_not_been_dropped: 'true',
//   has_not_settled: 'false',
//   has_insurance_or_uninsured_motorist_coverage: 'true',
//   has_police_investigated: 'false',
//   police_report_confirms_accident_and_date: 'true',
//   police_report_available_or_can_be_obtained_on_request: 'true',
//   verified_email_matches_pc: 'true',
//   verified_phone_matches_pc: 'true',
// }

// // --------------------------------------------------
// // COMPONENT
// // --------------------------------------------------
// export default function FormPage() {
//   const [formData, setFormData] = useState(defaultForm)
//   const [consentChecked, setConsentChecked] = useState(false)

//   const certInputRef = useRef<HTMLInputElement | null>(null)
//   const pingInputRef = useRef<HTMLInputElement | null>(null)

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSelectChange = (field: string, value: string) => {
//     setFormData({ ...formData, [field]: value })
//   }

//   // -----------------------------
//   // AUTO DERIVED LOGIC
//   // -----------------------------
//   useEffect(() => {
//     if (!formData.dateOfIncident) return
//     const today = new Date()
//     const incident = new Date(formData.dateOfIncident)
//     const diffDays = Math.floor((today.getTime() - incident.getTime()) / (1000 * 3600 * 24))

//     setFormData(prev => ({
//       ...prev,
//       occurred_within_30_days: (diffDays <= 30).toString(),
//       occurred_31_to_60_days: (diffDays > 30 && diffDays <= 60).toString(),
//       occurred_61_to_90_days: (diffDays > 60 && diffDays <= 90).toString(),
//       occurred_3_to_6_months: (diffDays > 90 && diffDays <= 180).toString(),
//       occurred_6_to_9_months: (diffDays > 180 && diffDays <= 270).toString(),
//       occurred_9_to_12_months: (diffDays > 270 && diffDays <= 365).toString(),
//     }))
//   }, [formData.dateOfIncident])

//   useEffect(() => {
//     setFormData(prev => ({
//       ...prev,
//       has_physical_injuries: (prev.injuries !== '' && prev.injuries !== 'none').toString(),
//     }))
//   }, [formData.injuries])

//   useEffect(() => {
//     setFormData(prev => ({
//       ...prev,
//       was_not_at_fault: (prev.wasYourFault === 'no').toString(),
//     }))
//   }, [formData.wasYourFault])

//   useEffect(() => {
//     setFormData(prev => ({
//       ...prev,
//       has_no_current_attorney: (prev.workingWithAttorney === 'no').toString(),
//     }))
//   }, [formData.workingWithAttorney])

//   useEffect(() => {
//     setFormData(prev => ({
//       ...prev,
//       has_not_settled: (prev.acceptedSettlement === 'no').toString(),
//     }))
//   }, [formData.acceptedSettlement])

//   // -----------------------------
//   // TRUSTEDFORM POLLING
//   // -----------------------------
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if ((window as any).xxTrustedForm?.certUrl && certInputRef.current) {
//         certInputRef.current.value = (window as any).xxTrustedForm.certUrl
//       }
//       if ((window as any).xxTrustedForm?.pingUrl && pingInputRef.current) {
//         pingInputRef.current.value = (window as any).xxTrustedForm.pingUrl
//       }
//     }, 150)

//     setTimeout(() => clearInterval(interval), 5000)
//     return () => clearInterval(interval)
//   }, [])

//   // -----------------------------
//   // QUALITY GATE
//   // -----------------------------
//   const isQualityLead = (d: ExtendedFormData) =>
//     d.occurred_within_30_days === 'true' &&
//     d.has_physical_injuries === 'true' &&
//     d.had_medical_treatment_within_14_days_of_accident === 'true' &&
//     Number(d.medical_documentation_confirms_treatment_timing_continuity_from_lead_submission) <= 60 &&
//     d.has_ongoing_medical_treatment_once_a_month_at_least === 'true' &&
//     d.medical_report_available_or_can_be_obtained_on_request === 'true' &&
//     d.was_not_at_fault === 'true' &&
//     d.has_no_current_attorney === 'true' &&
//     d.has_not_been_dropped === 'true' &&
//     d.has_not_settled === 'true' &&
//     d.has_insurance_or_uninsured_motorist_coverage === 'true' &&
//     d.has_police_investigated === 'true' &&
//     d.police_report_confirms_accident_and_date === 'true' &&
//     d.police_report_available_or_can_be_obtained_on_request === 'true' &&
//     d.verified_email_matches_pc === 'true' &&
//     d.verified_phone_matches_pc === 'true'

//   // -----------------------------
//   // SUBMIT
//   // -----------------------------
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     const payload = {
//       ...formData,
//       is_quality_lead: isQualityLead(formData),
//       trustedform_cert_url: certInputRef.current?.value,
//       trustedform_ping_url: pingInputRef.current?.value,
//     }

//     console.log('FINAL PAYLOAD', payload)
//   }


// // return (
// //   <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto">
// //     <input type="hidden" ref={certInputRef} />
// //     <input type="hidden" ref={pingInputRef} />

// //     {/* PERSONAL */}
// //     <Label>First Name</Label>
// //     <Input name="firstName" value={formData.firstName} onChange={handleInputChange} />

// //     <Label>Last Name</Label>
// //     <Input name="lastName" value={formData.lastName} onChange={handleInputChange} />

// //     <Label>Email</Label>
// //     <Input name="email" value={formData.email} onChange={handleInputChange} />

// //     <Label>Phone</Label>
// //     <Input name="phone" value={formData.phone} onChange={handleInputChange} />

// //     <Label>Summary</Label>
// //     <Input name="summary" value={formData.summary} onChange={handleInputChange} />

// //     {/* ADDRESS */}
// //     <Label>Address Line 1</Label>
// //     <Input name="address1" value={formData.address1} onChange={handleInputChange} />

// //     <Label>Address Line 2</Label>
// //     <Input name="address2" value={formData.address2} onChange={handleInputChange} />

// //      <Label>Postal Code</Label>
// //     <Input name="postalCode" value={formData.postalCode} onChange={handleInputChange} />


// //     {/* <Label>City</Label>
// //     <Input name="city" value={formData.city} onChange={handleInputChange} /> */}

// //     <Label>State</Label>
// //     <Select value={formData.state} onValueChange={v => handleSelectChange('state', v)}>
// //       <SelectTrigger>
// //         <SelectValue placeholder="Select state" />
// //       </SelectTrigger>
// //       <SelectContent>
// //         {US_STATES.map(s => (
// //           <SelectItem key={s} value={s}>{s}</SelectItem>
// //         ))}
// //       </SelectContent>
// //     </Select>

   
// //     {/* ACCIDENT */}
// //    <Label>Date of Incident</Label>
// //     <Input
// //       type="date"
// //       name="dateOfIncident"
// //       value={formData.dateOfIncident}
// //       onChange={handleInputChange}
// //     />


// //     <Label>Injuries</Label>
// // <Select
// //   value={formData.injuries}
// //   onValueChange={v => handleSelectChange('injuries', v)}
// // >
// //   <SelectTrigger>
// //     <SelectValue placeholder="Select injury type" />
// //   </SelectTrigger>
// //   <SelectContent>
// //     <SelectItem value="minor">
// //       Minor Injury (Cuts, scrapes, bruises)
// //     </SelectItem>
// //     <SelectItem value="moderate">
// //       Moderate Injury (Broken bones, dislocations)
// //     </SelectItem>
// //     <SelectItem value="severe">
// //       Severe Injury (Extensive treatment or surgery)
// //     </SelectItem>
// //     <SelectItem value="none">
// //       None (No injuries)
// //     </SelectItem>
// //   </SelectContent>
// // </Select>

    
// //     <Label>Was it your fault?</Label>
// //     <Select value={formData.wasYourFault} onValueChange={v => handleSelectChange('wasYourFault', v)}>
// //       <SelectTrigger><SelectValue /></SelectTrigger>
// //       <SelectContent>
// //         <SelectItem value="yes">Yes</SelectItem>
// //         <SelectItem value="no">No</SelectItem>
// //       </SelectContent>
// //     </Select>

// //     <Label>Medical treatment within 14 days?</Label>
// //     <Select
// //       value={formData.had_medical_treatment_within_14_days_of_accident}
// //       onValueChange={v =>
// //         handleSelectChange('had_medical_treatment_within_14_days_of_accident', v)
// //       }
// //     >
// //       <SelectTrigger><SelectValue /></SelectTrigger>
// //       <SelectContent>
// //         <SelectItem value="true">Yes</SelectItem>
// //         <SelectItem value="false">No</SelectItem>
// //       </SelectContent>
// //     </Select>

// //     <Label>Days to first medical documentation</Label>
// //     <Input
// //       name="medical_documentation_confirms_treatment_timing_continuity_from_lead_submission"
// //       value={formData.medical_documentation_confirms_treatment_timing_continuity_from_lead_submission}
// //       onChange={handleInputChange}
// //     />

// //     <Label>Ongoing medical treatment?</Label>
// //     <Select
// //       value={formData.has_ongoing_medical_treatment_once_a_month_at_least}
// //       onValueChange={v =>
// //         handleSelectChange('has_ongoing_medical_treatment_once_a_month_at_least', v)
// //       }
// //     >
// //       <SelectTrigger><SelectValue /></SelectTrigger>
// //       <SelectContent>
// //         <SelectItem value="true">Yes</SelectItem>
// //         <SelectItem value="false">No</SelectItem>
// //       </SelectContent>
// //     </Select>

// //     <Label>Working with attorney?</Label>
// //     <Select value={formData.workingWithAttorney} onValueChange={v => handleSelectChange('workingWithAttorney', v)}>
// //       <SelectTrigger><SelectValue /></SelectTrigger>
// //       <SelectContent>
// //         <SelectItem value="yes">Yes</SelectItem>
// //         <SelectItem value="no">No</SelectItem>
// //       </SelectContent>
// //     </Select>

// //     <Label>Accepted settlement?</Label>
// //     <Select value={formData.acceptedSettlement} onValueChange={v => handleSelectChange('acceptedSettlement', v)}>
// //       <SelectTrigger><SelectValue /></SelectTrigger>
// //       <SelectContent>
// //         <SelectItem value="yes">Yes</SelectItem>
// //         <SelectItem value="no">No</SelectItem>
// //       </SelectContent>
// //     </Select>

// //     <Label>Police report filed?</Label>
// //     <Select value={formData.has_police_investigated} onValueChange={v => handleSelectChange('has_police_investigated', v)}>
// //       <SelectTrigger><SelectValue /></SelectTrigger>
// //       <SelectContent>
// //         <SelectItem value="true">Yes</SelectItem>
// //         <SelectItem value="false">No</SelectItem>
// //       </SelectContent>
// //     </Select>

// //     <Button type="submit" className="w-full">
// //       Submit
// //     </Button>
// //   </form>
// // )
// return (
//   <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto">
//     <input type="hidden" ref={certInputRef} />
//     <input type="hidden" ref={pingInputRef} />

//     {/* PERSONAL */}
//     <Label>First Name</Label>
//     <Input
//       name="firstName"
//       value={formData.firstName}
//       onChange={handleInputChange}
//       required
//     />

//     <Label>Last Name</Label>
//     <Input
//       name="lastName"
//       value={formData.lastName}
//       onChange={handleInputChange}
//       required
//     />

//     <Label>Email</Label>
//     <Input
//       type="email"
//       name="email"
//       value={formData.email}
//       onChange={handleInputChange}
//       required
//     />

//     <Label>Phone</Label>
//     <Input
//       name="phone"
//       value={formData.phone}
//       onChange={handleInputChange}
//       required
//     />

//     <Label>Zip Code</Label>
//     <Input
//       name="postalCode"
//       value={formData.postalCode}
//       onChange={handleInputChange}
//       required
//     />

//     <Label>State</Label>
//     <Select
//       value={formData.state}
//       onValueChange={v => handleSelectChange('state', v)}
//     >
//       <SelectTrigger>
//         <SelectValue placeholder="Select state" />
//       </SelectTrigger>
//       <SelectContent>
//         {US_STATES.map(s => (
//           <SelectItem key={s} value={s}>
//             {s}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>

//     {/* CONSENT CHECKBOX */}
//     <div className="flex items-start gap-2 pt-4">
//       <input
//         type="checkbox"
//         id="consent"
//         checked={consentChecked}
//         onChange={e => setConsentChecked(e.target.checked)}
//         required
//         className="mt-1"
//       />
//       <Label htmlFor="consent" className="text-sm leading-snug">
//         By submitting, you agree to Crash Claim’s Terms & Conditions and Privacy Policy and confirm you meet the eligibility requirements above, including timeframe, injuries, not-at-fault status, police or medical verification, no current attorney, not settled or dropped, and SMS consent.
//       </Label>
//     </div>

//     <Button type="submit" className="w-full" disabled={!consentChecked}>
//       Submit
//     </Button>
//   </form>
// )

// }


// ----

// import React, { useState } from "react"

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select"

// const US_STATES = [
//   "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
//   "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
//   "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
//   "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
//   "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
// ]

// // -------------------------------------
// // MINIMAL FORM DATA
// // -------------------------------------
// interface SimpleFormData {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   postalCode: string
//   state: string
// }

// const defaultForm: SimpleFormData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   postalCode: "",
//   state: "",
// }

// // -------------------------------------
// // COMPONENT
// // -------------------------------------
// export default function FormPage() {
//   const [formData, setFormData] = useState(defaultForm)
//   const [consentChecked, setConsentChecked] = useState(false)

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const handleSelectChange = (field: keyof SimpleFormData, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("FORM SUBMITTED", formData)
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6 p-6 max-w-3xl mx-auto"
//     >
//       <Label>First Name</Label>
//       <Input
//         name="firstName"
//         value={formData.firstName}
//         onChange={handleInputChange}
//         required
//       />

//       <Label>Last Name</Label>
//       <Input
//         name="lastName"
//         value={formData.lastName}
//         onChange={handleInputChange}
//         required
//       />

//       <Label>Email</Label>
//       <Input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         required
//       />

//       <Label>Phone</Label>
//       <Input
//         name="phone"
//         value={formData.phone}
//         onChange={handleInputChange}
//         required
//       />

//       <Label>Zip Code</Label>
//       <Input
//         name="postalCode"
//         value={formData.postalCode}
//         onChange={handleInputChange}
//         required
//       />

//       <Label>State</Label>
//       <Select
//         value={formData.state}
//         onValueChange={v => handleSelectChange("state", v)}
//       >
//         <SelectTrigger>
//           <SelectValue placeholder="Select state" />
//         </SelectTrigger>
//         <SelectContent>
//           {US_STATES.map(s => (
//             <SelectItem key={s} value={s}>
//               {s}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <div className="flex items-start gap-2 pt-4">
//         <input
//           type="checkbox"
//           checked={consentChecked}
//           onChange={e => setConsentChecked(e.target.checked)}
//           required
//         />
//         <Label className="text-sm leading-snug">
//          By submitting, you agree to Crash Claim’s Terms & Conditions and Privacy Policy and confirm you meet the eligibility requirements above, including timeframe, injuries, not-at-fault status, police/medical verification, no current attorney, not settled/dropped, and SMS consent.

//         </Label>
//       </div>

//       <Button
//         type="submit"
//         className="w-full"
//         disabled={!consentChecked}
//       >
//         Submit
//       </Button>
//     </form>
//   )
// }

// ----------


// import React, { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select"

// const US_STATES = [
//   "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
//   "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
//   "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
//   "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
//   "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
// ]

// interface SimpleFormData {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   postalCode: string
//   state: string
// }

// const defaultForm: SimpleFormData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   postalCode: "",
//   state: "",
// }

// export default function FormPage() {
//   const [formData, setFormData] = useState(defaultForm)
//   const [consentChecked, setConsentChecked] = useState(false)

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const handleSelectChange = (field: keyof SimpleFormData, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("FORM SUBMITTED", formData)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <Label>First Name</Label>
//           <Input
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <Label>Last Name</Label>
//           <Input
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <Label>Email</Label>
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <Label>Phone</Label>
//           <Input
//             name="phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <Label>Zip Code</Label>
//           <Input
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <Label>State</Label>
//           <Select
//             value={formData.state}
//             onValueChange={(v) => handleSelectChange("state", v)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select state" />
//             </SelectTrigger>
//             <SelectContent>
//               {US_STATES.map((s) => (
//                 <SelectItem key={s} value={s}>
//                   {s}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="flex items-start gap-2 pt-4">
//         <input
//           type="checkbox"
//           checked={consentChecked}
//           onChange={e => setConsentChecked(e.target.checked)}
//           required
//         />
//         <Label className="text-sm leading-snug">
//           By submitting, you agree to Crash Claim’s Terms & Conditions and Privacy Policy.
//         </Label>
//       </div>

//       <Button type="submit" className="w-full" disabled={!consentChecked}>
//         Submit
//       </Button>
//     </form>
//   )
// }

//  --------------
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
]

interface SimpleFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  postalCode: string
  state: string
}

const defaultForm: SimpleFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  postalCode: "",
  state: "",
}

export default function FormPage() {
  const [formData, setFormData] = useState(defaultForm)
  const [consentChecked, setConsentChecked] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (field: keyof SimpleFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("FORM SUBMITTED", formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto px-6 py-4"
    >
      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-1.5">
          <Label>First Name</Label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label>Last Name</Label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label>Phone</Label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label>Zip Code</Label>
          <Input
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label>State</Label>
          <Select
            value={formData.state}
            onValueChange={(v) => handleSelectChange("state", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3 mt-6">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={e => setConsentChecked(e.target.checked)}
          required
          className="mt-1"
        />
        <Label className="text-sm leading-snug">
By submitting, you agree to Crash Claim's Terms & Conditions and Privacy Policy. Also you acknowledge that you meet the eligibility requirements which includes timeframe, injuries nature, not-at-fault status, police/medical verification as per need, no current attorney, not settled/dropped before, and SMS consent.        </Label>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full mt-6"
        disabled={!consentChecked}
      >
        Submit
      </Button>
    </form>
  )
}
