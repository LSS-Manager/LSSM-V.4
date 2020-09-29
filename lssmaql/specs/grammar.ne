# Grammar for https://nearley.js.org/
# Playground: https://omrelli.ug/nearley-playground/

main -> query {% id %}

query_by_base[BASE] -> _:? $BASE selector:* filter_with_whitespace:? {% d => ( {type: 'query', base: d[1][0], selector: d[2], filter: d[3]}) %}

query -> query_by_base[base] {% id %}

base -> "allianceinfo"i {% single_lowercase %} | "missions"i {% single_lowercase %} | "buildings"i {% single_lowercase %} | "vehicles"i {% single_lowercase %}

base_or_relative -> base {% id %} | ".":* {% d => d %}

filter_with_whitespace -> _ filter {% d => d[1] %}

filter -> "WHERE"i _ (comparison | (and | or):+) {% d => Array.isArray(d[2][0]) ? d[2][0][0][0] : d[2][0] %}

comparison -> comparison_side _ comparison_operator _ comparison_side {% d => ({type: 'comparison', operator: d[2], left: d[0], right: d[4]}) %}
comparison_side -> base_or_relative selector:* {% d => ({type: 'selector', base: [...d[0]].flat().join(""), selector: d[1]})%} | string {% id %} | number {% id %} | function_call {% id %} | boolean {% id %}
comparison_operator -> ">" {% id %} | "<" {% id %} | "<=" {% id %} | ">=" {% id %} | "=" {% id %} | "!=" {% id %} | "IN"i {% single_lowercase %} | "NOT IN"i {% single_lowercase %}

and -> (comparison | and | or | function_call) _ "AND"i _ (comparison | and | or | function_call) {% d => ({type: 'and', left: d[0][0], right: d[4][0]}) %} | "(" and ")" {% d => d[1] %}
or -> (comparison | and | or | function_call) _ "OR"i _ (comparison | and | or | function_call) {% d => ({type: 'or', left: d[0][0], right: d[4][0]}) %} | "(" or ")" {% d => d[1] %}

function_call -> function "(" query_by_base[base_or_relative] ")" {% d => ({type: 'function', function: d[0], parameter: d[2]})%}
function -> "len" {% id %} | "sum" {% id %} | "min" {% id %} | "max" {% id %}

selector -> prop_selector {% id %} | num_selector {% id %}

num_selector -> "[" number "]" {% d => parseInt(d[1]) %}
prop_selector -> "." identifier {% d => d[1] %}

string -> ["] [^"]:* ["] {% ([_, s]) => s.join("") %} | ['] [^']:* ['] {% ([_, s]) => s.join("") %}
identifier -> char (char | number | "_"):* {% d => d.flat().join("") %}
char -> [A-Za-z] {% id %}
number -> [0-9]:+ {% d => parseInt(d[0].join("")).toString() %}
boolean -> "true" {% id %} | "false" {% id %}

_ -> [\s]:+ {% function(d) { return null } %}

@{%
const single_lowercase = d => d[0].toString().toLowerCase();
%}
