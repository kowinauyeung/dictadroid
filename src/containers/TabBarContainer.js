import { connect } from 'react-redux';
import Languages from '../utils/Languages';
import TabBar from '../components/TabBar';

const mapStateToProps = state => ({
  LANG: Languages[state.user.lang],
});

const TabBarContainer = connect(
  mapStateToProps,
  null,
)(TabBar);

export default TabBarContainer;
