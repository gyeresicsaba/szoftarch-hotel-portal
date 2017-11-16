import {Component, OnInit} from '@angular/core';
import {Paho} from 'ng2-mqtt';

@Component({
  selector: 'app-rca',
  templateUrl: './rca.component.html',
  styleUrls: ['./rca.component.scss']
})
export class RcaComponent implements OnInit {
  private _client: Paho.MQTT.Client;
  messageField: string;

  constructor() {
  }

  ngOnInit() {
    this._client = new Paho.MQTT.Client('127.0.0.1', Number(8000), 'controller_physicalAddress');

    this._client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost.');
      console.log(responseObject);
    };

    this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log('Message arrived.');
      console.log(message.payloadString);
    };

    this._client.connect({onSuccess: this.onConnected.bind(this), mqttVersion: 3});
  }

  private onConnected(): void {
    console.log('Connected to broker.');
    this._client.subscribe('controllers', {});
  }

  onSubmit() {
    const message = new Paho.MQTT.Message(this.messageField);
    message.destinationName = 'test';
    this._client.send(message);
  }
}
