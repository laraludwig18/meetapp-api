import { isBefore } from 'date-fns';

import { ERROR_CODE } from '../../assets/constants';
import { ERROR_STRINGS } from '../../assets/strings';
import { BadRequestError, NotFoundError } from '../../errors';
import { Meetup, Subscription } from '../../models';

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
      throw new NotFoundError({
        code: ERROR_CODE.NOT_FOUND,
        message: ERROR_STRINGS.removeSubscription.notFound,
      });
    }

    // Check meetup date

    if (isBefore(subscription.meetup.date, new Date())) {
      throw new BadRequestError({
        code: ERROR_CODE.PAST_MEETUP,
        message: ERROR_STRINGS.removeSubscription.pastMeetup,
      });
    }

    await subscription.destroy();

    return { ok: true };
  }
}

export default new RemoveSubscriptionService();
