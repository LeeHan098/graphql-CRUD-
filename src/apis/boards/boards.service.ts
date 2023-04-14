import { Injectable } from '@nestjs/common';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';

@Injectable()
export class BoardsService {
  findAll() {
    const result = [
      { number: 1, writer: 'lee', title: 'title1', contents: '1234' },
      { number: 2, writer: 'han', title: 'title2', contents: '5678' },
      { number: 3, writer: 'kyul', title: 'title3', contents: '10973' },
    ];
    return result;
  }

  create() {
    return '등록성공!';
  }
}
