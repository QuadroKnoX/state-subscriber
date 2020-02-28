# state-subscriber
A wrapper library to get the last state on listening. Its pretty much like event listening, but I've added more methods like subscribe and next to get the recent value of the event right on subscription.

## Installation
Use
`npm install -S state-subscriber`
or
`yarn add state-subscriber`
to install the package.

## Usage
Instead of using ```this.emit('event', data)``` you can use ```this.next('event', data)```. This will provide the value for the subscribe function.
To get this value right at the subscription you can use ```this.subscribe('event')``` instead of ```this.on```.

If you want, you can use it like
````typescript
export class Test extends StateSubscriber {}
````
or like
```typescript
const event = new StateSubscriber();
```

## License
MIT
