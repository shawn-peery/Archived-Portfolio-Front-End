export class ViewTodoDto {
  Title = '';
  Description = '';

  constructor(obj?: ViewTodoDto) {
    this.Title = obj?.Title ?? '';
    this.Description = obj?.Description ?? '';
  }
}
