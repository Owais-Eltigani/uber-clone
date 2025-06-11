import { icons } from '@/constants';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

function TabIcon({
  icon,
  focused,
}: {
  icon: ImageSourcePropType;
  focused: boolean;
}) {
  return (
    <View
      className={`flex flex-row justify-center items-center rounded-full mt-10  `}>
      <View
        className={`rounded-full w-11 h-11 justify-center items-center  ${
          focused ? 'bg-general-400' : ''
        } `}>
        <Image
          source={icon}
          className="w-7 h-7"
          tintColor="white"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        animation: 'shift',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333',
          borderRadius: 50,
          paddingBottom: 0,
          overflow: 'hidden',
          display: 'flex',
          height: 78,
          marginBottom: 20,
          marginHorizontal: 20,
          justifyContent: 'space-between',
          // alignItems: 'center',
          flexDirection: 'row',
          position: 'absolute',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          headerShown: false,
          title: 'Rides',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          headerShown: false,
          title: 'Chat',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
