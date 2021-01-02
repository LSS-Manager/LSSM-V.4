import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import { ModuleMainFunction } from 'typings/Module';
import config from '../../config';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default (LSSM => {
    if (
        !window.location.pathname.match(
            new RegExp(`/profile/${window.user_id}/?`)
        )
    )
        return;

    moment.locale(LSSM.$store.state.lang);

    const generationBtn = document.createElement('button');
    generationBtn.classList.add('btn', 'btn-default', 'pull-right');

    const btnIcon = document.createElement('i');
    btnIcon.classList.add('fas', 'fa-chart-line');
    generationBtn.appendChild(btnIcon);

    const header = document.querySelector<HTMLHeadingElement>('h1');
    if (!header) return;
    header.before(generationBtn);

    generationBtn.addEventListener('click', () => {
        pdfMake
            .createPdf({
                pageSize: 'A4',
                info: {
                    title: `LSS-Manager Report für ${window.username}`,
                    author: 'LSS-Manager',
                },
                watermark: {
                    text: 'Created by LSS-Manager',
                    opacity: 0.03,
                },
                header: {
                    columns: [
                        {
                            width: '*',
                            text: 'LSSM Status Report',
                            alignment: 'left',
                            margin: 10,
                            link: `https://lss-manager.de/docs/${LSSM.$store.state.lang}`,
                        },
                        {
                            width: '*',
                            text: window.username,
                            alignment: 'center',
                            margin: 10,
                            link: `${window.location.origin}/profile/${window.user_id}`,
                        },
                        {
                            width: '*',
                            text: moment().format('L'),
                            alignment: 'right',
                            margin: 10,
                        },
                    ],
                    columnGap: 10,
                },
                content: [
                    {
                        toc: {
                            numberStyle: {
                                bold: true,
                            },
                        },
                        margin: [0, 0, 0, 50],
                    },
                    {
                        text: 'Spielerinfos',
                        style: 'h1',
                        tocItem: true,
                    },
                    {
                        text: 'Fahrzeuge',
                        style: 'h1',
                        tocItem: true,
                    },
                    {
                        text: 'Gebäude',
                        style: 'h1',
                        tocItem: true,
                        tocMargin: [10, 0],
                    },
                    {
                        text: 'Dokumenteninfos',
                        style: 'h1',
                        tocItem: true,
                    },
                ],
                footer: (currentPage, pageCount) => ({
                    columns: [
                        {
                            width: '*',
                            text: 'LSS-Manager',
                            alignment: 'left',
                            margin: 10,
                            link: 'https://lss-manager.de',
                        },
                        {
                            width: '*',
                            text: config.games[LSSM.$store.state.lang].name,
                            alignment: 'center',
                            margin: 10,
                            link: window.location.origin,
                        },
                        {
                            width: '*',
                            text: `${currentPage}/${pageCount}`,
                            alignment: 'right',
                            margin: 10,
                        },
                    ],
                }),
                defaultStyle: {
                    fontSize: 12,
                },
                styles: {
                    h1: {
                        bold: true,
                        fontSize: 15,
                    },
                },
            })
            .open();
    });
}) as ModuleMainFunction;
