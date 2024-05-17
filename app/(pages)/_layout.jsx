import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'


const PageLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="address"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="address-add"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="address-update"
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen name="notification"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="search"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="category"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="profile-details"
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>
            <StatusBar style="auto" />
        </>
    )
}

export default PageLayout