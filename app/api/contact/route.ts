import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Using Formspree (free service) - you can replace with your own endpoint
    const formspreeEndpoint = "https://formspree.io/f/xpznvqko" // Replace with your Formspree form ID

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _replyto: email,
          _subject: `Portfolio Contact: ${subject}`,
        }),
      })

      if (response.ok) {
        return NextResponse.json(
          {
            success: true,
            message: "Message sent successfully! I'll get back to you within 24-48 hours.",
          },
          { status: 200 },
        )
      } else {
        throw new Error("Failed to send via Formspree")
      }
    } catch (formspreeError) {
      // Fallback: Create a detailed mailto link as backup
      const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${subject}`)
      const mailtoBody = encodeURIComponent(`
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from Portfolio Website
${new Date().toLocaleString()}
      `)

      return NextResponse.json(
        {
          success: true,
          message: "Message prepared! Your email client will open to send the message.",
          mailtoLink: `mailto:abadimahder2415@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`,
          fallback: true,
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("Contact form error:", error)

    // Always provide a fallback mailto option
    const { name = "", email = "", subject = "", message = "" } = await request.json().catch(() => ({}))

    const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${subject || "General Inquiry"}`)
    const mailtoBody = encodeURIComponent(`
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from Portfolio Website
${new Date().toLocaleString()}
    `)

    return NextResponse.json(
      {
        success: true,
        message: "Email client will open to send your message directly.",
        mailtoLink: `mailto:abadimahder2415@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`,
        fallback: true,
      },
      { status: 200 },
    )
  }
}
