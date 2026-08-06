import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import type {
  Mixeiro,
  MixeiroAttributes,
} from "@src/infrastructure/sequelize/models/mixeiro.model";
import type { SequelizeMixeiroRepository } from "@src/infrastructure/sequelize/repositories/mixeiro.repository.impl";

type IParams = Partial<
  Pick<MixeiroAttributes, "id" | "bi" | "email" | "mobile">
>;

export class GetMixeiroByUseCase implements UseCaseAbstract<Mixeiro | null> {
  constructor(private readonly repository: SequelizeMixeiroRepository) {}

  async execute(params: IParams): Promise<Mixeiro | null> {
    const mixeiro = await this.repository.getMixeiro({
      where: params,
    });
    return mixeiro;
  }
}
