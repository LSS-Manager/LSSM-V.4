import BuildingBasePageObject from './building_base';
import ExclusionHelper from '../helper/exclusion';
import RenameHelper from '../helper/rename';
import TemplateHelper from '../helper/template';

import type { Building } from 'typings/Building';
import type { Vehicle } from 'typings/Vehicle';

type CaptionedVehicle = Vehicle & { newCaption: string };
type CaptionedVehicleWithNode = CaptionedVehicle & { node: HTMLElement };

type CaptionedBuilding = Building & { newCaption: string };
type CaptionedBuildingWithNode = CaptionedBuilding & { node: HTMLElement };

export default class BuildingShowPageObject extends BuildingBasePageObject {
    private _renameableVehicles: Map<string, CaptionedVehicleWithNode> =
        new Map();
    private _renameableBuildings: Map<string, CaptionedBuildingWithNode> =
        new Map();
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

        this.waitForVehiclesTable().then(() => this.augmentVehiclesTable());
        this.waitForBuildingsTable().then(() => this.augmentBuildingsTable());
    }

    private get isCurrentBuildingDispatchCenter(): boolean {
        return this._currentBuilding.building_type === 7;
    }

    private async waitForVehiclesTable(): Promise<void> {
        if (!this.isCurrentBuildingDispatchCenter) return;

        // special case for dispatch page: wait for vehicles table to be loaded
        await new Promise(resolve => {
            const check = () => {
                const vehicleTable = document.querySelector(
                    '#vehicle_table tbody tr'
                );
                if (vehicleTable) resolve(vehicleTable);
                else window.setTimeout(check, 250);
            };

            check();
        });
    }

    private async waitForBuildingsTable(): Promise<void> {
        if (!this.isCurrentBuildingDispatchCenter) return;

        // special case for dispatch page: wait for buildings table to be loaded
        await new Promise(resolve => {
            const check = () => {
                const buildingTable = document.querySelector(
                    '#building_table tbody tr'
                );
                if (buildingTable) resolve(buildingTable);
                else window.setTimeout(check, 250);
            };

            check();
        });
    }

    private async augmentVehiclesTable() {
        if (
            !this.isCurrentBuildingDispatchCenter &&
            this.exclusionHelper!.isBuildingTypeExcluded(
                this._currentBuilding.building_type
            )
        ) {
            // short circuit if building type is excluded
            return;
        }

        await this.collectRenameableVehicles();
        await this.augmentVehiclesTableHeader();
        await this.augmentVehicleTableRows();
    }

    private async collectRenameableVehicles() {
        const { LSSM } = this.moduleParams;

        this._renameableVehicles = new Map(
            Array.from(
                this.isCurrentBuildingDispatchCenter
                    ? LSSM.$stores.api.vehiclesByDispatchCenter[
                          this._currentBuilding.id
                      ]
                    : LSSM.$stores.api.vehiclesByBuilding[
                          this._currentBuilding.id
                      ]
            )
                // remove any invalid or excluded vehicle type
                .filter(
                    vehicle =>
                        !this.exclusionHelper!.isVehicleTypeExcluded(
                            vehicle.vehicle_type
                        )
                )

                // remove vehicles from excluded building types
                .filter(vehicle => {
                    const building = this.isCurrentBuildingDispatchCenter
                        ? LSSM.$stores.api.buildingsById[vehicle.building_id]
                        : this._currentBuilding;

                    return (
                        building &&
                        !this.exclusionHelper!.isBuildingTypeExcluded(
                            building.building_type
                        )
                    );
                })

                // add new caption to vehicle data
                .map(vehicle => {
                    const building = this.isCurrentBuildingDispatchCenter
                        ? LSSM.$stores.api.buildingsById[vehicle.building_id]
                        : this._currentBuilding;

                    return {
                        ...vehicle,
                        newCaption: this.templateHelper!.getNewVehicleName(
                            building!,
                            vehicle
                        ),
                    } as CaptionedVehicle;
                })

                // remove vehicles with unchanged name
                .filter(vehicle => vehicle.caption !== vehicle.newCaption)

                // map to table row
                .map(vehicle => {
                    const vehicleLink = document.querySelector(
                        `#vehicle_table tbody tr td[sortvalue] a[href$="/vehicles/${vehicle.id}"]`
                    );

                    return {
                        ...vehicle,
                        node: vehicleLink?.closest('tr'),
                    } as CaptionedVehicle & { node?: HTMLElement };
                })

                // remove vehicles without a table row
                .filter((vehicle): vehicle is CaptionedVehicleWithNode => {
                    return vehicle.node !== undefined;
                })

                // map to Map entry format
                .map(vehicle => [String(vehicle.id), vehicle])
        );
    }

    private async augmentVehicleTableRows() {
        // Rename button per vehicle
        this._renameableVehicles.forEach(vehicle => {
            const vehicleLink = vehicle.node.querySelector<HTMLAnchorElement>(
                `:scope a[href$="/vehicles/${vehicle.id}"]`
            );
            if (!vehicleLink) return null;

            // add button to rename the vehicles
            this.createRenameButton(vehicle, vehicleLink);
        });
    }

    private async augmentVehiclesTableHeader() {
        if (this._renameableVehicles.size === 0) return;

        const { $m } = this.moduleParams;

        const renameAll = async (
            renameableVehicles: CaptionedVehicleWithNode[],
            e: UIEvent
        ) => {
            const { currentTarget: button } = e;
            if (!(button instanceof HTMLElement)) return;

            const buttonIcon = button.querySelector(':scope .btn-icon');
            buttonIcon?.classList.add('fa-spin', 'btn-disabled');

            for (const vehicle of renameableVehicles.values()) {
                const vehicleLink = vehicle.node.querySelector(
                    `:scope a[href="/vehicles/${vehicle.id}"]`
                );
                const renameButton = vehicle.node.querySelector(
                    `:scope .ns-action-rename`
                );

                renameButton?.classList.add('btn-disabled');
                renameButton
                    ?.querySelector(':scope .btn-icon')
                    ?.classList.add('fa-spin');

                try {
                    await this.renameHelper!.renameVehicle(
                        Number(vehicle.id),
                        vehicle.newCaption
                    );

                    if (vehicleLink)
                        vehicleLink.textContent = vehicle.newCaption;

                    renameButton?.classList.add('btn-success');
                    window.setTimeout(() => {
                        renameButton?.remove();
                    }, 200);
                } catch (err: unknown) {
                    renameButton?.classList.add('btn-danger');
                } finally {
                    renameButton
                        ?.querySelector(':scope .btn-icon')
                        ?.classList.remove('fa-spin');
                }

                // delay requests to not get rate limited
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            button.remove();

            return false;
        };

        // Rename all vehicles button
        const renameAllButton = document.createElement('button');
        renameAllButton.classList.add('btn', 'btn-default', 'btn-xs');
        renameAllButton.style.marginLeft = '0.5rem';
        renameAllButton.title = String(
            $m('action.rename_all', { count: this._renameableVehicles.size })
        );
        renameAllButton.addEventListener('mouseup', e => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const allVehicleRows = document.querySelectorAll(
                '#vehicle_table tbody tr'
            );

            renameAll(
                Array.from(this._renameableVehicles.values()).toSorted(
                    (a, b) => {
                        const aIndex = Array.from(allVehicleRows).indexOf(
                            a.node
                        );
                        const bIndex = Array.from(allVehicleRows).indexOf(
                            b.node
                        );

                        return aIndex - bIndex;
                    }
                ),
                e
            );

            return false;
        });

        const buttonIcon = document.createElement('i');
        buttonIcon.classList.add(
            'fa-solid',
            'fa-wand-magic-sparkles',
            'btn-icon'
        );

        renameAllButton.append(buttonIcon);

        // find "name" column
        const nameColumn = document.querySelector(
            '#vehicle_table th[role=columnheader]:not(.sorter-false) .tablesorter-header-inner'
        );

        if (nameColumn) nameColumn.append(renameAllButton);
    }

    private async augmentHeader() {
        const titleTag = document.querySelector('h1');
        if (!titleTag) return;

        const newBuildingName = this.templateHelper!.getNewBuildingName(
            this._currentBuilding
        );

        // hide button if new name is the same as the current name
        if (newBuildingName === this._currentBuilding.caption) return;

        const { $m } = this.moduleParams;
        const button = this.injectButton(titleTag);
        button.title = String(
            $m('action.rename', {
                caption: newBuildingName,
            })
        );
        button.addEventListener('click', async () => {
            button.classList.add('btn-disabled');
            button.querySelector('.btn-icon')?.classList.add('fa-spin');

            try {
                await this.renameHelper!.renameBuilding(
                    this._currentBuilding.id,
                    newBuildingName
                );
                button.classList.replace('btn-default', 'btn-success');
                titleTag.textContent = newBuildingName;

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

    private async augmentBuildingsTable() {
        if (!this.isCurrentBuildingDispatchCenter) {
            //  not a dispatch center
            return;
        }
        await this.collectRenameableBuildings();
        await this.augmentBuildingsTableHeader();
        await this.augmentBuildingsTableRows();
    }

    private async collectRenameableBuildings() {
        const { LSSM } = this.moduleParams;

        this._renameableBuildings = new Map(
            Array.from(
                LSSM.$stores.api.buildingsByDispatchCenter[
                    this._currentBuilding.id
                ]
            )
                // remove any invalid or excluded building type
                .filter(
                    building =>
                        !this.exclusionHelper!.isBuildingTypeExcluded(
                            building.building_type
                        )
                )

                // add new caption to building data
                .map(building => {
                    return {
                        ...building,
                        newCaption:
                            this.templateHelper!.getNewBuildingName(building),
                    } as CaptionedBuilding;
                })

                // remove buildings with unchanged name
                .filter(building => building.caption !== building.newCaption)

                // map to table row
                .map(building => {
                    const buildingLink = document.querySelector(
                        `#building_table tbody tr td a[building_type][href$="/buildings/${building.id}"]`
                    );

                    return {
                        ...building,
                        node: buildingLink?.closest('tr'),
                    } as CaptionedBuilding & { node?: HTMLElement };
                })

                // remove buildings without a table row
                .filter((building): building is CaptionedBuildingWithNode => {
                    return building.node !== undefined;
                })

                // map to Map entry format
                .map(building => [String(building.id), building])
        );
    }

    private async augmentBuildingsTableHeader() {
        if (this._renameableBuildings.size === 0) return;

        const { $m } = this.moduleParams;

        const renameAll = async (
            renameableBuildings: CaptionedBuildingWithNode[],
            e: UIEvent
        ) => {
            const { currentTarget: button } = e;
            if (!(button instanceof HTMLElement)) return;

            const buttonIcon = button.querySelector(':scope .btn-icon');
            buttonIcon?.classList.add('fa-spin', 'btn-disabled');

            for (const building of renameableBuildings.values()) {
                const buildingLink = building.node.querySelector(
                    `:scope a[href$="/buildings/${building.id}"]`
                );
                const renameButton = building.node.querySelector(
                    `:scope .ns-action-rename`
                );

                renameButton?.classList.add('btn-disabled');
                renameButton
                    ?.querySelector(':scope .btn-icon')
                    ?.classList.add('fa-spin');

                try {
                    await this.renameHelper!.renameBuilding(
                        Number(building.id),
                        building.newCaption
                    );

                    if (buildingLink)
                        buildingLink.textContent = building.newCaption;

                    renameButton?.classList.add('btn-success');
                    window.setTimeout(() => {
                        renameButton?.remove();
                    }, 200);
                } catch (err: unknown) {
                    renameButton?.classList.add('btn-danger');
                } finally {
                    renameButton
                        ?.querySelector(':scope .btn-icon')
                        ?.classList.remove('fa-spin');
                }

                // delay requests to not get rate limited
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            button.remove();

            return false;
        };

        // Rename all buildings button
        const renameAllButton = document.createElement('button');
        renameAllButton.classList.add('btn', 'btn-default', 'btn-xs');
        renameAllButton.style.marginLeft = '0.5rem';
        renameAllButton.title = String(
            $m('action.rename_all', { count: this._renameableBuildings.size })
        );
        renameAllButton.addEventListener('mouseup', e => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const allBuildingsRow = document.querySelectorAll(
                '#building_table tbody tr'
            );

            renameAll(
                Array.from(this._renameableBuildings.values()).toSorted(
                    (a, b) => {
                        const aIndex = Array.from(allBuildingsRow).indexOf(
                            a.node
                        );
                        const bIndex = Array.from(allBuildingsRow).indexOf(
                            b.node
                        );

                        return aIndex - bIndex;
                    }
                ),
                e
            );

            return false;
        });

        const buttonIcon = document.createElement('i');
        buttonIcon.classList.add(
            'fa-solid',
            'fa-wand-magic-sparkles',
            'btn-icon'
        );

        renameAllButton.append(buttonIcon);

        // find "name" column
        const nameColumn = document.querySelector(
            '#building_table th[role=columnheader]:not(.sorter-false) .tablesorter-header-inner'
        );

        if (nameColumn) nameColumn.append(renameAllButton);
    }

    private async augmentBuildingsTableRows() {
        // Rename button per building
        this._renameableBuildings.forEach(building => {
            const buildingLink = building.node.querySelector<HTMLAnchorElement>(
                `:scope a[href$="/buildings/${building.id}"]`
            );
            if (!buildingLink) return null;

            // add button to rename the buildings
            this.createRenameButton(building, buildingLink);
        });
    }

    private async renameSingleItemListener(
        e: Event,
        itemLink: HTMLAnchorElement | null | undefined
    ) {
        const { currentTarget } = e;
        if (!(currentTarget instanceof HTMLElement)) return;

        const { targetId, target } = currentTarget.dataset;
        if (!targetId) return;
        const targetObject = JSON.parse(target ?? '');
        if (
            !this.isCaptionedVehicle(targetObject) &&
            !this.isCaptionedBuilding(targetObject)
        )
            return;

        currentTarget
            .querySelector(':scope .btn-icon')
            ?.classList.add('fa-spin');

        try {
            if (this.isCaptionedBuilding(targetObject)) {
                await this.renameHelper!.renameBuilding(
                    Number(targetObject.id),
                    targetObject.newCaption
                );
            } else if (this.isCaptionedVehicle(targetObject)) {
                await this.renameHelper!.renameVehicle(
                    Number(targetObject.id),
                    targetObject.newCaption
                );
            }

            if (itemLink) itemLink.textContent = targetObject.newCaption;

            currentTarget.classList.add('btn-success');
            window.setTimeout(() => {
                currentTarget.remove();
            }, 1000);
        } catch (err: unknown) {
            currentTarget.classList.add('btn-danger');
        } finally {
            currentTarget
                .querySelector(':scope .btn-icon')
                ?.classList.remove('fa-spin');
        }
    }

    private createRenameButton(
        buildingOrVehicle: CaptionedBuildingWithNode | CaptionedVehicleWithNode,
        itemLink: HTMLAnchorElement
    ) {
        const { $m } = this.moduleParams;

        const renameButton = document.createElement('span');
        renameButton.classList.add(
            'btn',
            'btn-default',
            'btn-xs',
            'ns-action-rename'
        );
        renameButton.style.marginLeft = '0.5rem';
        renameButton.dataset.targetId = String(buildingOrVehicle.id);
        renameButton.dataset.target = JSON.stringify(buildingOrVehicle);
        renameButton.title = String(
            $m('action.rename', {
                caption: buildingOrVehicle.newCaption,
            })
        );

        renameButton.addEventListener('click', e =>
            this.renameSingleItemListener(e, itemLink)
        );

        const buttonIcon = document.createElement('i');
        buttonIcon.classList.add(
            'fa-solid',
            'fa-wand-magic-sparkles',
            'btn-icon'
        );

        renameButton.append(buttonIcon);
        itemLink.after(renameButton);
    }

    private isCaptionedVehicle(object: unknown): object is CaptionedVehicle {
        return (
            object instanceof Object &&
            'newCaption' in object &&
            'vehicle_type' in object
        );
    }
    private isCaptionedBuilding(object: unknown): object is CaptionedBuilding {
        return (
            object instanceof Object &&
            'newCaption' in object &&
            'building_type' in object
        );
    }
}
