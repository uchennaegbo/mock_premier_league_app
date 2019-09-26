import { User } from '../models/User';
import { validateUser } from '../validation/user';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(404).send({ error: error.details[0].message });

  try {
    const { name, email } = req.body;
    const user = await new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const data = { name, email };
    return res.status(200).send({
      data,
      output: 'Sign up successful.',
    });
  } catch (error) {
    const { message } = error;
    return res.status(400).send({
      message,
      output: 'Sign up failed.',
    });
  }
};
