import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { save } from "../utils";
import axios from 'axios'
//import { CLIENT_ID } from 'react-native-dotenv'


const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
};
export default function ({ navigation }) {

    const [loading, setLoading] = useState(false)
    //const dispatch = useDispatch();
    const [token, setToken] = useState("");

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: process.env.CLIENT_ID,
            scopes: [
                "user-read-currently-playing",
                "user-read-recently-played",
                "user-read-playback-state",
                "user-top-read",
                "user-modify-playback-state",
                "streaming",
                "user-read-email",
                "user-read-private",
            ],
            // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: "exp://192.168.1.53:8082",
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === "success") {
            const { access_token } = response.params;
            setToken(access_token);
        }
    }, [response]);

    useEffect(() => {
        async function Authorize() {
            if (token) {
                axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                })
                    .then((response) => {
                        // dispatch(songAction.addTopSongs(response));
                    })
                    .catch((error) => {
                        console.log("error", error.message);
                    });

                setTimeout(
                    () =>
                        navigation.replace("HomeTab", {
                            token: token,
                            other: "blaaaa",
                        }),
                    500
                )
                await save('token', token)
                //dispatch(tokenAction.addToken(token));
            }
        }
        Authorize()
    }, [token]);
    return (
        <View style={styles.container}>
            {/* <Loader loading={loading} /> */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                <Image
                    source={require("../assets/spotty2.png")}
                    style={{ resizeMode: "contain", alignSelf: "center", width: 100, height: 100 }}
                />
                <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 30, fontFamily: 'serif' }}>Spotty</Text>
            </View>

            <View style={{ flex: 2 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => promptAsync()}
                    activeOpacity={0.5}
                >
                    <Text style={styles.buttonText}>Login with Spotify</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
    inputStyle: {
        color: "black",
        marginTop: 25,
        borderRadius: 10,
        borderColor: "#ccc",
        borderRadius: 30,
        borderWidth: 1,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 10,
        paddingTop: 10,
        alignSelf: "center",
        width: "90%",
    },
    button: {
        backgroundColor: "#7DE24E",
        borderWidth: 0,
        color: "#FFFFFF",
        borderColor: "#7DE24E",
        height: 40,
        alignItems: "center",
        borderRadius: 20,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center'
    },
    buttonText: { color: "#FFFFFF", paddingVertical: 10, fontSize: 16, fontWeight: 'bold' },
});
