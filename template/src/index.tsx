import 'core-js/features/map';
import 'core-js/features/set';

import { render } from 'react-dom';
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';

import { App } from './pages';

// Рендер приложения
render(
  (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <App />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  ), 
  document.getElementById('root')
);

// Подключение мини-консоли в режиме разработки
// @ts-ignore
if (import.meta.env.MODE === 'development') import('./eruda');
