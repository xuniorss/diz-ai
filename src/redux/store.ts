import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer'
import rootSaga from './root-saga'

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['stepReducer'],
}

const saga = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [logger, saga],
})

saga.run(rootSaga)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
