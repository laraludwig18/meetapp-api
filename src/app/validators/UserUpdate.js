import { string, object, ref } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string(),
      email: string().email('Email inválido.'),
      oldPassword: string().min(
        6,
        'Senha atual deve ter, no mínimo, 6 caracteres.'
      ),
      password: string()
        .min(6, 'Nova senha deve possuir, no mínimo, 6 caracteres.')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required('Nova senha é obrigatória.') : field
        ),
      confirmPassword: string().when('password', (password, field) =>
        password
          ? field
              .required('Confirmação de senha é obrigatória.')
              .oneOf(
                [ref('password')],
                'Nova senha e sua confirmação não coincidem.'
              )
          : field
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Falha na validação', messages: err.inner });
  }
};
