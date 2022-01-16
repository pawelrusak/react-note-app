import { FormikTouched } from 'formik';

import { NEW_ITEM_VARIANTS_KEYS } from '~/constants';

import type { Variants, NewItem, AuthCredentials } from '~/commonTypes';

export const stripPrefix = (str: string, prefix: string) =>
  str.startsWith(prefix) ? str.slice(prefix.length) : str;

export const stripSlashPrefix = (str: string) => stripPrefix(str, '/');

export const getEarlierDateOfDay = (numberOfPreviousDays: number) => {
  const today = new Date();
  const previousDay = new Date();

  previousDay.setDate(today.getDate() - numberOfPreviousDays);

  return previousDay;
};

/**
 * @link https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
 */
export const getUniqueValuesArray = (length: number) => Array.from(Array(length).keys());

export const capitalize = <T extends string>(str: T) =>
  (str[0].toUpperCase() + str.substring(1)) as Capitalize<T>;

export const join = (value: unknown) =>
  Array.isArray(value) ? value.map(String).join('') : String(value);

type UnknownObject = {
  [key: string]: unknown;
};

export const hasPropertiesWithTrueValues = <T extends UnknownObject, K extends keyof T>(
  obj: T,
  keys?: K[],
) =>
  Array.isArray(keys)
    ? keys.every((key) => (keys.includes(key) ? obj[key] === true : false))
    : Object.values(obj).every((value) => value === true);

type NewItemTouches = Partial<Record<keyof NewItem, boolean>>;

export const isNewItemVariantTouched = (newItemTouched: NewItemTouches, variant: Variants) =>
  hasPropertiesWithTrueValues(newItemTouched, [...NEW_ITEM_VARIANTS_KEYS[variant]]);

export type AuthCredentialsTouched = FormikTouched<AuthCredentials>;

export const isAuthCredentialsTouched = (authCredentialsTouched: AuthCredentialsTouched) =>
  hasPropertiesWithTrueValues(authCredentialsTouched, ['email', 'password']);
