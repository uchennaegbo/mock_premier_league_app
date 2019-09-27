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
var Fixture_1 = require("../models/Fixture");
var Team_1 = require("../models/Team");
var fixture_1 = require("../validation/fixture");
exports.viewFixtures = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fixtures;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Fixture_1.Fixture.find().populate('homeTeam awayTeam', 'name coach -_id')];
            case 1:
                fixtures = _a.sent();
                res.status(200).send(fixtures);
                return [2 /*return*/];
        }
    });
}); };
exports.viewPlayedMatches = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playedMatches;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Fixture_1.Fixture.find({ played: true }).populate('homeTeam awayTeam', 'name coach -_id')];
            case 1:
                playedMatches = _a.sent();
                res.status(200).send(playedMatches);
                return [2 /*return*/];
        }
    });
}); };
exports.viewPendingMatches = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pendingMatches;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Fixture_1.Fixture.find({ played: false }).populate('homeTeam awayTeam', 'name coach -_id')];
            case 1:
                pendingMatches = _a.sent();
                res.status(200).send(pendingMatches);
                return [2 /*return*/];
        }
    });
}); };
exports.createFixtures = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, homeTeam, awayTeam, homeScore, awayScore, time, stadium, played, home, away, fixture, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = fixture_1.validateFixture(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                _a = req.body, homeTeam = _a.homeTeam, awayTeam = _a.awayTeam, homeScore = _a.homeScore, awayScore = _a.awayScore, time = _a.time, stadium = _a.stadium, played = _a.played;
                return [4 /*yield*/, Team_1.Team.findById(homeTeam).select({ name: 1, coach: 1 })];
            case 1:
                home = _b.sent();
                if (!home)
                    return [2 /*return*/, res.status(400).send("Home Team not found")];
                return [4 /*yield*/, Team_1.Team.findById(awayTeam).select({ name: 1, coach: 1 })];
            case 2:
                away = _b.sent();
                if (!away)
                    return [2 /*return*/, res.status(400).send("Away Team not found")];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                fixture = new Fixture_1.Fixture({
                    homeTeam: homeTeam,
                    awayTeam: awayTeam,
                    homeScore: homeScore,
                    awayScore: awayScore,
                    time: time,
                    stadium: stadium,
                    played: played,
                });
                return [4 /*yield*/, fixture.save()];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(200).send(fixture)];
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(400).send({ Error: error_1.message })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getFixture = function (req, res) {
    var id = req.query.id;
    var fixture = Fixture_1.Fixture.findById({ id: id }).exec;
    res.send(fixture);
};
exports.updateFixture = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updateFixture_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Fixture_1.Fixture.findByIdAndUpdate({ _id: req.params.id }, req.body)];
            case 1:
                updateFixture_1 = _a.sent();
                if (updateFixture_1) {
                    res.status(200).send("Fixture " + updateFixture_1._id + " was updated succesfully.");
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).send(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteFixture = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteFixture_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Fixture_1.Fixture.findByIdAndDelete({ _id: req.params.id })];
            case 1:
                deleteFixture_1 = _a.sent();
                if (deleteFixture_1) {
                    res.status(200).send("Fixture " + deleteFixture_1._id + " was deleted succesfully.");
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).send("delete failed :()");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=fixture.js.map