import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Redirect, router } from 'expo-router'


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
        <View>
          <Text>Profile</Text>
          <TouchableOpacity
            onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

export default Profile