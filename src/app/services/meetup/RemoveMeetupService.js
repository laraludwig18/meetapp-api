import { isBefore } from 'date-fns';

import { ERROR_CODE } from '../../assets/constants';
import { ERROR_STRINGS } from '../../assets/strings';
import { BadRequestError, UnauthorizedError } from '../../errors';
import { Meetup } from '../../models';

class RemoveMeetupService {
  async run(meetupData) {
    const meetup = await Meetup.findOne({
      where: { id: meetupData.id, user_id: meetupData.organizerId },
    });

    // Check if user is the organizer

    if (!meetup) {
      throw new UnauthorizedError({
        code: ERROR_CODE.UNAUTHORIZED,
        message: ERROR_STRINGS.removeMeetup.unauthorized,
      });
    }

    // Check meetup date

    if (isBefore(meetup.date, new Date())) {
      throw new BadRequestError({
        code: ERROR_CODE.PAST_MEETUP,
        message: ERROR_STRINGS.removeMeetup.pastMeetup,
      });
    }

    await meetup.destroy();

    return { ok: true };
  }
}

export default new RemoveMeetupService();
