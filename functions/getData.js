import AsyncStorage from '@react-native-async-storage/async-storage';


const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@tasks')
        if (value !== null) {
            // value previously stored
        }
    } catch (e) {
        // error reading value
    }
}


export default getData;