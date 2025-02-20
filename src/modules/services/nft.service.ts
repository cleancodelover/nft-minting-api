import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/connection/PrismaService';
import { GetNFT } from 'src/shared/models/get/nft';
import { PostNFT } from 'src/shared/models/post/nft';
import { ApiResponseType } from 'src/shared/types/global';
import { HelperService } from 'src/shared/utils/helpers';

@Injectable()
export class NFTService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  async createNFT(reqBody: PostNFT): Promise<ApiResponseType<GetNFT>> {
    if (!reqBody) {
      return {
        success: false,
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid request.',
        error: null,
        data: null,
      } as unknown as ApiResponseType<GetNFT>;
    }

    const { description, logoUrl, name, walletAddress } = reqBody;

    try {
        
    } catch (error) {
        
    }

    return {
      success: false,
      status: HttpStatus.UNAUTHORIZED,
      message: 'User unauthorized',
      error: null,
      data: null,
    } as unknown as ApiResponseType<GetNFT>;
  }
}
