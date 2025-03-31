import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiProperty } from '@nestjs/swagger'

import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { OrderDto } from './dto/create-order.dto'
import { PaymentStatusDto } from './dto/payment-status.dto'
import { OrderService } from './order.service'

class OrderResponse {
	@ApiProperty()
	amount: {
		value: number
		currency: string
	}
	@ApiProperty()
	payment_method_data: {
		type: string
	}
	@ApiProperty()
	confirmation: {
		type: string
		return_url: string
	}
	@ApiProperty()
	description: string
}

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@ApiCreatedResponse({ type: OrderResponse, description: 'Создание заказа' })
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('create')
	@Auth()
	async checkout(@Body() dto: OrderDto, @CurrentUser('id') userId: string) {
		return await this.orderService.createPayment(dto, userId)
	}

	@ApiOperation({ summary: 'Изменение статуса заказа' })
	@HttpCode(200)
	@Post('status')
	async updateStatus(@Body() dto: PaymentStatusDto) {
		return await this.orderService.updateStatus(dto)
	}
}
