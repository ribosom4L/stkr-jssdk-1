"use strict";
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
exports.StkrSdk = void 0;
var metamask_1 = require("./metamask");
var contract_1 = require("./contract");
var gateway_1 = require("./gateway");
var StkrSdk = /** @class */ (function () {
    function StkrSdk(stkrConfig, apiGateway) {
        this.stkrConfig = stkrConfig;
        this.apiGateway = apiGateway;
        this.keyProvider = null;
        this.contractManager = null;
    }
    StkrSdk.factoryDefault = function (stkrConfig) {
        var apiGateway = new gateway_1.ApiGateway(stkrConfig.gatewayConfig);
        return new StkrSdk(stkrConfig, apiGateway);
    };
    StkrSdk.prototype.connectMetaMask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metaMaskProvider, contractManage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metaMaskProvider = new metamask_1.MetaMaskProvider(this.stkrConfig.providerConfig);
                        return [4 /*yield*/, metaMaskProvider.connect()];
                    case 1:
                        _a.sent();
                        contractManage = new contract_1.ContractManager(metaMaskProvider, this.stkrConfig.contractConfig);
                        this.keyProvider = metaMaskProvider;
                        this.contractManager = contractManage;
                        return [2 /*return*/];
                }
            });
        });
    };
    StkrSdk.prototype.isConnected = function () {
        return this.keyProvider && this.contractManager;
    };
    StkrSdk.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    StkrSdk.prototype.getProviders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    StkrSdk.prototype.getMicroPools = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    StkrSdk.prototype.createMicroPool = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.contractManager)
                            throw new Error('Key provider must be connected');
                        return [4 /*yield*/, this.contractManager.initializePool(name)];
                    case 1:
                        txHash = _a.sent();
                        console.log("created new micro pool, tx hash is " + txHash);
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    StkrSdk.prototype.getMicroPool = function (poolIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.contractManager)
                            throw new Error('Key provider must be connected');
                        return [4 /*yield*/, this.contractManager.poolDetails("" + poolIndex)];
                    case 1:
                        result = _a.sent();
                        console.log("fetched micro pool details, result is " + result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    StkrSdk.prototype.currentAccount = function () {
        var _a;
        if (!this.keyProvider)
            return '';
        return (_a = this.keyProvider) === null || _a === void 0 ? void 0 : _a.currentAccount();
    };
    StkrSdk.prototype.getKeyProvider = function () {
        if (!this.keyProvider)
            throw new Error('Key provider must be connected');
        return this.keyProvider;
    };
    StkrSdk.prototype.getContractManager = function () {
        if (!this.contractManager)
            throw new Error('Key provider must be connected');
        return this.contractManager;
    };
    StkrSdk.prototype.getApiGateway = function () {
        return this.apiGateway;
    };
    return StkrSdk;
}());
exports.StkrSdk = StkrSdk;
//# sourceMappingURL=index.js.map