import { BaseEntity, Column,  CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';

@Entity()
export abstract class BaseEntityWithTimestamps extends BaseEntity {

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
