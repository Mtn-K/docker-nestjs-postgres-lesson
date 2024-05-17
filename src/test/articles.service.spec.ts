import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArticlesService } from '../articles/articles.service';
import { CreateArticleDto } from '../articles/dto/create-article.dto';
import { Article } from '../articles/entities/article.entity';
import { Repository } from 'typeorm';
import {
  mockArticle,
  mockArticleRepository,
  mockSearchArticle,
  mockUpdatedField,
} from './__mock__/mockArticle';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let articleRepository: Repository<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: mockArticleRepository,
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    articleRepository = module.get<Repository<Article>>(getRepositoryToken(Article));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const createArticleDto = new CreateArticleDto(); // Mock createArticleDto

      jest.spyOn(articleRepository, 'create').mockReturnValue(mockArticle as any);
      jest.spyOn(articleRepository, 'save').mockResolvedValue(mockArticle);

      const result = await service.create(createArticleDto);
      expect(result).toEqual(mockArticle);
    });
  });

  describe('findOne', () => {
    it('should return the article with the given ID', async () => {
      jest.spyOn(articleRepository, 'findOne').mockResolvedValue(mockArticle);

      const result = await service.findOne(mockArticle.id);
      expect(articleRepository.findOne).toHaveBeenCalledWith({ where: { id: mockArticle.id } });
      expect(result).toEqual(mockArticle);
    });
  });

  describe('filterArticles', () => {
    it('should return articles matching the search criteria', async () => {
      jest.spyOn(articleRepository, 'createQueryBuilder').mockReturnValue({
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockArticle]),
      } as any);

      const result = await service.filterArticles(mockSearchArticle);
      expect(result).toEqual([mockArticle]);
    });
  });

  describe('update', () => {
    it('should update the article with the given ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockArticle);
      jest.spyOn(articleRepository, 'save').mockResolvedValue(mockArticle);

      const result = await service.update(mockArticle.id, mockUpdatedField);
      expect(service.findOne).toHaveBeenCalledWith(mockArticle.id);
      expect(articleRepository.save).toHaveBeenCalledWith({
        ...mockArticle,
        ...mockUpdatedField,
      });
      expect(result).toEqual(mockArticle);
    });

    it('should return an error message if article is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const result = await service.update(mockArticle.id, mockUpdatedField);
      expect(result).toEqual({ message: 'Cannot find article with ID ' + mockArticle.id });
    });
  });

  describe('remove', () => {
    it('should remove the article with the given ID', async () => {
      jest.spyOn(articleRepository, 'findOne').mockResolvedValue(mockArticle);
      const result = await service.remove(mockArticle.id);
      expect(articleRepository.softDelete).toHaveBeenCalledWith(mockArticle.id);
      expect(result).toEqual({ message: 'Delete successful' });
    });
    it('should return an error message if article is not found', async () => {
      jest.spyOn(articleRepository, 'findOne').mockResolvedValueOnce(undefined);
      const result = await service.remove(mockArticle.id);
      expect(articleRepository.softDelete).not.toHaveBeenCalled();
      expect(result).toEqual({ message: 'Cannot find article with ID ' + mockArticle.id });
    });
  });
});
