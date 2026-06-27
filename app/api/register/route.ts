import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import QRCode from 'qrcode';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a simple verification URL for the QR code
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/verify?email=${encodeURIComponent(email)}`;
    
    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    
    const base64Data = qrDataUrl.split(',')[1];

    // If no Resend API key is provided, return a mocked response
    // so the app still functions visually for the user.
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        success: true, 
        mocked: true, 
        qrCode: qrDataUrl,
        message: 'Registration successful! (Mock mode: No RESEND_API_KEY provided)' 
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email with Resend
    const data = await resend.emails.send({
      from: 'Event Registration <onboarding@resend.dev>',
      to: email,
      subject: 'Your Event Verification QR Code',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #eaeaeb; border-radius: 8px;">
          <h2 style="color: #111827; margin-bottom: 16px;">Registration Confirmed!</h2>
          <p style="color: #4b5563; line-height: 1.5; margin-bottom: 24px;">
            Thank you for registering. Please present the attached QR code at the event entrance for quick verification.
          </p>
          <p style="color: #9ca3af; font-size: 14px; margin-top: 32px;">
            If you have any questions, simply reply to this email.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'ticket-qrcode.png',
          content: base64Data,
        }
      ]
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      mocked: false,
      message: 'Registration successful! Check your email for the QR code.' 
    });

  } catch (err: any) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: err.message || 'An error occurred during registration.' }, { status: 500 });
  }
}
