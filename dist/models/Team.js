"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: variable-name
var ts_mongoose_1 = require("ts-mongoose");
exports.TeamSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string(),
    nick_name: ts_mongoose_1.Type.string({ unique: true }),
    website: ts_mongoose_1.Type.string(),
    coach: ts_mongoose_1.Type.string(),
    founded: ts_mongoose_1.Type.number(),
    stadium_name: ts_mongoose_1.Type.string(),
    stadium_capacity: ts_mongoose_1.Type.string(),
    wins: ts_mongoose_1.Type.number({ default: 0 }),
    losses: ts_mongoose_1.Type.number({ default: 0 }),
    goals: ts_mongoose_1.Type.number({ default: 0 }),
    isDeleted: ts_mongoose_1.Type.boolean({ default: false }),
});
exports.Team = ts_mongoose_1.typedModel('Team', exports.TeamSchema);
//# sourceMappingURL=Team.js.map