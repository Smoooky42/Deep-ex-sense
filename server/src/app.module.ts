import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { TrackModule } from './track/track.module';
import { BasketModule } from './basket/basket.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: `/uploads`
    }),
    AuthModule, UserModule, FileModule, TrackModule, BasketModule, ProductModule, CategoryModule, OrderModule, RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
