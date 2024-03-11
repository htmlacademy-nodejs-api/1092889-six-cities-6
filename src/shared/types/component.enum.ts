const Component = {
  CliApplication: Symbol.for('CliApplication'),
  Application: Symbol.for('Application'),
  Logger: Symbol.for('Logger'),
  RestConfig: Symbol.for('RestConfig'),
  CliConfig:Symbol.for('CliConfig'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
  OfferController: Symbol.for('OfferController'),
  CommentService: Symbol.for('CommentService'),
  CommentModel: Symbol.for('CommentModel'),
  CommentController: Symbol.for('CommentController'),
  AuthService: Symbol.for('AuthService'),
  AuthExceptionFilter: Symbol.for('AuthExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
  PathTransformer: Symbol.for('PathTransformer'),
  ImportCommand: Symbol.for('ImportCommand'),
  HelpCommand: Symbol.for('HelpCommand'),
  VersionCommand: Symbol.for('VersionCommand'),
  GenerateCommand: Symbol.for('GenerateCommand')
} as const;

export {Component};
