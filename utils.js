import * as SecureStore from 'expo-secure-store'


export async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
}

export async function getItem(key) {
    try {
        let result = await SecureStore.getItemAsync(key);
        return result
    } catch (error) {
        return error
    }
}