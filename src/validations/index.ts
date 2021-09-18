import * as yup from 'yup';

import type { SchemaOf } from 'yup';
import type { NewItem, Variants } from '~/commonTypes';

export const authSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(50).required(),
});

type NewItemSchema = SchemaOf<NewItem & { variant: Variants }>;

export const newItemSchema: NewItemSchema = yup.object().shape({
  title: yup.string().max(50).required(),
  content: yup.string().max(5000).required(),
  variant: yup.mixed().oneOf<Variants>(['notes', 'twitters', 'articles']).defined(),
  /**
   * {@link https://help.twitter.com/en/managing-your-account/twitter-username-rules Twitter username rules}
   */
  twitterName: yup
    .string()
    .optional()
    .when('variant', {
      // eslint-disable-next-line
      // @ts-expect-error
      is: (variant) => variant === 'twitters',
      then: yup
        .string()

        .min(4)
        .max(15)
        .matches(/^[a-zA-Z0-9_]*$/)
        .required(),
    }),
  articleUrl: yup
    .string()
    .optional()
    .when('variant', {
      // eslint-disable-next-line
      // @ts-expect-error
      is: (variant) => variant === 'articles',
      then: yup.string().url().required(),
    }),
});
