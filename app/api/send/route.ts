import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/email-template";

const resend = new Resend(process.env.RESEND_APIKEY);

export async function POST(req: Request) {
  try {
    const dataForm = await req.json();
    try {
      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["camiloescar1995@gmail.com"],
        subject: "Test email",
        react: EmailTemplate({
          firstName: dataForm.username,
          message: dataForm.message,
          email: dataForm.email,
        }),
        text: "camilo",
      });
      return Response.json(data)

    } catch (error) {
      return Response.json({ error });
    }
  } catch (error) {
    return Response.json({ error });
  }
}
