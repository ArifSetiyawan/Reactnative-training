import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleProvider, Root} from 'native-base';
import {Login,CreateTask,Splash, TaskList, ApprovalList, TaskDetail, ApprovalDetail} from './src/screens';
import getTheme from './src/theme/components';
import color from './src/theme/variables/commonColor';
import {MainNav} from './src/routes/MainRoutes';


const stackApp = createStackNavigator();

function App() {
  return (
    <StyleProvider style={getTheme(color)}>
      <Root>
          <NavigationContainer>
            <stackApp.Navigator initialRouteName="Splash"
              screenOptions={{
                headerShown: false
              }}>
              <stackApp.Screen name="Splash" component={Splash} />
              <stackApp.Screen name="Login" component={Login} />
              <stackApp.Screen name="MainApp" component={MainNav} />
              <stackApp.Screen name="CreateTask" component={CreateTask} />
              <stackApp.Screen name="TaskList" component={TaskList} />
              <stackApp.Screen name="ApprovalList" component={ApprovalList} />
              <stackApp.Screen name="TaskDetail" component={TaskDetail} />
              <stackApp.Screen name="ApprovalDetail" component={ApprovalDetail} />

            </stackApp.Navigator>
          </NavigationContainer>
      </Root>
    </StyleProvider>
  );
}
export default App;