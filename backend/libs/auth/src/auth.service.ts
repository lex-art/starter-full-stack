import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    helloWord(): string {
        return 'Hello World!';
    }
}
