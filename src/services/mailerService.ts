import { SESClient, SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses"
import dotenv from 'dotenv'


dotenv.config()

// Configure AWS SDK
// AWS SDK looks for these credentials
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS credentials not found in environment')
}

const sesClient = new SESClient({ region: "us-east-1" })

class MailerService {
  static sendEmail = async (params: SendEmailCommandInput) => {
    try {
      const command = new SendEmailCommand(params)
      return await sesClient.send(command)
    } catch (err) {
      console.error(err)
      throw new Error(`Error sending email: ${err}`)
    }
  }

  static sendMagicLink = async (email: string, magicLink: string) => {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: { Data: `Click on this link to log in: ${magicLink}` },
        },
        Subject: { Data: 'Your Magic Link' },
      },
      Source: 'your-email@example.com',
    }
    try {
      await MailerService.sendEmail(params)
    } catch (err) {
      throw new Error(`Error sending magic link: ${err}`)
    }
  }
}

export default MailerService