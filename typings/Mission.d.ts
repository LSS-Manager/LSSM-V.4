interface Additional {
    expansion_missions_ids?: number[];
    expansion_missions_names?: {
        [id: number]: string;
    };
    followup_missions_ids?: number[];
    followup_missions_names?: {
        [id: number]: string;
    };
    subsequent_missions_ids?: number[];
    subsequent_missions_names?: {
        [id: number]: string;
    };
    allow_drone_instead_of_investigation?: boolean;
    allow_rw_instead_of_lf?: boolean;
    only_alliance_mission?: boolean;
    max_possible_prisoners?: number;
    allow_arff_instead_of_lf?: boolean;
    need_helicopter_bucket_only_if_present?: boolean;

    // Guard missions
    duration?: number;
    duration_text?: string;
    guard_mission?: boolean;

    // Personnel
    average_min_police_personnel?: number;
    average_min_fire_personnel?: number;
    swat_personnel?: number;
    height_rescue_personnel?: number;
    personnel_educations?: {
        // currently fr_FR only
        [education: string]: number;
    };

    // Patients
    patient_specializations?: string;
    all_patient_specializations?: string[];
    patient_at_end_of_mission?: boolean;
    possible_patient_min?: number;
    possible_patient?: number;
    allow_ktw_instead_of_rtw?: boolean;
    patient_allow_first_responder_chance?: number;
    patient_uk_code_possible?: string[]; // en_GB only
    patient_us_code_possible?: string[]; // en_US only
    patient_it_code_possible?: string[]; // it_IT only

    // General:
    [key: string]:
        | number
        | number[]
        | boolean
        | string
        | string[]
        | {
              [key: string]: number;
          }
        | {
              [key: number]: string;
          }
        | undefined;
}

interface Chances {
    firetrucks?: number; // de_DE: (H/T)LF
    platform_trucks?: number; // de_DE: DLK / TM 50
    battalion_chief_vehicles?: number; // de_DE: ELW 1
    heavy_rescue_vehicles?: number; // de_DE: RW / HLF
    mobile_command_vehicles?: number; // de_DE: ELW 2
    mobile_air_vehicles?: number; // de_DE: GW-Atem
    water_tankers?: number; // de_DE: Schlauchwagen
    gwoil?: number; // de_DE: GW-Öl
    gwmess?: number; // de_DE: GW-Mes
    hazmat_dekon?: number; // de_DE: Dekon-P
    hazmat_vehicles?: number; // de_DE: GW-Gefahrgut
    police_cars?: number; // de_DE: FuStW
    fwk?: number;
    height_rescue_units?: number; // de_DE: Höhenrettung
    diver_units?: number; // de_DE: Taucher
    rettungstreppe?: number;
    kdow_orgl?: number;
    elw3?: number;
    ovdp?: number;
    boats?: number; // de_DE: Boote
    elw_airport?: number;

    // Patients
    nef?: number;
    helicopter?: number; // de_DE: RTH
    patient_transport?: number;
    patient_other_treatment?: number; // de_DE: Tragehilfe
    patient_critical_care?: number; // en_GB, nb_NO only

    // General:
    [key: string]: number | undefined;
}

interface Prerequisites {
    fire_stations?: number;
    max_police_stations?: number;
    rescue_stations?: number;
    police_stations?: number;
    max_rescue_stations?: number;
    thw?: number;
    bereitschaftspolizei?: number;
    police_helicopter_stations?: number;
    wasserrettung?: number;
    mek?: number;
    sek?: number;
    werkfeuerwehr?: number;
    rescue_dog_units?: number;

    // General:
    [key: string]: number | undefined;
}

interface Requirements {
    firetrucks?: number; // de_DE: (H/T)LF
    platform_trucks?: number; // de_DE: DLK / TM 50
    water_needed?: number; // de_DE: Wasserbedarf
    battalion_chief_vehicles?: number; // de_DE: ELW 1
    heavy_rescue_vehicles?: number; // de_DE: RW / HLF
    mobile_command_vehicles?: number; // de_DE: ELW 2
    mobile_air_vehicles?: number; // de_DE: GW-Atem
    water_tankers?: number; // de_DE: Schlauchwagen
    gwoil?: number; // de_DE: GW-Öl
    gwmess?: number; // de_DE: GW-Mes
    hazmat_dekon?: number; // de_DE: Dekon-P
    hazmat_vehicles?: number; // de_DE: GW-Gefahrgut
    police_cars?: number; // de_DE: FuStW
    height_rescue_units?: number; // de_DE: Höhenrettung
    fwk?: number; // de_DE: FwK
    thw_brmg_r?: number; // de_DE: Brmg R
    thw_gkw?: number; // de_DE: GKW
    thw_lkw?: number; // de_DE: LKW K 9
    thw_mtwtz?: number; // de_DE: MTW-TZ
    thw_mzkw?: number; // de_DE: MzKW
    thw_dle?: number; // de_DE: Anh DLE
    grukw?: number; // de_DE: GruKw
    lebefkw?: number; // de_DE: leBefKw
    gefkw?: number; // de_DE: GefKw
    fukw?: number; // de_DE: FüKw
    ambulances?: number; // de_DE: RTW oder KTW oder KTW-B
    gw_san?: number; // de_DE: GW-San
    police_helicopters?: number; // de_DE: Polizeihubschrauber
    helicopter_bucket?: number; // de_DE: Aussenbehälter
    boats?: number; // de_DE: Boote
    diver_units?: number; // de_DE: Taucher
    wasserwerfer?: number; // de_DE: WaWe
    arff?: number; // de_DE: FLF
    rettungstreppe?: number; // de_DE: Rettungstreppe
    mek?: number; // de_DE: MEK-Fahrzeuge
    sek?: number; // de_DE: SEK-Fahrzeuge
    gw_werkfeuerwehr?: number; // de_DE: GW-Werkfeuerwehr
    teleskopmast?: number; // de_DE: Teleskopmasten
    turboloescher?: number; // de_DE: Turbolöscher
    ulf?: number; // de_DE: ULF mit Löscharm
    rescue_dog_units?: number; // de_DE: Rettungshundefahrzeuge oder Anh. Hund
    kdow_orgl?: number;
    k9?: number;
    elw3?: number;
    spokesman?: number;
    ovdp?: number;
    elw_airport?: number;
    hondengeleider?: number;
    at_c?: number;
    at_m?: number;
    at_o?: number;

    // General:
    [key: string]: number | undefined;
}

export interface Mission {
    id: number;
    name: string;
    place: string;
    average_credits?: number;
    generated_by: string;
    icons: string[3];
    requirements: Requirements; // What is needed at scene (vehicles)
    chances: Chances; // What is the chance for a need at scene?
    additional: Additional; // Any further information on this mission-type
    prerequisites: Prerequisites; // What is needed for the mission to be generated?
}
