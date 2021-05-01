import { render, screen, cleanup } from 'testUtils';
import * as DetailsTemplateStories from '../DetailsTemplate/DetailsTemplate.stories';

const getDetailsTemplateElements = () => ({
  articleLink: screen.queryByTestId('article-link'),
  avatar: screen.queryByTestId('avatar'),
});

describe('<DetailsTemplate />', () => {
  afterEach(cleanup);

  it("don't display the article link and the avatar for the note", () => {
    render(<DetailsTemplateStories.Note {...DetailsTemplateStories.Note.args} />, {
      pageType: 'notes',
    });

    const { articleLink, avatar } = getDetailsTemplateElements();

    expect(articleLink).not.toBeInTheDocument();
    expect(avatar).not.toBeInTheDocument();
  });

  it('display the correctly article link and not display avatar for the article', () => {
    render(<DetailsTemplateStories.Article {...DetailsTemplateStories.Article.args} />, {
      pageType: 'articles',
    });

    const { articleLink, avatar } = getDetailsTemplateElements();

    expect(articleLink).toBeInTheDocument();
    expect(articleLink).toHaveAttribute('href', DetailsTemplateStories.Article.args.articleUrl);
    expect(avatar).not.toBeInTheDocument();
  });

  it("don't display article link and display correctly avatar for the twitter", () => {
    render(<DetailsTemplateStories.Twitter {...DetailsTemplateStories.Twitter.args} />, {
      pageType: 'twitters',
    });

    const { articleLink, avatar } = getDetailsTemplateElements();

    expect(articleLink).not.toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute(
      'src',
      expect.stringContaining(DetailsTemplateStories.Twitter.args.twitterName),
    );
  });
});
