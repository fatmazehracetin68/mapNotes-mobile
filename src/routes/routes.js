import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import List from '../pages/List';
import Note from '../pages/Note';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Note1, PenAdd, Map1} from 'iconsax-react-native';
import Detail from '../pages/Detail';
import {NotesProvider} from '../contexts/Notes';
import Marker from '../pages/Marker';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator options={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="List"
        component={List}
      />
      <Stack.Screen name="Note" component={Note} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Marker" component={Marker} />
    </Stack.Navigator>
  );
};

const StackNav = () => {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Note1 size="32" color="#ba68c8" />
              ),
            }}
            name="Liste"
            component={AppNavigator}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <PenAdd size="32" color="#ba68c8" />
              ),
            }}
            name="Not Yaz"
            component={Note}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => <Map1 size="32" color="#ba68c8" />,
            }}
            name="Harita"
            component={Marker}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
};

export default StackNav;
