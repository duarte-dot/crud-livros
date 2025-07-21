import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book } from '../../generated/prisma';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(data: { title: string; author: string }): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  findAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  findOne(id: string): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id } });
  }

  update(id: string, data: { title?: string; author?: string }): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  delete(id: string): Promise<Book> {
    return this.prisma.book.delete({ where: { id } });
  }
}
