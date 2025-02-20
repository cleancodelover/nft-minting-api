import { Module } from "@nestjs/common";
import { HelperService } from "src/shared/utils/helpers";

@Module({
    imports: [],
    exports:[HelperService],
    providers: [HelperService],
    controllers:[]
})
export class SrcModule {}
