import { GetOneParamsDto } from './dto/get-one-params.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<User[]>;
    getOne(params: GetOneParamsDto): Promise<User>;
}
