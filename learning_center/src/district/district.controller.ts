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
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entity/district.entity';
import { DistrictService } from './district.service';
import { AllAdminGuard } from '../common/guards';

@ApiTags('District')
@Controller('district')
@UseGuards(AllAdminGuard)
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  // Create District Controller
  @ApiOperation({ summary: 'Create District' })
  @ApiResponse({ status: 201, type: District })
  @ApiBearerAuth()
  @Post()
  create(@Body() createBody: CreateDistrictDto) {
    return this.districtService.create(createBody);
  }

  // Get all District Controller
  @ApiOperation({ summary: 'Get all District' })
  @ApiResponse({ status: 200, type: [District] })
  @ApiBearerAuth()
  @Get()
  getAll() {
    return this.districtService.getAll();
  }

  // Get one District Controller
  @ApiOperation({ summary: 'Get one District' })
  @ApiResponse({ status: 200, type: District })
  @ApiBearerAuth()
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.districtService.getOne(+id);
  }

  // Update District Controller
  @ApiOperation({ summary: 'Update District' })
  @ApiResponse({ status: 200, type: District })
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateDistrictDto) {
    return this.districtService.update(+id, updateBody);
  }

  // Delete District Controller
  @ApiOperation({ summary: 'Delete District' })
  @ApiResponse({ status: 200, type: District })
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.districtService.delete(+id);
  }
}
