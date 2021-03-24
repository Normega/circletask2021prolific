var entrain_reminder = {
    type: "html-keyboard-response",
    stimulus: "<p>Were you able to match your breath to the circle?</p>",
    choices: ["y", "n"],
    prompt: "<p>Y - Yes. <br/>  N - No. </p>",
    on_finish: function(data){        
        pData.EntrainOK = jsPsych.pluginAPI.compareKeys(data.response, 'y');     
    }
}

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>'+
             "<p>Get Ready</p>",
    choices: jsPsych.NO_KEYS,
    trial_duration: 2500,
  };

var confidencerating={
    type: 'html-slider-response',
    min: 0,
    max: 50,
    slider_start: 25,
    require_movement: true,    
    stimulus: "<p class='image'><img src='/assets/confrating.jpg' style='width:800px;height:160px;' /></p>",
    labels: ['Not Confident', 'Very Confident'],
    prompt: "<p><b>How confident are you in your response?</b><br>"+
            "Move the slider with the arrow keys and press spacebar to continue</p>",
    post_trial_gap: 500,
    on_finish: function(data){
        pData.Confidence = data.response;
        //saveSessionData2(pData.Block + "_Confidence");        
    },
};

var arousalrating={
    type: 'html-slider-response',
    min: 0,
    max: 50,
    slider_start: 25,
    require_movement: true,    
    stimulus: "<p class='image'><img src='/assets/arousalrating.jpg' style='width:800px;height:160px;' /></p>",
    labels: ['Low Arousal', 'High Arousal'],
    prompt: "<p><b>How much arousal do you feel in your body right now?</b><br>"+
            "Move the slider with the arrow keys and press spacebar to continue</p>",
    post_trial_gap: 500,
    on_finish: function(data){
        pData.Arousal = data.response;
        //saveSessionData2(pData.Block + "_Arousal");        
    },
};

var detectchange = {
    type: "html-keyboard-response",
        stimulus: "<p class='image'><img  style='width:500px; height:500px;' src='/assets/Feedback.jpg' /></p>",
        choices: ['ArrowLeft','ArrowRight','ArrowUp'],
        prompt: "",
        data: { 
            Block: "Change Detect", 
            trialNumber: pData.TrialNum
        },
        post_trial_gap: 500,
        on_finish: function (data) {
            correctKey = getCorrect(pData.ChangeType);
            pData.DetectACC = jsPsych.pluginAPI.compareKeys(data.response, correctKey);
            
            if (!pData.DetectACC & pData.Block == "Practice2"){
                repeatneeded=true;
            }               
            
            //saveSessionData2(data.Block + "_Detect");
        },        
};

//Breath Entraining Trial Construction
var breathEntrain = {
    type: "breath-entraining",
    trialNumber: function () {         // function needed to return dynamic value of trialNumber
        pData.TrialNum++;
        return pData.TrialNum;
    },    
    stimulus:
        "<canvas id='myCanvas' width='800' height='500'></canvas>" +
        "<p id='prompt' style='text-align:center;font-weight:bold;'></p>",
    post_trial_gap: 1000,
    response_ends_trial: false,
    numberOfPulses: NUMBER_OF_ENTRAIN_PULSES,
    on_load: function(){saveSessionData2("Entrain_Begin");},
    on_finish: function(){saveSessionData2("Entrain_Complete");}
};


//Circle Task 1 Trial Construction
var circleTask1 = {
    type: "circle-task1",
    trialNumber: function () { // function needed to return dynamic value of trialNumber
        pData.TrialNum++;
        return pData.TrialNum;
    },
    stimulus:
        "<canvas id='myCanvas' width='800' height='500'></canvas>" +
        "<p id='prompt' style='text-align:center;font-weight:bold;'></p>",
        choices: ['ArrowUp', 'ArrowDown'], //up or down 38 40
    post_trial_gap: 500,
    response_ends_trial: false,
    step: function () {        
        // function needed to return dynamic value of step (allows it to change from initial value)   
        return pData.StepSize;
    },
    totalRateChange: function() {
        // to update rate change
        return pData.TotalRateChange;            
    },
    numberOfPulses: function() { return pData.NumPulses;},
    speed: function(){                
        return pData.ChangeType;
    },
    on_load: function(){   
        resetLogVars();
        //saveSessionData2(pData.Block + "_Begin");
    },
    on_finish: function(data){
        pData.TrackACC = data.accuracy;
        if(pData.TrackACC < CRIT_TRACK_ACC){
            repeatneeded = true;         
        } else {
            repeatneeded = false;            
        }
        //saveSessionData2(pData.Block);
    }
};


//Circle Task 2 Trial Construction
var circleTask2 = {
    type: "circle-task2",
    trialNumber: function () { // function needed to return dynamic value of trialNumber        
        pData.TrialNum++;        
        return pData.TrialNum;
    },
    stimulus:
        "<canvas id='myCanvas' width='800' height='500'></canvas>" +
        "<p id='prompt' style='text-align:center;font-weight:bold;'></p>",
        choices: ['ArrowUp', 'ArrowDown', 'ArrowRight'], 
    post_trial_gap: 500,
    response_ends_trial: false,
    step: function () {
        // function needed to return dynamic value of step (allows it to change from initial value)   
        return pData.StepSize;
    },
    totalRateChange: function () {
        // to update rate change
        return pData.TotalRateChange;            
    },
    numberOfPulses: function() { return pData.NumPulses;},
    speed: function(){        
        return pData.ChangeType;
    },
    detectedChange: function(data){
        pData.DetectedChange = data.detectedChange;
        return pData.DetectedChange;
    },
    detectedEarly: function(data){
        pData.DetectedEarly = data.detectedEarly;
        return pData.DetectedEarly;
    },
    on_load: function(){   
        resetLogVars();    
        //saveSessionData2(pData.Block + "_Begin");
    },
    on_finish: function(data){
        pData.TrackACC = data.accuracy;
        pData.DetectedChange = data.detectedChange;
        pData.DetectedEarly = data.detectedEarly;
        if(pData.TrackACC < CRIT_TRACK_ACC){
            repeatneeded = true;         
        } else {
            repeatneeded = false;            
        }    
        //saveSessionData2(pData.Block);
    }
};
