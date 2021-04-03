import StoryRouter from 'storybook-react-router';
import GridTemplate from './GridTemplate';
import { StoreDecorator } from '../../../.storybook/decorators';
import ViewPlaceholder from '../../../.storybook/components/ViewPlaceholder';

export default {
  title: 'Templates/GridTemplate',
  component: GridTemplate,
  decorators: [StoryRouter(), StoreDecorator],
};

const Template = () => (
  <GridTemplate>
    <ViewPlaceholder />
  </GridTemplate>
);

export const Default = Template.bind({});

export const Note = Template.bind({});
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.parameters = {
  pageContext: 'articles',
};
