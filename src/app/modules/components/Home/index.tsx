import Header from './Header';
import SearchBar from './Search';
import AddButton from './AddButton';
import { decrypt } from '../../../utils/helpers/cryptoJS';
import { useUsers } from '../../../contexts/users';
import { localStorageGet } from '../../../utils/helpers/localStorage';
import AddTaskFrame from './Frames/AddTask';
import { useSweepDown } from '../../../contexts/sweep';
import Tasks from './Task';
import { useTasks } from '../../../contexts/task';
import Progress from './Progress';

const HomePage = () => {
  const { users } = useUsers();
  const tasks = useTasks();
  const { toggleFrame, isFrameOpened } = useSweepDown();
  const token = localStorageGet('to_do_token_');

  const email = decrypt(token as string);

  const userTasks = tasks.filter(
    (task) => task.owner_email === email,
  );
  const usersCollection = users.filter(
    (user) => user.email === email,
  );

  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    return year + '-' + month + '-' + day;
  };

  const toDayTasks = userTasks.filter(
    (task) => task.date === formatDate(new Date()),
  );

  console.log(toDayTasks);

  return (
    <div className="h-full absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br home">
      <Header
        name={usersCollection[0]?.name}
        profile={usersCollection[0]?.profile}
      />
      <SearchBar />
      <AddButton onClick={toggleFrame} />
      <Progress userTasks={userTasks} />
      <p className="text-white text-2xl px-8 font-Mulish font-extrabold py-1">
        Task
        {`${
          toDayTasks.length === 1 || toDayTasks.length === 0
            ? ''
            : 's'
        }`}{' '}
        ({toDayTasks.length})
      </p>
      <Tasks tasks={toDayTasks} name={undefined} />
      {isFrameOpened && <AddTaskFrame />}
    </div>
  );
};

export default HomePage;
