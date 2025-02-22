//#region Imports
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NFTService } from '../services/nft.service';
import { GetNFT } from 'src/shared/models/get/nft';
import { ApiResponseConfig } from 'src/config/ApiResponse';
import { ApiResponseType } from 'src/shared/types/global';
import { RESPONSE_RESULT_TYPE } from 'src/shared/utils/constants';
import { HandleResponse } from 'src/shared/utils/http-response';
import { PostNFT } from 'src/shared/models/post/nft';
import { QueryParams } from 'src/shared/utils/http-response/query';
import { version } from 'os';
//#endregion

@ApiTags('NFT Management')
@Controller({ path: 'nfts', version: '1' })
export class NFTController {
  constructor(private readonly nftService: NFTService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponseConfig(GetNFT, 201, RESPONSE_RESULT_TYPE.OBJECT)
  async checkIn(@Body() body: PostNFT): Promise<ApiResponseType<GetNFT>> {
    return HandleResponse.handle(await this.nftService.createNFT(body));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponseConfig(GetNFT, 200, RESPONSE_RESULT_TYPE.OBJECT)
  async GetNFTsByUserId( @Param('id', ParseIntPipe) id: number ): Promise<ApiResponseType<GetNFT>> {
    return HandleResponse.handle( await this.nftService.getNFTById( id ));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponseConfig(GetNFT, 200, RESPONSE_RESULT_TYPE.ARRAY)
  async getNFTs( @Query() queryParams: QueryParams ): Promise<ApiResponseType<GetNFT>> {
    return HandleResponse.handle( await this.nftService.getNFTs( queryParams ) );
  }
}
