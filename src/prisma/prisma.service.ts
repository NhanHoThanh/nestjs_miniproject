import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    console.log(`Database URL: ${process.env.DATABASE_URL}`); // Log the DATABASE_URL
    super({
      datasources: {
        db: {
          url: `${process.env.DATABASE_URL}`,
        },
      },
    });
  }
}
