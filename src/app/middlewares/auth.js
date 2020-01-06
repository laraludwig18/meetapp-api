import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
import { ERROR_CODE } from '../assets/constants';
import { ERROR_STRINGS } from '../assets/strings';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      code: ERROR_CODE.NOT_FOUND,
      message: ERROR_STRINGS.token.notFound,
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(403).json({
      code: ERROR_CODE.INVALID_TOKEN,
      message: ERROR_STRINGS.token.invalid,
    });
  }
};
