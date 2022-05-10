// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import { Foo } from '@my-org/shared-components';

export function App() {
  return (
    <>
      <Foo />
      <NxWelcome title="web1" />
      <div />
    </>
  );
}

export default App;
