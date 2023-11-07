import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { AllAdminGuard } from '../common/guards';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethod } from './entity/payment-method.entity';
import { PaymentMethodService } from './payment_method.service';

@ApiTags('Payment Method')
@Controller('payment_method')
@UseGuards(AllAdminGuard)
export class PaymentMethodController {
  constructor(private readonly paymentMethod: PaymentMethodService) {}

  // Create PaymentMethod Controller
  @ApiOperation({ summary: 'Create PaymentMethod' })
  @ApiResponse({ status: 201, type: PaymentMethod })
  @ApiBearerAuth()
  @Post()
  create(@Body() createBody: CreatePaymentMethodDto) {
    return this.paymentMethod.create(createBody);
  }

  // Get all PaymentMethod Controller
  @ApiOperation({ summary: 'Get all PaymentMethod' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @ApiBearerAuth()
  @Get()
  getAll() {
    return this.paymentMethod.getAll();
  }

  // Get one PaymentMethod Controller
  @ApiOperation({ summary: 'Get one PaymentMethod' })
  @ApiResponse({ status: 200, type: PaymentMethod })
  @ApiBearerAuth()
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.paymentMethod.getOne(+id);
  }

  // Update PaymentMethod Controller
  @ApiOperation({ summary: 'Update PaymentMethod' })
  @ApiResponse({ status: 200, type: PaymentMethod })
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdatePaymentMethodDto) {
    return this.paymentMethod.update(+id, updateBody);
  }

  // Delete PaymentMethod Controller
  @ApiOperation({ summary: 'Delete PaymentMethod' })
  @ApiResponse({ status: 200, type: PaymentMethod })
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.paymentMethod.delete(+id);
  }
}
