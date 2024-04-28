import { IonAlert, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import './Home.css';
import TaskList from '../components/TaskList';
import { add } from 'ionicons/icons';
import { useContext } from 'react';
import TaskContext from '../contexts/TaskContext';

const Home: React.FC = () => {

  const { addTask } = useContext(TaskContext);
  const [presentAlert] = useIonAlert();

  const handleClicked = () => {
    presentAlert({
      header: 'Add Task',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Enter task name here'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data: { task: string }) => {
            addTask({ title: data.task, completed: false })
              .then(() => {})
              .catch((error: any) => {
                console.log(error);
              });
          }
        }
      ]
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Task List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen color="warning">
        
        <TaskList />

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton color="secondary" onClick={handleClicked}>
            <IonIcon icon={ add } />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
