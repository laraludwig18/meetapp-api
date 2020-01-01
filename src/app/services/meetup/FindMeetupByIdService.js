import { File, Meetup, User } from '../../models';

class FindMeetupByIdService {
  async run(id) {
    const meetup = await Meetup.findOne({
      where: {
        id,
      },
      attributes: ['id', 'title', 'description', 'date', 'location'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return meetup;
  }
}

export default new FindMeetupByIdService();
