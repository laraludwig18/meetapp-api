import { User } from '../../models';
import { ForbiddenError } from '../../errors';

class UpdateUserService {
  async run(newUser) {
    const { id, email: newEmail, oldPassword } = newUser;

    const user = await User.findByPk(id);

    if (newEmail && newEmail !== user.email) {
      const userExists = await User.findOne({ where: { email: newEmail } });

      if (userExists) {
        throw new ForbiddenError('Usuário já existente.');
      }
    }

    if (oldPassword) {
      const isPasswordValid = await user.checkPassword(oldPassword);

      if (!isPasswordValid) {
        throw new ForbiddenError('Senhas não coincidem.');
      }
    }

    const { name, email, provider } = await user.update(newUser);

    return { id, name, email, provider };
  }
}

export default new UpdateUserService();
