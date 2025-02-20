import { ApiProperty } from "@nestjs/swagger";

export class ApiResponseType<T>{

    @ApiProperty()
    data?: T;
  
    @ApiProperty()
    success: boolean
  
    @ApiProperty()
    message: string
  
    @ApiProperty()
    count?: number
  
    @ApiProperty()
    error?: boolean
  }