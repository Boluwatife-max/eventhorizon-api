
const sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.VERIFICATION_BASE_URL}/api/auth/verify-email?token=${token}`;

  const htmlBody = `
    <h2>Welcome to EventHorizon!</h2>
    <p>Thank you for registering.</p>
    <p>Please click the link below to verify your email address:</p>
    <p><a href="${verificationLink}">Verify Email</a></p>
    <p>This link will expire in 1 hour.</p>
  `;

  const response = await fetch(process.env.EMAIL_BRIDGE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: process.env.EMAIL_BRIDGE_SECRET,
      to: email,
      subject: "Verify your EventHorizon account",
      body: `Welcome to EventHorizon! Please verify your email address using this link: ${verificationLink}\n\nThis link expires in 1 hour.`,
      htmlBody,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email bridge HTTP error: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(`Email bridge failed: ${result.message || "Unknown error"}`);
  }
};

module.exports = sendVerificationEmail;