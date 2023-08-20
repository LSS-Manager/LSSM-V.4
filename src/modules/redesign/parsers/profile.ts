import { full } from 'acorn-walk';
import { type Node as AcornNode, parse } from 'acorn';

import type { BuildingMarkerAdd } from 'typings/Ingame';
import type { RedesignParser } from 'typings/modules/Redesign';

type Building = BuildingMarkerAdd;

interface Award {
    caption: string;
    image: string;
    desc: string;
}

export interface ProfileWindow {
    id: number;
    name: string;
    online: boolean;
    self: boolean;
    credits: number;
    alliance?: {
        name: string;
        id: string;
    };
    registration?: Date;
    text: string;
    image: string;
    awards: Award[];
    has_map: boolean;
    buildings: Building[];
    ignored: boolean;
    friend: boolean;
    ban: number[];
    can_alliance_ignore: boolean;
    alliance_ignored: boolean;
}

interface CallExpressionNode extends AcornNode {
    expression: {
        type: 'CallExpression';
        callee: AcornNode & { name: string };
        arguments: (AcornNode & {
            properties: (AcornNode & {
                key: { value: string };
                value:
                    | {
                          type: 'UnaryExpression';
                          operator: string;
                          argument: AcornNode & { value: number };
                      }
                    | { type: 'Literal'; value: number | string };
            })[];
        })[];
    };
}

export default <RedesignParser<ProfileWindow>>(({ LSSM, doc, href = '' }) => {
    const id = parseInt(
        new URL(href, window.location.origin).pathname.match(
            /\d+(?=\/?$)/u
        )?.[0] ?? '-1'
    );
    const self = id === window.user_id;
    const pageHeader = doc.querySelector<HTMLDivElement>('.page-header');
    const headTexts: string[] = LSSM.$utils
        .getTextNodes(
            pageHeader ?? doc,
            (n: Node) => (n.textContent?.trim() ?? '').length > 0
        )
        .map(t => t.textContent?.trim() ?? '');
    const alliance = pageHeader?.querySelector<HTMLAnchorElement>(
        'a[href^="/alliances"]'
    );
    const profileText = doc.querySelector<HTMLDivElement>(
        '#profile_text_photo'
    );
    const allianceIgnore = doc.querySelector<HTMLAnchorElement>(
        '.page-header a[href^="/allianceIgnore/"]'
    );
    return {
        id,
        name: doc.querySelector<HTMLHeadingElement>('h1')?.textContent?.trim(),
        online: !!doc.querySelector<HTMLImageElement>(
            'img[src="/images/user_green.png"]'
        ),
        self,
        credits: pageHeader?.dataset.creditsEarned
            ? parseInt(pageHeader?.dataset.creditsEarned ?? '0')
            : LSSM.$utils.getNumberFromText(headTexts[1]),
        alliance: alliance
            ? {
                  id: parseInt(
                      alliance.href.match(/\d+(?=\/?$)/u)?.[0] ?? '-1'
                  ),
                  name: alliance.textContent?.trim() ?? '',
              }
            : undefined,
        registration: self
            ? new Date(
                  doc
                      .querySelector<HTMLSpanElement>('#signup_date')
                      ?.getAttribute('data-signup-date') ?? 0
              )
            : undefined,
        text: profileText?.textContent?.trim() ?? '',
        image: profileText?.querySelector<HTMLImageElement>('img')?.src ?? '',
        awards: Array.from(
            doc.querySelectorAll(
                '#profile_awards > .grid-container > .grid-item'
            )
        ).map(award => ({
            caption:
                award
                    .querySelector<HTMLDivElement>(
                        '.grid-item-header .panel-title'
                    )
                    ?.textContent?.trim() ?? '',
            image:
                award.querySelector<HTMLImageElement>('.grid-item-img img')
                    ?.src ?? '',
            desc:
                award
                    .querySelector<HTMLDivElement>('.grid-item-text')
                    ?.textContent?.trim() ?? '',
        })),
        has_map: !!doc.querySelector<HTMLDivElement>('#profile_map'),
        buildings: Array.from(doc.scripts)
            .filter(script => script.textContent?.includes('buildingMarkerAdd'))
            .flatMap(script => {
                const tree = parse(script.textContent ?? '', {
                    ecmaVersion: 'latest',
                });

                const markerNodes: CallExpressionNode[] = [];
                full(
                    tree,
                    (node: AcornNode | CallExpressionNode) =>
                        node.type === 'ExpressionStatement' &&
                        'expression' in node &&
                        node.expression.type === 'CallExpression' &&
                        node.expression.callee.type === 'Identifier' &&
                        node.expression.callee.name === 'buildingMarkerAdd' &&
                        markerNodes.push(node)
                );

                return markerNodes.map(
                    node =>
                        Object.fromEntries(
                            node.expression.arguments[0].properties.map(
                                prop => [
                                    prop.key.value,
                                    prop.value.type === 'UnaryExpression'
                                        ? parseFloat(
                                              prop.value.operator +
                                                  prop.value.argument.value
                                          )
                                        : prop.value.value,
                                ]
                            )
                        ) as unknown as Building
                );
            }),
        ignored: !!doc.querySelector<HTMLAnchorElement>(
            'a[href^="/ignoriert/entfernen/"]'
        ),
        friend: !!doc.querySelector<HTMLAnchorElement>(
            'a[href^="/freunde/entfernen/"]'
        ),
        ban: Array.from(
            doc.querySelectorAll<HTMLAnchorElement>(
                `a[href^="/profile/${id}/chatban/"]`
            )
        ).map(option =>
            parseInt(option.href.match(/\d+(?=\/?$)/u)?.[0] ?? '-1')
        ),
        can_alliance_ignore: !!allianceIgnore,
        alliance_ignored: allianceIgnore?.href.endsWith('destroy'),
    };
});
