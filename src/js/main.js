const gameSpecificCycleCounts = {
    RB: { reroll1: 520, reroll2: 564 },
    Y: { reroll1: 516, reroll2: 560 }
}
function setRateBar(progressBarClass, percent) {
    var progressBar = $(`#${progressBarClass}`);
    progressBar.css("width", `${percent}%`).attr("aria-valuenow", percent);
    $(`.${progressBarClass}`).html(`${percent}%`);
    progressBar[0].className = `progress-bar ${percent >= 50 ? 'bg-success' : 'bg-danger'}`
}
var loadingSpinner = $('.spinner-border');

$('button').on('click', function () {
    loadingSpinner.removeClass('d-none');
    var pokemon = JSON.parse($('#species').val());
    var ball = JSON.parse($('#ball').val());
    var level = parseInt($('#level').val());
    var currentHPPercent = parseInt($('#hpRange').val());
    var status = $('#status').val();
    var game = $('#game').val();
    if (game === "RB") {
        if (["DRAGONAIR", "DRAGONITE"].includes(pokemon.name)) {
            pokemon.catchRate = 45;
        }
    }
    var reroll1Cycles = gameSpecificCycleCounts[game].reroll1;
    var reroll2Cycles = gameSpecificCycleCounts[game].reroll2;

    function createCatchRateWorker(hpDV) {
        return new Promise((resolve, reject) => {
            const catchRateWorker = new Worker('js/catchRateWorker.js');
            catchRateWorker.onmessage = function (e) {
                resolve(e.data);
            }
            catchRateWorker.postMessage([pokemon, ball, level, currentHPPercent, status, reroll1Cycles, reroll2Cycles, hpDV]);
        });
    }
    var promises = [];
    for (var i = 0; i < 16; i++) {
        promises.push(createCatchRateWorker(i));
    }

    Promise.all(promises).then(results => {
        var actualRate = 0;
        var intendedRate = 0;
        results.forEach(function (result) {
            actualRate += result[0];
            intendedRate += result[1];
        });
        loadingSpinner.addClass('d-none');
        setRateBar('actualRate', parseFloat(actualRate / 671088.64).toFixed(2));
        setRateBar('intendedRate', parseFloat(100 * intendedRate / 16).toFixed(2));
    });
});

$('#level').on('change', function () {
    if (this.value < 1) this.value = 1;
    if (this.value > 100) this.value = 100;
});