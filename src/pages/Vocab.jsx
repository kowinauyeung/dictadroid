import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

const defaultProps = {
};

function Vocab(props) {
  const { match } = props;
  return (
    <div className="vocab page">
      <NavBar
        pageName="Vocab"
        left={<BackButton to={`/lessons/${match.params.lessionId}/vocabs`} text="Back" />}
      />
    </div>
  );
}

Vocab.propTypes = propTypes;
Vocab.defaultProps = defaultProps;

export default Vocab;
