"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeService = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var AuthorizeService = /** @class */ (function () {
    function AuthorizeService() {
    }
    AuthorizeService.prototype.call = function (_a) {
        var _this = this;
        var authorizationToken = _a.authorizationToken;
        if (!authorizationToken) {
            console.log('CANT FIND TOKEN');
            throw 'Unauthorized';
        }
        var tokenParts = authorizationToken.split(' ');
        var tokenValue = tokenParts[1];
        if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
            console.log('TOKEN ON WRONG FORMAT');
            throw 'Unauthorized';
        }
        return jsonwebtoken_1.default.verify(tokenValue, process.env.SECRET, function (verifyError, decoded) { return new Promise(function (resolve, reject) {
            if (verifyError) {
                console.log(tokenValue);
                console.log(process.env.SECRET);
                console.log(verifyError);
                return reject('Unauthorized');
            }
            return resolve(_this.generatePolicy(decoded._id, decoded));
        }); });
    };
    AuthorizeService.prototype.generatePolicy = function (principalId, claims) {
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
    ;
    return AuthorizeService;
}());
exports.AuthorizeService = AuthorizeService;
//# sourceMappingURL=authorize.js.map