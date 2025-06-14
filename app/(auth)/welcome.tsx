import CustomButton from '@/components/CustomButton';
import { onboarding } from '@/constants';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

export default function Welcome() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  //
  const handleButtonPress = () => {
    if (isLastSlide) {
      router.replace('/(auth)/sign-up');
    } else {
      swiperRef.current?.scrollBy(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace('/(auth)/sign-up')}
        className=" w-full flex items-end  mr-12">
        <Text className="text-black text-lg font-JakartaBold bg-slate-200 px-5 py-1 rounded-xl">
          Skip
        </Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"></View>
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full"></View>
        }
        onIndexChanged={index => setActiveIndex(index)}>
        {onboarding.map(item => (
          <View key={item.id} className="flex items-center justify-center ">
            <Image
              source={item.image}
              className="w-full h-[300px] "
              resizeMode="stretch"
            />
            <View className=" flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-3xl mx-10 font-bold text-black text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-sm font-JakartaSemiBold text-center mx-10 mt-3 text-[#858585 ]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        className="w-11/12 mt-10  mb-5"
        onPress={handleButtonPress}
      />
    </SafeAreaView>
  );
}
