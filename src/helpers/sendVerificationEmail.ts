import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/VerificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  otp: string,   // renamed from verifyCode to otp
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'you@example.com',
      to: email,
      subject: 'Talker | Verification code',
      react: VerificationEmail({ username, otp }),  // use otp prop here
    });

    return { sucess: true, message: 'Verification email sent successfully' };  // property name matches ApiResponse type
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return {
      sucess: false,
      message: 'Failed to send verification email',
    };
  }
}
