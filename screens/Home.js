import { Button, StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'

export default function Home(props) {
    const [songs, setSongs] = useState([])
    useEffect(() => {
        async function Authorize() {
            let token = await SecureStore.getItemAsync('token')
            axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    " Authorization": `Bearer ${token}`,
                },
            })
                .then((response) => {
                    // dispatch(songAction.addTopSongs(response));
                    setSongs(response.data.items)
                })
                .catch((error) => {
                    console.error("error", error.message);
                });

            //dispatch(tokenAction.addToken(token));

        }
        Authorize()

        return () => {

        }
    }, [])
    function RenderItem({ song }) {
        return (
            <View key={song.id} style={{ backgroundColor: '#FFF', width: '99%', elevation: 6, borderRadius: 10, padding: 6, marginVertical: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Image src={song.album.images[0].url} style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 10 }} />
                <Text style={{ fontWeight: 'bold', flexWrap: 'wrap', marginLeft: 5, width: '60%' }} numberOfLines={2}>{song.name}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Spotty</Text>
            {/* {songs && songs.map((song) => {
                return (
                    <View key={song.id} style={{ backgroundColor: '#FFF', width: '99%', elevation: 6, borderRadius: 10, padding: 6, marginVertical: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Image src={song.album.images[0].url} style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 10 }} />
                        <Text style={{ fontWeight: 'bold', flexWrap: 'wrap', marginLeft: 5, width: '60%' }} numberOfLines={2}>{song.name}</Text>
                    </View>
                )
            })} */}
            <FlatList
                data={songs}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <RenderItem song={item} />}
                ListHeaderComponent={() => {
                    return (
                        <View>
                            <Text style={{ paddingHorizontal: 6, fontWeight: 'bold' }}>Your Top Songs</Text>
                        </View>
                    )
                }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        fontWeight: "500",
        fontSize: 30,
        marginTop: 10,
        marginLeft: 10,
        fontFamily: 'DancingScript_700Bold',
        marginBottom: 20
    },
    button: {},
});
