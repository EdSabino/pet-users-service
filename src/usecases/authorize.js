const jwt = require('jsonwebtoken');

const generatePolicy = (principalId, resource, claims) => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: resource
        }
      ]
    },
    context: {
      stringKey: JSON.stringify(claims)
    }
  };
};

module.exports.execute = ({ authorizationToken, methodArn }) => {
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

  return jwt.verify(tokenValue, process.env.SECRET, (verifyError, decoded) => new Promise((resolve, reject) => {
    if (verifyError) {
      console.log(tokenValue);
      console.log(process.env.SECRET);
      console.log(verifyError);
      return reject('Unauthorized');
    }
    return resolve(generatePolicy(decoded._id, methodArn, decoded));
  }));
};
