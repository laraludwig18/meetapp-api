import { string, object } from 'yup';

import { ERROR_CODE } from '../assets/constants';
import { ERROR_STRINGS } from '../assets/strings';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string().required(ERROR_STRINGS.createUser.payload.name),
      email: string()
        .email(ERROR_STRINGS.createUser.payload.invalidEmail)
        .required(ERROR_STRINGS.createUser.payload.email),
      password: string()
        .required(ERROR_STRINGS.createUser.payload.password)
        .min(6, ERROR_STRINGS.createUser.payload.invalidPassword),
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
