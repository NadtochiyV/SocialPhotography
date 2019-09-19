import  { AuthService } from './../services/auth.service';
import { Routing } from './../core/routing';

export class AuthGuard {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
    }

    canActive() {
        if (!this._authService.token) {
            this._routing.navigate('/login');
            return false;
        }

        return true;
    }
}