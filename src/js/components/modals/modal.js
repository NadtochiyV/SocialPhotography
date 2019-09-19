export class ModalsComponent {
    constructor() {
        this._modalContainer = document.querySelector('modals');
    }
    render(message) {
        const template = this._getTemplate(message);
        this._modalContainer.innerHTML = template;

        const modal = document.querySelector('.modal');
        this._showModal(modal);
        this._hideModal(modal);
    }

    _showModal(modal) {
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
    }

    _hideModal(modal) {
        setTimeout(() => {
            modal.classList.remove('show');
            this._modalContainer.innerHTML = '';
        }, 3000);
    }

    _getTemplate(message) {
        return `
        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display: block; background: rgba(33, 37, 41, 0.7)">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Notification</h5>
              </div>
              <div class="modal-body">
                ${message}
              </div>
            </div>
          </div>
        </div>
        `;
    }
}