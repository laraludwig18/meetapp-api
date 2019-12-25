import { string, object, date, number } from 'yup';

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
    return res
      .status(400)
      .json({ error: 'Falha na validação', messages: err.inner });
  }
};
