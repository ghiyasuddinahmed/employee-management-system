import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.schema';
import { setCookie } from '../utils/cookies';
import { config } from '../config/env';

export class AuthService {
  async login(username: string, password: string, res: any): Promise<void> {
    const user = await UserModel.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, {
      expiresIn: '1h',
    });
    setCookie(res, 'token', token);
  }

  async register(username: string, password: string, role: 'admin' | 'employee', res: any): Promise<void> {
    const user = new UserModel({ username, password, role });
    await user.save();
    const token = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, {
      expiresIn: '1h',
    });
    setCookie(res, 'token', token);
  }
}
