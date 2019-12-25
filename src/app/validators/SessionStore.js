import { string, object } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      email: string()
        .email('Email inválido.')
        .required('Email é obrigatório.'),
      password: string().required('Senha é obrigatória.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Falha na validação', messages: err.inner });
  }
};
