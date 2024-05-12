import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {

  const [form, setForm] = useState({
    phone: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isAuthenticated, setIsAuthenticated } = useGlobalContext();

  // use fetch to send the form data to the server
  const submit = () => {
    setIsSubmitting(true)


    // issue an alert if the form is not valid
    if (!form.phone || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    setIsAuthenticated(true);
    router.replace('/home')

    // const data = {
    //   phone: form.phone,
    //   password: form.password
    // }

    // fetch('http://127.0.0.1:8000/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data)

    //     setTimeout(() => {
    //       setIsSubmitting(false)
    //       router.push('/home')
    //     }, 2000)
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error)
    //     setIsSubmitting(false)
    //   })


  }

  return (
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
              <Text className="text-3xl mb-10 text-tertiary font-psemibold">Login</Text>
              <FormField
                label=""
                placeholder="Enter your phone number"
                type="tel"
                value={form.phone}
                handleChangeText={(value) => setForm({ ...form, phone: value })}
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
                handlePress={submit}
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