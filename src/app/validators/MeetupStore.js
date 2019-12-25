import { string, object, date, number } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      title: string().required('Título é obrigatório.'),
      description: string().required('Descrição é obrigatória.'),
      location: string().required('Localização é obrigatória.'),
      date: date().required('Data é obrigatória.'),
      banner_id: number().required('Banner é obrigatório.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Falha na validação', messages: err.inner });
  }
};
