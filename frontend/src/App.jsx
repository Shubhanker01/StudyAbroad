import { ToastContainer } from 'react-toastify'
import AppRouter from './router/AppRouter'
export default function App() {
  return (
    <>
      <ToastContainer position='top-center' theme='dark' autoClose={5000} closeButton={true} />
      <AppRouter />
    </>
  );
}
