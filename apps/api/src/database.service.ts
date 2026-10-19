import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DatabaseClient } from '@task-moon/database';

@Injectable()
export class DatabaseService
  extends DatabaseClient
  implements OnModuleInit, OnModuleDestroy
{
  onModuleInit() {
    return this.$connect();
  }

  onModuleDestroy() {
    return this.$disconnect();
  }
}
