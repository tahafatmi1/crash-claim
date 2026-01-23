export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    postalCode,
    state,
    trustedform_cert_url
  } = req.body

  if (!trustedform_cert_url) {
    return res.status(400).json({ error: 'Missing TrustedForm certificate' })
  }

  const ravlcoPayload = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    zip: postalCode,
    state,
    trustedform_cert_url
  }

  try {
    const response = await fetch(
      'https://api.ravlco.com/leads/receive_crash_claim_lead',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RAVLCO_API_KEY}`
        },
        body: JSON.stringify(ravlcoPayload)
      }
    )

    const data = await response.json()
    return res.status(200).json(data)

  } catch (err: any) {
    return res.status(500).json({
      error: 'Server error',
      message: err.message
    })
  }
}
