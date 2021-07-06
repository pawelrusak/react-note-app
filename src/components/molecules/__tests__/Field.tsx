import { Formik, FormikConfig, Form } from 'formik';
import { render, screen, userEvent, waitFor } from 'testUtils';

import Field from '../Field/Field';

const FIELD_NAME = 'username' as const;
const FIELD_PLACEHOLDER = FIELD_NAME;

type FieldValues = {
  username: string;
};

type FieldFormikConfig = Partial<FormikConfig<FieldValues>>;

type FieldProps = {
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type RenderFieldProps = FieldFormikConfig & FieldProps;

const renderField = ({
  initialValues = { [FIELD_NAME]: '' },
  onSubmit = () => {
    return undefined;
  },
  placeholder = 'username',
  ...props
}: RenderFieldProps = {}) =>
  render(
    <Formik {...props} initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Field name={FIELD_NAME} placeholder={placeholder} {...(props as FieldProps)} />
        <button type="submit">submit</button>
      </Form>
    </Formik>,
  );

const getByFieldPlaceholder = () => screen.getByPlaceholderText(FIELD_PLACEHOLDER);

describe('<Field />', () => {
  it('the attributes can be added to the input element', () => {
    const ATTRIBUTE_KEY = 'title' as string;
    const ATTRIBUTE_VALUE = 'example field title';

    renderField({ [ATTRIBUTE_KEY]: ATTRIBUTE_VALUE });

    expect(getByFieldPlaceholder()).toHaveAttribute(ATTRIBUTE_KEY, ATTRIBUTE_VALUE);
  });

  it('default the input should be valid and does not have error message', () => {
    renderField();

    expect(getByFieldPlaceholder()).toBeValid();
    expect(getByFieldPlaceholder()).not.toHaveErrorMessage();
  });

  it('when the form has the Formik errors then the field should be invalid and have the error message', async () => {
    const EXAMPLE_ERROR_MESSAGE = 'Example error message';

    const validate = (values: FieldValues) => {
      const errors: Partial<FieldValues> = {};

      if (!values[FIELD_NAME]) {
        errors[FIELD_NAME] = EXAMPLE_ERROR_MESSAGE;
      }
      return errors;
    };

    renderField({ validate });

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: /submit/i })));

    expect(getByFieldPlaceholder()).toBeInvalid();
    expect(getByFieldPlaceholder()).toHaveErrorMessage(EXAMPLE_ERROR_MESSAGE);
  });
});
