import React from 'react'
import { Image } from 'react-native'

import LogoApp from '../assets/images/nba_login_logo.png';

const Logo = () => {
  return (
    <Image
    source={LogoApp}
    style={{width: 70, height: 35}}
    resizeMode='contain'
    />
  )
}

export default Logo;