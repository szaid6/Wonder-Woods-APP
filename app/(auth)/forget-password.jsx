import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router'


const ForgetPassword = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    return (
        <>
            <SafeAreaView className="h-full">
                <ScrollView>
                    <View className="flex items-center px-5 justify-center w-full min-h-[100vh]">
                        <Image
                            source={images.logo}
                            className="w-36 h-36 mb-[80px]"
                            resizeMode='contain'
                        />
                        <View className="w-full">
                            <View className="flex items-center w-full py-4 bg-secondary-lighter">
                                <Text className="text-3xl mb-10 text-tertiary font-psemibold">Forget Password</Text>

                                {/* Email field */}
                                <FormField
                                    label=""
                                    placeholder="Enter your email"
                                    type="email"
                                    value={form.email}
                                    handleChangeText={(value) => setForm({ ...form, email: value })}
                                    otherStyles="mb-5"
                                    externalIcon="mail"
                                />

                                <FormField
                                    label=""
                                    placeholder="Enter your password"
                                    type="password"
                                    value={form.password}
                                    handleChangeText={(value) => setForm({ ...form, password: value })}
                                    otherStyles="mb-5"
                                    secureTextEntry={true}
                                    externalIcon="lock"
                                />

                                <FormField
                                    label=""
                                    placeholder="Confirm your password"
                                    type="password"
                                    value={form.confirmPassword}
                                    handleChangeText={(value) => setForm({ ...form, confirmPassword: value })}
                                    otherStyles="mb-5"
                                    secureTextEntry={true}
                                    externalIcon="lock"
                                />
                                <View className="w-3/4 mb-4 mt-2 border border-tertiary-light"></View>

                                {/* 2 links of create account and forget password */}
                                <View className="flex flex-row justify-between w-full px-3">
                                    <Link href="/sign-up" className="text-primary font-pmedium">Create Account</Link>
                                    <Link href="/sign-in" className="text-primary font-pmedium">Back to Login</Link>
                                </View>

                                {/* Login Button */}
                                <CustomButton
                                    title="CHANGE PASSWORD"
                                    containerStyles="w-3/4 mt-8 mb-5"
                                    textStyles="text-lg text-tertiary-light"
                                    handlePress={() => { }}
                                    isLoading={isSubmitting}
                                >
                                </CustomButton>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default ForgetPassword