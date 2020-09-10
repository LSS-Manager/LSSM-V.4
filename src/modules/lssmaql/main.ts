import { Parser, Grammar } from 'nearley';
import { ModuleMainFunction } from 'typings/Module';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import lssmaqlGrammar from '../../../lssmaql/specs/grammar.ne';

export default (LSSM => {
    const grammar = Grammar.fromCompiled(lssmaqlGrammar);
    const parser = new Parser(grammar);
    console.log(lssmaqlGrammar, grammar, parser);
    parser.feed("allianceinfo.users WHERE 'Verbands-Admin' IN .roles");
    console.log(parser.results);
    LSSM.$store.dispatch('addMenuItem', 'LSSMAQL Console').then(
        element =>
            (element.onclick = () =>
                LSSM.$modal.show(
                    () =>
                        import(
                            /* webpackChunkName: "modules/lssmaql/lssmaql" */ './lssmaql.vue'
                        ),
                    {},
                    {
                        name: 'lssmaql',
                        height: '96%',
                        width: '96%',
                    }
                ))
    );
}) as ModuleMainFunction;
