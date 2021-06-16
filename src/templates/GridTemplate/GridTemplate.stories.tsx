import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { routes } from '~/routes';
import GridTemplate, { GridTemplateProps } from './GridTemplate';
import { StoreDecorator, GridTemplateRouterDecorator } from '../../../.storybook/decorators';
import ViewPlaceholder from '../../../.storybook/components/ViewPlaceholder';

export default {
  title: 'Templates/GridTemplate',
  component: GridTemplate,
  decorators: [StoreDecorator],
} as Meta;

const Template: Story<GridTemplateProps> = () => (
  <GridTemplate>
    <ViewPlaceholder />
  </GridTemplate>
);

export const Default = Template.bind({});
Default.decorators = [StoryRouter()];

export const Note = Template.bind({});
Note.decorators = [GridTemplateRouterDecorator(routes.notes)];
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.decorators = [GridTemplateRouterDecorator(routes.twitters)];
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.decorators = [GridTemplateRouterDecorator(routes.articles)];
Article.parameters = {
  pageContext: 'articles',
};
