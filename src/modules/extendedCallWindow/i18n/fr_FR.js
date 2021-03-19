module.exports = {
    arrCounter: {
        resetTexts: {
            counter: 'Compteur de régulations',
            highlight: 'Surbrillance régulations',
            selection: 'Séléction de véhicules',
            counter_highlight: 'Compteur de régulations / surbrillance',
            counter_selection:
                'Compteur de régulations et séléction de véhicules',
            highlight_selection:
                'Surbrillance des régulations et séléction des véhicules',
            counter_highlight_selection:
                'Compteur de régulations / bordure et séléction de véhicules',
        },
        reset: '{text} remis à zéro',
    },
    arrHover: {
        reset: 'La séléction de véhicule est mise à zéro avant !',
        headers: {
            set: 'Set',
            attribute: 'Name',
            free: 'Free',
            max: 'Max',
        },
        titles: {
            set:
                'Aussi souvent que cette combinaison est séléctionnée quand vous appuyez sur la régulation',
            attribute: 'La combinaison décrite dans cette ligne',
            free: 'Aussi souvent que cette combinaison est disponible',
            max:
                'Vous pouvez séléctionner cette régulation tant que la combinaison est disponible',
        },
        arrSpecs: {
            fire: 'Fourgons d’incendie',
            hlf_only: 'Véhicule de secours',
            elw: 'Chef de groupe',
            elw2: 'Véhicule poste de commandement',
            elw3: 'VLHR',
            dlk: 'Moyen Elévateur Aérien',
            rtw: 'Ambulance UMH',
            rw: 'Véhicule de secours routier',
            gkw: 'Véhicule Tout Usage',
            gwl2wasser: 'Camion-citerne',
            gwgefahrgut: 'Véhicules risques chimiques',
            gwhoehenrettung: 'VGRIMP',
            gwa: "Véhicule d'Assistance Respiratoire",
            fustw: 'Voiture de patrouille',
            police_motorcycle: 'Unité motocycliste',
            fustw_or_police_motorcycle:
                'Véhicule de patrouille ou Unité motocycliste',
            polizeihubschrauber: 'Hélicoptère de police',
            k9: 'Brigade canine',
            rth_only: 'Hélicoptère',
            gw_wasserrettung: 'VPL',
            boot: 'Bateaux (généraux)',
            brush_truck: 'CCF',
            brush_truck_1: 'CCFS',
            brush_truck_2: 'CCFM',
            brush_truck_3: 'CCFL',
            mzb: 'BLS',
        },
    },
    generationDate: {
        inputFormat: 'DD MMMM, HH:mm',
    },
    enhancedMissingVehicles: {
        vehicle: 'Type de véhicule',
        missing: 'Manque sur la mission',
        driving: 'En approche',
        total: 'Manquant',
        tip: {
            dragging: 'glisser la fenêtre',
            textMode: 'mode texte on/off',
            minified: 'effondrement',
            overlay: 'superposition',
            reload: 'recharger',
            pushRight:
                'afficher cette case au-dessus de la liste des véhicules',
            pushLeft: 'montrer cette boîte à la position originale',
        },
        selected: 'Séléctionné',
        vehiclesByRequirement: {
            [/^fourgon(s)? d’incendie$/]: [0, 1, 12, 13],
            [/^Moyen(s)? Élévateur(s)? Aérien(s)?$/]: [2, 15],
            [/^Chef(s)? de (g|G)roupe(s)?$/]: [3, 11, 24],
            [/^Véhicule(s)? de secours routier$/]: [4, 12],
            [/^UMH$/]: [5, 25, 28],
            [/^camion(s)?-citerne(s)?$/]: [6],
            [/^véhicule(s)? risque(s)? technologique(s)?$/]: [7],
            [/^voiture de patrouille$/]: [8],
            [/^Hélicoptères de secours?$/]: [9],
            [/^Véhicule d'Assistance Respiratoire$/]: [10],
            [/^véhicule(s)? poste de commandement$/]: [11],
            [/^Véhicule Tout Usage$/]: [13],
            [/^VGRIMP$/]: [14],
            [/^VPL?$/]: [16],
            [/^BLS?$/]: [16, 17],
            [/^VLHR?$/]: [24],
            [/^soutien aérien FAG$/]: [18],
            [/^CCF$/]: [21, 22, 23],
            [/^unité(s)? cynophile(s)?$/]: [19],
            [/^Unité(s)? motocycliste(s)?$/]: [20],
        },
    },
    tailoredTabs: {
        allTab: 'Tout',
        occupiedTab: 'Poursuivre',
        vehicleMissing: {
            title:
                "Un véhicule n'est présent dans aucun onglet | Plusieurs véhicules ne sont présents dans aucun onglet",
            text:
                'Les types de véhicules suivants ne sont présents que dans l\'onglet "Tout" :',
            hide: 'Cacher la note',
            close: "Fermer Note jusqu'au changement",
        },
    },
    hideVehicleList: {
        show: 'Afficher la liste des véhicules',
        hide: 'Cacher la liste des véhicules',
    },
};
