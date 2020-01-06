import { ERROR_CODE } from '../../assets/constants';
import { ERROR_STRINGS } from '../../assets/strings';
import { ForbiddenError } from '../../errors';
import { User } from '../../models';

class UpdateUserService {
  async run(newUser) {
    const { id, email: newEmail, oldPassword, confirmPassword } = newUser;

    const user = await User.findByPk(id);

    if (newEmail && newEmail !== user.email) {
      const userExists = await User.findOne({ where: { email: newEmail } });

      if (userExists) {
        throw new ForbiddenError({
          code: ERROR_CODE.USER_ALREADY_EXIST,
          message: ERROR_STRINGS.updateUser.alreadyExist,
        });
      }
    }

    if (oldPassword || confirmPassword) {
      const isPasswordValid = await user.checkPassword(oldPassword);

      if (!isPasswordValid) {
        throw new ForbiddenError({
          code: ERROR_CODE.PASSWORD_DOES_NOT_MATCH,
          message: ERROR_STRINGS.updateUser.passwordDoesNotMatch,
        });
      }
    }

    const { name, email, provider } = await user.update(newUser);

    return { id, name, email, provider };
  }
}

export default new UpdateUserService();
