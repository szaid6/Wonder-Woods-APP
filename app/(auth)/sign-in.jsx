import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton';

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="flex items-center  w-full min-h-[85vh]">
          <Image
            source={images.logo}
            className="w-36 h-36 m-[100px]"
            resizeMode='contain'
          />

          <View className="w-full px-5">
            <View className="flex items-center w-full py-4 bg-secondary-lighter">
              <Text className="text-2xl mb-10 text-tertiary-Default font-psemibold">Login</Text>
              <FormField
                label=""
                placeholder="Enter your email"
                type="email"
                value={form.email}
                handleChangeText={(value) => setForm({ ...form, email: value })}
                otherStyles="mb-5"
                keyboardType="email-address"
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
              <View className="w-3/4 mb-3 mt-1 border border-tertiary-light"></View>

              {/* 2 links of create account and forget password */}
              <View className="flex flex-row justify-between w-full px-3">
                <Text className="text-primary font-pmedium">Create an account</Text>
                <Text className="text-primary font-pmedium">Forget Password</Text>
              </View>

              {/* Login Button */}
              <CustomButton
                title="LOGIN"
                containerStyles="w-3/4 my-5"
                textStyles="text-lg text-tertiary-darker"
                handlePress={() => { router.push('/sign-in') }}
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