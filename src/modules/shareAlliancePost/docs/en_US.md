Many users love to share missions with their alliance and also post an incident note for informing alliance members.

This module allows you to alarm, share and post with a single click! You can set templates for incident notes in settings, therefore we do support some variables:

## Variables

### Credits

<variable variable="credits"/> is replaced by the average credits, the mission rewards.

### Address

<variable variable="address"/> is replaced by the complete missions address.

You can use <variable variable="city"/> to insert postcode and city name only.

To also omit postcode/zipcode, simply use <variable variable="cityWithoutZip"/>.

### Remaining

<variable variable="remaining"/> is replaced by the vehicles that are still required for this mission. It mirrors exactly the text in the red "Needed vehicles" box.

**Only available in mission window** is <variable variable="remainingSpecial"/>, which takes the driving and selected vehicles in account. In the missions list, the text of the red box is used without any adjustments.

### Patients

<variable variable="patients"/> is replaced by the amount of patients currently at the mission.

### Start of a planned mission

<variable variable="beginAt"/> is replaced by the time, a planned mission will start at.

### Name of a mission

<variable variable="name"/> is replaced by the name of a mission.

### Longest drive

<variable variable="longestDrive"/> is replaced by how long it takes till all selected vehicles are at scene. **Important**: This Variable is of course not available when sharing in the mission list!

### Date

<variable variable="today"/> is replaced by the current locale date (day and month).

Similarly, <variable variable="tomorrow"/> outputs tomorrow's date (day and month).

### Times

You can also set time distances to now. The system is a bit complicated, so read carefully:

<variable variable="now+5"/> adds exactly 5 hours to now, <variable variable="now+5.5"/> adds 5 hours and 30 minutes. You may use any number to add.

Also, you can choose to round up or down. To round up to each quarter-hour, just append a `r15`, to round down, just append `r-15`. You can use any number between `0` and `59`.

Example: If you want to do "in 7 hours and 22.5 minutes, but round down to a minute divisible by 3", just use <variable variable="now+7.266r-3"/>.

If you don't understand the system or need help, you may always reach out our [Support](../../support.md).
