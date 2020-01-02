import { isBefore } from 'date-fns';

import { Meetup, Subscription } from '../../models';
import { BadRequestError, NotFoundError } from '../../errors';

class RemoveSubscriptionService {
  async run(subscription_id) {
    const subscription = await Subscription.findOne({
      where: { id: subscription_id },
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
        },
      ],
    });

    if (!subscription) {
      throw new NotFoundError('Não foi possivel encontrar a inscrição.');
    }

    // Check meetup date

    if (isBefore(subscription.meetup.date, new Date())) {
      throw new BadRequestError(
        'Não é possivel cancelar inscrição em eventos que já aconteceram.'
      );
    }

    await subscription.destroy();

    return { ok: true };
  }
}

export default new RemoveSubscriptionService();
