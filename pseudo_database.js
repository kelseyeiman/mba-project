const fs = require('fs');

var cachedTestsFile = './cachedtests/testCache.json';

this.SaveCurrent = function (currentTestsList)
{
  fs.writeFileSync(cachedTestsFile, JSON.stringify(currentTestsList));
}

this.GetTests = function ()
{
  var contents = fs.readFileSync(cachedTestsFile, 'utf8');
  var rawTestsList = JSON.parse(contents);

  var testsList = [];
  for (var tIndex = 0; tIndex < rawTestsList.length; tIndex++)
  {
    let rawTest = rawTestsList[tIndex];
    let dataList = TestData[rawTest.type];
    let sampleCount = rawTest.numSamples || 0;
    
    let totalTestTime = 0;
    let totalFlexTime = 0;
    let stepsList = [];

    for (var sIndex = 0; sIndex < dataList.length; sIndex++)
    {
      let dataItem = dataList[sIndex];

      let fixedTime = parseInt(dataItem.fixed_time) || 0;
      let variableTime = parseInt(dataItem.variable_time) || 0;
      let stepTime = fixedTime + (variableTime * sampleCount);
      totalTestTime += stepTime;
      totalFlexTime += !!dataItem.flex_time ? stepTime : 0;

      stepsList.push({
        step_number: dataItem.step_number,
        step_description: dataItem.step_description,
        step_time: stepTime,
        step_isvariable: variableTime > 0,
        flex_time: !!dataItem.flex_time
      });
    }

    testsList.push({
      name: rawTest.name,
      type: rawTest.type,
      num_samples: sampleCount,
      total_time: totalTestTime,
      total_flextime: totalFlexTime,
      steps: stepsList
    });
  }

  return testsList;
}

this.NewTest = function (testName, sampleSize, getItemsCallback)
{
  // TODO

  getItemsCallback(result);
}

this.DeleteTest = function (testName, sampleSize, getItemsCallback)
{
  // TODO  

  getItemsCallback(result);
}

function SerializeTest(testObject)
{
  // TODO
  // We should have:
  //  - # of samples
  //  - Test type

  return jsonString;
}



var TestData = {
  Fats: JSON.parse(`[
    {"step_number" : "1" , "step_description" : "Notebook and labelling of tubes - 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : ""} , 
    {"step_number" : "2" , "step_description" : "Weighing of samples - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""} , 
    {"step_number" : "3" , "step_description" : "Preparation of internal standard - 5min" , "fixed_time" : "300" , "variable_time" : "" , "flex_time" : ""} , 
    {"step_number" : "4" , "step_description" : "Addition of internal standard - 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
    {"step_number" : "5" , "step_description" : "Addition of ethanol - 10s per sample" , "fixed_time" : "" , "variable_time" : "10" , "flex_time" : ""} , 
    {"step_number" : "6" , "step_description" : "Addition of 8N HCl - 30s per sample" , "fixed_time" : "" , "variable_time" : "30" , "flex_time" : ""} , 
    {"step_number" : "7" , "step_description" : "Digestion at 90deg C for 40 minutes" , "fixed_time" : "2400" , "variable_time" : "" , "flex_time" : "true"} , 
    {"step_number" : "8" , "step_description" : "Let samples cool down - about 10 minutes" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : "true"} , 
    {"step_number" : "9" , "step_description" : "De-cap - 5s per sample" , "fixed_time" : "" , "variable_time" : "5" , "flex_time" : ""} , 
    {"step_number" : "10" , "step_description" : "Add 6 mL of petroleum ether - 10s per sample" , "fixed_time" : "" , "variable_time" : "10" , "flex_time" : ""} , 
    {"step_number" : "11" , "step_description" : "Cap - 5s per sample" , "fixed_time" : "" , "variable_time" : "5" , "flex_time" : ""} , 
    {"step_number" : "12" , "step_description" : "Vortex - 15s per sample" , "fixed_time" : "" , "variable_time" : "15" , "flex_time" : ""} , 
    {"step_number" : "13" , "step_description" : "Centrifuge - 3000rpm for 5 min - only 8 at a time" , "fixed_time" : "300" , "variable_time" : "" , "flex_time" : "true"} , 
    {"step_number" : "14" , "step_description" : "Label new tubes - 20s per tube" , "fixed_time" : "" , "variable_time" : "20" , "flex_time" : ""} , 
    {"step_number" : "15" , "step_description" : "Extraction of organic phase - 40s per sample" , "fixed_time" : "" , "variable_time" : "40" , "flex_time" : ""} , 
    {"step_number" : "16" , "step_description" : "Evaporation - 10min - only 24 at a time" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : "true"} , 
    {"step_number" : "17" , "step_description" : "Heat water on hot plate while evaporating" , "fixed_time" : "" , "variable_time" : "" , "flex_time" : ""} , 
    {"step_number" : "18" , "step_description" : "Add 2mL 0.5N NaOH in MeOH - 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
    {"step_number" : "19" , "step_description" : "Vortex - 15s per sample" , "fixed_time" : "" , "variable_time" : "15" , "flex_time" : ""} , 
    {"step_number" : "20" , "step_description" : "Reflux for 5 minutes in hot water - 5min" , "fixed_time" : "300" , "variable_time" : "" , "flex_time" : "true"} , 
    {"step_number" : "21" , "step_description" : "Remove tubes, let sample cool down - 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : "true"} , 
    {"step_number" : "22" , "step_description" : "Add 2mL BF3 in MeOH and flush with N2 - 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
    {"step_number" : "23" , "step_description" : "Vortex - 15s per sample" , "fixed_time" : "" , "variable_time" : "15" , "flex_time" : ""} , 
    {"step_number" : "24" , "step_description" : "Reflux for 40 min in hot water - 40min" , "fixed_time" : "2400" , "variable_time" : "" , "flex_time" : "true"} , 
    {"step_number" : "25" , "step_description" : "Let sample cool down - 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : "true"} , 
    {"step_number" : "26" , "step_description" : "Add 2mL iso-octane - 10s per sample" , "fixed_time" : "" , "variable_time" : "10" , "flex_time" : ""} , 
    {"step_number" : "27" , "step_description" : "Add 5mL saturated NaCl solution - 30s per sample" , "fixed_time" : "" , "variable_time" : "30" , "flex_time" : ""} , 
    {"step_number" : "28" , "step_description" : "Vortex - 15s per sample" , "fixed_time" : "" , "variable_time" : "15" , "flex_time" : ""} , 
    {"step_number" : "29" , "step_description" : "Centrifuge - 3000rpm for 5 min - only 8 at a time" , "fixed_time" : "300" , "variable_time" : "" , "flex_time" : "true"} , 
    {"step_number" : "30" , "step_description" : "Prepare GC vial - label, syringes, caps - 20s per sample" , "fixed_time" : "" , "variable_time" : "20" , "flex_time" : ""} , 
    {"step_number" : "31" , "step_description" : "Extract samples - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""} , 
    {"step_number" : "32" , "step_description" : "Run on GC-FID - 52min per run" , "fixed_time" : "3120" , "variable_time" : "" , "flex_time" : "true"} , 
    {"step_number" : "33" , "step_description" : "Data workup - 5min per sample" , "fixed_time" : "" , "variable_time" : "300" , "flex_time" : ""}
    ]`),

  Peroxide_Value: JSON.parse(`[
    {"step_number" : "1" , "step_description" : "Prepare notebook and glassware - 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : ""} , 
    {"step_number" : "2" , "step_description" : "Weigh KI, stir - 1min" , "fixed_time" : "60" , "variable_time" : "" , "flex_time" : ""} , 
    {"step_number" : "3" , "step_description" : "Stir for 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : ""} , 
    {"step_number" : "4" , "step_description" : "Prepare titrant - 3min" , "fixed_time" : "180" , "variable_time" : "" , "flex_time" : ""} , 
    {"step_number" : "5" , "step_description" : "Weight samples - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""} , 
    {"step_number" : "6" , "step_description" : "Add 30mL Acetic acid - chloroform - 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
    {"step_number" : "7" , "step_description" : "Add 0.5mL KI solution - 10s per sample" , "fixed_time" : "" , "variable_time" : "10" , "flex_time" : ""} , 
    {"step_number" : "8" , "step_description" : "Stir for 1min - 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
    {"step_number" : "9" , "step_description" : "Add 30mL DI water and mix - 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
    {"step_number" : "10" , "step_description" : "Add 1 mL starch solution - 20s per sample" , "fixed_time" : "" , "variable_time" : "20" , "flex_time" : ""} , 
    {"step_number" : "11" , "step_description" : "Titrate - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""} , 
    {"step_number" : "12" , "step_description" : "Data entering and reporting - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""} , 
    {"step_number" : "13" , "step_description" : "Cleanup - 5min" , "fixed_time" : "" , "variable_time" : "300" , "flex_time" : ""}
    ]`),

    Water_Content: JSON.parse(`[
      {"step_number" : "1" , "step_description" : "Prepare notebook - 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "2" , "step_description" : "Prepare machine - 5min" , "fixed_time" : "300" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "3" , "step_description" : "Weigh standard/sample - 2min" , "fixed_time" : "120" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "4" , "step_description" : "Run standard/sample - 5min - not time sensitive (can leave until I have time to run another)" , "fixed_time" : "300" , "variable_time" : "" , "flex_time" : "true"} , 
      {"step_number" : "5" , "step_description" : "Cleanup - 2min" , "fixed_time" : "120" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "6" , "step_description" : "Results reporting - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""}
      ]`),

    Fat_Soluble_Vitamins: JSON.parse(`[
      {"step_number" : "1" , "step_description" : "Prepare notebook - 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "2" , "step_description" : "Weigh container - 30s per container" , "fixed_time" : "" , "variable_time" : "30" , "flex_time" : ""} , 
      {"step_number" : "3" , "step_description" : "Weigh sample - 2min/sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
      {"step_number" : "4" , "step_description" : "Prepare Solvent - 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "5" , "step_description" : "Add solvent to each sample - 1 min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
      {"step_number" : "6" , "step_description" : "Weigh container with sample and solvent - 30s per container" , "fixed_time" : "" , "variable_time" : "30" , "flex_time" : ""} , 
      {"step_number" : "7" , "step_description" : "Stir for 40 min" , "fixed_time" : "2400" , "variable_time" : "" , "flex_time" : "true"} , 
      {"step_number" : "8" , "step_description" : "Tare empty test tube - 30s per sample" , "fixed_time" : "" , "variable_time" : "30" , "flex_time" : ""} , 
      {"step_number" : "9" , "step_description" : "Take aliquot of sample - 30s per sample" , "fixed_time" : "" , "variable_time" : "30" , "flex_time" : ""} , 
      {"step_number" : "10" , "step_description" : "Weigh aliquot - 30s per sample" , "fixed_time" : "" , "variable_time" : "30" , "flex_time" : ""} , 
      {"step_number" : "11" , "step_description" : "Add internal standard - 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
      {"step_number" : "12" , "step_description" : "Add THF and Diethyl ether - 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
      {"step_number" : "13" , "step_description" : "Vortex - 15s per sample" , "fixed_time" : "" , "variable_time" : "15" , "flex_time" : ""} , 
      {"step_number" : "14" , "step_description" : "Centrifuge - 3000rpm for 5 min - only 8 at a time" , "fixed_time" : "300" , "variable_time" : "" , "flex_time" : "true"} , 
      {"step_number" : "15" , "step_description" : "Prepare GC vial - label, syringes, caps - 20s per sample" , "fixed_time" : "" , "variable_time" : "20" , "flex_time" : ""} , 
      {"step_number" : "16" , "step_description" : "Extract samples - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""} , 
      {"step_number" : "17" , "step_description" : "Prepare HPLC 20min" , "fixed_time" : "1200" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "18" , "step_description" : "Run samples - 30min per sample" , "fixed_time" : "" , "variable_time" : "1800" , "flex_time" : "true"} , 
      {"step_number" : "19" , "step_description" : "Data entering and reporting 4min per sample" , "fixed_time" : "" , "variable_time" : "240" , "flex_time" : ""}
      ]`),

    Vitamin_B12: JSON.parse(`[
      {"step_number" : "1" , "step_description" : "Notebook and labelling of tubes - 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "2" , "step_description" : "Weighing of samples - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""} , 
      {"step_number" : "3" , "step_description" : "Preparation of standard - 5min" , "fixed_time" : "300" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "4" , "step_description" : "Addition of solvent - 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
      {"step_number" : "5" , "step_description" : "Mix and sonication 15min" , "fixed_time" : "900" , "variable_time" : "" , "flex_time" : "true"} , 
      {"step_number" : "6" , "step_description" : "Preparation of HPLC 20min" , "fixed_time" : "1200" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "7" , "step_description" : "Prepare GC vial - label, syringes, caps - 20s per sample" , "fixed_time" : "" , "variable_time" : "20" , "flex_time" : ""} , 
      {"step_number" : "8" , "step_description" : "Extract samples - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""} , 
      {"step_number" : "9" , "step_description" : "Run samples - 11min per sample" , "fixed_time" : "" , "variable_time" : "660" , "flex_time" : "true"} , 
      {"step_number" : "10" , "step_description" : "Data entering and reporting 4min per sample" , "fixed_time" : "" , "variable_time" : "240" , "flex_time" : ""}
      ]`),

    Cholesterol: JSON.parse(`[
      {"step_number" : "1" , "step_description" : "Notebook and labelling of tubes - 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "2" , "step_description" : "Weighing of samples - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""} , 
      {"step_number" : "3" , "step_description" : "Preparation of internal standard - 5min" , "fixed_time" : "300" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "4" , "step_description" : "Addition of internal standard and KOH– 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
      {"step_number" : "5" , "step_description" : "Digestion - 1hour" , "fixed_time" : "3600" , "variable_time" : "" , "flex_time" : "true"} , 
      {"step_number" : "6" , "step_description" : "Addition of water and hexane - 1min per sample" , "fixed_time" : "" , "variable_time" : "60" , "flex_time" : ""} , 
      {"step_number" : "7" , "step_description" : "Mix centrifuge - 10min" , "fixed_time" : "600" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "8" , "step_description" : "Extraction - 30sec per sample" , "fixed_time" : "" , "variable_time" : "30" , "flex_time" : ""} , 
      {"step_number" : "9" , "step_description" : "Drying - 20 min" , "fixed_time" : "1200" , "variable_time" : "" , "flex_time" : "true"} , 
      {"step_number" : "10" , "step_description" : "Addition of DMF - 10s per sample" , "fixed_time" : "" , "variable_time" : "10" , "flex_time" : ""} , 
      {"step_number" : "11" , "step_description" : "Addition of derivatizing agents - 30s per sample" , "fixed_time" : "" , "variable_time" : "30" , "flex_time" : ""} , 
      {"step_number" : "12" , "step_description" : "Mix - 10s per sample" , "fixed_time" : "" , "variable_time" : "10" , "flex_time" : ""} , 
      {"step_number" : "13" , "step_description" : "Reaction - 25min" , "fixed_time" : "1500" , "variable_time" : "" , "flex_time" : "true"} , 
      {"step_number" : "14" , "step_description" : "Addition of water and isooctane - 30s per sample" , "fixed_time" : "" , "variable_time" : "30" , "flex_time" : ""} , 
      {"step_number" : "15" , "step_description" : "Mix - 10sec per sample" , "fixed_time" : "" , "variable_time" : "10" , "flex_time" : ""} , 
      {"step_number" : "16" , "step_description" : "Centrifuge - 5min" , "fixed_time" : "300" , "variable_time" : "" , "flex_time" : ""} , 
      {"step_number" : "17" , "step_description" : "Prepare GC vial - label, syringes, caps - 20s per sample" , "fixed_time" : "" , "variable_time" : "20" , "flex_time" : ""} , 
      {"step_number" : "18" , "step_description" : "Extract samples - 2min per sample" , "fixed_time" : "" , "variable_time" : "120" , "flex_time" : ""} , 
      {"step_number" : "19" , "step_description" : "Run samples - 30min per sample" , "fixed_time" : "" , "variable_time" : "1800" , "flex_time" : "true"} , 
      {"step_number" : "20" , "step_description" : "Data entering and reporting 4min per sample" , "fixed_time" : "" , "variable_time" : "240" , "flex_time" : ""}
      ]`),
}