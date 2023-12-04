import { Form, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Input from '~/components/atoms/Input/Input';
import Field from '~/components/molecules/Field/Field';
import { AUTH_FORM_DATA_VARIANTS } from '~/constants';
import { media } from '~/theme/mixins';
import { isAuthCredentialsTouched } from '~/utils';

import type { AuthCredential } from '~/commonTypes';

const StyledHeading = styled(Heading)`
  font-size: 3.3rem;
  line-height: 4rem;
  margin-bottom: 3rem;

  ${media.greaterThan('xs')`
    margin-bottom: 4rem;
  `}

  ${media.greaterThan('xl')`
    font-size: 3.8rem;
    margin-bottom: 8rem;
  `}
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledInput = styled(Input)`
  min-width: auto;
  width: 100%;
`;

const StyledField = styled(Field)`
  display: block;
  align-self: stretch;
`;

const StyledButton = styled(Button)`
  margin-bottom: 1.58rem;

  ${media.greaterThan('xs')`
    margin-top: 0.7rem;
  `}

  ${media.greaterThan('xl')`
    margin-top: 4rem;
    margin-bottom: 2.6rem;
  `}
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
`;

export type AuthFormProps = {
  readonly formVariant: 'login' | 'register';
};

const AuthForm = ({ formVariant }: AuthFormProps) => {
  const { isSubmitting, touched, isValid } = useFormikContext<AuthCredential>();
  const { headingText, buttonText, linkPath, linkText } = AUTH_FORM_DATA_VARIANTS[formVariant];

  return (
    <StyledMain>
      <StyledHeading as="h2" id="auth-form">
        {headingText}
      </StyledHeading>
      <StyledForm aria-labelledby="auth-form">
        <StyledField
          name="email"
          type="email"
          placeholder="Login"
          component={StyledInput}
          aria-required="true"
        />
        <StyledField
          name="password"
          type="password"
          placeholder="Password"
          component={StyledInput}
          aria-required="true"
        />
        <StyledButton
          type="submit"
          pending={isSubmitting}
          disabled={isSubmitting || (isAuthCredentialsTouched(touched) && !isValid)}
        >
          {buttonText}
        </StyledButton>
      </StyledForm>
      <StyledLink to={linkPath}>{linkText}</StyledLink>
    </StyledMain>
  );
};

export default AuthForm;
