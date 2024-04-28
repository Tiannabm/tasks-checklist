import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";



export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>>{

    declare taskId: number;
    declare title: string;
    declare completed: boolean;

}

export function TaskFactory(sequelize: Sequelize) {
    Task.init({

        taskId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    }, {
        tableName: 'task',
        freezeTableName: true,
        sequelize
    });
}