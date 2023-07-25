import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl('https://wiredbrainchatserver.azurewebsites.net//chathub')
  .withAutomaticReconnect()
  .build();

export default connection;
