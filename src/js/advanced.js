const gameSpecificCycleCounts = {
    RB: [520, 564],
    Y: [516, 560]
}
const gameRoll2Counts = {
    RB: 0,
    Y: 152
}
var actualRateBar = $('.actualRateGroup');
var intendedRateBar = $('.intendedRateGroup');
var loadingSpinner = $('.spinner-border');

function setRateBar(progressElement, percent) {
    percent = parseFloat(percent).toFixed(2);
    progressElement.find('p.rate').html(`${percent}%`);
    progressElement.find('.progress-bar').css("width", `${percent}%`).attr("aria-valuenow", percent)[0].className = `progress-bar ${percent >= 50 ? 'bg-success' : 'bg-danger'}`;
}

function getJsonValue($element) {
    return JSON.parse($element.val());
}

function getIntValue($element) {
    return parseInt($element.val());
}

function bitCount (n) {
    return n.toString(2).match(/1/g).length;
}

$('form button').on('click', function () {
    loadingSpinner.removeClass('d-none');
    const game = $('#game').val();
    const ball = getJsonValue($('#ball'));
    const catchRate = getIntValue($('#catchRate'));
    const currentHP = getIntValue($('#currentHP'));
    const maxHP = getIntValue($('#maxHP'));
    const status = getIntValue($('#status'));

    const currentHPModifier = Math.max(((currentHP / 4) >> 0) & 0xFF, 1);
    let c1 = (((maxHP * 255) / ball.ballFactor) >> 0);
    let c2 = (c1 / currentHPModifier) >> 0;
    let hpFactor = Math.min(currentHPModifier > 0 ? c2 : c1, 255);
    const catchRateData = {
        "catchRate" : catchRate,
        "ballRerollCutoff" : ball.ballRerollCutoff,
        "ballReroll1": ball.reroll1,
        "ballReroll2": ball.reroll2,
        "status" : status,
        "hpFactor" : hpFactor,
        "reroll1Count" : gameSpecificCycleCounts[game][0],
        "reroll2Count" : gameSpecificCycleCounts[game][1],
        "roll2Count" : gameRoll2Counts[game]
        + (bitCount(c1) + bitCount(c2)) * 144
        + 48 * (status === 12) + 52 * (status === 25)
        + 22308 + 60 * (["Ultra Ball", "Safari Ball"].includes(ball.ballName)) + 48 * ("Great Ball" === ball.ballName)
    }
    const aBunchOfMath = new Promise((resolve, reject) => {
        const catchRateWorker = new Worker('js/catchRateWorker.js');
        catchRateWorker.onmessage = function (e) {
            resolve(e.data);
        }
        catchRateWorker.postMessage(catchRateData);
    });

    aBunchOfMath.then(result => {
        let actualRate = result[0];
        let intendedRate = result[1];
        loadingSpinner.addClass('d-none');
        setRateBar(actualRateBar, actualRate / 41943.04);
        setRateBar(intendedRateBar, 100 * intendedRate);
    });
});