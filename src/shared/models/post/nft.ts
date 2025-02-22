import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class PostNFT {
    
    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must be a string.' })
    name: string;
  
    @ApiProperty()
    @IsString()
    description?: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'NFT url is required.' })
    @IsUrl({ require_host: true,  }, { message: 'Logo url must be a valid Url.'})
    logoUrl: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'NFT address is required.' })
    nftAddress: string;
  }
  