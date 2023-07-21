import type { RedesignParser } from 'typings/modules/Redesign';

interface Task {
    name: string;
    reward: string;
    id: number;
    progressId: number;
    countdown: number;
    progress: number;
    total: number;
    category: string;
    isCollectionTask: boolean;
    hasNextTask: boolean;
    claimConfirmation: string | false;
    isPremiumTask: boolean;
}

export interface TasksWindow {
    tasks: Task[];
}

export default <RedesignParser<TasksWindow>>(({ LSSM, doc, $sm }) => ({
    tasks: Array.from(doc.querySelectorAll<HTMLDivElement>('.task_panel')).map(
        task => {
            const name =
                task
                    .querySelector<HTMLSpanElement>('.task_name')
                    ?.textContent?.trim() ?? '';
            const isCollectionTask = !/^\[.*?\]/u.test(name);
            const category =
                name.match(/(?<=^\[).*?(?=\])/u)?.[0] ??
                name.match(
                    new RegExp($sm('collectionTasks.taskName').toString(), 'u')
                )?.[1] ??
                name.match(/(?<=").*?(?=")/u)?.[0] ??
                '🥴';
            const progressId = parseInt(
                new URL(
                    task.querySelector<HTMLFormElement>('form')?.action ?? '',
                    window.location.origin
                ).searchParams.get('task_progress_id') ?? '-1'
            );
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
                .map(v => LSSM.$utils.getNumberFromText(v.trim())) ?? [0, 0];
            const reward =
                task
                    .querySelector('.panel-heading div:nth-child(2)')
                    ?.textContent?.trim() ?? '';
            const claimConfirmation =
                task.querySelector<HTMLInputElement>(
                    'form input[type="submit"]'
                )?.dataset.confirm ?? false;
            return {
                name,
                reward,
                progressId,
                id,
                countdown,
                progress,
                total,
                category,
                isCollectionTask,
                hasNextTask: !!task.querySelector<HTMLDivElement>('.next_task'),
                claimConfirmation,
                isPremiumTask:
                    !!task.querySelector<HTMLImageElement>(
                        '.task-premium-icon'
                    ),
            };
        }
    ),
}));
