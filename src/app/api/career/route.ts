import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { waitUntil } from '@vercel/functions';
import path from 'path';
import fs from 'fs';

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

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const receiver = process.env.RECEIVER_EMAIL || user;

    if (!user || !pass) {
      console.error('Email credentials not configured');
      return NextResponse.json({ success: false, message: 'Server email configuration missing' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Career Application</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e2e8f0; margin: 0; padding: 40px 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #0A1220; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #1a2c47; }
        .header { background-color: #0F1B2D; padding: 45px 20px; text-align: center; border-bottom: 2px solid #C9A45C; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 16px; color: #a0aec0; margin-bottom: 35px; line-height: 1.6; text-align: center; }
        .field { margin-bottom: 25px; background-color: rgba(255, 255, 255, 0.03); padding: 20px; border-radius: 6px; border-left: 3px solid #C9A45C; }
        .field-label { font-size: 11px; color: #C9A45C; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; font-weight: 600; }
        .field-value { font-size: 15px; color: #ffffff; font-weight: 400; line-height: 1.6; white-space: pre-wrap; }
        .field-value a { color: #ffffff; text-decoration: none; }
        .field-value a:hover { color: #C9A45C; }
        .footer { background-color: #0F1B2D; padding: 25px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #1a2c47; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://i.ibb.co/0pwHnxVT/logo-1-removebg.png" alt="Prime Law Bharat Logo" style="max-height: 80px; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;" />
          <h1 style="color: #ffffff; font-family: 'Times New Roman', Times, serif; font-size: 26px; font-weight: bold; margin: 0; letter-spacing: 1px; text-transform: uppercase;">
            PRIME LAW <span style="color:#FF671F">B</span><span style="color:#FFAC81">H</span><span style="color:#FFF2EC">A</span><span style="color:#D5E8DD">R</span><span style="color:#63A783">A</span><span style="color:#046A38">T</span>
          </h1>
          <div style="font-size: 10px; color: #a0aec0; letter-spacing: 3px; text-transform: uppercase; margin-top: 8px;">Advocates & Legal Consultants</div>
          <div style="width: 40px; height: 1px; background-color: #C9A45C; margin: 20px auto;"></div>
          <h2 style="color: #ffffff; margin: 0; font-size: 14px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase;">New Career Application</h2>
        </div>
        <div class="content">
          <div class="greeting">A new career application has been submitted through the website.</div>
          
          <div class="field">
            <div class="field-label">Full Name</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${email}">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
          </div>

          <div class="field">
            <div class="field-label">Current Role / Qualification</div>
            <div class="field-value">${qualification}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Area of Interest</div>
            <div class="field-value">${area_of_interest}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Experience</div>
            <div class="field-value">${experience}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Message / Cover Note</div>
            <div class="field-value">${message}</div>
          </div>
          
          ${attachment && attachment.size > 0 ? `
          <div class="field" style="margin-top: 30px;">
            <div class="field-label" style="color: #C9A45C;">Attachment Included</div>
            <div style="font-size: 14px; color: #a0aec0;">The candidate has attached a file (Resume/CV) to this email.</div>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          This email was automatically generated from the Prime Law Bharat website career form.
        </div>
      </div>
    </body>
    </html>
    `;

    // Process the attachments
    const attachments: nodemailer.SendMailOptions['attachments'] = [];
    
    if (attachment && attachment.size > 0) {
      const buffer = Buffer.from(await attachment.arrayBuffer());
      attachments.push({
        filename: attachment.name,
        content: buffer
      });
    }

    // Send email asynchronously in the background so the user doesn't have to wait
    const emailPromise = transporter.sendMail({
      from: `"Prime Law Bharat" <${user}>`,
      to: receiver,
      replyTo: email,
      subject: `Career Application: ${name} - ${area_of_interest}`,
      html: htmlContent,
      attachments
    }).catch(error => {
      console.error('Failed to send background email:', error);
    });
    
    // Tell Vercel to keep the function alive until the email sends
    waitUntil(emailPromise);

    // Instantly return success to the frontend
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Career Form Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to process application' }, { status: 500 });
  }
}
