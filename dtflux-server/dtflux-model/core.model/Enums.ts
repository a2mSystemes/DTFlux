export enum RACE_TYPE {
    Yotta_XPS_Relais = 1,
    Yotta_XP = 2,
    Yotta_XPS = 3,
    Unknown,
  }
  
  export enum RUNNER_GENDER {
    m = "H",
    f = "F",
  }
  
  export enum PARTICIPANT_TYPE {
    Solo = 1,
    Relai = 2,
  }
  
  export enum TIMING_TYPE {
    gap,
    time,
    clock,
    chrono,
  }
  
  export enum CHRONO_DIRECTION {
    up,
    down,
  }

  export enum RUNNER_STATUS{
    REG = 0,
    DNF, //abandon
    DSQ, // disqualified
    DNS // non-starter
  }
