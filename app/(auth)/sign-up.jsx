import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router'


const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
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
              className="w-36 h-36 mb-[20px]"
              resizeMode='contain'
            />
            <View className="w-full">
              <View className="flex items-center w-full py-4 bg-secondary-lighter">
                <Text className="text-3xl mb-10 text-tertiary font-psemibold">Register</Text>

                {/* Name field */}
                <FormField
                  label=""
                  placeholder="Enter your name"
                  type="text"
                  value={form.name}
                  handleChangeText={(value) => setForm({ ...form, name: value })}
                  otherStyles="mb-5 w-80"
                  externalIcon="userOutline"
                />

                {/* Phone field */}
                <FormField
                  label=""
                  placeholder="Enter your phone number"
                  type="tel"
                  value={form.email}
                  handleChangeText={(value) => setForm({ ...form, email: value })}
                  otherStyles="mb-5 w-80"
                  keyboardType="phone-pad"
                  externalIcon="phone"
                />

                {/* Email field */}
                <FormField
                  label=""
                  placeholder="Enter your email"
                  type="email"
                  value={form.email}
                  handleChangeText={(value) => setForm({ ...form, email: value })}
                  otherStyles="mb-5 w-80"
                  externalIcon="mail"
                />

                <FormField
                  label=""
                  placeholder="Enter your password"
                  type="password"
                  value={form.password}
                  handleChangeText={(value) => setForm({ ...form, password: value })}
                  otherStyles="mb-5 w-80"
                  secureTextEntry={true}
                  externalIcon="lock"
                />

                <FormField
                  label=""
                  placeholder="Confirm your password"
                  type="password"
                  value={form.confirmPassword}
                  handleChangeText={(value) => setForm({ ...form, confirmPassword: value })}
                  otherStyles="mb-5 w-80"
                  secureTextEntry={true}
                  externalIcon="lock"
                />

                <View className="w-3/4 mb-4 mt-2 border border-tertiary-light"></View>

                {/* 2 links of create account and forget password */}
                <View className="flex flex-row justify-center w-full">
                  <Text className="text-primary font-pmedium">Already have an account? {''}</Text> 
                  <Link href="/sign-in" className="text-tertiary-light font-pmedium">Login</Link>
                </View>

                {/* Login Button */}
                <CustomButton
                  title="REGISTER"
                  containerStyles="w-3/4 mt-8 mb-5"
                  textStyles="text-lg text-tertiary-light"
                  handlePress={() => {  }}
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

export default SignUp