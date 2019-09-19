import { AuthService } from './../../services/auth.service';
import { Routing } from './../../core/routing';

export class HeaderComponent {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
        this._userId = null;
    }

    async beforeRender() {
        this._userId = this._authService.userId;
    }

    render() {
        if (!this._authService.token) {
            return '';
        }

        const isAdmin = this._authService.userIsAdmin;

        return `
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand">App</a>
                <ul class="navbar-nav d-flex flex-row">
                    <li class="nav-item">
                        <a class="nav-link" href="/#/">Home</a>
                    </li>    
                    <li class="nav-item ml-3" >
                        <a class="nav-link" href="/#/users/${this._userId}">My profile</a>
                    </li>
                    <li class="nav-item ml-3">
                        <a class="nav-link" href="/#/news">News</a>
                    </li>
                    ${isAdmin ? 
                        `<li class="nav-item ml-3">
                            <a class="nav-link" href="/#/admin-panel">
                                Admin Panel
                            </a>
                        </li>` 
                        : 
                        ''
                    }
                </ul>
                <button class="btn btn-primary logout-btn">Logout</button>
            </nav>
        `;
    }

    afterRender() {
        if (!this._authService.token) {
            return '';
        }

        document.querySelector('.logout-btn').addEventListener('click', e => {
            this._authService.logout()
                .then(() => this._routing.navigate('/login'));
        });
    }
}