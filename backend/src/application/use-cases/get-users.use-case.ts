import { User as UserEntity } from '../../domain/entities/user.entity.js';
import { User } from '../../infra/sequelize/models/user.model.js';

export class GetUsersUseCase {
  async execute(): Promise<User[]> {
    const rows = await User.findAll();
    return rows.map((r) => new User(r.id, r.email, r.name ?? ''));
  }
}
