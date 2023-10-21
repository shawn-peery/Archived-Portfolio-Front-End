export class ViewTodoDto {
  title = '';
  description = '';

  constructor(obj?: ViewTodoDto) {
    this.title = obj?.title ?? '';
    this.description = obj?.description ?? '';
  }
}
