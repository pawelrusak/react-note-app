import Input from '~/components/atoms/Input/Input';
import { useCurrentPageVariant, useSearchState } from '~/hooks';
import { VisuallyHidden } from '~/utils';

const SearchForm = () => {
  const pageVariant = useCurrentPageVariant();
  const [search, setSearch] = useSearchState(pageVariant);

  return (
    <div role="search">
      <form role="search">
        <p>
          <VisuallyHidden as="label" htmlFor="search-input">
            Search
          </VisuallyHidden>
          <Input
            id="search-input"
            type="search"
            search
            label
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </p>
      </form>
    </div>
  );
};

export default SearchForm;
