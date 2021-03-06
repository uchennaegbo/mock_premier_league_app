import { Fixture } from '../models/Fixture';
import { Team } from '../models/Team';

import { Request, Response } from 'express';

export const searchTeam = async (req: Request, res: Response) => {
  const { id } = req.params;

  let value: RegExp;
  try {
    if (+id) {
      const team = await Team.find({ founded: id });
      if (team.length > 0) {
        return res.status(200).json({ message: team });
      }

      if (!!team) {
        return res.status(400).json({ message: `Invalid year.` });
      }
    } else {
      value = new RegExp(id, 'gi');

      const team = await Team.find().or([
        { name: { $regex: value } },
        { coach: { $regex: value } },
        { stadium_name: { $regex: value } },
      ]);
      console.log(team.length);

      if (team.length > 0) {
        return res.status(200).json({ message: team });
      }

      if (!!team) {
        return res.status(400).json({ message: `Invalid Team` });
      }
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const searchFixture = async (req: Request, res: Response) => {
  const { id } = req.params;

  const value = new RegExp(id, 'gi');

  try {
    const fixtures = await Fixture.find().populate(
      'homeTeam awayTeam',
      'name coach link -_id',
    );

    const getFixtures = fixtures.filter((elem) => {

      if (
        // @ts-ignore
        value.test(elem.homeTeam['name']) ||
        // @ts-ignore
        value.test(elem.awayTeam['name'])
      ) {
        return elem;
      }
    });

    console.log(getFixtures);
    if (getFixtures.length > 0) {
      return res.status(200).json({ message: getFixtures });
    }

    if (!!getFixtures) {
      return res.status(400).json({ message: `Invalid Input` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
