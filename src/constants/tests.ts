import { AUTH_ERRORS_CODES } from './auth';

export const SPECIAL_VALUE_TO_TEST_WEAK_PASSWORD = 'special.variable.for.testing.weak.passwords';

export const REGISTERED_USER_CREDENTIALS = {
  EMAIL: 'valid.example@email.com',
  PASSWORD: 'password', // the best password in the world
} as const;

export const AUTH_ERRORS = {
  USER_NOT_FOUND: {
    code: AUTH_ERRORS_CODES.USER_NOT_FOUND,
    message: 'User not found',
  },
  WRONG_PASSWORD: {
    code: AUTH_ERRORS_CODES.WRONG_PASSWORD,
    message: 'Wrong password',
  },
  EMAIL_ALREADY_IN_USE: {
    code: AUTH_ERRORS_CODES.EMAIL_ALREADY_IN_USE,
    message: 'Email already in use',
  },
  WEAK_PASSWORD: {
    code: AUTH_ERRORS_CODES.WEAK_PASSWORD,
    message: 'Weak password',
  },
  INVALID_EMAIL: {
    code: AUTH_ERRORS_CODES.INVALID_EMAIL,
    message: 'Invalid email',
  },
} as const;

export const TEST_ID = {
  CARD: {
    HEADER: 'Card_Header',
    DATE_INFO: 'Card_DateInfo',
    ARTICLE_LINK: 'Card_ArticleLink',
  },
  SKELETON_CARD: {
    WRAPPER: 'SkeletonCard',
  },
  NEW_ITEM_BAR: {
    WRAPPER: 'NewItemBar',
    TEXTAREA: 'NewItemBar_Textarea',
  },
  DETAILS_TEMPLATE: {
    DATE_INFO: 'DetailsTemplate_DateInfo',
    ARTICLE_LINK: 'DetailsTemplate_ArticleLink',
    AVATAR: 'DetailsTemplate_Avatar',
  },
  GRID_TEMPLATE: {
    COUNTER: 'GridTemplate_Counter',
    SKELETON_COUNTER: 'GridTemplate_SkeletonCounter',
  },
} as const;
