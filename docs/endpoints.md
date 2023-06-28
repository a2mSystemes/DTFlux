# DT-flux server endpoints

this document describes server endpoints.

# Server configuration

the server provide a configuration interface to set up displays and live data styling.

`/dt-api/v1/conf/`
`/dt-api/v1/conf/displays/`
`/dt-api/v1/conf/datas/`
`/dt-api/v1/conf/events/`
`/dt-api/v1/conf/auxiliaries/`

# api chrono

The server provide an endpoint for the chrono API. 

`/dt-api/v1/events/`

# Live Data display

the server provide a websocket api endpoint to access and reflect live datas.

`/displays/:displayID`

# auxilary output
the server provide an output interface to launch various commands when events occures.

### OSC

`/dt-api/v1/auxiliaries/osc/`

### UDP

`/dt-api/v1/auxiliaries/udp/`



# license

*this file is part of **DT-flux project***.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://github.com/a2mSystemes/DTFlux/blob/master/LICENSE>.