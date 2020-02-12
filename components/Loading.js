import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import LottieView from "lottie-react-native";

export default class Loading extends React.Component {
  componentDidMount() {
    if(this.props.stop===true){

    }else{
      this.animation.play();
    }   // this.animation.rese
    // this.animation.play
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <TouchableOpacity style={[styles.animationContainer, this.props.style]} onPress={this.props.onPress}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 300,
            height: this.props.height,
            backgroundColor: '#1F1F1F',
          }}
          source={require('../assets/loading.json')}
        />
        {/* <View style={styles.buttonContainer}>
          <Button title="Restart Animation" onPress={this.resetAnimation} />
        </View> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#1F1F1F',
    height:30,
    width:30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
