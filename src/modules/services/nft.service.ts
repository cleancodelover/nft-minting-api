//#region Imports
import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/connection/PrismaService';
import { GetNFT } from 'src/shared/models/get/nft';
import { PostNFT } from 'src/shared/models/post/nft';
import { ApiResponseType } from 'src/shared/types/global';
import { NFT_STATUSES } from 'src/shared/utils/constants';
import { QueryParams } from 'src/shared/utils/http-response/query';
//#endregion

@Injectable()
export class NFTService {
  constructor(private readonly prisma: PrismaService) {}

  async createNFT(reqBody: PostNFT): Promise<ApiResponseType<GetNFT>> {
    if (!reqBody) {
      return {
        success: false,
        status: HttpStatus.BAD_REQUEST,
        message:
          'Invalid request. All fields are required. Kindly review and try again.',
        error: null,
        data: null,
      } as unknown as ApiResponseType<GetNFT>;
    }

    const { description, tokenId, logoUrl, name, nftAddress } = reqBody;

    try {
      const response = await this.prisma.nFT.create({
        data: {
          description,
          logoUrl,
          name,
          nftAddress,
          tokenId,
          status: NFT_STATUSES.AVAILABLE,
        },
        select: {
          id: true,
          description: true,
          logoUrl: true,
          name: true,
          nftAddress: true,
          tokenId:true,
          status: true,
          createdAt: true,
        },
      });

      if (!response) {
        return {
          success: false,
          status: HttpStatus.BAD_REQUEST,
          message: 'Unable to create NFT, please try again.',
          error: null,
          data: null,
        } as unknown as ApiResponseType<GetNFT>;
      }

      return {
        success: true,
        status: HttpStatus.CREATED,
        message: 'Success',
        error: null,
        data: response,
      } as unknown as ApiResponseType<GetNFT>;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getNFTById(nftId: number): Promise<ApiResponseType<GetNFT>> {
    if (!nftId) {
      return {
        success: false,
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid request.',
        error: null,
        data: null,
      } as unknown as ApiResponseType<GetNFT>;
    }

    try {
      const nft = await this.prisma.nFT.findUnique({
        where: { id: nftId },
        select: {
          id: true,
          description: true,
          logoUrl: true,
          name: true,
          nftAddress: true,
          status: true,
          createdAt: true,
        },
      });
      if (!nft) {
        return {
          success: false,
          status: HttpStatus.NOT_FOUND,
          message: 'Invalid request.',
          error: null,
          data: null,
        } as unknown as ApiResponseType<GetNFT>;
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Success',
        error: null,
        data: nft,
        count: 0,
      } as unknown as ApiResponseType<GetNFT>;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getNFTs(queryParams: QueryParams): Promise<ApiResponseType<GetNFT[]>> {
    const { searchQuery, page, size } = queryParams;

    console.log(
      'searchQuery, page, size :>>>>>>>>>>>>>>>',
      searchQuery,
      page,
      size,
    );

    try {
      const whereClause: any = searchQuery
        ? {
            OR: [
              { name: { contains: searchQuery, mode: 'insensitive' } }, // Case-insensitive search
              { description: { contains: searchQuery, mode: 'insensitive' } },
            ],
          }
        : {};

      const [nftsCount, nftsData] = await this.prisma.$transaction([
        this.prisma.nFT.count({
          where: whereClause,
        }),
        this.prisma.nFT.findMany({
          skip: page ? (page - 1) * size : 0,
          take: size,
          orderBy: {
            createdAt: 'desc',
          },
          where: whereClause,
          select: {
            id: true,
            description: true,
            logoUrl: true,
            name: true,
            nftAddress: true,
            status: true,
            createdAt: true,
          },
        }),
      ]);

      if (!nftsData) {
        return {
          success: false,
          status: HttpStatus.OK,
          message: 'No records found.',
          error: null,
          data: null,
        } as unknown as ApiResponseType<GetNFT[]>;
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Success',
        error: null,
        data: nftsData,
        count: nftsCount,
      } as unknown as ApiResponseType<GetNFT[]>;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
