import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class GetNFT {
  @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty()
    description: string;
  
    @ApiProperty()
    @IsNotEmpty()
    logoUrl: string;
  
    @ApiProperty()
    @IsNotEmpty()
    nftAddress: string;
  }
  