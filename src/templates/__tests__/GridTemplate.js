import { render, screen, userEvent, getPairOfPathsAndPageTypes } from 'testUtils';
import GridTemplate from '../GridTemplate/GridTemplate';

describe('<GridTemplate />', () => {
  it.each(getPairOfPathsAndPageTypes())(
    'for the "%s" url path should display the heading with the "%s" text content',
    (path, pageType) => {
      render(
        <GridTemplate>
          <></>
        </GridTemplate>,
        { path, pageType },
      );

      const pageHeading = screen.getAllByRole('heading')[0];

      expect(pageHeading).toHaveTextContent(pageType);
    },
  );

  it.each(getPairOfPathsAndPageTypes())(
    'for the "%s" url path should display paragraph with /[0-9]+ %s/ text content',
    (path, pageTypeText) => {
      render(
        <GridTemplate>
          <></>
        </GridTemplate>,
        { path, pageType: pageTypeText },
      );

      const paragraphContentRegex = /[0-9]+ (notes|twitters|articles)$/;

      expect(screen.getByText(paragraphContentRegex)).toHaveTextContent(pageTypeText);
    },
  );

  /**
   * @todo Disable skipping test after fix the bar accessibility. Now the bar is always visible from accessibility perspective
   */
  it.skip('toggles the visibility of the bar after click his button', () => {
    render(
      <GridTemplate>
        <></>
      </GridTemplate>,
    );

    const newItemBar = screen.getByTestId('new-item-bar');
    const openBarButton = screen.getAllByRole('button')[0];

    expect(newItemBar).not.toBeVisible();
    userEvent.click(openBarButton);
    expect(newItemBar).toBeVisible();
    userEvent.click(openBarButton);
    expect(newItemBar).not.toBeVisible();
  });

  /**
   * @deprecated The test will be removed the test if accessibility fix.
   */
  it('toggles the transform property of the bar after click his button', () => {
    render(
      <GridTemplate>
        <></>
      </GridTemplate>,
    );

    const newItemBar = screen.getByTestId('new-item-bar');
    const openBarButton = screen.getAllByRole('button')[0];

    expect(newItemBar).toHaveStyle('transform: translate(100%)');
    userEvent.click(openBarButton);
    expect(newItemBar).toHaveStyle('transform: translate(0)');
    userEvent.click(openBarButton);
    expect(newItemBar).toHaveStyle('transform: translate(100%)');
  });

  it.todo('displays the correct number of items');
});
