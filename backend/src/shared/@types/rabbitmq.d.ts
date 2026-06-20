export abstract class AbstractMRabbit {
  abstract getHost(): string;
  abstract getUser(): string;
  abstract getPassword(): string;
  abstract getURIs(): string[];
  abstract getPort(): number;
}
