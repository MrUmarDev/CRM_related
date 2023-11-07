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
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entity/coupon.entity';
import { CouponService } from './discount_coupon_id.service';
import { AllAdminGuard } from '../common/guards';

@ApiTags('Coupon')
@Controller('coupon')
@UseGuards(AllAdminGuard)
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  // Create Coupon Controller
  @ApiOperation({ summary: 'Create Coupon' })
  @ApiResponse({ status: 201, type: Coupon })
  @ApiBearerAuth()
  @Post()
  create(@Body() createBody: CreateCouponDto) {
    return this.couponService.create(createBody);
  }

  // Get all Coupon Controller
  @ApiOperation({ summary: 'Get all Coupon' })
  @ApiResponse({ status: 200, type: [Coupon] })
  @ApiBearerAuth()
  @Get()
  getAll() {
    return this.couponService.getAll();
  }

  // Get one Coupon Controller
  @ApiOperation({ summary: 'Get one Coupon' })
  @ApiResponse({ status: 200, type: Coupon })
  @ApiBearerAuth()
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.couponService.getOne(+id);
  }

  // Update Coupon Controller
  @ApiOperation({ summary: 'Update Coupon' })
  @ApiResponse({ status: 200, type: Coupon })
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateCouponDto) {
    return this.couponService.update(+id, updateBody);
  }

  // Delete Coupon Controller
  @ApiOperation({ summary: 'Delete Coupon' })
  @ApiResponse({ status: 200, type: Coupon })
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.couponService.delete(+id);
  }
}
