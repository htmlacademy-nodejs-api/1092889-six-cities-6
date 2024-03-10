interface DocumentExists {
  exists(documentId: string): Promise<boolean>
}

export {DocumentExists};
