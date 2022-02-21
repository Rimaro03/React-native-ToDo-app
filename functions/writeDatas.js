import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@tasks', value)
    } catch (e) {
        // saving error
    }
}

export default storeData;