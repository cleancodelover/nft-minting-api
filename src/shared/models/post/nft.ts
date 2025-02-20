import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class PostNFT {
    
    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must be a string.' })
    name: string;
  
    @ApiProperty()
    description: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'NFT url is required.' })
    @IsUrl({ require_host: true,  }, { message: 'Logo url must be a valid NFT Logo Url.'})
    logoUrl: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'Wallet address is required.' })
    walletAddress: string;
  }
  