import { icons } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { useSSO } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import CustomButton from './CustomButton';

export const OAuth = () => {
  const { startSSOFlow } = useSSO();
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: 'oauth_google',

          redirectUrl: Linking.createURL('/(root)/(tabs)/home', {
            scheme: 'Uber',
          }),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });

        //
        if (signUp?.createdUserId) {
          await fetchAPI('/(api)/user', {
            method: 'POST',
            body: JSON.stringify({
              name: `${signUp.firstName}  ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerk_id: signUp.createdUserId,
            }),
          });
        }

        router.replace('/(root)/(tabs)/home');
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
        Alert.alert('something went wrong');
      }
    } catch (err: any) {
      console.log(err);
      return {
        code: 'failed',
        message: err.message,
        success: false,
      };
    }
  }, []);
  return (
    <View className="flex-1">
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Log In with Google"
        className="mt-1 mb-3 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
