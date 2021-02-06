# /vehicles/{id}
* building
    * name
    * id
* vehicle name
* FMS
* max staff
* Water amount
* Mileage
* current mission *if assigned*
    * name
    * id
* follow-up mission *if assigned*
* icon
* id of next/previous vehicle on station

## own vehicles
* move btn `/vehicles/{id}/move`
* FMS 2/6 switch btn *if FMS 2 or FMS 6* `vehicles/{id}/fms_set/{target_fms}`
* backalarm btn *if assigned to mission*
* staff on vehicle *if len > 0*
    * name
    * schooling(s)
* edit btn `/vehicles/{id}/edit`
* stats btn `/vehicles/{id}/stats`
* staff assignment btn `/vehicles/{id}/zuweisung`
* delete btn `DELETE /vehicles/{id}` *if in FMS 2*
* list of own missions and alliance missions
    * icon
    * name
    * id
    * address
    * distance (km)
    * status bar
    * patients current & max
    * alarm btn

## vehicles of other players
* owner
    * name
    * id
    * online state

## scripts executed on load
* `vehicle_graphics: [url, url, str(bool)][]`
* `vehicle_image_reload()`
* remove FMS-Item in parent

---