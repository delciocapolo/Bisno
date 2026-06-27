export interface EventPublisher {
  publish(topic: string, payload: Record<string, unknown>): Promise<void>;
}
