import { useContext } from "react";
import TaskContext from "../contexts/TaskContext";
import { IonCheckbox, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonToolbar } from "@ionic/react";
import { trash } from 'ionicons/icons';

const TaskList = () => {
    const { tasks, updateTask, deleteTask } = useContext(TaskContext);

    const incompleted = (taskId: number) => {
        updateTask({ completed: false }, taskId)
            .then(() => {}).catch((error: any) => {
                console.log(error);
            });
    };

    const completed = (taskId: number) => {
        updateTask({ completed: true }, taskId)
            .then(() => {}).catch((error: any) => {
                console.log(error);
            });
    };

    const deleted = (taskId: number) => {
        deleteTask(taskId)
            .then(() => {}).catch((error: any) => {
                console.log(error);
            });
    };

    const completedTasks = tasks.filter((t: any) => t.completed);
    const incompleteTasks = tasks.filter((t: any) => !t.completed);

    return (
        <div>
            <IonToolbar color="primary">
                <strong>Incomplete</strong>
            </IonToolbar>
            <IonList>
                {incompleteTasks.map((t: any) => (
                    <IonItemSliding key={t.taskId}>
                        <IonItem>
                            <IonLabel>{t.title}</IonLabel>
                            <IonCheckbox
                                labelPlacement="end"
                                name={t.title}
                                checked={t.completed}
                                onClick={() => incompleted(t.taskId)}
                                color="secondary"
                            />
                        </IonItem>
                        <IonItemOptions side="end">
                            <IonItemOption color="danger">
                                <IonIcon slot="icon-only" icon={trash} onClick={() => deleted(t.taskId)} />
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                ))}
            </IonList>

            <IonToolbar color="primary">
                <strong>Complete</strong>
            </IonToolbar>
            <IonList>
                {completedTasks.map((t: any) => (
                    <IonItemSliding key={t.taskId}>
                        <IonItem>
                            <IonLabel>{t.title}</IonLabel>
                            <IonCheckbox
                                labelPlacement="end"
                                name={t.title}
                                checked={t.completed}
                                onClick={() => completed(t.taskId)}
                                color="secondary"
                            />
                        </IonItem>
                        <IonItemOptions side="end">
                            <IonItemOption color="danger">
                                <IonIcon slot="icon-only" icon={trash} onClick={() => deleted(t.taskId)} />
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                ))}
            </IonList>
        </div>
    );
};

export default TaskList;

