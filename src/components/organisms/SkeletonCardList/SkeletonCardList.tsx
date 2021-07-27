import SkeletonCard, { SkeletonCardProps } from '~/components/molecules/SkeletonCard/SkeletonCard';
import { getUniqueValuesArray } from '~/utils';

export type SkeletonCardsListProps = SkeletonCardProps & {
  length: number;
};

const defaultProps = {
  length: 6,
  lighten: false,
  lightenAmount: undefined,
  grey: false,
};

const SkeletonCardsList = ({
  length,
  grey,
  lighten,
  lightenAmount,
}: SkeletonCardsListProps & typeof defaultProps) => (
  <>
    {getUniqueValuesArray(length).map((key) => {
      if (grey) {
        return <SkeletonCard key={key} grey />;
      }

      if (lighten) {
        return <SkeletonCard key={key} lighten lightenAmount={lightenAmount} />;
      }

      return <SkeletonCard key={key} />;
    })}
  </>
);

SkeletonCardsList.defaultProps = defaultProps;

export default SkeletonCardsList;
