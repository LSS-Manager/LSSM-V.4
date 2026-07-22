# Alliance member list

This module enhances the alliance member list with local sorting and filters for member roles and activity.

## Usage

1. Open the alliance member list.
2. Select **Load all member pages** to combine the complete paginated list.
3. Filter members by role or online state, or sort the combined list by name, role, or activity.

The existing coloured activity icon remains visible for every member. The module treats the green icon as online and the remaining known icon colours as offline.

::: warning Requests
Loading the complete list performs one authenticated, same-origin request for each remaining member page. Pages are loaded sequentially to avoid sending a burst of requests to the game server.
:::
