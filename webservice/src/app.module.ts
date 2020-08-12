import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produtoservice';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'evalyn_aromas',
      entities: [],
    }),
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class AppModule {}
