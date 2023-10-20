export class ReturnModelWithMessageDto<T> {
  message = '';
  model: T;

  constructor(Message: string, Model: T) {
    this.message = Message;
    this.model = Model;
  }
}
