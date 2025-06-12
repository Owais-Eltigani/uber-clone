import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/Oauth';
import { icons, images } from '@/constants';
import { useSignIn, useUser } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';

export default function SignIn() {
  const { user } = useUser();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  if (user) {
    console.log('(auth)/sign-in', user);
    router.replace('/(root)/(tabs)/home');
  }

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  //
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(root)/(tabs)/home');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('error', err.message);
    }
  };

  //

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative ">
        <Image source={images.signUpCar} className="w-full h-[250px] " />
        <Text className="font-JakartaExtraBold absolute bottom-10 text-3xl ml-5">
          Welcome 👋
        </Text>
      </View>

      <View className="px-5 mt-0 ">
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
          onPress={onSignInPress}
          className="mt-5"
        />
      </View>

      <View className="px-5 flex ">
        <OAuth />
        <Link href={'/(auth)/sign-up'} className="text-center font-semibold">
          <Text>Do not have Account? </Text>
          <Text className="color-primary-500">Sign Up</Text>
        </Link>
      </View>
      {/* verification  */}
    </ScrollView>
  );
}
