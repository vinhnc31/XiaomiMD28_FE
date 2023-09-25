export interface BaseEvent {
  type: EventBusName;
}

export interface BaseEventPayload<Payload> {
  type: EventBusName;
  payload: Payload;
}

export enum EventBusName {
  REFRESH_HOME,
  INVALID_TOKEN,
  FORBIDDEN,
}
