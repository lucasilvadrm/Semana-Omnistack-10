import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'
import { connect, disconnect, subscribeToNewDevs } from '../services/socket'

function Main({ navigation }) { // essa propriedade vem de forma automática para todas as páginas da aplicação
    const [devs, setDevs] = useState([])
    const [currentRegion, setCurrentRegion] = useState(null) //nenhuma região de início
    const [techs, setTechs] = useState('')

    useEffect(() => {
        async function loadInitialPosition() { //carregar posição inicial do mapa
            const { granted } = await requestPermissionsAsync() //retorna um objeto com várias informações sobre a permissão de usuário

            if (granted) {
                const { coords } = await getCurrentPositionAsync({ //capturando as coordenadas
                    enableHighAccuracy: true //habilitar o gps do celular para uma localização mais precisa
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition()
    }, [])

    useEffect(() => {
        subscribeToNewDevs(dev => {
            setDevs([...devs, dev])
        })
    }, [devs])

    function setupWebsocket() {
        disconnect()

        const { latitude, longitude } = currentRegion

        connect(
            latitude,
            longitude,
            techs
        )

        subscribeToNewDevs
    }

    async function loadDevs() { //carregar os devs cadastrados na api
        const { latitude, longitude } = currentRegion

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })

        // console.log(response.data.devs)
        setDevs(response.data.devs)
        setupWebsocket()
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region)
    }

    if (!currentRegion) { //só irá mostrar o mapa no momento em que as informções da localização estiverem disponíveis
        return null
    }
    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={{
                        latitude: dev.location.coordinates[1],
                        longitude: dev.location.coordinates[0]
                    }}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

                        <Callout onPress={() => {
                            //navegação
                            navigation.navigate('Profile', { github_username: dev.github_username })
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Buscar devs por techs...'
                    placeholderTextColor='#999'
                    autoCapitalize='words' //primeira letra de cada palavra, em maiúsculo
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    devBio: {
        color: '#667',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    },

    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFf',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,

    }
})

export default Main