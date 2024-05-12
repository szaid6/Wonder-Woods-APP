import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants';
import Header from '../../components/Header';

const TabIcon = ({ icon, focusedIcon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1" >
      <Image
        source={focused ? focusedIcon : icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
      {/* <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} >
        {name}
      </Text> */}
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      {/* Search Bar and Notification Icon */}
      <View className="w-full pt-11 pb-3 px-4 flex flex-row justify-between bg-secondary-light">
        <Header
          showTitle={false}
          title="Home"
          showBackButton={false}
          showNotificationIcon={true}
          showSearchBar={true}
          searchBarEditable={false}
        />
      </View>

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#f37121',
          tabBarInactiveTintColor: '#F37121',
          tabBarStyle: {
            backgroundColor: '#feecd6',
            position: 'absolute',
            bottom: 20,
            left: 30,
            right: 30,
            borderTopWidth: 0,
            elevation: 0,
            borderRadius: 10,
          },
        }}
      >
        {/* Home Screen */}
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.homeOutline}
                focusedIcon={icons.homeSolid}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />

        {/* Cart Screen */}
        <Tabs.Screen
          name='cart'
          options={{
            title: 'Cart',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.cartOutline}
                focusedIcon={icons.cartSolid}
                color={color}
                name="Cart"
                focused={focused}
              />
            )
          }}
        />

        {/* Orders Screen */}
        <Tabs.Screen
          name='orders'
          options={{
            title: 'Orders',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.orderOutline}
                focusedIcon={icons.orderSolid}
                color={color}
                name="Orders"
                focused={focused}
              />
            )
          }}
        />

        {/* Wishlist Screen */}
        <Tabs.Screen
          name='wishlist'
          options={{
            title: 'Wishlist',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.heartOutline}
                focusedIcon={icons.heartSolid}
                color={color}
                name="Wishlist"
                focused={focused}
              />
            )
          }}
        />

        {/* Profile Screen */}
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.userOutline}
                focusedIcon={icons.userSolid}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout