import bridge, { VKBridgeEvent, AnyReceiveMethodName } from '@vkontakte/vk-bridge';

// Инициализация
bridge.send('VKWebAppInit');

// Подписка на события
bridge.subscribe((e: VKBridgeEvent<AnyReceiveMethodName>) => {
  console.log(`Новое событие VKBridge: ${e.detail.type}`);

  switch (e.detail.type) {
    case 'VKWebAppUpdateConfig':
      document.body.setAttribute(
        'scheme',
        e.detail.data.scheme ? e.detail.data.scheme : 'client_light'
      );
      break;

    default: return ;
  }
});
