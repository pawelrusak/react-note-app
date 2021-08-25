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
    TITLE: 'Card_Title',
    HEADER: 'Card_Header',
    DATE_INFO: 'Card_DateInfo',
    ARTICLE_LINK: 'Card_ArticleLink',
  },
  COUNTER: {
    PARAGRAPH: 'Counter_Paragraph',
    SKELETON: 'Counter_Skeleton',
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
  NEW_ITEM_BAR: {
    WRAPPER: 'NewItemBar',
  },
  SKELETON_CARD: {
    WRAPPER: 'SkeletonCard',
    AVATAR_SKELETON: 'SkeletonCard_AvatarSkeleton',
    ARTICLE_LINK_SKELETON: 'SkeletonCard_ArticleLinkSkeleton',
  },
} as const;
