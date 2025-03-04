import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service'
import { RolesModule } from '../roles/roles.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [RolesModule,
            forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService]
})
export class UserModule {}
