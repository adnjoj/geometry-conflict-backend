import { GetOneParamsDto } from './dto/get-one-params.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(params: GetOneParamsDto): Promise<import("./entities/user.entity").User>;
}
