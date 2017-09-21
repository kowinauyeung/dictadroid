import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';

const propTypes = {
  history: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
};

function Lessons(props) {
  const { history } = props;
  return (
    <div className="lessons">
      <NavBar
        pageName="Lessons"
        left={<BackButton history={history} />}
      />
    </div>
  );
}

Lessons.propTypes = propTypes;

export default Lessons;
