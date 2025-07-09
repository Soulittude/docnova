import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'; //
import './index.css'
import { DatePicker, message } from 'antd'; //
import App from './App.jsx'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
