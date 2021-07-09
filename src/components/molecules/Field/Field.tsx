import { useField, FieldHookConfig } from 'formik';

import styled from 'styled-components';

import Input from '~/components/atoms/Input/Input';

type StyledWrapperProps = {
  readonly invalid: boolean;
};

const StyledWrapper = styled.p<StyledWrapperProps>`
  display: inline-block;
  // Styles for better the negative space for invalid and valid state
  margin-bottom: ${({ invalid }) => (invalid ? '22px' : '30px')};
  margin-top: 0;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledErrorMessage = styled.span`
  display: block;
  padding: 8px 30px 0;
  color: ${({ theme }) => theme.red300};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
`;

export type FieldProps = FieldHookConfig<string> & {
  readonly search?: never;
  readonly className?: string;
};

/**
 * @todo improve the type for the "component" property
 *
 * @todo add floating label for input
 */
const Field = ({ component: Component = StyledInput, className, ...props }: FieldProps) => {
  const [field, meta] = useField(props);

  const isInvalid = () => meta.touched && Boolean(meta.error);

  const errorMessageId = `${props.id || props.name}-errormessage`;

  return (
    <StyledWrapper invalid={isInvalid()} className={className}>
      <Component
        {...field}
        {...props}
        // eslint-disable-next-line
        // @ts-expect-error
        invalid={isInvalid()}
        aria-errormessage={errorMessageId}
        aria-invalid={isInvalid()}
      />
      {isInvalid() && (
        <StyledErrorMessage id={errorMessageId} aria-live="polite">
          {meta.error}
        </StyledErrorMessage>
      )}
    </StyledWrapper>
  );
};

export default Field;
