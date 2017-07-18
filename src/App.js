import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store/store'
import routes from './routes';
import './theme/elements.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-select/dist/react-select.css';

class App extends Component {
  render() {
    return (
      <Provider store={store()} key='provider'>
        {routes()}
      </Provider>
    )
  }
}

export default App;
