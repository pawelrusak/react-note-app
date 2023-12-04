/* eslint-disable @typescript-eslint/no-unused-vars */
import { isNewItemVariantTouched } from '../index';

import type { FormikTouched } from 'formik';
import type { NewItem, Variant } from '~/commonTypes';

type NewItemFormikTouched = FormikTouched<NewItem>;

const touchedNewItem: NewItemFormikTouched = {
  title: true,
  content: true,
  twitterName: true,
  articleUrl: true,
};

const notTouchedNewItem: NewItemFormikTouched = {
  title: false,
  content: false,
  twitterName: false,
  articleUrl: false,
};

const NEW_ITEM_VARIANTS: Variant[] = ['notes', 'articles', 'twitters'];

describe('isNewItemVariantTouched utils', () => {
  it.each(NEW_ITEM_VARIANTS)(
    'if all properties is true then for the new %s item should return true',
    (variant) => {
      expect(isNewItemVariantTouched(touchedNewItem, variant)).toBeTrue();
    },
  );

  it.each(NEW_ITEM_VARIANTS)(
    "if all properties is false then for the new %s item should return false'",
    (variant) => {
      expect(isNewItemVariantTouched(notTouchedNewItem, variant)).toBeFalse();
    },
  );

  it.each(NEW_ITEM_VARIANTS)(
    "if title property is not defined then for the new %s item should return false'",
    (variant) => {
      const { title, ...touchedNewItemWithoutTitle } = touchedNewItem;

      expect(isNewItemVariantTouched(touchedNewItemWithoutTitle, variant)).toBeFalse();
    },
  );

  it.each(NEW_ITEM_VARIANTS)(
    "if content property is not defined then for the new %s item should return false'",
    (variant) => {
      const { content, ...touchedNewItemWithoutContent } = touchedNewItem;

      expect(isNewItemVariantTouched(touchedNewItemWithoutContent, variant)).toBeFalse();
    },
  );

  it("if twitterName property is not defined then for new twitter item should return false'", () => {
    const { twitterName, ...touchedNewItemWithoutTwitterName } = touchedNewItem;

    expect(isNewItemVariantTouched(touchedNewItemWithoutTwitterName, 'twitters')).toBeFalse();
  });

  it("if the articleUrl property is not defined then for new article item should return false'", () => {
    const { articleUrl, ...touchedNewItemWithoutArticleUrl } = touchedNewItem;

    expect(isNewItemVariantTouched(touchedNewItemWithoutArticleUrl, 'articles')).toBeFalse();
  });
});
