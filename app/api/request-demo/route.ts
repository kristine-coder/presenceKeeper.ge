import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { universityName, contactPerson, email, studentCount, message } = body

    if (!universityName || !contactPerson || !email || !studentCount) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    // Placeholder: log the inquiry — replace with email service or CRM integration
    console.log("=== New Demo Request ===")
    console.log(`University:    ${universityName}`)
    console.log(`Contact:       ${contactPerson}`)
    console.log(`Email:         ${email}`)
    console.log(`Student Count: ${studentCount}`)
    console.log(`Message:       ${message ?? "(none)"}`)
    console.log("=======================")

    // TODO: Integrate with email provider (e.g. Resend, SendGrid, Nodemailer)
    // TODO: Integrate with CRM (e.g. HubSpot, Notion DB, Airtable)

    return NextResponse.json(
      { success: true, message: "Demo request received. We will contact you within 1 business day." },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }
}
