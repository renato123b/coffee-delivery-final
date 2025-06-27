import { Tag as PrismaTag } from '@prisma/client';

export class Tag implements PrismaTag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
} 