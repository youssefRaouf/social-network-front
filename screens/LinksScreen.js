import React from 'react';
import { Video } from 'expo-av';

import { Platform, StatusBar, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default class CreatePostScreen extends React.Component {
  state = {
    useNativeControls: true,
    toggleOnInstance: false,
    shouldPlay: true,
  };

  handleVideoRef = ref => {
    this.videoInstance = ref;
  };

  // handleLoadStart = () => console.log('Loading...');
  // handleLoaded = params => console.log('Video loaded:', params);
  // handleProgress = params => console.log('Video status change:', params);
  // handleError = error => console.error(error);

  toggleOnInstance = async () => {
    if (this.videoInstance) {
      if (this.state.shouldPlay) {
        await this.videoInstance.pauseAsync();
        this.setState({ shouldPlay: false });
      } else {
        await this.videoInstance.playAsync();
        this.setState({ shouldPlay: true });
      }
    }
  };

  toggleShouldPlay = () => this.setState({ shouldPlay: !this.state.shouldPlay });

  renderPlayPauseButton = () =>
    !this.state.useNativeControls ? (
      <TouchableHighlight
        style={styles.button}
        underlayColor="rgba(0,0,0,0.5)"
        onPress={this.state.toggleOnInstance ? this.toggleOnInstance : this.toggleShouldPlay}>
        <Text style={styles.buttonText}>{this.state.shouldPlay ? '⏸' : '▶️'}</Text>
      </TouchableHighlight>
    ) : null;

  render() {
 
    const STREAM = 'https://console.firebase.google.com/project/social-network-de3a1/storage/social-network-de3a1.appspot.com/files~2Fimages'
    const MP4 = 'https://console.firebase.google.com/project/social-network-de3a1/storage/social-network-de3a1.appspot.com/files~2Fimages'
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <Video
          resizeMode="contain"
          style={styles.video}
          ref={this.handleVideoRef}
          onLoad={this.handleLoaded}
          onError={this.handleError}
          shouldPlay={this.state.shouldPlay}
          onLoadStart={this.handleLoadStart}
          onPlaybackStatusUpdate={this.handleProgress}
          useNativeControls={this.state.useNativeControls}
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/social-network-de3a1.appspot.com/o/images%2Ftest3?alt=media&token=e09ef23c-a036-4c36-b08f-9d9be6542203' }}
        />
        <View style={styles.buttonContainer} pointerEvents="box-none">
          {this.renderPlayPauseButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    position: 'absolute',
    height: 100,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 80,
  },
});
