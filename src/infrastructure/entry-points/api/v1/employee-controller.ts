import {Mapping, Get} from "@tsclean/core";

@Mapping('api/v1/employee')
export class EmployeeController {
    constructor() {
    }
    @Get()
    async getWelcome(): Promise<any> {
        return 'Welcome to the world of clean architecture'
    }
}
