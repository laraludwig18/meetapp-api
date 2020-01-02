import { startOfHour, parseISO, isBefore } from 'date-fns';

import { BadRequestError } from '../../errors';
import { Meetup } from '../../models';

class CreateMeetupService {
  async run(meetupData) {
    const meetup = await Meetup.create(meetupData);

    // Check for past dates

    const hourStart = startOfHour(parseISO(meetupData.date));

    if (isBefore(hourStart, new Date())) {
      throw new BadRequestError(
        'Não é permitido criar eventos com datas passadas.'
      );
    }

    return meetup;
  }
}

export default new CreateMeetupService();
