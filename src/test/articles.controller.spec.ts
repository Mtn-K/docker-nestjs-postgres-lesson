import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from '../articles/articles.controller';
import { ArticlesService } from '../articles/articles.service';
import { mockArticle, mockSearchArticle, mockUpdatedField } from './__mock__/mockArticle';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from '../articles/entities/article.entity';

describe('ArticleController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: {},
        },
      ],
      controllers: [ArticlesController],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  describe('create', () => {
    it('should create an article', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockArticle);

      const result = await controller.create(mockArticle);
      expect(result).toEqual(mockArticle);
    });
  });

  describe('findOne', () => {
    it('should find and return an article if it exists', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockArticle);
      const result = await controller.findOne(mockArticle.id);
      expect(result).toEqual(mockArticle);
    });

    it('should throw NotFoundException if the article does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne(mockArticle.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('filterArticles', () => {
    it('should return filtered articles successfully', async () => {
      jest.spyOn(service, 'filterArticles').mockResolvedValue([mockArticle]);
      const result = await controller.filterArticles(mockSearchArticle);
      expect(result).toEqual([mockArticle]);
    });

    it('should throw NotFoundException if no articles found', async () => {
      jest.spyOn(service, 'filterArticles').mockResolvedValue([]);
      await expect(controller.filterArticles(mockSearchArticle)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update article successfully', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockArticle);
      const result = await controller.update(mockArticle.id, mockUpdatedField);
      expect(result).toEqual(mockArticle);
    });

    it('should throw NotFoundException if article not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('Cannot find article with ID ' + mockArticle.id));

      await expect(controller.update(mockArticle.id, mockUpdatedField)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete article if found', async () => {
      const articleId = 'existing-id';
      jest.spyOn(service, 'remove').mockResolvedValue({ message: 'Delete successful' });

      expect(await controller.remove(articleId)).toEqual({ message: 'Delete successful' });
    });

    it('should throw NotFoundException if article not found', async () => {
      const articleId = 'non-existing-id';
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(articleId)).rejects.toThrow(NotFoundException);
    });
  });
});
