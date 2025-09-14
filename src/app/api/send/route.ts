import { pretty, render } from "@react-email/render";
import { headers as getHeaders } from "next/headers";
import EmailTemplate from "@/components/email/email-template";
import payload from "@/payload";

export async function POST() {
  try {
    const headers = await getHeaders();
    await payload.auth({ headers });

    // TODO: Pass to lib or helper
    const html = await pretty(
      await render(EmailTemplate({ firstName: "Joao" })),
    );

    await payload.sendEmail({
      to: "aurimardev@gmail.com",
      subject: "This is a test email",
      html: html,
    });

    return Response.json("OK");
  } catch (error) {
    console.log("error");
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
