export default {
    amount: 'Cantidad',
    categories: {
        allianceMission: {
            regex: /^\[Alianza]/,
            title: 'Misiones Alianza',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex:
                '^%missions%( \\(Sistema de alarma antiincendios\\))?( - False Alarm)?$',
            title: 'Misiones Propias',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex:
                '^%missions%( \\(Sistema de alarma antiincendios\\))? - Cancelado$',
            title: 'Misiones Canceladas',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Vehículo comprado/,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Recompensa diaria/,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Edificio construido|Solicitar devolución$|Building demolished without refund)/,
            title: 'Edificio construido/devuelto',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Instalación (upgraded( \(from small .*? station\))??|construida)|Cancel:|Refund Building upgrade)/,
            title: 'Instalaciones Construidas',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Tarea ".*?"/,
            title: 'Tareas Completadas',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /Tratamiento/,
            title: 'Pacientes',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Hospital \(alianza\)/,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Policía \(alianza\)/,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Preso transportado/,
            title: 'Presos',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(education|Alliance Training Applicant)/,
            title: 'Formación',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(Attached building to Building Complex Base|Upgraded to Building Complex Base|Upgraded to Building Complex|Building Complex Base upgrade finished)/,
            title: 'Building Complex',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /False Alarm/,
            titel: 'False Alarms',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Categoría',
    title: 'Resumen',
    total: 'Total',
    others: 'Otros',
};
