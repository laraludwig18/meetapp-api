import { isBefore } from 'date-fns';

import { Meetup } from '../../models';
import { PastMeetupError, UnauthorizedError } from '../../errors';

class RemoveMeetupService {
  async run(meetupData) {
    const meetup = await Meetup.findOne({
      where: { id: meetupData.id, user_id: meetupData.organizerId },
    });

    // Check if user is the organizer

    if (!meetup) {
      throw new UnauthorizedError('Você não pode cancelar este evento.');
    }

    // Check meetup date

    if (isBefore(meetup.date, new Date())) {
      throw new PastMeetupError(
        'Não é possivel cancelar eventos que já aconteceram.'
      );
    }

    await meetup.destroy();

    return { ok: true };
  }
}

export default new RemoveMeetupService();
