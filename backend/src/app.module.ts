import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: '12345',     
      database: 'beije_db', 
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,    
    }),
    UserModule,
  ],
})
export class AppModule {}
