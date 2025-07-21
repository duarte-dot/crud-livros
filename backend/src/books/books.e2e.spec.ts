import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksModule } from './books.module';

describe('BooksModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider('PrismaService')
      .useValue({
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
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books (GET)', () => {
    return request(app.getHttpServer()).get('/books').expect(200).expect([]);
  });

  afterAll(async () => {
    await app.close();
  });
});
