import {
  GetSubscriptionsService,
  CreateSubscriptionService,
  RemoveSubscriptionService,
} from '../services/subscription';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await GetSubscriptionsService.run(req.userId);
    return res.status(200).json(subscriptions);
  }

  async store(req, res) {
    const subscription = await CreateSubscriptionService.run({
      user_id: req.userId,
      meetup_id: req.params.meetupId,
    });

    return res.status(200).json(subscription);
  }

  async delete(req, res) {
    const data = await RemoveSubscriptionService.run(req.params.subscriptionId);

    return res.status(200).json(data);
  }
}

export default new SubscriptionController();
