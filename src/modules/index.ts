import { Module } from "@nestjs/common";
import { HelperService } from "src/shared/utils/helpers";
import { NFTService } from "./services/nft.service";
import { NFTController } from "./controllers/nft.controller";

@Module({
    imports: [],
    exports:[HelperService],
    providers: [HelperService, NFTService],
    controllers:[NFTController]
})
export class SrcModule {}
