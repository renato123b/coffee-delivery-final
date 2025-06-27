import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Prisma } from '@prisma/client'; // ✅ Importação necessária para o QueryMode

@Injectable()
export class CoffeesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const coffees = await this.prisma.coffee.findMany({
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return coffees.map(coffee => ({
      ...coffee,
      tags: coffee.tags.map(coffeeTag => coffeeTag.tag),
    }));
  }

  async findOne(id: string) {
    const coffee = await this.prisma.coffee.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }

    return {
      ...coffee,
      tags: coffee.tags.map(coffeeTag => coffeeTag.tag),
    };
  }

  async create(dto: CreateCoffeeDto) {
    const { tagIds, ...data } = dto;

    const coffee = await this.prisma.coffee.create({
      data: {
        ...data,
        tags: {
          create: tagIds.map((tagId) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: {
        tags: { include: { tag: true } },
      },
    });

    return {
      ...coffee,
      tags: coffee.tags.map((t) => t.tag),
    };
  }

  async update(id: string, dto: UpdateCoffeeDto) {
    const existing = await this.prisma.coffee.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }

    const { tagIds, ...data } = dto;

    const coffee = await this.prisma.coffee.update({
      where: { id },
      data: {
        ...data,
        tags: tagIds
          ? {
              deleteMany: {},
              create: tagIds.map((tagId) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
      include: {
        tags: { include: { tag: true } },
      },
    });

    return {
      ...coffee,
      tags: coffee.tags.map((t) => t.tag),
    };
  }

  async remove(id: string) {
    const existing = await this.prisma.coffee.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }

    await this.prisma.coffee.delete({
      where: { id },
    });

    return { message: 'Café removido com sucesso' };
  }

  async searchCoffees(params: {
    start_date?: Date;
    end_date?: Date;
    name?: string;
    tags?: string[];
    limit?: number;
    offset?: number;
  }) {
    const { start_date, end_date, name, tags, limit = 10, offset = 0 } = params;

    const whereConditions: Prisma.CoffeeWhereInput = {
      AND: [
        start_date ? { createdAt: { gte: start_date } } : {},
        end_date ? { createdAt: { lte: end_date } } : {},
        name
          ? {
              name: {
                contains: name,
                mode: Prisma.QueryMode.insensitive, // ✅ Correção aqui
              },
            }
          : {},
        tags && tags.length > 0
          ? {
              tags: {
                some: {
                  tag: {
                    name: {
                      in: tags,
                      mode: Prisma.QueryMode.insensitive, // ✅ Correção aqui
                    },
                  },
                },
              },
            }
          : {},
      ],
    };

    const [coffees, total] = await Promise.all([
      this.prisma.coffee.findMany({
        where: whereConditions,
        include: {
          tags: { include: { tag: true } },
        },
        skip: offset,
        take: limit,
      }),
      this.prisma.coffee.count({ where: whereConditions }),
    ]);

    return {
      data: coffees.map((coffee) => ({
        ...coffee,
        tags: coffee.tags.map((t) => t.tag),
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }
}
