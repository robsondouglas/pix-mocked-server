import { Controller, Post, Req } from "@nestjs/common";
import { Auth } from "../core/auth/auth";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: Auth) { }

    @Post()
    async validate(@Req() req): Promise<any> {
        const credentials: { grant_type: string, client_id: string, client_secret: string } = req.body;
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
