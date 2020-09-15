import * as React from 'react';

import '@vkontakte/vkui/dist/vkui.css';

import { View, Panel, PanelHeader, Div, Title, Button } from '@vkontakte/vkui';

export default () => {
  return (
    <View id="main" activePanel="home">
      <Panel id="home">
        <PanelHeader>Home</PanelHeader>

        <Div style={{
          width: "100vw",
          textAlign: "center",
          marginTop: 50
        }}>
          <Title weight="semibold" level="1">Hello, world!</Title>
          <Button
            size="l"
            style={{
              marginTop: 20
            }}
            onClick={() => alert("okey!")}
          >Okey</Button>
        </Div>
      </Panel>
    </View>
  );
}
