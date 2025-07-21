import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BooksController', () => {
  let controller: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const prismaServiceMock = {
      book: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a book', async () => {
    const mockBook = {
      id: '1c1e7f1b-a1ca-440c-b932-39abb35e1e3e',
      title: 'Test Book',
      author: 'Test Author',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createSpy = jest
      .spyOn(booksService, 'create')
      .mockResolvedValue(mockBook);

    const result = await controller.create({
      title: 'Test Book',
      author: 'Test Author',
    });

    expect(result).toEqual(mockBook);
    expect(createSpy).toHaveBeenCalledWith({
      title: 'Test Book',
      author: 'Test Author',
    });
  });

  it('should find all books', async () => {
    const mockBooks = [
      {
        id: '1c1e7f1b-a1ca-440c-b932-39abb35e1e3e',
        title: 'Test Book',
        author: 'Test Author',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const findManySpy = jest
      .spyOn(booksService, 'findAll')
      .mockResolvedValue(mockBooks);

    const result = await controller.findAll();
    expect(result).toEqual(mockBooks);
    expect(findManySpy).toHaveBeenCalled();
  });

  it('should find one book by id', async () => {
    const mockBook = {
      id: '1c1e7f1b-a1ca-440c-b932-39abb35e1e3e',
      title: 'Test Book',
      author: 'Test Author',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const findUniqueSpy = jest
      .spyOn(booksService, 'findOne')
      .mockResolvedValue(mockBook);

    const result = await controller.findOne(mockBook.id);
    expect(result).toEqual(mockBook);
    expect(findUniqueSpy).toHaveBeenCalledWith(mockBook.id);
  });

  it('should update a book', async () => {
    const mockBook = {
      id: '1c1e7f1b-a1ca-440c-b932-39abb35e1e3e',
      title: 'Updated Book',
      author: 'Updated Author',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updateSpy = jest
      .spyOn(booksService, 'update')
      .mockResolvedValue(mockBook);

    const result = await controller.update(mockBook.id, {
      title: 'Updated Book',
      author: 'Updated Author',
    });

    expect(result).toEqual(mockBook);
    expect(updateSpy).toHaveBeenCalledWith(mockBook.id, {
      title: 'Updated Book',
      author: 'Updated Author',
    });
  });

  it('should delete a book', async () => {
    const mockBook = {
      id: '1c1e7f1b-a1ca-440c-b932-39abb35e1e3e',
      title: 'Test Book',
      author: 'Test Author',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const deleteSpy = jest
      .spyOn(booksService, 'delete')
      .mockResolvedValue(mockBook);

    const result = await controller.delete(mockBook.id);
    expect(result).toEqual(mockBook);
    expect(deleteSpy).toHaveBeenCalledWith(mockBook.id);
  });
});
