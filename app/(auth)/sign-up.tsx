import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/Oauth';
import { icons, images } from '@/constants';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

export default function SignIn() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  //   console.log('(auth)/sign-up)', { form });

  const onSignUpPress = () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative ">
        <Image source={images.signUpCar} className="w-full h-[250px] " />
        <Text className="font-JakartaExtraBold absolute bottom-10 text-3xl ml-5">
          Create Your Account
        </Text>
      </View>

      <View className="px-5 mt-0 ">
        {/*  */}
        <InputField
          label="Name"
          placeholder="Enter Your Name"
          icon={icons.person}
          secureTextEntry={false}
          value={form.username}
          onChangeText={value => setForm({ ...form, username: value })}
        />
        {/*  */}
        <InputField
          label="Email"
          placeholder="Enter Your Email"
          icon={icons.email}
          secureTextEntry={false}
          value={form.email}
          onChangeText={value => setForm({ ...form, email: value })}
        />
        {/*  */}
        <InputField
          label="Password"
          placeholder="Enter Your Password"
          icon={icons.lock}
          secureTextEntry={true}
          value={form.password}
          onChangeText={value => setForm({ ...form, password: value })}
        />
        <CustomButton
          title="Sign Up"
          onPress={onSignUpPress}
          className="mt-5"
        />
      </View>

      <View className="px-5 flex ">
        <OAuth />
        <Link href={'/(auth)/sign-in'} className="text-center font-semibold">
          <Text>Already Have an account? </Text>
          <Text className="color-primary-500">Sign in</Text>
        </Link>
      </View>
      {/* verification  */}
    </ScrollView>
  );
}
