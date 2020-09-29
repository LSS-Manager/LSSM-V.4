**allianceinfo**
```
allianceinfo
```

***

**Number of alliance members**
```
allianceinfo.user_count
```
***

**All alliance Admins**
```
allianceinfo.users WHERE 'Verbands-Admin' IN .roles
```
***

**all alliance members that do have less roles than the alliance's rank is**
```
allianceinfo.users WHERE len(.roles) < allianceinfo.rank
```

***

**all buildings that are small stations**
```
buildings WHERE .small_building = true
```

***

**all THW-Buildings that have Expansion "Fachgruppe Räumen" disabled**
```
buildings WHERE .building_type = 9 AND (.extensions WHERE .type_id = 2)[0].disabled = true
```

***

**sum of personal in all buildings that have more than 3 vehicles**
```
sum((buildings WHERE len(vehicles WHERE .building_id = ..id) > 3).personal_count)
```

***

**all small fire stations with both expansions "Abrollbehälter-Stellplatz" available and enabled that have more than 1 but less than 4 vehicles in status 3**
```
buildings WHERE .building_type = 18 AND len(.extensions WHERE .enabled = true AND .available = true) = 2 AND len(vehicles WHERE .building_id = ..id AND .fms_show = 3) > 1 AND len(vehicles WHERE .building_id = ..id AND .fms_show = 3) < 4
```

***

**all missions that require more Rüstwagen than Löschfahrzeuge**
```
missions WHERE .requirements.heavy_rescue_vehicles > .requirements.firetrucks
```

***

**all buildings that have free parking lots**
```
buildings WHERE len(vehicles WHERE .building_id = ..id) < .level
```

***

**all buildings that have minimum one disabled extension**
```
buildings WHERE len(.extensions WHERE .disabled) >= 1
```

***

**all police stations that are not on max level**
```
buildings WHERE (.building_type = 6 AND .level < 14) OR (.building_type = 19 AND .level < 5)
```

***

**all THW-Buildings that do have less MzKw than with current expansion states possible**
```
buildings WHERE .building_type = 9 AND len(.extensions WHERE (.type_id = 0 OR .type_id = 5) AND .available = true) > len(vehicles WHERE .vehicle_type = 41 AND .building_id = ..id)
```
