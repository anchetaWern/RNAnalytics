import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  ListView,
  Image
} from 'react-native';

import data from '../data';

import Analytics from 'react-native-analytics';

export default class CollectionList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      collection_items: {}
    };
  }

  componentWillMount() {
    var ds = this.state.dataSource.cloneWithRows(data);
    this.setState({
      isDataLoaded: true,
      collection_items: ds
    });

    Analytics.screen("Animals", {"description": "A list containing different animals"});
  }

  renderItem(item) {
    return (
      <TouchableHighlight onPress={this._viewItem.bind(this, item)} underlayColor={"#ccc"} style={styles.button}>
        <View style={styles.portfolio_item}>
          <View style={styles.photo_container}>        
            <Image
              style={styles.thumbnail_photo}
              source={{ uri: item.photos[0].url }}
            />
          </View>
          <View style={styles.photo_label}>
            <Text style={styles.main_text}>{item.title}</Text>
            <Text style={styles.sub_text}>{item.created_by}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
       <ScrollView>
        {
          this.state.isDataLoaded && 
          <ListView 
            initialListSize={2} 
            dataSource={this.state.collection_items} 
            style={styles.collection_items} 
            renderRow={this.renderItem.bind(this)}>
          </ListView>
        }
       </ScrollView>
    );
  }

  _viewItem(item_data) {
    this.props.navigator.push({name: 'item', item: item_data});
  }

}

const styles = StyleSheet.create({
 main_text: {
  fontSize: 30,
  fontWeight: 'bold'
 },
 sub_text: {
  fontSize: 20,
  color: '#ccc'
 },
 button: {
  padding: 20
 },
 thumbnail_photo: {
  width: 100,
  height: 90
 },
 portfolio_item: {
  flexDirection: 'row'
 },
 photo_container: {
  flex: 2
 },
 photo_label: {
  flex: 8
 }
});

AppRegistry.registerComponent('CollectionList', () => CollectionList);
