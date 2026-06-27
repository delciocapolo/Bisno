import { SequelizeBisnoRepository } from "@src/infrastructure/sequelize/repositories/bisno.repository.impl.js";
import { CreateBisnoUseCase } from "./create-bisno.use-case.js";

const bisnoRepository = new SequelizeBisnoRepository();

// use-cases
const createBisnoUseCase = new CreateBisnoUseCase(bisnoRepository);

export {
  createBisnoUseCase,
};
