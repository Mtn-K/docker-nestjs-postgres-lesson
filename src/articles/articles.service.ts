import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateSearchDto } from './dto/search-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = this.articlesRepository.create(createArticleDto);
    return await this.articlesRepository.save(article);
  }

  // Find by id
  async findOne(id: string) {
    return await this.articlesRepository.findOne({ where: { id } });
  }

  // Find by title, author, topic
  async filterArticles(searchDto: CreateSearchDto) {
    // const { author, title, topic } = searchDto;
    const queryBuilder = this.articlesRepository.createQueryBuilder('article');
    Object.keys(searchDto).forEach((item) => {
      queryBuilder.andWhere(`article.${item} ILike :${item}`, {
        [item]: `%${searchDto[item]}%`,
      });
    });
    // if (author) {
    //   queryBuilder.andWhere(`article.${author} ILike :${author}`, { author: `%${author}%` });
    // }
    // if (title) {
    //   queryBuilder.andWhere('article.title ILike :title', { title: `%${title}%` });
    // }
    // if (topic) {
    //   queryBuilder.andWhere('article.topic ILike :topic', { topic });
    // }
    return await queryBuilder.getMany();
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    let article = await this.findOne(id);
    if (!article) return { message: 'Cannot find article with ID ' + id };
    Object.assign(article, updateArticleDto);
    article = { ...article, ...updateArticleDto };
    return await this.articlesRepository.save(article);
  }

  async remove(id: string) {
    const article = await this.findOne(id);
    if (!article) return { message: 'Cannot find article with ID ' + id };
    await this.articlesRepository.softDelete(id);
    return { message: 'Delete successful' };
  }
}
