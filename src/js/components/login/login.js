import { AuthService } from './../../services/auth.service';
import { ModalsComponent } from './../modals/modal';
import { Routing } from './../../core/routing';

export class LoginComponent {
    constructor() {
        this._authService = new AuthService();
        this._modal = new ModalsComponent();
        this._routing = new Routing();
    }

    async beforeRender() {
        if (this._authService.token) {
            this._routing.navigate(`/users/${this._authService.userId}`);
        }
    }

    render() {
        return `
        <div class="auth-wrap d-flex mt-5">
            <div class="auth-form col col-6 mx-auto my-auto">
                <h3>Login to Social.</h3>
                <p class="text-secondary">Enter your e-mail address & password to login to your Social account.</p>
                <form name="loginForm" novalidate>
                    <div class="form-group">
                        <input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
                        <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
                        <div class="d-flex mt-5">
                            <button type="submit" class="btn btn-primary btn-sm">Login</button>
                        </div>
                        <a href="#/">Go to Home page</a>
                    </div>
                </form>
            </div>
            <!-- /.auth-form -->
            <div class="auth-bg col col-6">

            </div>
            <!-- /.auth-bg -->
        </div>
        <!-- /.auth-wrap -->
        `;
    }

    afterRender() {
        document.forms.loginForm.addEventListener('submit', e => {
            e.preventDefault();

            const { email, password } = e.target.elements;

            if (!email.value || !password.value) {
                return console.warn('Заполните все поля');
            }

            this._authService.login(email.value, password.value)
            .then(response => {
                this._routing.navigate(`/users/${response.id}`, {myData: 'My data'});
            })
            .catch(err => this._modal.render(err.message));
        });
    }
}