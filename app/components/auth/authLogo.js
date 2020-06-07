import React from 'react'
import { View, Image } from 'react-native'

import Logo from '../../assets/images/nba_login_logo.png';

const AuthLogo = () => {
  return (
    <View>
      <Image
        source={Logo}
        resizeMode={'center'}
        style={{ height: 150 }}
      />
    </View>
  )
}

export default AuthLogo;

