"use server";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  return `${local.slice(0, 1)}***@${domain}`;
}

export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    console.warn("[newsletter] rejected subscription: invalid email");
    return { status: "error", message: "Please enter a valid email address." };
  }

  const recipient = process.env.EMAIL_ADDRESS;
  if (!recipient) {
    console.warn(
      "[newsletter] EMAIL_ADDRESS is not set; simulating dispatch without a recipient",
    );
  }

  // Simulated notification dispatch: no email provider is wired up yet.
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.info(
    `[newsletter] notification dispatched to ${recipient ?? "(unset)"}: new subscriber ${maskEmail(email)}`,
  );

  return { status: "success", message: "Thank you for subscribing!" };
}
