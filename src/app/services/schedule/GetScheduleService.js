import { Meetup } from '../../models';

class GetScheduleService {
  async run(id) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: id,
      },
    });

    return meetups;
  }
}

export default new GetScheduleService();
