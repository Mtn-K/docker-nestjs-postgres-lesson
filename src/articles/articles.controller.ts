import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateSearchDto } from './dto/search-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOne(id);
    if (!article) throw new NotFoundException('No result');
    return article;
  }

  @Get()
  async filterArticles(@Query() searchDto: CreateSearchDto) {
    const searchFields = ['title', 'author', 'topic'];
    Object.keys(searchDto).forEach((item) => {
      if (!searchFields.includes(item))
        throw new NotFoundException('Cannot find with ' + item + ' field');
      if (searchDto[item].replace(/ /g, '').length == 0)
        throw new BadRequestException(
          'At least one letter in ' + item + ' field must be provided.',
        );
    });
    const res = await this.articlesService.filterArticles(searchDto);

    if (res.length == 0) throw new NotFoundException('No result');
    return res;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
