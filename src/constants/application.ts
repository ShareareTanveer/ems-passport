const basePath = '/';

export default {
  url: {
    basePath,
  },
  timers: {
    userCookieExpiry: '1d',
    resetPasswordCookieExpiry: '10m',
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || 'test',
  },
  authorizationIgnorePath: [
    '/',
    '/auth/send-email-otp',
    '/auth/verify-email-otp',
    '/auth/change-password',
    '/auth/register',
    '/auth/login',
  ],
};
