import { SequelizeBisnoRepository } from "@src/infrastructure/sequelize/repositories/bisno.repository.impl.js";
import { CreateBisnoUseCase } from "./bisnos/create-bisno.use-case.js";
import { SequelizeMixeiroRepository } from "@src/infrastructure/sequelize/repositories/mixeiro.repository.impl.js";
import { CreateMixeiroUseCase } from "./mixeiros/create-mixeiro.use-case.js";
import { ListMixeirosUseCase } from "./mixeiros/list-mixeiros.use-case.js";
import { GetNextEligibleMixeiroUseCase } from "./mixeiros/get-next-eligible-mixeiro.use-case.js";
import { GetBisnoUseCase } from "./bisnos/get-bisno.use-case.js";
import { SequelizeMixeiroHasSubscriptionRepository } from "@src/infrastructure/sequelize/repositories/mixeiro-has-subscription.repository.impl.js";
import { CreateMixeiroSubscriptionUseCase } from "./mixeiro-subscription/create-mixeiro-subscription.use-case.js";
import { SequelizeServiceRepository } from "@src/infrastructure/sequelize/repositories/service.repository.impl.js";

const bisnoRepository = new SequelizeBisnoRepository();
const mixeiroRepository = new SequelizeMixeiroRepository();
const mixeiroHasSubscriptionRepository =
  new SequelizeMixeiroHasSubscriptionRepository();
const serviceRepository = new SequelizeServiceRepository();

// use-cases

// Bisno
const createBisnoUseCase = new CreateBisnoUseCase(bisnoRepository);
const getBisnoUseCase = new GetBisnoUseCase(bisnoRepository);

// Mixeiro
const createMixeiroUseCase = new CreateMixeiroUseCase(mixeiroRepository);
const listMixeirosUseCase = new ListMixeirosUseCase(mixeiroRepository);
const getNextEligibleMixeiroUseCase = new GetNextEligibleMixeiroUseCase(
  mixeiroRepository,
  serviceRepository,
);

// Mixeiro-Has-Subscription
const createMixeiroSubscriptionUseCase = new CreateMixeiroSubscriptionUseCase(
  mixeiroHasSubscriptionRepository,
);

export {
  createBisnoUseCase,
  getBisnoUseCase,
  createMixeiroUseCase,
  listMixeirosUseCase,
  getNextEligibleMixeiroUseCase,
  createMixeiroSubscriptionUseCase,
};
