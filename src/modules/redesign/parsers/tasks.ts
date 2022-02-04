import { RedesignParser } from 'typings/modules/Redesign';

interface Task {
    name: string;
    reward: string;
    id: number;
    countdown: number;
    progress: number;
    total: number;
    category: string;
    isCollectionTask: boolean;
}

export interface TasksWindow {
    tasks: Task[];
}

export default <RedesignParser<TasksWindow>>(({ doc, $sm }) => ({
    tasks: Array.from(doc.querySelectorAll<HTMLDivElement>('.task_panel')).map(
        task => {
            const name =
                task
                    .querySelector<HTMLSpanElement>('.task_name')
                    ?.textContent?.trim() ?? '';
            const isCollectionTask = !/^\[.*?]/.test(name);
            const category =
                name.match(/(?<=^\[).*?(?=])/)?.[0] ??
                name.match(
                    new RegExp($sm('collectionTaskText').toString())
                )?.[1] ??
                '';
            const countdownEl = task.querySelector<HTMLSpanElement>(
                '[id^="task_countdown_"]'
            );
            const id = parseInt(countdownEl?.id.split('_')[2] ?? '-1');
            const countdown = parseInt(
                countdownEl
                    ?.querySelector('script')
                    ?.textContent?.match(
                        new RegExp(
                            `(?<=taskCountdown\\(\\s*)\\d+(?=,\\s*${id}\\))`
                        )
                    )?.[0] ?? '-1'
            );
            const [progress, total] = task
                .querySelector('.task_body .progress_value')
                ?.textContent?.trim()
                .split('/')
                .map(v => parseInt(v.trim())) ?? [0, 0];
            const reward =
                task
                    .querySelector('.panel-heading div:nth-child(2)')
                    ?.textContent?.trim() ?? '';
            return {
                name,
                reward,
                id,
                countdown,
                progress,
                total,
                category,
                isCollectionTask,
            };
        }
    ),
}));
