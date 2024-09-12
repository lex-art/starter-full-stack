import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserQuery } from "../query/get-user.query";
import { Logger } from "@nestjs/common";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    private readonly logger = new Logger(GetUserHandler.name)
    constructor(
        // initialize your service here and apply you business logic
    ) {}

    async execute(query: GetUserQuery) {
        try{
            console.log(query)
            return {
                message: 'Get user query executed',
                email: query.body.email
            };
        } catch (error) {
            this.logger.error(error.message)
            throw new Error('Error consulting =>' +  error.message)
        }
    }
}