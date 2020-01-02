import jwt from 'jsonwebtoken';

import { User } from '../../models';
import authConfig from '../../../config/auth';
import { UnauthorizedError } from '../../errors';

class CreateSessionService {
  async run(session) {
    const { email, password } = session;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedError(
        'O login e/ou a senha digitados estão incorretos.'
      );
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedError(
        'O login e/ou a senha digitados estão incorretos.'
      );
    }

    const { id, name } = user;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return {
      user: {
        id,
        name,
        email,
      },
      token,
    };
  }
}

export default new CreateSessionService();
