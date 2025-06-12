import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/Oauth';
import { icons, images } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { useSignUp, useUser } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

export default function SignIn() {
  //
  const { user } = useUser();

  if (user) {
    // console.log('(auth)/sign-up', user);
    router.replace('/(root)/(tabs)/home');
  }

  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  //
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  //
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  //!
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // and capture OTP code
      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.message);
    }
  };

  //
  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: 'success' });

        //? calling the endpoint to create a user in the database
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.username,
            email: form.email,
            clerk_id: signUpAttempt.createdUserId,
          }),
        });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.

        setVerification({
          ...verification,
          error: 'verification failed',
          state: 'failed',
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: 'failed',
        error: 'error because something wrong',
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };
  // !
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

      <ReactNativeModal
        isVisible={verification.state === 'pending'}
        // onBackdropPress={() =>
        //   setVerification({ ...verification, state: "default" })
        // }
        onModalHide={() => {
          if (verification.state === 'success') {
            setShowSuccessModal(true);
          }
        }}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="font-JakartaExtraBold text-2xl mb-2">
            Verification
          </Text>
          <Text className="font-Jakarta mb-5">
            We&apos;ve sent a verification code to {form.email}.
          </Text>
          <InputField
            label={'Code'}
            icon={icons.lock}
            placeholder={'12345'}
            value={verification.code}
            keyboardType="numeric"
            onChangeText={code => setVerification({ ...verification, code })}
          />
          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}
          <CustomButton
            title="Verify Email"
            onPress={onVerifyPress}
            className="mt-5 bg-success-500"
          />
        </View>
      </ReactNativeModal>

      {/* ========================= */}
      <ReactNativeModal isVisible={verification.state === 'success'}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] ">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className=" text-3xl font-JakartaBold text-center">
            Verified
          </Text>
          <Text className=" text-base text-gray-400 font-Jakarta text-center">
            we have successfully verified your account
          </Text>
          <CustomButton
            title="Head to Your Rides"
            onPress={() => router.replace('/(root)/(tabs)/profile')}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>

      {/* verification  */}
    </ScrollView>
  );
}
