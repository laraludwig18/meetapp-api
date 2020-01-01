import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import { File, Meetup, User } from '../../models';

class GetMeetupsService {
  async run(query) {
    const { date, page } = query;

    let where = {};

    if (date) {
      const searchDate = parseISO(date);
      where = {
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      };
    } else {
      where = {
        date: {
          [Op.gt]: new Date(),
        },
      };
    }

    const allMeetups = await Meetup.findAll({ where });

    const meetups = await Meetup.findAll({
      where,
      attributes: ['id', 'title', 'description', 'date', 'location'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['name', 'path', 'url'],
        },
      ],
      order: ['date'],
    });

    return { meetups, numPages: Math.ceil(allMeetups.length / 10) };
  }
}

export default new GetMeetupsService();
