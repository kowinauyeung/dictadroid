import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';

const propTypes = {
  history: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
};

function Books(props) {
  const { history } = props;
  return (
    <div className="books">
      <NavBar
        pageName="Books"
        left={<BackButton history={history} />}
      />
    </div>
  );
}

Books.propTypes = propTypes;

export default Books;
