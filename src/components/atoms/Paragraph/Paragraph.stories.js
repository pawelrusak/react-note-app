import Paragraph from './Paragraph';

export default {
  title: 'Paragraph',
  component: Paragraph,
};

export const Normal = () => <Paragraph>Hello, World!</Paragraph>;
Normal.parameters = {
  controls: { hideNoControlsWarning: true },
};
