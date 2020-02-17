import React, { Component } from 'react';
    import { View, ScrollView, TextInput, Button, StyleSheet, WebView,Text } from 'react-native';
    import { Linking } from 'expo';
    import * as firebase from 'firebase';

    const captchaUrl = 'https://my-domain.web.app/captcha-page.html';

    

    export default class LoginScreen extends Component {
        constructor(props) {
            super(props)
            this.state = {
                user: undefined,
                phone: '',
                confirmationResult: undefined,
                code: '',
                isWebView: false
            }
            firebase.auth().onAuthStateChanged(user => {
                this.setState({ user })
            })
        }

    onPhoneChange = (phone) => {
        this.setState({ phone })
    }
    _onNavigationStateChange(webViewState) {
        console.log(webViewState.url)
        this.onPhoneComplete(webViewState.url)
    }
    onPhoneComplete = async () => {
        let token = null
        console.log("oks");
        //WebBrowser.dismissBrowser()
        const tokenEncoded = Linking.parse(captchaUrl).queryParams['token']
        if (tokenEncoded)
            token = decodeURIComponent(tokenEncoded)

        this.verifyCaptchaSendSms(token);


    }
    verifyCaptchaSendSms = async (token) => {
       console.log("youssef")
       console.log(token)
       token = 12534634646
        if (token) {
            const { phone } = this.state
            //fake firebase.auth.ApplicationVerifier
            const captchaVerifier = {
                type: 'recaptcha',
                verify: () => Promise.resolve(token)
            }
            try {
                const confirmationResult = await firebase.auth().signInWithPhoneNumber(phone, captchaVerifier)
                console.log("confirmationResult" + JSON.stringify(confirmationResult));
                this.setState({ confirmationResult, isWebView: false })
            } catch (e) {
                console.warn(e)
            }

        }
    }

    onSignIn = async (code) => {
        const { confirmationResult } = this.state
        try {
            const result = await confirmationResult.confirm(code);
            this.setState({ result });

        } catch (e) {
            console.warn(e)

        }
    }
    onSignOut = async () => {
        try {
            await firebase.auth().signOut()
        } catch (e) {
            console.warn(e)
        }
    }
    reset = () => {
        this.setState({
            phone: '',
            phoneCompleted: false,
            confirmationResult: undefined,
            code: ''
        })
    }

    render() {
    if (this.state.user)
        return (
            <ScrollView style={{padding: 20, marginTop: 20}}>
                <Text>You signed in</Text>
                <Button
                    onPress={this.onSignOut}
                    title="Sign out"
                />
            </ScrollView>
        )
        else if (this.state.isWebView)
            return (
                <WebView
                    ref="webview"
                    source={{ uri: captchaUrl }}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    injectedJavaScript={this.state.cookie}
                    startInLoadingState={false}
                />

            )
        else if (!this.state.confirmationResult)
            return (
                <ScrollView style={{ padding: 20, marginTop: 20 }}>
                    <TextInput
                        value={this.state.phone}
                        onChangeText={this.onPhoneChange}
                        keyboardType="phone-pad"
                        placeholder="Your phone"
                    />
                    <Button
                        onPress={this.onPhoneComplete}
                        title="Next"
                    />
                </ScrollView>
            )
        else
            return (
                <ScrollView style={{padding: 20, marginTop: 20}}>
                    <TextInput
                        value={this.state.code}
                        onChangeText={this.onCodeChange}
                        keyboardType="numeric"
                        placeholder="Code from SMS"
                    />
                    <Button
                        onPress={this.onSignIn}
                        title="Sign in"
                    />
                </ScrollView>
            )
    }
}
const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
    },
});