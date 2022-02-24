import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@tasks')
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log(`ERROR GETTING DATA:\n${e}`);
    }
}