import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import {Post} from '../components/Post';
import {connect} from 'react-redux';
import * as actions from '../Actions';

class  HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts(offset=0) {
    console.log("3mo el offset",offset)
    const {fetchPosts} = this.props;
    fetchPosts(offset);
  }
  renderItem(item){
    item=item.item;
    return <Post item={item}></Post>
  }
    render(){
      console.log(this.props.posts.length)
    return (
    <View style={styles.container}>
        <FlatList
        data={this.props.posts}
        renderItem={this.renderItem.bind(this)}
        // keyExtractor={(item) =>item.item.id}
        onEndReached={() => {
          // if (!isFetching && alerts.length > 0) {
            const offset = this.props.posts.length;
           this.getPosts(offset);
          // }
        }}
        windowSize={2}
      />
    </View>
  );
}
}
HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    backgroundColor:'#1F1F1F'
  },
});


const mapStateToProps = ({posts}, props) => {
  const {activePost, isLoading} = posts;
  return {
    posts: posts.list||[],
    post: activePost,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: offset => dispatch(actions.fetchPosts(offset)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
