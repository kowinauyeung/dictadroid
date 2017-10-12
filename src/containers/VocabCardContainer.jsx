import React from 'react';
import PropTypes from 'prop-types';
import VocabCard from '../pages/VocabCard';
import { parseJSONFromURIComponent } from '../utils/Utils';

const propTypes = {
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
};

function VocabCardContainer(props) {
  const vocab = parseJSONFromURIComponent(props.match.params.vocabJson);
  return <VocabCard vocab={vocab} history={props.history} />;
}

VocabCardContainer.propTypes = propTypes;

export default VocabCardContainer;
