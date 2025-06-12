import { SignOutButton } from '@/components/SignOutButton';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const { user } = useUser();

  // console.log('home', { user });
  return (
    <SafeAreaView>
      <View className="flex">
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>

          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link>
        </SignedOut>
      </View>
    </SafeAreaView>
  );
}
