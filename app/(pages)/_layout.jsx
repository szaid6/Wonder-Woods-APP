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
            </Stack>
            <StatusBar style="auto" />
        </>
    )
}

export default PageLayout