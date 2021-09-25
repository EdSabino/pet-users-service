import { verify } from 'jsonwebtoken';

export class AuthorizeService {
  call({ authorizationToken }) {
    if (!authorizationToken) {
      console.log('CANT FIND TOKEN');
      throw 'Unauthorized';
    }
  
    const tokenParts = authorizationToken.split(' ');
    const tokenValue = tokenParts[1];
  
    if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
      console.log('TOKEN ON WRONG FORMAT');
      throw 'Unauthorized';
    }
  
    return verify(tokenValue, process.env.SECRET, (verifyError, decoded) => new Promise((resolve, reject) => {
      if (verifyError) {
        console.log(tokenValue);
        console.log(process.env.SECRET);
        console.log(verifyError);
        return reject('Unauthorized');
      }
      return resolve(this.generatePolicy(decoded._id, decoded));
    }));
  }

  private generatePolicy (principalId, claims) {
    return {
      principalId: principalId,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*"
          }
        ]
      },
      context: {
        stringKey: JSON.stringify(claims)
      }
    };
  };
  
}
