import { render, screen, userEvent, getPairOfPathsAndPageTypes } from 'testUtils';
import GridTemplate from '../GridTemplate/GridTemplate';

const renderGridTemplate = (path, pageType) =>
  render(
    <GridTemplate>
      <></>
    </GridTemplate>,
    { path, pageType },
  );

const getAllByHeadingRole = () => screen.getAllByRole('heading');
const getByNewItemBar = () => screen.getByTestId('new-item-bar');
const getAllByButtonRole = () => screen.getAllByRole('button');

const transformTranslateHundredPercent = 'transform: translate(100%)';
const transformTranslateZero = 'transform: translate(0)';

describe('<GridTemplate />', () => {
  it.each(getPairOfPathsAndPageTypes())(
    'for the "%s" url path should display the heading with the "%s" text content',
    (path, pageType) => {
      renderGridTemplate(path, pageType);

      const [gridTemplateHeading] = getAllByHeadingRole();

      expect(gridTemplateHeading).toHaveTextContent(pageType);
    },
  );

  it.each(getPairOfPathsAndPageTypes())(
    'for the "%s" url path should display paragraph with /[0-9]+ %s/ text content',
    (path, pageTypeText) => {
      renderGridTemplate(path, pageTypeText);

      const paragraphContentRegex = /[0-9]+ (notes|twitters|articles)$/;

      expect(screen.getByText(paragraphContentRegex)).toHaveTextContent(pageTypeText);
    },
  );

  /**
   * @todo Disable skipping test after fix the bar accessibility. Now the bar is always visible from accessibility perspective
   */
  it.skip('toggles the visibility of the bar after click his button', () => {
    renderGridTemplate();

    const newItemBar = getByNewItemBar();
    const [toggleNewItemBarButton] = getAllByButtonRole();

    expect(newItemBar).not.toBeVisible();

    userEvent.click(toggleNewItemBarButton);

    expect(newItemBar).toBeVisible();

    userEvent.click(toggleNewItemBarButton);

    expect(newItemBar).not.toBeVisible();
  });

  /**
   * @deprecated The test will be removed the test if accessibility fix.
   */
  it('toggles the transform property of the bar after click his button', () => {
    renderGridTemplate();

    const newItemBar = getByNewItemBar();
    const [toggleNewItemBarButton] = getAllByButtonRole();

    expect(newItemBar).toHaveStyle(transformTranslateHundredPercent);

    userEvent.click(toggleNewItemBarButton);

    expect(newItemBar).toHaveStyle(transformTranslateZero);

    userEvent.click(toggleNewItemBarButton);

    expect(newItemBar).toHaveStyle(transformTranslateHundredPercent);
  });

  it.todo('displays the correct number of items');
});
