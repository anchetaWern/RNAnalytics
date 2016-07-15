import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import CollectionList from './pages/CollectionList';
import Item from './pages/Item';

import DeviceInfo from 'react-native-device-info';

import config from './config';

import Analytics from 'react-native-analytics';

const PAGES = {
  'collection_list': CollectionList,
  'item': Item
};

class RNAnalytics extends Component {

  componentWillMount() {
    Analytics.setup(config.segmentIOWriteKey, config.flushSetting);
    Analytics.identify(DeviceInfo.getUniqueID(), {
      device_manufacturer: DeviceInfo.getManufacturer(),
      device_model: DeviceInfo.getModel(),
      system_name: DeviceInfo.getSystemName(),
      system_version: DeviceInfo.getSystemVersion()
    });
  }

  render() {
    
    return (

      <Navigator
        initialRoute={{ name: 'collection_list', item: {} }}
        renderScene={(route, navigator) => {
          let PageComponent = PAGES[route.name];
          return (
            <PageComponent route={route} navigator={navigator} item={route.item} />
          ); 
          }
        }
      />
     
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('RNAnalytics', () => RNAnalytics);
