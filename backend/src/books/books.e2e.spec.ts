import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksModule } from './books.module';
import { PrismaService } from 'src/prisma/prisma.service';

describe('BooksModule (e2e)', () => {
  let app: INestApplication;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaServiceMock: PrismaService;

  beforeAll(async () => {
    // Criando o mock do PrismaService
    const prismaServiceMockValue = {
      book: {
        create: jest.fn().mockResolvedValue({
          id: '123',
          title: 'Book Test',
          author: 'Author Test',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        findMany: jest.fn().mockResolvedValue([]),
      },
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMockValue)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaServiceMock = moduleFixture.get<PrismaService>(PrismaService);
  });

  it('/books (GET)', async () => {
    // Teste para garantir que a resposta seja um array vazio
    return request(app.getHttpServer()).get('/books').expect(200).expect([]);
  });

  afterAll(async () => {
    await app.close();
  });
});
