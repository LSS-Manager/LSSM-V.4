import ExclusionHelper from '../helper/exclusion';
import RenameHelper from '../helper/rename';
import TemplateHelper from '../helper/template';
import VehicleBasePageObject from './vehicle_base';

export default class VehicleShowPageObject extends VehicleBasePageObject {
    private renameHelper?: RenameHelper;
    private exclusionHelper?: ExclusionHelper;
    private templateHelper?: TemplateHelper;

    public async init() {
        this.renameHelper = new RenameHelper(this.moduleParams);
        this.exclusionHelper = new ExclusionHelper(this.moduleParams);
        this.templateHelper = new TemplateHelper(this.moduleParams);

        await this.exclusionHelper.init();
        await this.templateHelper.init();

        await this.augmentHeader();
    }

    private async augmentHeader() {
        const titleTag = document.querySelector('h1');
        if (!titleTag) return;

        const newVehicleName = this.templateHelper!.getNewVehicleName(
            this._currentBuilding,
            this._currentVehicle
        );

        // hide button if new name is the same as the current name
        if (newVehicleName === this._currentVehicle.caption) return;

        const { $m } = this.moduleParams;
        const button = this.injectButton(titleTag);
        button.title = String(
            $m('action.rename', {
                caption: newVehicleName,
            })
        );
        button.addEventListener('click', async () => {
            button.classList.add('btn-disabled');
            button.querySelector('.btn-icon')?.classList.add('fa-spin');

            try {
                await this.renameHelper!.renameVehicle(
                    this._currentVehicle.id,
                    newVehicleName
                );
                button.classList.replace('btn-default', 'btn-success');
                titleTag.textContent = newVehicleName;

                window.setTimeout(() => {
                    button.remove();
                }, 1000);
            } catch (e: unknown) {
                button.classList.replace('btn-default', 'btn-danger');
            } finally {
                button.querySelector('.btn-icon')?.classList.remove('fa-spin');
            }
        });
    }

    private injectButton(container: Element) {
        const setNameButton = document.createElement('span');
        setNameButton.classList.add('btn', 'btn-sm', 'btn-default');
        setNameButton.style.marginLeft = '0.5rem';

        const buttonIcon = document.createElement('i');
        buttonIcon.classList.add(
            'fa-solid',
            'fa-wand-magic-sparkles',
            'btn-icon'
        );

        setNameButton.append(buttonIcon);
        container.append(setNameButton);

        return setNameButton;
    }
}
