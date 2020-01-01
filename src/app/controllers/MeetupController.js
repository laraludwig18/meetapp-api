import {
  GetMeetupsService,
  FindMeetupByIdService,
  CreateMeetupService,
  UpdateMeetupService,
  RemoveMeetupService,
} from '../services/meetup';

class MeetupController {
  async index(req, res) {
    const { date, page = 1 } = req.query;
    const data = await GetMeetupsService.run({ page, date });

    return res.status(200).json(data);
  }

  async find(req, res) {
    const { meetupId } = req.params;
    const meetup = await FindMeetupByIdService.run(meetupId);

    return res.status(200).json(meetup);
  }

  async store(req, res) {
    const meetup = await CreateMeetupService.run({
      ...req.body,
      user_id: req.userId,
    });

    return res.status(200).json(meetup);
  }

  async update(req, res) {
    const meetup = await UpdateMeetupService.run(
      {
        ...req.body,
        id: req.params.meetupId,
      },
      req.userId
    );

    return res.status(200).json(meetup);
  }

  async delete(req, res) {
    const data = await RemoveMeetupService.run({
      id: req.params.meetupId,
      organizerId: req.userId,
    });

    return res.status(200).json(data);
  }
}

export default new MeetupController();
