# Grammar for https://nearley.js.org/
# Playground: https://omrelli.ug/nearley-playground/

query -> _:? base selector:* _ filter:? {% d => ( {type: 'query', base: d[1], selector: d[2], filter: d[4]}) %}

base -> "allianceinfo"i {% single_lowercase %} | "missions"i {% single_lowercase %} | "buildings"i {% single_lowercase %} | "vehicles"i {% single_lowercase %}

base_or_relative -> base {% id %} | ".":+ {% d => d.flat().join("") %}

filter -> "WHERE"i _ (comparison | (and | or):+) {% d => d[2][0] %}

comparison -> comparison_side _ comparison_operator _ comparison_side {% d => ({type: 'comparison', operator: d[2], left: d[0], right: d[4]}) %}
comparison_side -> (base_or_relative (selector | identifier):* {% d => ({type: 'selector', base: d[0], selector: d[1]})%}) | string {% id %}| number {% id %}
comparison_operator -> ">" {% id %} | "<" {% id %} | "<=" {% id %} | ">=" {% id %} | "=" {% id %} | "!=" {% id %} | "IN"i {% id %} | "NOT IN"i {% id %}

and -> (comparison | and | or) _ "AND"i _ (comparison | and | or) {% d => ({type: 'and', left: d[0][0], right: d[4][0]}) %} | "(" and ")" {% d => d[1] %}
or -> (comparison | and | or) _ "OR"i _ (comparison | and | or) {% d => ({type: 'or', left: d[0][0], right: d[4][0]}) %} | "(" or ")" {% d => d[1] %}

selector -> prop_selector {% id %} | num_selector {% id %}

num_selector -> "[" number "]" {% d => d[1] %}
prop_selector -> "." identifier {% d => d[1] %}

string -> (["] [^"]:* ["]) {% ([s, ...args]) => {args.pop(); return args.join("")} %} | (['] [^']:* [']) {% ([s, ...args]) => {args.pop(); return args.join("")} %}
identifier -> char (char | number | "_"):* {% d => d.flat().join("") %}
char -> [A-Za-z] {% id %}
number -> [0-9]:+ {% d => parseInt(d[0].join("")).toString() %}

_ -> [\s]:+ {% function(d) { return null } %}

@{%
const single_lowercase = d => d[0].toString().toLowerCase();
%}
