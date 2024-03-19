import BuildingBasePageObject from './building_base';
import ExclusionHelper from '../helper/exclusion';
import TemplateHelper from '../helper/template';

export default class BuildingEditPageObject extends BuildingBasePageObject {
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
            '.input-group:has(#building_name)'
        );
        if (!inputContainer) return;

        const newBuildingName = this.templateHelper!.getNewBuildingName(
            this._currentBuilding
        );

        const { $m } = this.moduleParams;
        const button = this.injectButton(inputContainer);
        button.title = String(
            $m('action.rename', {
                caption: newBuildingName,
            })
        );
        button.addEventListener('click', () => {
            const inputControl =
                document.querySelector<HTMLInputElement>('#building_name');

            if (inputControl) {
                inputControl.value = newBuildingName;
                inputControl.dispatchEvent(
                    new Event('input', { bubbles: true })
                );
            }
        });
    }

    private injectButton(inputContainer: Element) {
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
        inputContainer.append(setNameButton);

        return setNameButton;
    }
}
