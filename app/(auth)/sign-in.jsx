import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router'

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex items-center px-5 justify-center w-full min-h-[100vh]">
          <Image
            source={images.logo}
            className="w-36 h-36  mb-[80px]"
            resizeMode='contain'
          />
          <View className="w-full">
            <View className="flex items-center w-full py-4 bg-secondary-lighter">
              <Text className="text-3xl mb-10 text-tertiary-Default font-psemibold">Login</Text>
              <FormField
                label=""
                placeholder="Enter your phone number"
                type="email"
                value={form.email}
                handleChangeText={(value) => setForm({ ...form, email: value })}
                otherStyles="mb-5"
                keyboardType="phone-pad"
                externalIcon="phone"
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
              <View className="w-3/4 mb-4 mt-2 border border-tertiary-light"></View>

              {/* 2 links of create account and forget password */}
              <View className="flex flex-row justify-between w-full px-3">
                <Link href="/sign-up" className="text-primary font-pmedium">Create Account</Link>
                <Link href="/forget-password" className="text-primary font-pmedium">Forgot Password?</Link>
              </View>

              {/* Login Button */}
              <CustomButton
                title="LOGIN"
                containerStyles="w-3/4 mt-8 mb-5"
                textStyles="text-lg text-tertiary-light"
                handlePress={() => { router.push('/sign-in') }}
                isLoading={isSubmitting}
              >
              </CustomButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn