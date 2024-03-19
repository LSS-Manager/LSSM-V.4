import ExclusionHelper from '../helper/exclusion';
import TemplateHelper from '../helper/template';
import VehicleBasePageObject from './vehicle_base';

export default class VehicleEditPageObject extends VehicleBasePageObject {
    private exclusionHelper?: ExclusionHelper;
    private templateHelper?: TemplateHelper;

    public async init() {
        this.exclusionHelper = new ExclusionHelper(this.moduleParams);
        this.templateHelper = new TemplateHelper(this.moduleParams);

        await this.exclusionHelper.init();
        await this.templateHelper.init();

        await this.augmentForm();
    }

    private async augmentForm() {
        const inputContainer = document.querySelector(
            '.vehicle_caption > div:not(.control-label)'
        );
        if (!inputContainer) return;

        const newVehicleName = this.templateHelper!.getNewVehicleName(
            this._currentBuilding,
            this._currentVehicle
        );

        const { $m } = this.moduleParams;
        const button = this.injectButton(inputContainer);
        button.title = String(
            $m('action.rename', {
                caption: newVehicleName,
            })
        );
        button.addEventListener('click', () => {
            const inputControl =
                document.querySelector<HTMLInputElement>('#vehicle_caption');

            if (inputControl) {
                inputControl.value = newVehicleName;
                inputControl.dispatchEvent(
                    new Event('input', { bubbles: true })
                );
            }
        });
    }

    private injectButton(inputContainer: Element) {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');

        inputContainer.childNodes.forEach(node => inputGroup.append(node));
        inputContainer.append(inputGroup);

        const setNameButton = document.createElement('span');
        setNameButton.classList.add(
            'input-group-addon',
            'btn',
            'btn-sm',
            'btn-default'
        );

        const buttonIcon = document.createElement('i');
        buttonIcon.classList.add(
            'fa-solid',
            'fa-wand-magic-sparkles',
            'btn-icon'
        );

        setNameButton.append(buttonIcon);
        inputGroup.append(setNameButton);

        return setNameButton;
    }
}
