import { Module } from '@nestjs/common'

import { BasketService } from './basket.service'
import { BasketController } from './basket.controller'
import { PrismaService } from '../prisma.service'

@Module({
	controllers: [BasketController],
	providers: [BasketService, PrismaService],
	exports: [BasketService]
})
export class BasketModule {}
