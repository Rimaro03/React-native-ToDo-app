import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@tasks', value)
    } catch (e) {
        console.log(`ERROR GETTING DATA:\n${e}`);
    }
}