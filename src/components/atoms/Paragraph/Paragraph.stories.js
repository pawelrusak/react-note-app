import Paragraph from './Paragraph';

export default {
  title: 'Atoms/Paragraph',
  component: Paragraph,
};

export const Normal = () => <Paragraph>Hello, World!</Paragraph>;
Normal.parameters = {
  controls: { hideNoControlsWarning: true },
};
