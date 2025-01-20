import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ExpenseInputScreen from './components/ExpenseInputScreen';
import ExpenseLogScreen from './components/ExpenseLogScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ExpenseInput" component={ExpenseInputScreen} />
            <Stack.Screen name="ExpenseLog" component={ExpenseLogScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
