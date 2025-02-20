import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

  export class QueryParams {
    @IsOptional()
    @ApiProperty({ description: 'Page number', required: false })
    readonly page: number;

    @IsOptional()
    @ApiProperty({ description: 'Page size', required: false })
    readonly size: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Resource status', required: false })
    readonly status?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Search query', required: false })
    readonly searchQuery?: string;

    constructor(data?: Partial<QueryParams>) {
      this.page = data?.page ? parseInt(data.page.toString(), 10) : 0;
      this.size = data?.size ? parseInt(data.size.toString(), 10) : 20;
      this.status = data?.status ? data.status : '';
      this.searchQuery = data?.searchQuery ? data.searchQuery : '';
    }
  }