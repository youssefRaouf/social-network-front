import React, { Component } from 'react';
import { View, Text, Platform, Keyboard, InputAccessoryView ,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import PostButton from '../Components/Buttons/PostButton';
const inputAccessoryViewID = 'uniqueID';
const accessoryViewHeight = 42;

class AccessoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  _keyboardDidShow() {
    this.setState({
      show: true,
    });
  }

  _keyboardDidHide() {
    this.setState({
      show: false,
    });
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this)
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  renderBody() {
    const { buttonTitle = 'Reply', textInserted,onSubmit, maxCharacterLength = 250 } = this.props;
    const progress = (textInserted || '').length;
    return (
      <View style={styles.accessoryViewContainer}>
        <Text
          style={[styles.progressText, { color: progress > maxCharacterLength ? 'red' : 'white' }]}
        >{`${progress}/${maxCharacterLength}`}</Text>
        <TouchableOpacity
          style={styles.buttonReplyView}
          // buttonStyle={styles.buttonReply}
          onPress={onSubmit}
          disabled={(textInserted || '').replace(new RegExp(' ', 'g'), '').length === 0||progress>maxCharacterLength}
        ><Text style={{color:(textInserted || '').replace(new RegExp(' ', 'g'), '').length === 0||progress>maxCharacterLength?'#857b7c':'white'}}>Reply</Text></TouchableOpacity>
      </View>
    );
  }

  render() {
    const { id = inputAccessoryViewID } = this.props;
    if (Platform.OS === 'ios') {
      return <InputAccessoryView nativeID={id}>{this.renderBody()}</InputAccessoryView>;
    } else {
      if (!this.state.show) {
        return null;
      }
      return <View>{this.renderBody()}</View>;
    }
  }
}

const styles = {
  accessoryViewContainer: {
    height: accessoryViewHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(12, 20, 30)',
    paddingBottom: 12,
  },
  buttonReply: {
    width: 64,
    height: 30,
  },
  buttonReplyView: {
    marginTop:5,
    justifyContent:'center',
    alignItems:'center',
    width: 64,
    height: 30,
    backgroundColor:'#814016',
    marginRight: 17,
    borderRadius:32,
  },
  progressText: {
    color: 'white',
    paddingLeft: 22,
    paddingRight: 10,
  },
};

export { inputAccessoryViewID, AccessoryView, accessoryViewHeight };
