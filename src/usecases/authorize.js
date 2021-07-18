const jwt = require('jsonwebtoken');

const generatePolicy = (principalId, resource) => {
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
  };
};

module.exports.execute = ({ authorizationToken, methodArn }) => {
  if (!authorizationToken) {
    console.log('ntem')
    throw 'Unauthorized';
  }

  const tokenParts = authorizationToken.split(' ');
  const tokenValue = tokenParts[1];

  if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
    throw 'Unauthorized';
  }

  return jwt.verify(tokenValue, process.env.SECRET, (verifyError, decoded) => new Promise((resolve, reject) => {
    if (verifyError) {
      return reject('Unauthorized');
    }
    return resolve(generatePolicy(decoded._id, methodArn));
  }));
};
