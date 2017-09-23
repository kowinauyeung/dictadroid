import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

function Lessons(props) {
  const { match } = props;
  return (
    <div className="lessons page">
      <NavBar
        pageName="Lessons"
        left={<BackButton to="/" />}
      />
      <div className="page-inner">
        <Link to={`${match.url}/thisislessonid/vocabs`}>vocabs</Link>
      </div>
    </div>
  );
}

Lessons.propTypes = propTypes;

export default Lessons;
