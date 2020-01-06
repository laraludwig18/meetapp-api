import { string, object, date, number } from 'yup';

import { ERROR_CODE } from '../assets/constants';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      title: string(),
      description: string(),
      location: string(),
      date: date(),
      banner_id: number(),
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
