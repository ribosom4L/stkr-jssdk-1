"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaMaskProvider = void 0;
var web3_1 = __importDefault(require("web3"));
var web3_utils_1 = require("web3-utils");
var provider_1 = require("./provider");
var MetaMaskProvider = /** @class */ (function (_super) {
    __extends(MetaMaskProvider, _super);
    function MetaMaskProvider(providerConfig) {
        return _super.call(this, providerConfig) || this;
    }
    MetaMaskProvider.hasInPageSupport = function () {
        // @ts-ignore
        return !!window.ethereum || !!window.web3;
    };
    MetaMaskProvider.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ethereum, web3, error_1, unlockedAccounts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ethereum = typeof window !== 'undefined' && window.ethereum;
                        web3 = typeof window !== 'undefined' && window.web3;
                        if (!ethereum) return [3 /*break*/, 6];
                        web3 = new web3_1.default(ethereum);
                        if (ethereum.networkVersion !== this._providerConfig.networkId) {
                            throw new Error('MetaMask ethereum network mismatched, please check your MetaMask network.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ethereum.enable()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new Error('User denied access to account');
                    case 4: return [4 /*yield*/, web3.eth.getAccounts()];
                    case 5:
                        unlockedAccounts = _a.sent();
                        if (!unlockedAccounts.length || !unlockedAccounts[0]) {
                            throw new Error('Unable to detect unlocked MetaMask account');
                        }
                        this._currentAccount = unlockedAccounts[0];
                        (ethereum.publicConfigStore &&
                            ethereum.publicConfigStore.on('update', function (config) { return __awaiter(_this, void 0, void 0, function () {
                                var selectedAddress, networkVersion;
                                var _a;
                                return __generator(this, function (_b) {
                                    selectedAddress = config.selectedAddress, networkVersion = config.networkVersion;
                                    console.log('Detected MetaMask account change: ', selectedAddress, networkVersion);
                                    if (((_a = this._currentAccount) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== selectedAddress.toLowerCase()) {
                                        console.log("You've changed MetaMask account, reloading page (" + this._currentAccount + " != " + selectedAddress + ")");
                                        this._currentAccount = selectedAddress;
                                        window.location.reload();
                                    }
                                    else if (this._providerConfig.networkId !== networkVersion) {
                                        console.log("You've changed MetaMask network, reloading page (" + this._providerConfig.networkId + " != " + networkVersion + ")");
                                        window.location.reload();
                                    }
                                    return [2 /*return*/];
                                });
                            }); })) ||
                            console.warn("Unable to find Web3::publicConfigStore, page reload on account change won't work properly");
                        setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var accounts, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, web3.eth.getAccounts()];
                                    case 1:
                                        accounts = _a.sent();
                                        if (accounts.length === 0) {
                                            console.log('You have locked MetaMask account, reloading page');
                                            window.location.reload();
                                        }
                                        return [3 /*break*/, 3];
                                    case 2:
                                        e_1 = _a.sent();
                                        console.error('Unable to fetch MetaMask accounts, looks like MetaMask locked, reloading page');
                                        window.location.reload();
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }, 3000);
                        return [3 /*break*/, 7];
                    case 6:
                        if (web3) {
                            /* there several providers that emulates MetaMask behavior */
                            /*const {isMetaMask} = window.web3.currentProvider;
                            if (isMetaMask !== true) {
                              throw new Error('Invalid MetaMask configuration provided');
                            }*/
                            web3 = new web3_1.default(web3.currentProvider);
                            if (!web3 || (web3.isConnected && !web3.isConnected())) {
                                throw new Error('Invalid MetaMask configuration provided');
                            }
                        }
                        else {
                            web3 = new web3_1.default();
                            if (!web3 || (web3.isConnected && !web3.isConnected())) {
                                throw new Error('Invalid MetaMask configuration provided');
                            }
                            // throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!')
                        }
                        _a.label = 7;
                    case 7:
                        this._web3 = web3;
                        return [2 /*return*/, web3];
                }
            });
        });
    };
    MetaMaskProvider.prototype.close = function () {
        return Promise.resolve();
    };
    MetaMaskProvider.prototype.findAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._currentAccount ? [this._currentAccount] : []];
            });
        });
    };
    MetaMaskProvider.prototype.sign = function (data, address) {
        return __awaiter(this, void 0, void 0, function () {
            var message, parts;
            return __generator(this, function (_a) {
                if (!this._web3)
                    throw new Error('Web3 must be initialized');
                try {
                    if (typeof data === 'object') {
                        // @ts-ignore
                        data = web3_utils_1.bytesToHex(data);
                    }
                    return [2 /*return*/, this._web3.eth.personal.sign(data, address, '', function (error, signature) { })];
                }
                catch (e) {
                    console.error(e);
                    message = e.message.substr(0, e.message.indexOf('\n')), parts = message.split(':');
                    /* try to detect angry MetaMask messages */
                    if (parts.length > 0) {
                        /* special case for Firefox that doesn't return any errors, only extension stack trace */
                        if (message.includes('@moz-extension') && message.includes('Returned error: value')) {
                            throw new Error('User denied message signature.');
                        }
                        /* cases for other browsers (tested in Chrome, Opera, Brave) */
                        if (message.includes('MetaMask') ||
                            message.includes('Returned error') ||
                            message.includes('RPC Error')) {
                            throw new Error(parts[parts.length - 1]);
                        }
                    }
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    MetaMaskProvider.prototype.send = function (from, to, sendOptions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var gasPrice, nonce, tx;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, ((_a = this._web3) === null || _a === void 0 ? void 0 : _a.eth.getGasPrice())];
                    case 1:
                        gasPrice = _c.sent();
                        console.log('Gas Price: ' + gasPrice);
                        return [4 /*yield*/, ((_b = this._web3) === null || _b === void 0 ? void 0 : _b.eth.getTransactionCount(from))];
                    case 2:
                        nonce = _c.sent();
                        console.log('Nonce: ' + nonce);
                        tx = {
                            chainId: web3_utils_1.numberToHex(this._providerConfig.chainId),
                            data: sendOptions.data,
                            value: web3_utils_1.numberToHex(sendOptions.value || '0'),
                            from: from,
                            to: to,
                            gas: web3_utils_1.numberToHex(sendOptions.gasLimit || '200000')
                        };
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    console.log('Sending transaction via Web3: ', tx);
                                    // @ts-ignore
                                    (_b = (_a = this._web3) === null || _a === void 0 ? void 0 : _a.currentProvider) === null || _b === void 0 ? void 0 : _b.sendAsync({
                                        method: 'eth_sendTransaction',
                                        params: [tx],
                                        from: from
                                    }, function (error, result) {
                                        var error2 = result.error;
                                        if (error2) {
                                            reject(error2);
                                            return;
                                        }
                                        else if (error) {
                                            reject(error);
                                            return;
                                        }
                                        resolve(result);
                                    }, function (error) {
                                        console.error(error);
                                    });
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    return MetaMaskProvider;
}(provider_1.KeyProvider));
exports.MetaMaskProvider = MetaMaskProvider;
//# sourceMappingURL=metamask.js.map