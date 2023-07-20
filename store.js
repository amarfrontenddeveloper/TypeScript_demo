import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { customerSliceReducer } from './reducer';

const rootReducer = combineReducers({
    customer: customerSliceReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['customer']
    // whitelist: ['customer',]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    // reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        })
})

export default store;

export const persistor = persistStore(store);
export const resetStore = async () => {
    return await persistor.purge().then(() => persistor.flush());
}


// const rootReducer = combineReducers({

// })

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     whitelist:[]
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = configureStore({
//     reducer: persistedReducer
// })

// export default store;

// export const persistor = persistStore(store);



