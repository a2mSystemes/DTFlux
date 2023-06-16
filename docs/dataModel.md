# Coureur
|         | runnerID  |bib | lastName     | firstName | genderID | photoID  | clubID | mailID |
|:------: |:--------: |:--:|:--------:    |:---------:| :-------:|:-------: |:------:| :----: |
| example | 1         |25  | **FRIGOLIN** | Antoine   | 1        | 5        | 12     | 4      |

# Clubs
|         |clubID    | clubName             | clubLogoId | clubURLID | clubMailID | countryID |
| :-----: |:-------: | :-------:            | :--------: | :-------: | :--------: | :-------: |
| example | 12       | Vichy club de france | 3          | 8         | 5          | 1         |


# URL
|         | urlID | urlWidget | urlRaw                           | 
| :-----: | :---: | :-------: | :----:                           |
| example | 1     | img       | ./img/FragoulinAntoine.jpg       |
| example | 2     | mov       | http://redbull.com/media/pub.mp4 |
| example | 3     | img       | http://vichy-c-f.fr/logo/vcf.png |
| example | 4     | mail      | mailto://antoin@gmail.com        |
| example | 5     | mail      | mailto://vcf@wanado.fr           |
| example | 6     | img       | ./img/drapeaus/France.png        |
| example | 7     | img       | ./img/drapeaus/Suisse.png        |
| example | 8     | link      | http://vichy-c-f.fr              |


# Countries

|         | countryID | countryName | countryFlagID |
| :----:  | :-------: | :---------: | :-----------: |
| example | 1         | France      | 6             |
| example | 1         | Suisse      | 7             |



# races
|         |contestID | contestName | contestLengthSwiming | contestLengthRunning |
| :-----: |:-------: | :---------: | :------------------: | :------------------: |
| example | 2        | XP          | 2400                 | 3400                 |
| example | 1        | XPS         | 1800                 | 2000                 |

# Rankings
|         |ID   |runnerID | contestID | splitID | ranking | rankingTimestamp |
|:------: |:--: |:-------:|:--------: |:------: | :------:| :--------------: |
| example | 1   | 1       |2          | 2       | 5       | 1686907039       |
| example | 2   | 1       |2          | 3       | 9       | 1686909019       |

# Splits

|         |ID   | splitName | splitLocation      |
| :-----: |:--: | :-------: |:-----------------: |
| example |2    | tapis 1   | Zone d'arivée nage |


# gaps

|         | gapID | runnerID | gapTimeID |
| :-----: |:----: | :------: |:--------: |
| example | 1     | 2        |53         |

# Timmings
|         |timeID | coureurID | contestID | rawTime | timeTypeID | timestamp |
| :-----: |:----: | :-------: | :-------: | :-----: | :--------: | :--------:|
| example | 2     | 1         | 2         | 25:00   |  2         | 140002541 |
| example | 53    | 1         | 2         | 12:00   |  3         | 140007579 |

# Timming types

|         | timeTypeID | timeName   | timeDescription   |
| :----:  | :--------: | :------:   | :--------------:  |
| example | 1          | Natation   | Nage de 6 km      |
| example | 2          | transition | sortie de l'eau   |
| example | 3          | gap        | écart avec le 1er |

# license

*this file is part of **DT-flux project***.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://github.com/a2mSystemes/DTFlux/blob/master/LICENSE>.