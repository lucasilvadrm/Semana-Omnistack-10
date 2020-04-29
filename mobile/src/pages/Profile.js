import React from 'react'
import { View } from 'react-native' //semelhante a div
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
    const githubUsername = navigation.getParam('github_username') //pegando um parametro da rota que estou recebendo

    return <WebView style={{ flex: 1 }}
    source={{ uri: `https://github.com/${githubUsername}` }}/>
}

export default Profile