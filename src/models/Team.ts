// tslint:disable: variable-name
import { createSchema, Type, typedModel } from 'ts-mongoose';

export const TeamSchema = createSchema({
  name: Type.string(),
  nick_name: Type.string({ unique: true }),
  website: Type.string(),
  coach: Type.string(),
  founded: Type.number(),
  stadium_name: Type.string(),
  stadium_capacity: Type.string(),
  wins: Type.number({ default: 0 }),
  losses: Type.number({ default: 0 }),
  goals: Type.number({ default: 0 }),
  isDeleted: Type.boolean({ default: false }),
});

export const Team = typedModel('Team', TeamSchema);
