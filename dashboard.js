const http = require('http');
const fs = require('fs');

const database = require('./pseudo_database.js');

this.GetHtml = function (response, responseCloseCallback)
{
    var html = '<!DOCTYPE html><html><head><title>Lab Dashboard</title></head>\n';
    html += '<link rel="stylesheet" type="text/css" href="/resources/main.css">\n';
    html += '<link rel="stylesheet" type="text/css" href="/resources/colors.css">\n';
    html += '<link rel="icon" type="image/png" href="/resources/favicon.png">\n';
    html += '</head><body>\n';

<<<<<<< Updated upstream
    // TODO - Add a dropdown for creating a new tests
    // TODO - Add hover text
    // TODO - make a better way to differentiate between flex/non-flex ?
    // TODO - allow user to delete a test

    var testStash = database.GetTests();
    for(index = 0; index < testStash.length; index++)
    {
      html += GenerateItemHtml(testStash[index]);
    }

    html += '</body></html>';
    response.write(html);
    responseCloseCallback();
}

function GenerateItemHtml(test)
{
  let steps = test.steps // list of steps: step_number, step_description, step_time, step_isvariable, flex_time(boolean)
  test.num_samples = Math.max(test.num_samples, 1);

  let stepBlock = '';
  for (var index = 0; index < steps.length; index++)
  {
      let listItem = steps[index];
      let stepColor = `test${ index }${listItem.flex_time ? ' isflextime' : ''}`;
      stepBlock += `<li class='${ stepColor }' style='flex: ${ listItem.step_time }'> ${ listItem.step_description }</li>\n`;
  }

  let flex_percent = Math.round(test.total_flextime / test.total_time * 100);
  let fixed_percent = 100 - flex_percent;

  var containEle = `
    <div class='container-time'>
      <div class='title'><h1>${ test.name } (${ test.num_samples } sample${test.num_samples > 1 ? 's' : ''})</h1></div>
      <div>
        <ul>
          ${ stepBlock }
        </ul>
      </div>
      <div>
        <ul>
          ${ fixed_percent > 0 ? `<li class='fixedtime' style='flex: ${ fixed_percent }'>Fixed Time (${ fixed_percent }%)</li>` : ''}
          ${ flex_percent > 0 ? `<li class='flextime' style='flex: ${ flex_percent }'>Flex Time (${ flex_percent }%)</li>` : ''}
        </ul>
      </div>
      <div class='totalTime'>Total Time: ${ GetPrettyDisplayTime(test.total_time) }</div>
    </div>
    `;

  return containEle;
}

function GetPrettyDisplayTime(time_seconds)
{
  let time_remains = time_seconds;
  
  let hours = Math.floor(time_remains / (60 * 60));
  time_remains -= hours * 60 * 60;

  let minutes = Math.floor(time_remains / 60);
  time_remains -= minutes * 60;

  let seconds = time_remains;

  let hours_str   = hours > 0 ? `${hours} hour${hours > 1 ? 's, ' : ', '}` : '';
  let minutes_str = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's, ' : ', '}` : '';
  let seconds_str =  seconds > 0 ? `${minutes} second${seconds > 1 ? 's ' : ''}` : '';

  return (hours_str + minutes_str + seconds_str).trim().replace(/(,$)/g, "");
}