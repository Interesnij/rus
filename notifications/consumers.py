import json

from channels.generic.websocket import AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer


class NotificationsConsumer(AsyncWebsocketConsumer):
    """Потребитель управлять WebSocket-соединений для уведомления приложения,
    вызывается, когда websocket является квитированием как часть начального соединения.
    """
    async def connect(self):
        """Потребитель соединяет вставку, для того чтобы проверить состояние потребителя и предотвратить
        не прошедший проверку подлинности пользователь должен взять advante из соединения."""
        if self.scope["user"].is_anonymous:
            # Reject the connection
            await self.close()

        else:
            # Accept the connection
            await self.channel_layer.group_add(
                'notifications', self.channel_name)
            await self.accept()

    async def disconnect(self, close_code):
        """Потребительская реализация оставить позади группы на данный момент
        закрывать соединение."""
        await self.channel_layer.group_discard(
           'notifications', self.channel_name)

    async def receive(self, text_data):
        """Реализация метода Receive для перенаправления любого нового полученного сообщения
        на websocket для трансляции всем клиентам."""
        await self.send(text_data=json.dumps(text_data))


class NoseyConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("gossip", self.channel_name)
        print(f"Added {self.channel_name} channel to gossip")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("gossip", self.channel_name)
        print(f"Removed {self.channel_name} channel to gossip")

    async def user_gossip(self, event):
        await self.send_json(event)
        print(f"Got message {event} at {self.channel_name}")

def ws_connect(message):
    message.reply_channel.send({
     'accept': True
}) 
