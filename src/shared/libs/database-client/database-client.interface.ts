interface DatabaseClient {
  connect(uri: string): Promise<void>;
  disconnect():Promise<void>
}

export {DatabaseClient};
