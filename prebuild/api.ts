import fs from 'fs';
import path from 'path';

import config from '../src/config';

import type { Schooling } from 'typings/Schooling';
import type {
    BackwardsCompatibilityVehicle,
    InternalVehicle,
} from 'typings/Vehicle';

const rootPath = path.join(__dirname, '..');
const distPath = path.join(rootPath, 'dist');
const apiPath = path.join(distPath, 'api');
const i18nPath = path.join(rootPath, 'src', 'i18n');
const distI18nPath = path.join(rootPath, 'typings', 'dist', 'src', 'i18n');

const getTSFile = async (
    sourcePath: string,
    outputPath: string
): Promise<Record<number | string, unknown>> => {
    fs.writeFileSync(
        outputPath,
        fs
            .readFileSync(sourcePath)
            .toString()
            .replace(/export default/u, 'module.exports = ')
    );

    const result = (await import(outputPath)).default;
    fs.rmSync(outputPath);
    return result;
};

export default async (): Promise<void> => {
    if (!fs.existsSync(apiPath)) fs.mkdirSync(apiPath);

    const types = [
        'schoolings',
        'vehicles',
        'vehicleCategories',
        'buildings',
        'buildingCategories',
        'small_buildings',
        'pois',
        'ranks',
    ];

    const locales = Object.keys(config.games).filter(game =>
        fs.existsSync(path.join(i18nPath, `${game}.ts`))
    );

    for (const locale of locales) {
        const outputPath = path.join(apiPath, locale);
        const jsPath = path.join(i18nPath, `${locale}.js`);
        if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

        const t = await getTSFile(
            path.join(distI18nPath, `${locale}.js`),
            jsPath
        );
        for (const type of types) {
            const typePath = path.join(distI18nPath, locale, `${type}.js`);
            if (fs.existsSync(typePath)) {
                t[type] = await getTSFile(
                    typePath,
                    path.join(i18nPath, `${type}.${locale}.js`)
                );
            }

            // This is for backwards compatibility of vehicles API
            if (type === 'vehicles') {
                t[type] = Object.fromEntries(
                    Object.entries(
                        t[type] as Record<number, InternalVehicle>
                    ).map(([id, vehicle]) => [
                        id,
                        <BackwardsCompatibilityVehicle>{
                            ...vehicle,
                            minPersonnel: vehicle.staff.min,
                            maxPersonnel: vehicle.staff.max,
                            wtank: vehicle.waterTank,
                            pumpcap: vehicle.pumpCapacity,
                            ftank: vehicle.foamTank,
                            schooling: vehicle.staff.training
                                ? Object.fromEntries(
                                      Object.entries(
                                          vehicle.staff.training
                                      ).map(([school, trainings]) => [
                                          school,
                                          Object.fromEntries(
                                              Object.entries(trainings).map(
                                                  ([key, value]) => [
                                                      (
                                                          t.schoolings as Record<
                                                              string,
                                                              Schooling[]
                                                          >
                                                      )[school]?.find(
                                                          s => s.key === key
                                                      )?.caption,
                                                      value,
                                                  ]
                                              )
                                          ),
                                      ])
                                  )
                                : null,
                        },
                    ])
                );
            }

            fs.writeFileSync(
                path.join(outputPath, `${type}.json`),
                JSON.stringify(t[type] ?? {})
            );
        }
    }
};
