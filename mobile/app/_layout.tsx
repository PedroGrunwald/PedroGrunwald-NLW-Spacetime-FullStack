import { ImageBackground } from 'react-native'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import { styled } from 'nativewind'
import * as SecureStore from 'expo-secure-store'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'

const StyledStripes = styled(Stripes)

export default function Layout() {
  // eslint-disable-next-line prettier/prettier
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className=" relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-120%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
