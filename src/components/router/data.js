import dataGeneral from '@data/general';
import dataHome from '@pages/index/data';

const routes = {
    home: {
        path: dataGeneral.baseDir,
        title: dataHome.meta?.title,
    },
};

Object.keys(routes).forEach((route) => {
    routes[route].id = route;
});

export default {
    routes,
};
