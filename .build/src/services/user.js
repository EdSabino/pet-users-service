"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var User_1 = require("../models/User");
var shared_1 = require("shared");
var cache_repository_1 = require("../repositories/cache_repository");
var email_repository_1 = require("../repositories/email_repository");
var uuid_1 = require("uuid");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.changePassword = function (_a, body) {
        var pathParameters = _a.pathParameters;
        return __awaiter(this, void 0, void 0, function () {
            var _id, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.services.cache.getAndRemove(pathParameters.uuid)];
                    case 1:
                        _id = _b.sent();
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: _id }, { password: body.password })];
                    case 2:
                        user = _b.sent();
                        this.validateUser(user);
                        return [2 /*return*/, { _id: user._id }];
                }
            });
        });
    };
    UserService.prototype.confirmPassword = function (_a) {
        var pathParameters = _a.pathParameters;
        return __awaiter(this, void 0, void 0, function () {
            var _id, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.services.cache.getAndRemove(pathParameters.uuid)];
                    case 1:
                        _id = _b.sent();
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: _id }, { email_password: true })];
                    case 2:
                        user = _b.sent();
                        this.validateUser(user);
                        return [2 /*return*/, { _id: user._id }];
                }
            });
        });
    };
    UserService.prototype.createUser = function (_a) {
        var body = _a.body;
        return __awaiter(this, void 0, void 0, function () {
            var user, uuid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.create(JSON.parse(body))];
                    case 1:
                        user = _b.sent();
                        uuid = (0, uuid_1.v4)();
                        return [4 /*yield*/, this.services.emailRepository.dispatch('new_user', user.email, { uuid: uuid })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.services.cache.add(uuid, user._id.toString())];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, { success: true, _id: user._id.toString() }];
                }
            });
        });
    };
    UserService.prototype.forgotPassword = function (_a) {
        var pathParameters = _a.pathParameters;
        return __awaiter(this, void 0, void 0, function () {
            var user, uuid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ email: pathParameters.email })];
                    case 1:
                        user = _b.sent();
                        this.validateUser(user);
                        uuid = (0, uuid_1.v4)();
                        return [4 /*yield*/, this.services.cache.add(uuid, user === null || user === void 0 ? void 0 : user._id.toString())];
                    case 2:
                        _b.sent();
                        this.services.emailRepository.dispatch('forgot_password', user === null || user === void 0 ? void 0 : user.email, { uuid: uuid });
                        return [2 /*return*/, { success: true, uuid: uuid }];
                }
            });
        });
    };
    UserService.prototype.validateUser = function (user) {
        if (!user) {
            throw this.notFound();
        }
    };
    UserService.prototype.notFound = function () {
        return {
            statusCode: 404,
            body: {
                success: false, message: 'user_not_found'
            }
        };
    };
    UserService = __decorate([
        (0, shared_1.inject)({
            model: User_1.default,
            services: {
                cache: cache_repository_1.CacheRepository,
                emailRepository: email_repository_1.EmailRepository
            }
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.js.map