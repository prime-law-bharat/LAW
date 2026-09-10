import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const legal_domain = formData.get('legal_domain') as string || 'Not specified';
    const message = formData.get('message') as string;

    const brevoApiKey = process.env.BREVO_API_KEY;
    const templateId = parseInt(process.env.BREVO_CONTACT_TEMPLATE_ID || '4');
    const receiver = process.env.RECEIVER_EMAIL || 'primelawbharat@gmail.com';

    if (!brevoApiKey) {
      console.error('Brevo API key not configured');
      return NextResponse.json({ success: false, message: 'Server email configuration missing' }, { status: 500 });
    }

    const payload = {
      templateId: templateId,
      to: [{ email: receiver }],
      replyTo: { email: email, name: name },
      params: {
        name: name,
        email: email,
        phone: phone,
        legal_domain: legal_domain,
        message: message
      }
    };

    // Send email using Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      throw new Error(`Brevo API error: ${response.status}`);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send message' }, { status: 500 });
  }
}
