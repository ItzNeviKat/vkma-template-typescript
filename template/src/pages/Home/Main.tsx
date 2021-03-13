import { FC } from 'react';

import { Panel, PanelHeader, Div, Title, Button } from '@vkontakte/vkui';

type MainProps = {
  id: string;
};

export const Main: FC<MainProps> = (
  { id }: MainProps
) => {
  return (
    <Panel id={id}>
      <PanelHeader>Main panel</PanelHeader>

      <Div style={{
        width: '100vw',
        textAlign: 'center',
        marginTop: 50
      }}>
        <Title weight='semibold' level='1'>Hello, world!</Title>
        <Button
          size='l'
          style={{
            marginTop: 20
          }}
          onClick={() => alert('okey!')}
        >Okey</Button>
      </Div>
    </Panel>
  );
};
