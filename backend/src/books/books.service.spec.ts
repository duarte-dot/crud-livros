import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('BooksService', () => {
  let service: BooksService;
  let prisma: PrismaService;

  const mockBook = {
    id: '1c1e7f1b-a1ca-440c-b932-39abb35e1e3e',
    title: 'Mock Book',
    author: 'Mock Author',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, PrismaService],
    }).compile();

    service = module.get<BooksService>(BooksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const createSpy = jest
      .spyOn(prisma.book, 'create')
      .mockResolvedValue(mockBook);

    const result = await service.create({
      title: 'Test',
      author: 'Test Author',
    });

    expect(result).toEqual(mockBook);
    expect(createSpy).toHaveBeenCalledWith({
      data: { title: 'Test', author: 'Test Author' },
    });
  });

  it('should find all books', async () => {
    const findManySpy = jest
      .spyOn(prisma.book, 'findMany')
      .mockResolvedValue([mockBook]);

    const result = await service.findAll();
    expect(result).toEqual([mockBook]);
    expect(findManySpy).toHaveBeenCalled();
  });

  it('should find one book by id', async () => {
    const findUniqueSpy = jest
      .spyOn(prisma.book, 'findUnique')
      .mockResolvedValue(mockBook);

    const result = await service.findOne(mockBook.id);
    expect(result).toEqual(mockBook);
    expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id: mockBook.id } });
  });

  it('should update a book', async () => {
    const updateSpy = jest
      .spyOn(prisma.book, 'update')
      .mockResolvedValue(mockBook);

    const result = await service.update(mockBook.id, {
      title: 'Updated Title',
    });
    expect(result).toEqual(mockBook);
    expect(updateSpy).toHaveBeenCalledWith({
      where: { id: mockBook.id },
      data: { title: 'Updated Title' },
    });
  });

  it('should delete a book', async () => {
    const deleteSpy = jest
      .spyOn(prisma.book, 'delete')
      .mockResolvedValue(mockBook);

    const result = await service.delete(mockBook.id);
    expect(result).toEqual(mockBook);
    expect(deleteSpy).toHaveBeenCalledWith({ where: { id: mockBook.id } });
  });
});
