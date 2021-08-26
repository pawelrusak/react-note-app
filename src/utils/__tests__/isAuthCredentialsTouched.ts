import { isAuthCredentialsTouched } from '../index';

import type { AuthCredentialsTouched } from '../index';

const touchedAuthCredentials: AuthCredentialsTouched = {
  email: true,
  password: true,
};

const notTouchedAuthCredentials: AuthCredentialsTouched = {
  email: false,
  password: false,
};

describe('isAuthCredentialsTouched utils', () => {
  it('if  all properties is true then return true', () => {
    expect(isAuthCredentialsTouched(touchedAuthCredentials)).toBeTrue();
  });

  it('if all properties is false then return false', () => {
    expect(isAuthCredentialsTouched(notTouchedAuthCredentials)).toBeFalse();
  });

  it('if one of the properties is false then return false', () => {
    const notTouchedPasswordInAuthCredentials: AuthCredentialsTouched = {
      ...touchedAuthCredentials,
      password: false,
    };

    const notTouchedEmailInAuthCredentials: AuthCredentialsTouched = {
      ...touchedAuthCredentials,
      email: false,
    };

    expect(isAuthCredentialsTouched(notTouchedPasswordInAuthCredentials)).toBeFalse();
    expect(isAuthCredentialsTouched(notTouchedEmailInAuthCredentials)).toBeFalse();
  });

  it('if the email property is true, but the password property is undefined then return false', () => {
    const onlyEmailOfAuthCredentials: AuthCredentialsTouched = {
      email: false,
    };

    expect(isAuthCredentialsTouched(onlyEmailOfAuthCredentials)).toBeFalse();
  });

  it('if the password property is true, but the email property is undefined then return false', () => {
    const onlyEmailOfAuthCredentials: AuthCredentialsTouched = {
      password: true,
    };

    expect(isAuthCredentialsTouched(onlyEmailOfAuthCredentials)).toBeFalse();
  });
});
