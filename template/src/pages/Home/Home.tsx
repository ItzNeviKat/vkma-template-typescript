import { FC } from 'react';

import { View } from '@vkontakte/vkui';

import { Main } from './Main';

export const Home: FC = () => {
  return (
    <View id='main' activePanel='main'>
      <Main id='main' />
    </View>
  );
};
