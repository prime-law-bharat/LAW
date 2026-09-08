import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const qualification = formData.get('qualification') as string;
    const area_of_interest = formData.get('area_of_interest') as string;
    const experience = formData.get('experience') as string;
    const message = formData.get('message') as string;
    const attachment = formData.get('attachment') as File | null;

    const brevoApiKey = process.env.BREVO_API_KEY;
    const templateId = parseInt(process.env.BREVO_CAREER_TEMPLATE_ID || '6');
    const receiver = process.env.RECEIVER_EMAIL || 'primelawbharat@gmail.com';

    if (!brevoApiKey) {
      console.error('Brevo API key not configured');
      return NextResponse.json({ success: false, message: 'Server email configuration missing' }, { status: 500 });
    }

    const payload: any = {
      templateId: templateId,
      to: [{ email: receiver }],
      replyTo: { email: email, name: name },
      params: {
        name: name,
        email: email,
        phone: phone,
        qualification: qualification,
        area_of_interest: area_of_interest,
        experience: experience,
        message: message
      }
    };

    if (attachment && attachment.size > 0) {
      const buffer = Buffer.from(await attachment.arrayBuffer());
      payload.attachment = [{
        name: attachment.name,
        content: buffer.toString('base64')
      }];
    }

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
    console.error('Failed to process career form:', error);
    return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
  }
}
