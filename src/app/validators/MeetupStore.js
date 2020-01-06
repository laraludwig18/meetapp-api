import { string, object, date, number } from 'yup';

import { ERROR_CODE } from '../assets/constants';
import { ERROR_STRINGS } from '../assets/strings';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      title: string().required(ERROR_STRINGS.createMeetup.payload.title),
      description: string().required(
        ERROR_STRINGS.createMeetup.payload.description
      ),
      location: string().required(ERROR_STRINGS.createMeetup.payload.location),
      date: date().required(ERROR_STRINGS.createMeetup.payload.date),
      banner_id: number().required(ERROR_STRINGS.createMeetup.payload.banner),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    const errors = err.inner.map(({ path, message }) => ({
      field: path,
      message,
    }));

    return res
      .status(400)
      .json({ code: ERROR_CODE.INVALID_PAYLOAD, message: errors });
  }
};
