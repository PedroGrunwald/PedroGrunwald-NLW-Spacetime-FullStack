import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'
import * as SecureStore from 'expo-secure-store'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from '../src/assets/bg-blur.png'
import NLWogo from '../src/assets/nlw.spacetime-logo.svg'
import Stripes from '../src/assets/stripes.svg'
import { api } from '../src/lib/api'

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/0bccc89c46e11837a4fc',
}

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '0bccc89c46e11837a4fc',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  useEffect(() => {
    // console.log(makeRedirectUri()) mostra se a uri está funcionando
    if (response?.type === 'success') {
      const { code } = response.params

      api
        .post('/register', {
          code,
        })
        .then((response) => {
          const { token } = response.data

          SecureStore.setItemAsync('token', token)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [response])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className=" relative flex-1 items-center bg-gray-900 p-10"
      imageStyle={{ position: 'absolute', left: '-120%' }}
    >
      <StyledStripes className="absolute left-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <NLWogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="font-body text-center text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            COMEÇAR A CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="font-body text-center text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
