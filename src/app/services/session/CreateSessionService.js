import jwt from 'jsonwebtoken';

import authConfig from '../../../config/auth';
import { ERROR_CODE } from '../../assets/constants';
import { ERROR_STRINGS } from '../../assets/strings';
import { UnauthorizedError } from '../../errors';
import { User } from '../../models';

class CreateSessionService {
  async run(session) {
    const { email, password } = session;
    const user = await User.fndOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedError({
        code: ERROR_CODE.INVALID_LOGIN,
        message: ERROR_STRINGS.session.invalid,
      });
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedError({
        code: ERROR_CODE.INVALID_LOGIN,
        message: ERROR_STRINGS.session.invalid,
      });
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
