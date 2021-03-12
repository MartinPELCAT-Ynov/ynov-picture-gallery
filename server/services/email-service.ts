import { User } from "../gql/entity/User";
import {
  BASE64_SEPARATOR,
  FROM_EMAIl,
  mailTransport,
} from "../utils/mailer-utils";
import { Service } from "typedi";

@Service()
export class EmailService {
  async sendRegisterConfirmation(user: User, baseUrl: string) {
    const plain = `${user.uuid}${BASE64_SEPARATOR}${user.email}`;
    const buff = Buffer.from(plain, "ascii");
    const validationUrl = `${baseUrl}/email-validation/${buff.toString(
      "base64"
    )}`;

    await mailTransport.sendMail({
      from: FROM_EMAIl,
      to: user.email,
      subject: "Account validation",
      html: `
      <a href='${validationUrl}'>${validationUrl}</a>
      `,
    });
  }
}
