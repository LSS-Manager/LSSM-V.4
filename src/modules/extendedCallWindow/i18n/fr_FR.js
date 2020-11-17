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
        selected: 'Séléctionné',
        vehiclesByRequirement: {
            [/^fourgon(s)? d’incendie$/]: [0, 1, 12, 13],
            [/^Moyen(s)? Elévateur(s)? Aérien(s)?$/]: [2, 15],
            [/^chef(s)? de groupe$/]: [3],
            [/^Véhicule(s)? de secours routier$/]: [4],
            [/^UMH$/]: [5],
            [/^camion(s)?-citerne(s)?$/]: [6],
            [/^véhicule(s)? risque(s)? technologique(s)?$/]: [7],
            [/^voiture de patrouille$/]: [8],
            [/^Dragon(s)?$/]: [9],
            [/^Véhicule d'Assistance Respiratoire$/]: [10],
            [/^véhicule(s)? poste de commandement$/]: [11],
            [/^VGRIMP$/]: [14],
            [/^VPL?$/]: [16],
            [/^BLS?$/]: [16],
            [/^Choucas$/]: [18],
            [/^unité(s)? cynophile(s)?$/]: [19],
            [/^Unité(s)? motocycliste(s)?$/]: [20],
        },
    },
    tailoredTabs: {
        allTab: 'Tout',
        occupiedTab: 'Poursuivre',
    },
    hideVehicleList: {
        show: 'Afficher la liste des véhicules',
        hide: 'Cacher la liste des véhicules',
    },
};
