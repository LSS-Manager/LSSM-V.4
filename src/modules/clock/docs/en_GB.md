This module allows you to see a customisable clock within the game. There are a lot of different settings you can use in order to customise this to your liking. You can find help on configuration under [Configuration](#Configuration).

The clock can be placed in two locations:
* On the left of the navigation bar
![Clock in the Navigation Bar](navbar.png)
* As an overlay
![Clock as an Overlay Over Chat](chatOverlay.png)

The format in the above images is `DD[th] MMM YYYY LTS`.

## Configuration

This module uses [Moment.js](https://momentjs.com) to offer a large selection of configuration. If you wish to see the original documentation you can find that [here](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/).

## Variables

| Category      | Variable | Output                                          | Description                                                                                                         |
|---------------|----------|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| Month         | M        | `1`, `2`... `11`, `12`                          | The month in number format, single digit numbers are not prefixed by a 0.                                           |
|               | Mo       | `1st`, `2nd`... `11th`, `12th`                  | The month in number format followed by `st`, `nd`, `rd` and `th` accordingly.                                       |
|               | MM       | `01`, `01`... `11`, `12`                        | The month in number format, single digit numbers prefixed by a 0.                                                   |
|               | MMM      | `Jan`, `Feb`... `Nov`, `Dec`                    | The month in three letter short form.                                                                               |
|               | MMMM     | `January`, `February`... `November`, `December` | The full month name.                                                                                                |
| Quarter       | Q        | `1`, `2`, `3`, `4`                              | The quarter number, not prefixed by a 0.                                                                            |
|               | Qo       | `1st`, `2nd`, `3rd`, `4th`                      | The quarter number, followed by `st`, `nd`, `rd`, and `th` accordingly.                                             |
| Day (month)   | D        | `1`, `2`... `29`, `30`                          | The day of the month as a number, single digit numbers are not prefixed by a 0.                                     |
|               | Do       | `1st`, `2nd`... `29th`, `30th`                  | The day of the month as a number, followed by `st`, `nd`, `rd`, and `th` accordingly.                               |
|               | DD       | `01`, `02`... `29`, `30`                        | The day of the month as a number, single digit numbers are prefixed by a 0.                                         |
| Day (year)    | DDD      | `1`, `2`... `364`, `365`                        | The day of the year as a number, single digit numbers are not prefixed by a 0.                                      |
|               | DDDo     | `1st`, `2nd`, `364th`, `365th`                  | The day of the year as a number, followed by `st`, `nd`, `rd`, and `th` accordingly.                                |
|               | DDDD     | `001`, `002`... `364`, `365`                    | The day of the year as a number, single and double digit numbers prefixed by 0 to always have a three digit number. |
| Weekday       | d        | `0`, `1`, `2`, `3`, `4`, `5`, `6`               | The day of the week as a number, 0 is Sunday, 6 is Saturday                                                         |
|               | do       | `0th`, `1st`, `2nd`, `3rd`, `4th`, `5th`, `6th` | The day of the week as a number, followed by `st`, `nd`, `rd`, and `th` accordingly.                                |
|               | dd       | `Su`, `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`        | The day of the week as a two letter abbreviation of the word.                                                       |
|               | ddd      | `Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat` | The day of the week as a three letter abbreviation of the word.                                                     |
|               | dddd     | `Sunday`, `Monday`... `Friday`, `Saturday`      | The day of the week as a full word.                                                                                 |
| Calendar Week | w        | `1`, `2`... `51`, `52`                          | The week of the year, single digit numbers are not prefixed by a 0.                                                 |
|               | wo       | `1st`, `2nd`... `51st`, `52nd`                  | The week of the year, followed by `st`, `nd`, `rd`, and `th` accordingly.                                           |
|               | ww       | `01`, `02`... `51`, `52`                        | The week of the year, single digit numbers are prefixed by a 0.                                                     |
| Year          | YY       | `70`, `71`... `29`, `30`                        | The last two digits of the current year.                                                                            |
|               | YYYY     | `1970`, `1971`... `2029`, `2030`                | The full year.                                                                                                      |
| AM/PM         | A        | `AM`, `PM`                                      | Mornings `AM`, afternoons `PM` all in uppercase.                                                                    |
|               | a        | `am`, `pm`                                      | Mornings `am`, afternoons `pm` all in lowercase.                                                                    |
| Hour          | H        | `0`, `1`... `22`, `23`                          | The hour of the day as 24-hour format, single digit numbers are not prefixed by a 0.                                |
|               | HH       | `00`, `01`... `22`, `23`                        | The hour of the day as 24-hour format, single digit numbers are prefixed by a 0.                                    |
|               | h        | `1`, `2`... `11`, `12`                          | The hour of the day as 12-hour format, single digit numbers are not prefixed by a 0.                                |
|               | hh       | `01`, `02`... `11`, `12`                        | The hour of the day as 12-hour format, single digit numbers are prefixed by a 0.                                    |
| Minute        | m        | `0`, `1`... `58`, `59`                          | The current minute, single digit number are not prefixed by a 0.                                                    |
|               | mm       | `00`, `01`... `58`, `59`                        | The current minute, single digit number are prefixed by a 0.                                                        |
| Second        | s        | `0`, `1`... `58`, `59`                          | The current second, single digit number are not prefixed by a 0.                                                    |
|               | ss       | `00`, `01`... `58`, `59`                        | The current second, single digit number are prefixed by a 0.   

## Localised Formats

| Category                                   | Variable | Output                              |
|--------------------------------------------|----------|-------------------------------------|
| Time                                       | LT       | 8:30 PM                             |
| Time with seconds                          | LTS      | 8:30:25 PM                          |
| Date with leading zeros                    | L        | 30/04/2021                          |
| Date without leading zeros                 | l        | 30/4/2021                           |
| Date with month as word                    | LL       | September 4, 1986                   |
| Date with shortened month as word          | ll       | Sep 4, 1986                         |
| Date with month as word and time           | LLL      | September 4, 1986 8:30 PM           |
| Date with shortened month as word and time | lll      | Sep 4, 1986 8:30 PM                 |
| Full date with time                        | LLLL     | Thursday, September 4, 1986 8:30 PM |
| Full date in shortened form with time      | llll     | Thu, Sep 4, 1986 8:30 PM            |

## Normal Text

If you want to include other text with your clock such as `hour`, simply typing `LTS hour` will not work. That results in `11:13:27 AM 11our`. In order to include text that shouldn't be formatted, surround it in `[]`. `LTS [Hour]` or `LTS [H]our` will both result in `11:13:27 AM Hour` being displayed.
