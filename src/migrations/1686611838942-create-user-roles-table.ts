import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserRolesTable1686611838942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_roles",

        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            precision: 6,
            default: "CURRENT_TIMESTAMP(6)",
          },
          {
            name: "updated_at",
            type: "timestamp",
            precision: 6,
            default: "CURRENT_TIMESTAMP(6)",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            precision: 6,
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
