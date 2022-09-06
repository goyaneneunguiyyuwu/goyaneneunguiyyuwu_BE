import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'post 정보 등록 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'post 정보 등록 실패',
  })
  public async createPostController() {}

  @Get('info')
  @ApiResponse({
    status: 201,
    description: 'post 정보 불러오기 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'post 정보 불러오기 실패',
  })
  public async getPostInfoController() {}

  @Patch('info/change')
  @ApiResponse({
    status: 201,
    description: 'post 정보 수정 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'post 정보 수정 실패',
  })
  public async changePostInfoController() {}
}
