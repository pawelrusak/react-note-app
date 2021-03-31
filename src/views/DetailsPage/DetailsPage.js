import { Component } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import { fetchItem } from 'api';

class DetailsPage extends Component {
  state = {
    activeItem: {
      title: '',
      content: '',
      articleUrl: '',
      twitterName: '',
    },
  };

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { activeItem } = this.props;
    if (activeItem) {
      const [item] = activeItem;
      this.setState({ activeItem: item });
    } else {
      const {
        // eslint-disable-next-line react/prop-types
        match: {
          // eslint-disable-next-line react/prop-types
          params: { id },
        },
      } = this.props;
      fetchItem(id)
        .then(({ data }) => {
          this.setState({ activeItem: data });
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <DetailsTemplate
        title={activeItem.title}
        created={activeItem.created}
        content={activeItem.content}
        articleUrl={activeItem.articleUrl}
        twitterName={activeItem.twitterName}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state[ownProps.pageContext]) {
    return {
      activeItem: state[ownProps.pageContext].filter(
        (item) => item.id === ownProps.match.params.id,
      ),
    };
  }
  return {};
};

export default withContext(connect(mapStateToProps)(DetailsPage));
