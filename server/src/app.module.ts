import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { TrackModule } from './track/track.module';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: `/uploads`
    }),
    AuthModule, UserModule, FileModule, TrackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
