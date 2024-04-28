"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFactory = exports.Task = void 0;
const sequelize_1 = require("sequelize");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
function TaskFactory(sequelize) {
    Task.init({
        taskId: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'task',
        freezeTableName: true,
        sequelize
    });
}
exports.TaskFactory = TaskFactory;
