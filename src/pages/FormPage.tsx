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
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-3xl mx-auto px-6 py-4"
//     >
//       {/* Fields */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
//         <div className="space-y-1.5">
//           <Label>First Name</Label>
//           <Input
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="space-y-1.5">
//           <Label>Last Name</Label>
//           <Input
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="space-y-1.5">
//           <Label>Email</Label>
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="space-y-1.5">
//           <Label>Phone</Label>
//           <Input
//             name="phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="space-y-1.5">
//           <Label>Zip Code</Label>
//           <Input
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="space-y-1.5">
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

//       {/* Consent */}
//       <div className="flex items-start gap-3 mt-6">
//         <input
//           type="checkbox"
//           checked={consentChecked}
//           onChange={e => setConsentChecked(e.target.checked)}
//           required
//           className="mt-1"
//         />
//         <Label className="text-sm leading-snug">
// By submitting, you agree to Crash Claim's Terms & Conditions and Privacy Policy. Also you acknowledge that you meet the eligibility requirements which includes timeframe, injuries nature, not-at-fault status, police/medical verification as per need, no current attorney, not settled/dropped before, and SMS consent.        </Label>
//       </div>

//       {/* Submit */}
//       <Button
//         type="submit"
//         className="w-full mt-6"
//         disabled={!consentChecked}
//       >
//         Submit
//       </Button>
//     </form>
//   )
// }


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
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()

  const [formData, setFormData] = useState(defaultForm)
  const [consentChecked, setConsentChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const certInput = document.querySelector(
    'input[name="xxTrustedFormCertUrl"]'
  ) as HTMLInputElement | null

  const trustedform_cert_url = certInput?.value || ""

  try {
    const res = await fetch("/api/submit-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        trustedform_cert_url,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data?.error || "Submission failed")
    }

    // ✅ SUCCESS REDIRECT
    window.location.href = "/thank-you"

  } catch (err: any) {
    alert(err.message || "Something went wrong. Please try again.")
  }
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
          By submitting, you agree to Crash Claim's Terms & Conditions and Privacy Policy.
          Also you acknowledge that you meet the eligibility requirements which includes
          timeframe, injuries nature, not-at-fault status, police/medical verification as per need,
          no current attorney, not settled/dropped before, and SMS consent.
        </Label>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 mt-4">
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full mt-6"
        disabled={!consentChecked || loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  )
}
