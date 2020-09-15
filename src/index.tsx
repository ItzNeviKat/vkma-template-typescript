import 'core-js/features/map';
import 'core-js/features/set';

import * as React from 'react';
import ReactDOM from 'react-dom';

import bridge, { VKBridgeEvent, AnyReceiveMethodName } from '@vkontakte/vk-bridge';

import App from './App';

// Инициализация
bridge.send("VKWebAppInit");

// Подписка на события
bridge.subscribe((e: VKBridgeEvent<AnyReceiveMethodName>) => {
  console.log(`Новое событие VKBridge: ${e.detail.type}`);

  switch (e.detail.type) {
    case "VKWebAppUpdateConfig":
      const scheme: string = e.detail.data.scheme ? e.detail.data.scheme : "client_light";
      document.body.setAttribute("scheme", scheme);
      break;

    default: return;
  }
});

// Рендер приложения
ReactDOM.render(<App />, document.getElementById("root"));

// Подключение мини-консоли в режиме разработки
if (process.env.NODE_ENV === "development") import('./eruda');
