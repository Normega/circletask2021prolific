// Database Functions
// saves the data to firebase

function now(){
    var now = new Date().getTime() - EXPERIMENT_START_TIME;
    return now
}


var pData = {
    StartTime: EXPERIMENT_START_TIME,
    Time: now(),        
    EventNum: 1,
    Block: "",
    TrialNum: 0,        

    //ID
    UserId: "",
    AuthId: "",
    ConsentId: "",
    ConsentStatus: false,
    
    //Participant Performance
    TrackACC: "",
    DetectACC: "",
            
    //Participant Responses
    DetectedEarly: "", //did the participant finish the trial early (for task version B)
    DetectedChange: "",
    EntrainOK: "",
    Confidence: "",
    Arousal: "",

    //Staircase Control Variables
    NumPulses: NUMBER_OF_PRACTICE_PULSES_1, //allows us to manipulate the numPulses based on prac vs. main trials
    TotalRateChange: STARTING_RATE_CHANGE,
    StepSize: STARTING_STEP_SIZE,
    ChangeType: "",
    goodcount: 0,
    badcount: 0,
    reversalCount: 0,
    hardbumper: false,
    easybumper: false,

    //MAIA QUESTIONNAIRE
    MAIA_01: "",
    MAIA_02: "",
    MAIA_03: "",
    MAIA_04: "",
    MAIA_05: "",
    MAIA_06: "",
    MAIA_07: "",
    MAIA_08: "",
    MAIA_09: "",
    MAIA_10: "",
    MAIA_11: "",
    MAIA_12: "",
    MAIA_13: "",
    MAIA_14: "",
    MAIA_15: "",
    MAIA_16: "",
    MAIA_17: "",
    MAIA_18: "",
    MAIA_19: "",
    MAIA_20: "",
    MAIA_21: "",
    MAIA_22: "",
    MAIA_23: "",
    MAIA_24: "",
    MAIA_25: "",
    MAIA_26: "",
    MAIA_27: "",
    MAIA_28: "",
    MAIA_29: "",
    MAIA_30: "",
    MAIA_31: "",
    MAIA_32: "",
    MAIA_33: "",
    MAIA_34: "",
    MAIA_35: "",
    MAIA_36: "",
    MAIA_37: "",
    MAIA_noticing: "", 
    MAIA_notdistracting: "",
    MAIA_notworrying: "",
    MAIA_attentionregulation: "",
    MAIA_emoaware: "",
    MAIA_selfreg: "",
    MAIA_bodylisten: "",
    MAIA_trusting: "",
    MAIA_total: ""
};

function saveSessionData2(blockName = ""){
    pData.Block = blockName;    
    pData.Time= now();
    firebase.database().ref('sessions/' + pData.AuthId + '/' + pData.EventNum).set(pData);
    pData.EventNum = pData.EventNum + 1;
}


function saveSummaryData() {
    var user = firebase.auth().currentUser;
    firebase.database().ref('data/' + user.uid ).push().set({
        StartTime: EXPERIMENT_START_TIME,
        Time: now(),
        UserId: userId,
        Authentation: authnum
//        practice: extractTaskData('Practice Task 1'),
//        task1: extractTaskData("Circle Task 1"),
//        quesiton1: extractTaskQuestion("Circle Task 1"),
//        task2: extractTaskData("Circle Task 2"),
//        quesiton2: extractTaskQuestion("Circle Task 2"),
//        questionnaire: extractSurveyForm('q1'),
//        endQuestions: extractSurveyForm('first'),
        
    });
}


