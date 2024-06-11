import aws from 'aws-sdk'
import dotenv from 'dotenv'


dotenv.config()

// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY, // replace with your access key id
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // replace with your secret access key
  region: 'us-east-1' // replace with the AWS region you're using for SES
})

const ses = new aws.SES()

class MailerService {
  static sendEmail = async (params: aws.SES.SendEmailRequest) => {
    try {
      return await ses.sendEmail(params).promise()
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