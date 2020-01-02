import { startOfHour, parseISO, isBefore } from 'date-fns';

import { Meetup } from '../../models';
import { BadRequestError, UnauthorizedError } from '../../errors';

class UpdateMeetupService {
  async run(meetupData, organizerId) {
    const meetup = await Meetup.findOne({
      where: { id: meetupData.id, user_id: organizerId },
    });

    // Check if user is the organizer

    if (!meetup) {
      throw new UnauthorizedError('Você não pode editar este evento.');
    }

    // Check meetup date

    if (isBefore(meetup.date, new Date())) {
      throw new BadRequestError('Eventos passados não podem ser editados.');
    }

    // Check for past dates

    const hourStart = startOfHour(parseISO(meetupData.date));

    if (hourStart && isBefore(hourStart, new Date())) {
      throw new BadRequestError(
        'Não é permitido editar eventos com datas passadas.'
      );
    }

    const updatedMeetup = await meetup.update(meetupData);

    return updatedMeetup;
  }
}

export default new UpdateMeetupService();
