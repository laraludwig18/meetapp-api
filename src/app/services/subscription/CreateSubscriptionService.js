import { isBefore } from 'date-fns';

import { SubscribeEmail } from '../../../jobs';
import { Queue } from '../../../lib';
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
      throw new NotFoundError(
        'Não foi possivel encontrar o evento selecionado.'
      );
    }

    // Check past meetup

    if (isBefore(meetup.date, new Date())) {
      throw new BadRequestError(
        'Você não pode se inscrever em eventos que já aconteceram.'
      );
    }

    // Check if user is the organizer

    if (meetup.user_id === subscription.user_id) {
      throw new ForbiddenError(
        'Você não pode se inscrever nos seus próprios eventos.'
      );
    }

    // Check if user already subscribed

    const alreadySubscribed = await Subscription.findOne({
      where: {
        user_id: subscription.user_id,
        meetup_id: subscription.meetup_id,
      },
    });

    if (alreadySubscribed) {
      throw new BadRequestError('Você já se inscreveu para este evento.');
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
      throw new BadRequestError(
        'Você já se inscreveu para outro evento neste mesmo horário.'
      );
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
