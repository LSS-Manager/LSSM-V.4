/* still missing:
    max staff
    water amount
    mileage
*/
const ALWAYS_REGEX = /(?<building>(?<=<a\s+href="\/buildings\/(?<building_id>\d+)"\s+id="back_to_building">\s*).*?(?=\s*<\/a>))(?:.|\n)*?(?<previous_vehicle_id>(?<=<a\s+href="\/vehicles\/)\d+(?="\s+class="btn\s+btn-xs\s+btn-(?:default|success)">\s*<span\s+class='glyphicon\s+glyphicon-arrow-left'>))(?:.|\n)*?(?<next_vehicle_id>(?<=<a\s+href="\/vehicles\/)\d+(?="\s+class="btn\s+btn-xs\s+btn-(?:default|success)">\s*<span\s+class='glyphicon\s+glyphicon-arrow-right'>))(?:.|\n)*?(?<vehicle_name>(?<=<h1>\s*).*?(?=\s*<\/h1>))(?:.|\n)*?(?:(?<user>(?<=<img\s*.*?src="\/images\/user_(?<user_state>green|gray)\.png"(?:.|\n)*?<a href="\/profile\/(?<user_id>\d+)">\s*).*?(?=\s*<\/a>))(?:.|\n)*?)?(?<fms>(?<=<span\s+title=".*?"\s+class="building_list_fms\s+building_list_fms_\d+">\s*)\d+(?=\s*<\/span>))(?:.|\n)*?(?:(?<current_mission>(?<=<div\s+class="col-xs-6">\s*<a\s+href="\/missions\/(?<current_mission_id>\d+)">\s*).*?(?=\s*<\/a>))(?:.|\n)*?)?(?:(?<followup_mission>(?<=<h3>.*?<\/h3>\s*<ul>\s*<li>\s*<a\s+href="\/missions\/(?<followup_mission_id>\d+)">\s*).*?(?=\s*<\/a>))(?:.|\n)*?)?<\/html>/;

export default (source: string): void => {
    // TODO: Missions
    // TODO: Vehicle image
    console.log('vehicle', source.match(ALWAYS_REGEX)?.groups);
};
