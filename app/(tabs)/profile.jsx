import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Redirect, router } from 'expo-router'
import CustomButton from '../../components/CustomButton'
import icons from '../../constants/icons'


const Profile = () => {

  const { isAuthenticated, setIsAuthenticated } = useGlobalContext();
  const logout = () => {
    console.log('logging out ' + isAuthenticated)

    setIsAuthenticated(false)

    router.replace('/sign-in');

  }

  return (
    <SafeAreaView className="h-full" >
      <ScrollView>
        <View
          className="flex flex-col items-center mx-4 justify-center"
        >
          {/* profile details */}
          <CustomButton
            title="Profile"
            handlePress={() => router.push('/profile-details')}
            containerStyles="bg-secondary-light rounded-md w-full flex flex-row items-center justify-between"
            textStyles="text-[16px] text-tertiary-light"
            rightIcon="rightArrowThin"
          />
          {/* Login and security */}
          <CustomButton
            title="Login & Security"
            handlePress={() => router.push('/login-security')}
            containerStyles="bg-secondary-light rounded-md w-full mt-3 flex flex-row items-center justify-between"
            textStyles="text-[16px] text-tertiary-light"
            rightIcon="rightArrowThin"
          />

          {/* Addresses */}
          <CustomButton
            title="Your Addresses"
            handlePress={() => router.push('/address')}
            containerStyles="bg-secondary-light rounded-md w-full mt-3 flex flex-row items-center justify-between"
            textStyles="text-[16px] text-tertiary-light"
            rightIcon="rightArrowThin"
          />

          {/* Wishlist */}
          <CustomButton
            title="Wishlist"
            handlePress={() => router.push('/wishlist')}
            containerStyles="bg-secondary-light rounded-md w-full mt-3 flex flex-row items-center justify-between"
            textStyles="text-[16px] text-tertiary-light"
            rightIcon="rightArrowThin"
          />

          {/* Cart */}
          <CustomButton
            title="Cart"
            handlePress={() => router.push('/cart')}
            containerStyles="bg-secondary-light rounded-md w-full mt-3 flex flex-row items-center justify-between"
            textStyles="text-[16px] text-tertiary-light"
            rightIcon="rightArrowThin"
          />

          {/* Orders */}
          <CustomButton
            title="Orders"
            handlePress={() => router.push('/orders')}
            containerStyles="bg-secondary-light rounded-md w-full mt-3 flex flex-row items-center justify-between"
            textStyles="text-[16px] text-tertiary-light"
            rightIcon="rightArrowThin"
          />

          <CustomButton
            title="Log Out"
            handlePress={logout}
            containerStyles="bg-secondary-light rounded-md w-1/2 mt-10 flex flex-row items-center justify-center"
            textStyles="text-[16px] text-tertiary-light"
            leftIcon="logout"
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

export default Profile