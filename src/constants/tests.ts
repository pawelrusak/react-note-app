import { AUTH_ERRORS_CODES } from './auth';

export const SPECIAL_VALUE_TO_TEST_WEAK_PASSWORD = 'special.variable.for.testing.weak.passwords';

export const REGISTERED_USER_CREDENTIALS = {
  EMAIL: 'valid.example@email.com',
  PASSWORD: 'password',
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
    TWITTER_LINK: 'DetailsTemplate_TwitterLink',
    AVATAR: 'DetailsTemplate_Avatar',
  },
  SKELETON_DETAILS_TEMPLATE: {
    WRAPPER: 'SkeletonDetailsTemplate',
    LINK_SKELETON: 'SkeletonDetailsTemplate_LinkSkeleton',
    AVATAR_SKELETON: 'SkeletonDetailsTemplate_AvatarSkeleton',
  },
  NEW_ITEM_BAR: {
    WRAPPER: 'NewItemBar',
  },
  NEW_ITEM_FORM: {
    NOTE_SUBHEADING: 'NewItemForm_NoteSubheading',
    TWITTER_SUBHEADING: 'NewItemForm_TwitterSubheading',
    ARTICLE_SUBHEADING: 'NewItemForm_ArticleSubheading',
  },
  SKELETON_CARD: {
    WRAPPER: 'SkeletonCard',
    AVATAR_SKELETON: 'SkeletonCard_AvatarSkeleton',
    ARTICLE_LINK_SKELETON: 'SkeletonCard_ArticleLinkSkeleton',
  },
  CONFIRMATION_MODAL: {
    REMOVE_BUTTON: 'ConfirmationModal_RemoveButton',
  },
} as const;
