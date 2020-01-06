import { ERROR_CODE } from '../../assets/constants';
import { ERROR_STRINGS } from '../../assets/strings';
import { ForbiddenError } from '../../errors';
import { User } from '../../models';

class CreateUserService {
  async run(user) {
    const { email } = user;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      throw new ForbiddenError({
        code: ERROR_CODE.USER_ALREADY_EXIST,
        message: ERROR_STRINGS.createUser.alreadyExist,
      });
    }

    const { id, name, provider } = await User.create(user);

    return { id, name, email, provider };
  }
}

export default new CreateUserService();
