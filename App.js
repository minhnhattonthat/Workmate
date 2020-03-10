import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './app/Router';
import { store, persistor } from './app/store';

const prefix =
  Platform.OS === 'android' ? 'workmate://workmate/' : 'workmate://';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation uriPrefix={prefix} />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
