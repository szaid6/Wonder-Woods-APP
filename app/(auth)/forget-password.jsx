import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgetPassword = () => {
    return (
        <>
            <SafeAreaView className="h-full">
                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    <View className="w-full items-center justify-center h-full px-4">
                        <View>
                            <Text>Forget Password</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default ForgetPassword