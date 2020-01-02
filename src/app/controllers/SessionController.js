import { CreateSessionService } from '../services/session';

class SessionController {
  async store(req, res) {
    const data = await CreateSessionService.run(req.body);

    res.status(200).json(data);
  }
}

export default new SessionController();
