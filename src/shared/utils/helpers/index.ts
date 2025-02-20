//#region Imports
import { HttpStatus, Injectable } from "@nestjs/common";
import { writeFileSync } from "fs";
import { normalize } from 'path';
import { ApiResponseType } from "src/shared/types/global";
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from "@nestjs/config";
//#endregion

@Injectable()
export class HelperService {
  constructor( private config: ConfigService ){}

  capitalizeFirstLetters (string: string) {
    return string.replace(/\b\w/g, char => char.toUpperCase());
  };

  getFormattedDate(timestamp): string {
    let date = timestamp ? new Date(timestamp) : new Date();
    let year = date.getFullYear();
    let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : date.getMonth() + 1;
    let day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate();
    let hour = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds();

    let formattedDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    return formattedDate;
  }
}