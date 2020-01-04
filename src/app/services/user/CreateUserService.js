import { ForbiddenError } from '../../errors';
import { User } from '../../models';

class CreateUserService {
  async run(user) {
    const { email } = user;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      throw new ForbiddenError('Usuário já existente.');
    }

    const { id, name, provider } = await User.create(user);

    return { id, name, email, provider };
  }
}

export default new CreateUserService();
