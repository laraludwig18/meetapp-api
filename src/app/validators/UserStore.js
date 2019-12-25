import { string, object } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string().required('Nome é obrigatório.'),
      email: string()
        .email('Email inválido.')
        .required('Email é obrigatório.'),
      password: string()
        .required('Senha é obrigatória.')
        .min(6, 'Senha deve possuir, no mínimo, 6 caracteres.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Falha na validação', messages: err.inner });
  }
};
