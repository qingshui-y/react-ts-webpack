import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routerConfig from '@/router/router.config';
import styles from './App.less';

// 渲染路由
function RouteElement() {
  const element = useRoutes(routerConfig);
  return element;
}

const App = () => {
  return (
    <BrowserRouter>
      <RouteElement />
    </BrowserRouter>
  );
};

export default App;
