import type { ARRCategoryColorSetting } from '../../main';
import type { ModuleMainFunction } from 'typings/Module';

export default (
    LSSM: Vue,
    colors: ARRCategoryColorSetting[],
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting']
) => {
    const theadCell = document
        .querySelector<HTMLTableRowElement>(
            '#aao_category_index_table thead tr'
        )
        ?.insertCell();

    if (!theadCell) return;

    const colorIcon = document.createElement('i');
    colorIcon.classList.add('fa-solid', 'fa-palette');
    theadCell.append(colorIcon);

    const initialBg = LSSM.$stores.root.isDarkMode ? '#505050' : '#ffffff';
    const initialColor = LSSM.$stores.root.isDarkMode ? '#ffffff' : '#337ab7';

    document
        .querySelectorAll<HTMLTableRowElement>(
            '#aao_category_index_table tbody tr'
        )
        .forEach(row => {
            const name = row.children[0].textContent?.trim() ?? '';
            const colorCell = row.insertCell();

            colorCell.style.setProperty('display', 'flex');

            let bgColor = initialBg;
            let color = initialColor;

            const preset = colors.find(
                ({ categoryName }) => categoryName === name
            );
            if (preset) {
                bgColor = preset.bgColor;
                color = preset.color;
            }

            const bgSelection = document.createElement('input');
            bgSelection.type = 'color';

            const colorSelection = bgSelection.cloneNode(
                true
            ) as HTMLInputElement;

            bgSelection.value = bgColor;
            colorSelection.value = color;

            const previewUl = document.createElement('ul');
            previewUl.classList.add('nav', 'nav-tabs');
            const previewLi = document.createElement('li');
            previewUl.append(previewLi);
            const previewA = document.createElement('a');
            previewA.textContent = name;
            previewLi.append(previewA);

            const updateColors = () => {
                previewA.style.setProperty(
                    'background-color',
                    bgSelection.value
                );
                previewA.style.setProperty('color', colorSelection.value);
            };

            bgSelection.addEventListener('change', updateColors);
            colorSelection.addEventListener('change', updateColors);

            updateColors();

            const resetBtn = document.createElement('button');
            resetBtn.classList.add('btn', 'btn-warning');
            const resetIcon = document.createElement('i');
            resetIcon.classList.add('fa-solid', 'fa-rotate-left');
            resetBtn.append(resetIcon);

            const saveBtn = document.createElement('button');
            saveBtn.classList.add('btn', 'btn-success');
            const saveIcon = document.createElement('i');
            saveIcon.classList.add('fa-solid', 'fa-floppy-disk');
            saveBtn.append(saveIcon);

            const save = () => {
                const preset = colors.find(
                    ({ categoryName }) => categoryName === name
                );
                if (preset) {
                    preset.bgColor = bgSelection.value;
                    preset.color = colorSelection.value;
                } else {
                    colors.push({
                        categoryName: name,
                        bgColor: bgSelection.value,
                        color: colorSelection.value,
                    });
                }
                setSetting('arrCategoryColors', {
                    value: colors,
                    enabled: true,
                }).then();
            };

            saveBtn.addEventListener('click', save);

            resetBtn.addEventListener('click', () => {
                bgSelection.value = initialBg;
                colorSelection.value = initialColor;
                updateColors();
                save();
            });

            colorCell.append(
                bgSelection,
                colorSelection,
                previewUl,
                resetBtn,
                saveBtn
            );
        });
};
