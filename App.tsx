// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDrawer from './AdminDrawer';
import EditPage from './src/Component/EditPage';

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AdminDrawer'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="AdminDrawer" component={AdminDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="EditPage" component={EditPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;