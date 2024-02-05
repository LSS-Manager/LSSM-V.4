import ExclusionHelper from '../helper/exclusion';
import PageObject from './base';
import RenameHelper from '../helper/rename';
import TemplateHelper from '../helper/template';

import type { Building } from 'typings/Building';
import type { ModuleMainFunction } from 'typings/Module';
import type { Vehicle } from 'typings/Vehicle';

type CaptionedVehicle = Vehicle & { newCaption: string };
type CaptionedVehicleWithNode = CaptionedVehicle & { node: HTMLElement };

export default class BuildingShowPageObject extends PageObject {
    private readonly _currentBuilding: Building;
    private _renameableVehicles: Map<string, CaptionedVehicleWithNode> =
        new Map();
    private renameHelper?: RenameHelper;
    private exclusionHelper?: ExclusionHelper;
    private templateHelper?: TemplateHelper;

    constructor(
        protected readonly moduleParams: Parameters<ModuleMainFunction>[0]
    ) {
        super(moduleParams);

        const match = document.location.pathname.match(/^\/buildings\/(\d+)$/u);
        if (!match) throw new Error('Unknown building page');

        const buildingId = Number(match[1]);
        const currentBuilding: Building | undefined =
            this.moduleParams.LSSM.$stores.api.buildings.find(
                ({ id }) => id === buildingId
            );
        if (!currentBuilding)
            throw new Error(`Unknown building id ${buildingId}`);

        this._currentBuilding = currentBuilding;
    }

    public async init() {
        this.renameHelper = new RenameHelper(this.moduleParams);
        this.exclusionHelper = new ExclusionHelper(this.moduleParams);
        this.templateHelper = new TemplateHelper(this.moduleParams);

        await this.exclusionHelper.init();
        await this.templateHelper.init();

        await this.waitForVehiclesTable();
        await this.augmentVehiclesTable();
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
        await this.augmentTableHeader();
        await this.augmentTableRows();
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

    private async renameVehicleButtonListener(
        e: Event,
        vehicleLink: HTMLAnchorElement | null | undefined
    ) {
        const { currentTarget } = e;
        if (!(currentTarget instanceof HTMLElement)) return;

        const { vehicleId } = currentTarget.dataset;
        if (!vehicleId) return;
        const vehicle = this._renameableVehicles.get(vehicleId);
        if (!vehicle) return;

        currentTarget
            .querySelector(':scope .btn-icon')
            ?.classList.add('fa-spin');

        try {
            await this.renameHelper!.renameVehicle(
                Number(vehicleId),
                vehicle.newCaption
            );

            if (vehicleLink) vehicleLink.textContent = vehicle.newCaption;

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

    private async augmentTableRows() {
        const { $m } = this.moduleParams;

        // Rename button per vehicle
        this._renameableVehicles.forEach(vehicle => {
            const vehicleLink = vehicle.node.querySelector<HTMLAnchorElement>(
                ':scope a[href*="/vehicles/"]'
            );
            if (!vehicleLink) return null;

            // add button to rename the vehicles
            const renameButton = document.createElement('span');
            renameButton.classList.add(
                'btn',
                'btn-default',
                'btn-xs',
                'ns-action-rename'
            );
            renameButton.style.marginLeft = '0.5rem';
            renameButton.dataset.vehicleId = String(vehicle.id);
            renameButton.title = String(
                $m('action.rename', {
                    caption: vehicle.newCaption,
                })
            );

            renameButton.addEventListener('click', e =>
                this.renameVehicleButtonListener(e, vehicleLink)
            );

            const buttonIcon = document.createElement('i');
            buttonIcon.classList.add(
                'fa-solid',
                'fa-wand-magic-sparkles',
                'btn-icon'
            );

            renameButton.append(buttonIcon);
            vehicleLink.after(renameButton);
        });
    }

    private async augmentTableHeader() {
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
}
