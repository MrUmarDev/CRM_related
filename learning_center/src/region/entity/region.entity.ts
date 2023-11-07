import { ApiProperty } from '@nestjs/swagger';
import {Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {User} from "../../user/entity/user.entity";
import {Cart} from "../../cart/entity/cart.entity";
import {UserAddress} from "../../user_address/entity/address.entity";

interface RegionCreationAttr {
  name: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, RegionCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.NUMBER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Qashqadaryo', description: 'Region name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
