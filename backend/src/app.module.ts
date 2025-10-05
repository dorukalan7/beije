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
      username: 'postgres', // PostgreSQL kullanıcı adın
      password: '12345',     // PostgreSQL şifren
      database: 'beije_db', // oluşturduğun DB
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,    // ilk aşamada otomatik tablo oluşturmak için
    }),
    UserModule,
  ],
})
export class AppModule {}
