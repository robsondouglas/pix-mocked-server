import { Body, Controller, Post, Req } from "@nestjs/common";
import { Auth } from "../core/auth/auth";
import { ValidateInput } from "./auth.models";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: Auth) { }

    @Post()
    async validate(@Body() credentials:ValidateInput): Promise<any> {
        if (credentials.grant_type != 'client_credentials') {
            throw new Error('Invalid grant_type');
        }
        else {
            return {
                accesstoken: await this.authService.validate(credentials.client_id, credentials.client_secret),
                expires_in: 300 //5 min
            }
        }


    }
}
