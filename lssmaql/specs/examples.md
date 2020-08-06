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
allianceinfo.users WHERE 'Admin' IN .roles
```
***

**all alliance members that do have less roles than the alliance's rank is**
```
allianceinfo.users WHERE len(.roles) < allianceinfo.rank
```

***

**all buildings that are small stations**
```
buildings WHERE .small_building
```

***

**all buildings THW-Buildings that have Expansion "Fachgruppe Räumen" disabled**
```
buildings WHERE .building_type = 9 AND (.extensions WHERE .type_id = 2)[0].disabled
```

***

**sum of personal in all buildings that have more than 3 vehicles**
```
sum((buildings WHERE len(vehicles WHERE .building_id = ..id) > 3).personal_count)
```

***

**all small fire stations with both expansions "Abrollbehälter-Stellplatz" available and enabled that have more than 1 but less than 4 vehicles in status 3**
```
buildings WHERE .building_type = 20 AND len(.extensions WHERE .enabled AND .available) = 2 AND 1 < len(vehicles WHERE .building_id = ..id AND .fms_show = 3) < 4
```

***

**all missions that require more Rüstwagen than Löschfahrzeuge**
```
missions WHERE .heavy_rescue_vehicles > .firetrucks
```
