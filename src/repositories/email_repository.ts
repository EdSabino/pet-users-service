import { SNS } from 'aws-sdk';

export class EmailRepository {
  constructor () {
    this.sns = new SNS({
      region: 'us-east-1'
    });
  }

  private sns: any;

  async dispatch(template: string, to: string, locals: any) {
    await this.publishMessage(process.env.SNS_TOPIC_EMAIL || '', {
      template,
      to,
      locals
    });
  }
  

  private async publishMessage(topic: string, message: any) {
    return this.sns
      .publish({
        Message: JSON.stringify(message),
        TopicArn: topic
      })
      .promise()
  }
}
