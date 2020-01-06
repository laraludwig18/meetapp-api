import { string, object, ref } from 'yup';

import { ERROR_CODE } from '../assets/constants';
import { ERROR_STRINGS } from '../assets/strings';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string(),
      email: string().email(ERROR_STRINGS.updateUser.payload.invalidEmail),
      oldPassword: string().min(
        6,
        ERROR_STRINGS.updateUser.payload.invalidPassword
      ),
      password: string()
        .min(6, ERROR_STRINGS.updateUser.payload.invalidNewPassword)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword
            ? field.required(ERROR_STRINGS.updateUser.payload.newPassword)
            : field
        ),
      confirmPassword: string().when('password', (password, field) =>
        password
          ? field
              .required(ERROR_STRINGS.updateUser.payload.confirmPassword)
              .oneOf(
                [ref('password')],
                ERROR_STRINGS.updateUser.payload.invalidConfirmPassword
              )
          : field
      ),
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
