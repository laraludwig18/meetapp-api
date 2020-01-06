import { startOfHour, parseISO, isBefore } from 'date-fns';

import { ERROR_CODE } from '../../assets/constants';
import { ERROR_STRINGS } from '../../assets/strings';
import { BadRequestError } from '../../errors';
import { Meetup } from '../../models';

class CreateMeetupService {
  async run(meetupData) {
    const meetup = await Meetup.create(meetupData);

    // Check for past dates

    const hourStart = startOfHour(parseISO(meetupData.date));

    if (isBefore(hourStart, new Date())) {
      throw new BadRequestError({
        code: ERROR_CODE.PAST_DATE,
        message: ERROR_STRINGS.createMeetup.pastDate,
      });
    }

    return meetup;
  }
}

export default new CreateMeetupService();
