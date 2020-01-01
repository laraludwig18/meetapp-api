import { startOfHour, parseISO, isBefore } from 'date-fns';

import { PastMeetupError } from '../../errors';
import { Meetup } from '../../models';

class CreateMeetupService {
  async run(meetupData) {
    const meetup = await Meetup.crate(meetupData);

    // Check for past dates

    const hourStart = startOfHour(parseISO(meetupData.date));

    if (isBefore(hourStart, new Date())) {
      throw new PastMeetupError(
        'Não é permitido criar eventos com datas passadas.'
      );
    }

    return meetup;
  }
}

export default new CreateMeetupService();
