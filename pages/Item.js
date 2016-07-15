import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  ListView,
  Image,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

let screen_height = Dimensions.get("window").height;

import Analytics from 'react-native-analytics';

export default class CollectionList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      photos: {}
    };
  }

  componentWillMount() {
    var ds = this.state.dataSource.cloneWithRows(this.props.item.photos);
    this.setState({
      photos: ds
    });

    Analytics.screen(this.props.item.title);
  }

  renderPhoto(photo) {
    return (
        <View style={styles.photo_container}>
          <Image
            style={styles.photo}
            source={{ uri: photo.url }}
          />
          <View style={styles.actions}>
			<TouchableHighlight onPress={this._favorite.bind(this, photo)} underlayColor={"#ccc"} style={styles.action_button}>
				<Icon name="heart-o" size={30} color="#222" />
			</TouchableHighlight>
			<TouchableHighlight onPress={this._bookmark.bind(this, photo)} underlayColor={"#ccc"} style={styles.action_button}>
				<Icon name="bookmark-o" size={30} color="#222" />
			</TouchableHighlight>
			<TouchableHighlight onPress={this._share.bind(this, photo)} underlayColor={"#ccc"} style={styles.action_button}>
				<Icon name="share-square-o" size={30} color="#222" />
			</TouchableHighlight>
          </View>
        </View>
    );
  }

  render() {
    return (
		<ScrollView style={styles.scroller}>
			<View style={styles.header}>
				<TouchableHighlight onPress={this._goToList.bind(this)} underlayColor={"#ccc"} style={styles.nav_button}>
					<Icon name="chevron-left" size={40} color="#4078c0" />
				</TouchableHighlight>
				<View style={styles.title}>
					<Text style={styles.main_text}>{this.props.item.title}</Text>
					<Text style={styles.sub_text}>{this.props.item.created_by}</Text>
				</View>
			</View>
			
			<ListView 
				initialListSize={2} 
				dataSource={this.state.photos} 
				style={styles.photos} 
				renderRow={this.renderPhoto.bind(this)}>
			</ListView>
		
		</ScrollView>
    );
  }

  _goToList() {
  	this.props.navigator.pop();
  }

  _favorite(photo) {
	Analytics.track("Favorited Photo", {
		gallery: this.props.item.title,
		caption: photo.caption,
		url: photo.url
	});
	alert('favorited!');
  }

  _bookmark(photo) {
	Analytics.track("Bookmarked Photo", {
		gallery: this.props.item.title,
		caption: photo.caption,
		url: photo.url
	});
	alert('bookmarked!');
  }

  _share(photo) {
	Analytics.track("Shared Photo", {
		gallery: this.props.item.title,
		caption: photo.caption,
		url: photo.url
	});
	alert('shared!');
  }

}

const styles = StyleSheet.create({
 header: {
  padding: 10,
  flexDirection: 'row'
 },
 nav_button: {
	flex: 1,
	justifyContent: 'center'
 },
 title: {
	flex: 9
 },
 main_text: {
  fontSize: 30,
  fontWeight: 'bold'
 },
 sub_text: {
  fontSize: 20,
  color: '#ccc'
 },
 photo_container: {
	marginBottom: 20,
 },
 photo: {
 	height: 400
 },
 actions: {
 	padding: 10,
 	flexDirection: 'row',
 	justifyContent: 'space-around'
 }
});

AppRegistry.registerComponent('CollectionList', () => CollectionList);