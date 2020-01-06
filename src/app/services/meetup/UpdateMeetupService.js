import { startOfHour, parseISO, isBefore } from 'date-fns';

import { ERROR_CODE } from '../../assets/constants';
import { ERROR_STRINGS } from '../../assets/strings';
import { BadRequestError, UnauthorizedError } from '../../errors';
import { Meetup } from '../../models';

class UpdateMeetupService {
  async run(meetupData, organizerId) {
    const meetup = await Meetup.findOne({
      where: { id: meetupData.id, user_id: organizerId },
    });

    // Check if user is the organizer

    if (!meetup) {
      throw new UnauthorizedError({
        code: ERROR_CODE.UNAUTHORIZED,
        message: ERROR_STRINGS.updateMeetup.unauthorized,
      });
    }

    // Check meetup date

    if (isBefore(meetup.date, new Date())) {
      throw new BadRequestError({
        code: ERROR_CODE.PAST_MEETUP,
        message: ERROR_STRINGS.updateMeetup.pastMeetup,
      });
    }

    // Check for past dates

    const hourStart = startOfHour(parseISO(meetupData.date));

    if (hourStart && isBefore(hourStart, new Date())) {
      throw new BadRequestError({
        code: ERROR_CODE.PAST_DATE,
        message: ERROR_STRINGS.updateMeetup.pastDate,
      });
    }

    const updatedMeetup = await meetup.update(meetupData);

    return updatedMeetup;
  }
}

export default new UpdateMeetupService();
