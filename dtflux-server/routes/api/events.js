// ************************************************************ 
// This file is part of DT-Flux Project. 
// It is subject to the license terms in the LICENSE file found 
// in the top-level directory of this distribution 
// and at https://github.com/a2mSystemes/DTFlux/blob/master/LICENSE. 
// No part of DT-Flux Project, including this file, 
// may be copied, modified, propagated, or distributed except 
// according to the terms contained in the LICENSE file.
// ************************************************************ 


const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.status(200).json({"from": "events.js"});
});


router.post('/events',(req, res) => {

    
});

module.exports = router;