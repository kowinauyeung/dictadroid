import React, { Component } from 'react';
import store from '../store';
import Languages from '../utils/Languages';
import TabBar from '../components/TabBar';

class TabBarContainer extends Component {
  constructor() {
    super();
    this.state = {
      lang: 'en',
    };
    this.storeListener = this.storeListener.bind(this);
    this.unsubscribe = null;
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(this.storeListener);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  storeListener() {
    const lang = store.getState().user.lang || 'en';
    this.setState({ lang });
  }

  render() {
    return <TabBar LANG={Languages[this.state.lang]} />;
  }
}

export default TabBarContainer;
