class Race{
    constructor(opts){
        this.raceType = "XP";
        this.raceCategory = "H"; //"H" | "F" | "R"
        this.raceStep = new this.RaceStep("XPS H");
        this.raceStepTimeCurrent = this.raceStepGetCurrentTimeAction();
        this.raceStartTime = new Date("16h00");
        this.raceRunners = Runner.constructRunners(opts);
    }
}

class Runner{
    static constructRunners(opts) {
        let ret = [];
        for (const item in opts){
            ret.append(new Runner(item));
        }
        return ret;
    }
    constructor(opts){
        this.runnerGender = opts.Gender; //"H" | "F" | "R"
        this.runnerFirstName = opts.Firstname;    
        this.runnerLastName = opts.Lastname;
        this.runnerBib = opts.Bib;    
        this.runnerClub = opts.Club;
        this.runnerResults = new runnerResults();
        this.runnerPhoto = ""; // Photo Href
    }
}

class RunnerResults{
    constructor(opts){
        var ret = [];
        for(const splits in opts.splits){
            ret.append(new RunnerResult());
        }
        return ret;
    }
}


class RunnerResult{
    constructor(opts){
        this.resultTime = "20:00"; 
        this.resultRank = 2; 
        this.resultGap = "+01:00"; // if empty not computed if "-" first time
    }
}

class RaceStep{
    constructor(opts){
        this.stepName = "Peta"; ///"Peta" | "kilo" etc
        this.stepTime = StepTime.getStepTime("XPS");
        this.stepTimeCurrent = 0;
    }
    raceStepGetCurrentTimeAction(){
        return this.stepTime[this.stepTimeCurrent];
    }
    nextStep(params) {
        this.stepTimeCurrent++;
    }
}

class StepTime{
    static getStepTime(raceType){
        if(raceType === "XPS"){
            return [
                new StepTime(40,0), 
                new StepTime(35,5),
                new StepTime(30,10),
                new StepTime(25,15),
                new StepTime(0,0)
            ]
        }
        if(raceType === "XP H"){
            return [
                new StepTime(40,0), 
                new StepTime(35,5),
                new StepTime(30,10),
                new StepTime(25,15),
                new StepTime(0,0)
            ]
        }
        if(raceType === "XP F"){
            return [
                new StepTime(40,0), 
                new StepTime(35,5),
                new StepTime(30,10),
                new StepTime(25,15),
                new StepTime(0,0)
            ]
        }

    }
    constructor(opts){
        this.race = 0;
        this.break = 0;
    }
}

class Chrono{

    constructor(opts){
        this.startTime = new Date("17h00");
        this.stopAtEnd = true;
        this.mode = COUNTER_MODE.DOWN;
        this.value = 0;
        this.duration = 0;
        this._interval = 0;
        this.actions = new ChronoActions();
    }

    start(){
        if (this.mode == COUNTER_MODE.DOWN){
            this.value = this.duration;
        }
        this._interval = setInterval(() => {
            this.update();
        },1000);

    }

    stop(){
        clearInterval(this._interval);
    }

    update(){
        if(this.mode == COUNTER_MODE.DOWN){
            if(this.value > 0){
                this.value--;
            }else{
                this.value = 0;
            }
        }else{
            if(!this.stopAtEnd){
                this.value++;
                return;
            }
            if(this.value > this.duration){
                this.stop();
            }else{
                this.value++;
            }
        }
        this.actions.execute();

    }

    draw(){
     return this.format();   
    }

    format(opts){
        return this.value.toString();
    }
}


class ChronoActions{
    constructor(opts){
        this.actions = [];
        for(var action in opts.actions){
            ret.append(action);
        }
        return ret;
    }

    execute(){
        for (var action in this.actions){
            this.execute();
        }
    }
    addAction(action){
        this.actions.push(action);
    }
    removeAction(actionName){
        var i = 0;
        for(var action in this.actions){
            if (action.name == actionName){
                this.actions.splice(i, 1);
            }
            i++;
        }
    }
}


class ChronoActionIface{
    constructor(opts){
        this.name; // string
        this.timerValue; // int
        this.run; // boolean
        this.func; // function reference
        this.data; // object
    }
    
    execute(){
        this.func(this.data);
    }
}


class LaunchVideoAction extends ChronoActionIface{

}


const COUNTER_MODE = {
    "UP" : 0,
    "DOWN" : 1
}