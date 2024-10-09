import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query, Req, UseInterceptors } from "@nestjs/common";
import { LocGetResponse, LocGetFilter, LocPutRequest } from "../../src/core/app/models/loc";
import { PSP } from "../../src/core/app/psp";
import { HttpInterceptor } from "../../src/http.interceptor";

@Controller("loc")
@UseInterceptors(HttpInterceptor)
export class LocationController {
    constructor(private readonly pspService: PSP) { }

    @Put()
    async create(@Body() data: LocPutRequest, @Headers() headers): Promise<LocGetResponse> {
        const IdOwner = headers["IdOwner"];
        return await this.pspService.addLoc({ IdOwner, ...data });
    }

    @Get(':id')
    async read(@Param() params: any, @Headers() headers): Promise<LocGetResponse> {
        const IdOwner = headers["IdOwner"];
        const id = (params.id && !isNaN(params.id)) ? Number.parseInt(params.id) : 0;
        const res = await this.pspService.readLoc({ IdOwner, id });
        return res;
    }

    @Get()
    list(@Headers() headers, @Query() qry: LocGetFilter) {
        const IdOwner = headers["IdOwner"];
        return this.pspService.listLoc({ ...qry, IdOwner });
    }

    @Delete(':id/txid')
    async remove(@Param() params: any, @Headers() headers): Promise<any> {
        const id = (params.id && !isNaN(params.id)) ? Number.parseInt(params.id) : 0;        
        const IdOwner = headers["IdOwner"];
        return await this.pspService.removeLoc({ id, IdOwner })
    }
}
