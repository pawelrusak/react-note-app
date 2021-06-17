import styled from 'styled-components';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';

const firstSquareColor = 'lightgrey';
const secondSquareColor = 'transparent';
const squareSize = '10'; // in px

/**
 * @see {@link https://destroytoday.com/blog/checkered-pattern-for-loading-images-revisited}
 */
const StyledChessboard = styled.div`
  background-image: linear-gradient(45deg, ${firstSquareColor} 25%, ${secondSquareColor} 25%),
    linear-gradient(135deg, ${firstSquareColor} 25%, ${secondSquareColor} 25%),
    linear-gradient(45deg, ${secondSquareColor} 75%, ${firstSquareColor} 75%),
    linear-gradient(135deg, ${secondSquareColor} 75%, ${firstSquareColor} 75%);
  background-size: ${squareSize * 2}px ${squareSize * 2}px;
  background-position: 0 0, ${squareSize}px 0, ${squareSize}px -${squareSize}px, 0px ${squareSize}px;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledParagraph = styled(Paragraph)`
  max-width: 80%;
  font-weight: ${({ theme }) => theme.bold};
`;

const ViewPlaceholder = () => (
  <StyledChessboard>
    <StyledParagraph>View components goes here!</StyledParagraph>
  </StyledChessboard>
);

export default ViewPlaceholder;
