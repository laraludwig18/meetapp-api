import { Op } from 'sequelize';

import { File, Meetup, User, Subscription } from '../../models';

class GetSubscriptionsService {
  async run(user_id) {
    const userSubscriptions = await Subscription.findAll({
      where: {
        user_id,
      },
      attributes: ['id', 'user_id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'user_id',
          ],
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
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
        },
      ],
      order: [['meetup', 'date']],
    });

    return userSubscriptions;
  }
}

export default new GetSubscriptionsService();
