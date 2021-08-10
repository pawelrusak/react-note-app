import { build, fake } from '@jackfranklin/test-data-bot';
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

type HTMLAttributes = {
  name: 'title';
  value: string;
};

const HTMLAttributeBuilder = build<HTMLAttributes>({
  fields: {
    name: 'title',
    value: fake((faker) => faker.lorem.words()),
  },
});

type ValidationError = {
  message: string;
};

const validationErrorBuilder = build<ValidationError>({
  fields: {
    message: fake((faker) => faker.lorem.words()),
  },
});

describe('<Field />', () => {
  it('the attributes can be added to the input element', () => {
    const fakeHTMLAttribute = HTMLAttributeBuilder();

    renderField({ [fakeHTMLAttribute.name]: fakeHTMLAttribute.value });

    expect(getByFieldPlaceholder()).toHaveAttribute(
      fakeHTMLAttribute.name,
      fakeHTMLAttribute.value,
    );
  });

  it('default the input should be valid and does not have error message', () => {
    renderField();

    expect(getByFieldPlaceholder()).toBeValid();
    expect(getByFieldPlaceholder()).not.toHaveErrorMessage();
  });

  it('when the form has the Formik errors then the field should be invalid and have the error message', async () => {
    const fakeValidationError = validationErrorBuilder();

    const validate = (values: FieldValues) => {
      const errors: Partial<FieldValues> = {};

      if (!values[FIELD_NAME]) {
        errors[FIELD_NAME] = fakeValidationError.message;
      }
      return errors;
    };

    renderField({ validate });

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: /submit/i })));

    expect(getByFieldPlaceholder()).toBeInvalid();
    expect(getByFieldPlaceholder()).toHaveErrorMessage(fakeValidationError.message);
  });
});
