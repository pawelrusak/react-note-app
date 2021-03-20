import Paragraph from './Paragraph';

export default {
  title: 'Atoms/Paragraph',
  component: Paragraph,
};

export const Default = () => <Paragraph>Hello, World!</Paragraph>;
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
