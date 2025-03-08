'use client';
import { store } from './store';
import { Provider } from 'react-redux';

export default function ReduxProvider({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
