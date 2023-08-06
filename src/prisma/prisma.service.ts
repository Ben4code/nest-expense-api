import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
 constructor( private config: ConfigService){
  super({
    datasources: {
      db: {
        url: config.getOrThrow('DATABASE_URL')
        // url: 'postgresql://postgres:super_secret@localhost:5432/nestjs_essentials?schema=public'
      }
    }
  })
 }
}