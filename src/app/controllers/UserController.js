import { CreateUserService, UpdateUserService } from '../services/user';

class UserController {
  async store(req, res) {
    const user = await CreateUserService.run(req.body);

    return res.status(200).json(user);
  }

  async update(req, res) {
    const user = { ...req.body, id: req.userId };
    const data = await UpdateUserService.run(user);

    return res.status(200).json(data);
  }
}

export default new UserController();
