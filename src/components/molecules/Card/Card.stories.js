import { Provider } from 'react-redux';
import styled from 'styled-components';
import store from 'store';
import Card from './Card';

const CardWrapper = styled.div`
  max-width: 45.5rem;
`;

export default {
  title: 'Molecules/Card',
  component: Card,
  args: {
    id: '8885d2d6-b081-4342-8232-e889affa9d93',
    title: 'My best note ever',
    created: '3 days',
    content: `Miles Dewey Davis III (May 26, 1926 - 
       September 28, 1991) was an American jazz
       trumpeter, bandleader, and composer.`,
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
    (Story) => (
      <CardWrapper>
        <Story style={{ zIndex: 2 }} />
      </CardWrapper>
    ),
  ],
};

const Template = (args) => <Card {...args} />;

export const Note = Template.bind({});
Note.args = {};
Note.parameters = {
  pageContext: 'notes',
};

export const Twitter = Template.bind({});
Twitter.args = {
  twitterName: 'hello_romans',
};
Twitter.parameters = {
  pageContext: 'twitters',
};

export const Article = Template.bind({});
Article.args = {
  articleUrl: 'https://youtube.com/helloroman',
};
Article.parameters = {
  pageContext: 'articles',
};
