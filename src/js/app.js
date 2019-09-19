import { routes } from './routes/routes';
import { ActiveRoute } from './core/activeRoute';
import { HeaderComponent } from './components/header/header';

const activeRoute = new ActiveRoute();

const router = async () => {
    const header = document.querySelector('app-header');
    const container = document.querySelector('app-container');

    const request = activeRoute.parseRequestURL();
    const url = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '');

    const component = routes[url] ? routes[url].component : routes['404'].component;
    const guards = routes[url] ? routes[url].guards : null;

    if (guards) {
        const guardState = guards.every(guard => guard.canActive());

        if (!guardState) {
            return;
        }
    }

    if (header) {
        const headerComponent = new HeaderComponent();
        await headerComponent.beforeRender();
        header.innerHTML = headerComponent.render();
        headerComponent.afterRender();
    }

    if (component.beforeRender) {
        await component.beforeRender();
    }

    container.innerHTML = component.render();

    if (component.afterRender) {
        component.afterRender();
    }
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);