// import { UseCaseAbstract } from "@src/shared/@types/use-case";

// export class GetUserUseCase implements UseCaseAbstract<User | null> {
//   constructor(
//     private readonly userRepository: SequelizeUserRepository,
//   ) {}

//   async execute(params: GetUserPayload): Promise<User | null> {
//     const user = await this.userRepository.findById(params.id);
//     return user;
//   }
// }
