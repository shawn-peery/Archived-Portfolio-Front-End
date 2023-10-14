export class ReturnModelWithMessageDto<T> {
  Message = '';
  Model: T;

  constructor(Message: string, Model: T) {
    this.Message = Message;
    this.Model = Model;
  }
}
