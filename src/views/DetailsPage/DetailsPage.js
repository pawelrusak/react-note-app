import { Component } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import { fetchItem } from 'api';
import PropTypes from 'prop-types';

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
    const { activeItem } = this.props;
    if (activeItem) {
      const [item] = activeItem;
      this.setState({ activeItem: item });
    } else {
      const {
        match: {
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

DetailsPage.propTypes = {
  // eslint-disable-next-line react/require-default-props
  activeItem: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      created: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      content: PropTypes.string.isRequired,
      articleUrl: PropTypes.string,
      twitterName: PropTypes.string,
    }),
  ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

DetailsPage.default = {
  activeItem: null,
};

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
