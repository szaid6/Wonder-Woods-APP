import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const PageLayout = () => {
    return (
        <>
            <Text>Header</Text>
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
            </Stack>

            <StatusBar style="auto" />

        </>
    )
}

export default PageLayout