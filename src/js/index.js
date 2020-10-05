const gameSpecificCycleCounts = {
    RB: [520, 564],
    Y: [516, 560]
}
const gameRoll2Counts = {
    RB: 0,
    Y: 152
}
const roll2Counts = $('#roll2Counts').data('roll2counts');
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

$('form button').on('click', function () {
    loadingSpinner.removeClass('d-none');

    const pokemon = getJsonValue($('#species'));
    const game = $('#game').val();
    if (game === "RB") {
        if (["DRAGONAIR", "DRAGONITE"].includes(pokemon.name)) {
            pokemon.catchRate = 45;
        }
    }
    const ball = getJsonValue($('#ball'));
    const level = getIntValue($('#level'));
    const currentHPPercent = getIntValue($('#hpRange'));
    const status = getIntValue($('#status'));

    function createCatchRateWorker(hpDV) {
        const maxHP = (((pokemon.baseHP + hpDV) * 2 * level / 100) >> 0) + level + 10;
        const currentHPModifier = (((maxHP * (currentHPPercent / 100)) >> 0) / 4) >> 0;
        let hpFactor = (((maxHP * 255) / ball.ballFactor) >> 0);
        if (currentHPModifier > 0) {
            hpFactor = (hpFactor / currentHPModifier) >> 0;
        }
        hpFactor = Math.min(hpFactor, 255);
        const catchRateData = {
            "catchRate" : pokemon.catchRate,
            "ballRerollCutoff" : ball.ballRerollCutoff,
            "ballReroll1": ball.reroll1,
            "ballReroll2": ball.reroll2,
            "status" : status,
            "hpFactor" : hpFactor,
            "reroll1Count" : gameSpecificCycleCounts[game][0],
            "reroll2Count" : gameSpecificCycleCounts[game][1],
            "roll2Count" : gameRoll2Counts[game]
            + roll2Counts[ball.ballIndex][maxHP-1][currentHPModifier-1] 
            + 48 * (status === 12) + 52 * (status === 25)
            + 60 * (["Ultra Ball", "Safari Ball"].includes(ball.ballName))
        }
        return new Promise((resolve, reject) => {
            const catchRateWorker = new Worker('js/catchRateWorker.js');
            catchRateWorker.onmessage = function (e) {
                resolve(e.data);
            }
            catchRateWorker.postMessage(catchRateData);
        });
    }

    Promise.all([...Array(16)].map((x, i) => createCatchRateWorker(i))).then(results => {
        let actualRate = 0;
        let intendedRate = 0;
        results.forEach(function (result) {
            actualRate += result[0];
            intendedRate += result[1];
        });
        loadingSpinner.addClass('d-none');
        setRateBar(actualRateBar, actualRate / 671088.64);
        setRateBar(intendedRateBar, 100 * intendedRate / 16);
    });
});

$('#level').on('change', function () {
    this.value = Math.min(Math.max(this.value, 2), 70);
});