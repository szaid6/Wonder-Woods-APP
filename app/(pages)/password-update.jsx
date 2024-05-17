import { View, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'

const PasswordUpdate = () => {

    const [form, setForm] = useState({
        password: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const updatePassword = () => {
        console.log('updating password');

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);

            // go back to the previous screen
            router.back();
        }, 2000);
    }

    return (
        <>
            <View className="w-full pt-11 px-4 flex flex-row justify-between relative bg-secondary-light">
                <Header
                    showTitle={true}
                    title="Update Password"
                    showBackButton={true}
                    showNotificationIcon={true}
                    showSearchBar={false}
                    searchBarEditable={false}
                />
            </View>
            <SafeAreaView
                className="w-full flex-1 bg-white "
            >
                <ScrollView
                    className=""
                >
                    <View className="flex items-center px-5 justify-center w-full min-h-[90vh]">
                        <Image
                            source={images.logo}
                            className="w-36 h-36 mb-[50px] rounded-md"
                            resizeMode='contain'
                        />
                        <View className="w-full">
                            <View className="flex items-center w-full py-4 bg-secondary-lighter">
                                <Text className="text-3xl mb-10 text-tertiary font-psemibold">Update Password</Text>

                                <FormField
                                    label=""
                                    placeholder="Enter old password"
                                    type="password"
                                    value={form.password}
                                    handleChangeText={(value) => setForm({ ...form, password: value })}
                                    otherStyles="mb-5 w-80"
                                    secureTextEntry={true}
                                    externalIcon="lock"
                                />

                                <FormField
                                    label=""
                                    placeholder="Enter new password"
                                    type="password"
                                    value={form.password}
                                    handleChangeText={(value) => setForm({ ...form, password: value })}
                                    otherStyles="mb-5 w-80"
                                    secureTextEntry={true}
                                    externalIcon="lock"
                                />

                                <FormField
                                    label=""
                                    placeholder="Confirm new password"
                                    type="password"
                                    value={form.confirmPassword}
                                    handleChangeText={(value) => setForm({ ...form, confirmPassword: value })}
                                    otherStyles="mb-5 w-80"
                                    secureTextEntry={true}
                                    externalIcon="lock"
                                />

                                {/* Login Button */}
                                <CustomButton
                                    title="UPDATE"
                                    containerStyles="w-3/4 mt-8 mb-5"
                                    textStyles="text-lg text-tertiary-light"
                                    handlePress={updatePassword}
                                    isLoading={isSubmitting}
                                >
                                </CustomButton>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            {/* <View
            className="fixed bottom-0"
        >
            <CustomButton
                title="UPDATE PROFILE"
                containerStyles="w-full bg-primary rounded-sm"
                textStyles="text-lg text-white"
                handlePress={() => router.push('address')}
            />
        </View> */}
        </>
    )
}

export default PasswordUpdate