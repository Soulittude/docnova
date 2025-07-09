import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'; //
import './index.css'
import { DatePicker, message } from 'antd'; //
import App from './App.jsx'
import { Provider } from 'react-redux';
import i18n from './i18n.js';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
