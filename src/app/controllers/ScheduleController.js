import { GetScheduleService } from '../services/schedule';

class ScheduleController {
  async index(req, res) {
    const meetups = await GetScheduleService.run(req.userId);

    return res.status(200).json(meetups);
  }
}

export default new ScheduleController();
