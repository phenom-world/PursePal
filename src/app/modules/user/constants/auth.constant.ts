import config from '../../../../config';
import { CookieOptions } from '../interfaces/auth.interface';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  secure: config.application.get('env') === 'production',
  path: '/',
};
