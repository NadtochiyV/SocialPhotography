import { AuthService } from './../services/auth.service';
import { Routing } from './../core/routing';

export class AdminGuard {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
    }

    canActive() {
        if (!this._authService.userIsAdmin) {
            this._routing.navigate('/');
            return false;
        }

        return true;
    }
}