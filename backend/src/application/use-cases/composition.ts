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
import { SequelizeLeadRepository } from "@src/infrastructure/sequelize/repositories/lead.repository.impl.js";
import { CreateLeadUseCase } from "./lead/create-lead.use-case.js";
import { GetServiceUseCase } from "./service/get-service.use-case.js";
import { GetLeadByIdUseCase } from "./lead/get-lead.use-case.js";
import { ListExpiredLeadUseCase } from "./lead/list-expired-lead.use-case.js";
import { GetLeadByBisnoIdUseCase } from "./lead/get-lead-by-bisno-id.use-case.js";
import { GetMixeiroByIdUseCase } from "./mixeiros/get-mixeiro-by-id.use-case.js";
import { GetSubscriptionByMixeiroIdUseCase } from "./mixeiro-subscription/get-subscription-by-mixeiro-id.use-case.js";
import { DecrementSubscriptionPointUseCase } from "./mixeiro-subscription/decrement-subscription-point.use-case.js";
import { GetMixeiroByUseCase } from "./mixeiros/get-mixeiro-by.use-case.js";

const bisnoRepository = new SequelizeBisnoRepository();
const mixeiroRepository = new SequelizeMixeiroRepository();
const mixeiroHasSubscriptionRepository =
  new SequelizeMixeiroHasSubscriptionRepository();
const serviceRepository = new SequelizeServiceRepository();
const leadRepository = new SequelizeLeadRepository();

// use-cases

// Bisno
const createBisnoUseCase = new CreateBisnoUseCase(bisnoRepository);
const getBisnoUseCase = new GetBisnoUseCase(bisnoRepository);

// Mixeiro
const createMixeiroUseCase = new CreateMixeiroUseCase(mixeiroRepository);
const getMixeiroByIdUseCase = new GetMixeiroByIdUseCase(mixeiroRepository);
const getMixeiroByUseCase = new GetMixeiroByUseCase(mixeiroRepository);
const listMixeirosUseCase = new ListMixeirosUseCase(mixeiroRepository);
const getNextEligibleMixeiroUseCase = new GetNextEligibleMixeiroUseCase(
  mixeiroRepository,
  serviceRepository,
);

// Mixeiro-Has-Subscription
const createMixeiroSubscriptionUseCase = new CreateMixeiroSubscriptionUseCase(
  mixeiroHasSubscriptionRepository,
);
const getSubscriptionByMixeiroIdUseCase = new GetSubscriptionByMixeiroIdUseCase(
  mixeiroHasSubscriptionRepository,
);
const decrementSubscriptionPointUseCase = new DecrementSubscriptionPointUseCase(
  mixeiroHasSubscriptionRepository,
);

// Lead
const createLeadUseCase = new CreateLeadUseCase(leadRepository);
const getLeadByIdUseCase = new GetLeadByIdUseCase(leadRepository);
const getLeadByBisnoIdUseCase = new GetLeadByBisnoIdUseCase(leadRepository);
const listExpiredLeadUseCase = new ListExpiredLeadUseCase(leadRepository);

// Service
const getServiceUseCase = new GetServiceUseCase(serviceRepository);

export {
  createBisnoUseCase,
  getBisnoUseCase,
  createMixeiroUseCase,
  listMixeirosUseCase,
  getNextEligibleMixeiroUseCase,
  createMixeiroSubscriptionUseCase,
  createLeadUseCase,
  getServiceUseCase,
  getLeadByIdUseCase,
  getLeadByBisnoIdUseCase,
  listExpiredLeadUseCase,
  getMixeiroByIdUseCase,
  getSubscriptionByMixeiroIdUseCase,
  decrementSubscriptionPointUseCase,
  getMixeiroByUseCase,
};
