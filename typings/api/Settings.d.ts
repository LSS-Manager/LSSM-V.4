// The interface for `api/settings`

export interface Settings {
    alliance_mission_distance: number | null; //no limit = null
    alliance_show_not_involved_vehicle: boolean;
    route_show: boolean;
    mouse_over_disable_inactive_elements: boolean;
    lightbox_static: boolean;
    mobile_show_vehicle: boolean;
    show_vehicle: boolean;
    aao_big: boolean;
    aao_search: boolean;
    limited_vehicle_message_before_aao: boolean;
    aao_timer_show: boolean;
    poi_private: boolean;
    mission_alarmed_successfull_close_window: boolean;
    mission_expansion: boolean;
    mission_expansion_fms_5: boolean;
    follow_up_missions_enabled: boolean;
    critical_care_enabled: boolean; //Uk-Only
    disable_mission_group_1: boolean; //US-Only , Disable Earthquake Missions true/false
    patients_use_nef_count: boolean; //IT-Only?
    progress_animation: boolean;
    leitstelle_building_id: number | null;
    backalarm_automatic_rettungsdienst: boolean;
    start_view: 'map' | 'missions' | 'buildings' | 'chat' | 'radio';
    hide_faq_button: boolean;
    design_mode: number; //0=Default,1=Dark,2=Bright,3=Window Design,4=Window Design Dark
}
