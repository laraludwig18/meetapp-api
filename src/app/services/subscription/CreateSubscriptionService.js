import { isBefore } from 'date-fns';

import { SubscribeEmail } from '../../../jobs';
import { Queue } from '../../../lib';
import { ERROR_CODE } from '../../assets/constants';
import { ERROR_STRINGS } from '../../assets/strings';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../errors';
import { Meetup, User, Subscription } from '../../models';

class CreateSubscriptionService {
  async run(subscription) {
    const meetup = await Meetup.findByPk(subscription.meetup_id, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (!meetup) {
      throw new NotFoundError({
        code: ERROR_CODE.NOT_FOUND,
        message: ERROR_STRINGS.createSubscription.notFound,
      });
    }

    // Check past meetup

    if (isBefore(meetup.date, new Date())) {
      throw new BadRequestError({
        code: ERROR_CODE.PAST_MEETUP,
        message: ERROR_STRINGS.createSubscription.pastMeetup,
      });
    }

    // Check if user is the organizer

    if (meetup.user_id === subscription.user_id) {
      throw new ForbiddenError({
        code: ERROR_CODE.OWN_MEETUP,
        message: ERROR_STRINGS.createSubscription.ownMeetup,
      });
    }

    // Check if user already subscribed

    const alreadySubscribed = await Subscription.findOne({
      where: {
        user_id: subscription.user_id,
        meetup_id: subscription.meetup_id,
      },
    });

    if (alreadySubscribed) {
      throw new BadRequestError({
        code: ERROR_CODE.ALREADY_SUBSCRIBED,
        message: ERROR_STRINGS.createSubscription.alreadySubscribed,
      });
    }

    // Check if user subscribed to another meetup on the same time

    const checkTime = await Subscription.findOne({
      where: {
        user_id: subscription.user_id,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkTime) {
      throw new BadRequestError({
        code: ERROR_CODE.SAME_TIME_MEETUP,
        message: ERROR_STRINGS.createSubscription.sameTimeMeetup,
      });
    }

    // Send email

    const userSubscribed = await User.findOne({
      where: {
        id: subscription.user_id,
      },
    });

    await Queue.add(SubscribeEmail.key, { meetup, userSubscribed });

    const newSubscription = await Subscription.create(subscription);

    return newSubscription;
  }
}

export default new CreateSubscriptionService();
