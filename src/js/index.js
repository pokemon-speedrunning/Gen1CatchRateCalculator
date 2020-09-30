const gameSpecificCycleCounts = {
    RB: [520, 564],
    Y: [516, 560]
}
const gameReroll2Counts = {
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

$('form button').on('click', function () {
    loadingSpinner.removeClass('d-none');

    var pokemon = getJsonValue($('#species'));
    var game = $('#game').val();
    if (game === "RB") {
        if (["DRAGONAIR", "DRAGONITE"].includes(pokemon.name)) {
            pokemon.catchRate = 45;
        }
    }
    var catchRateData = [pokemon,
        getJsonValue($('#ball')),
        getIntValue($('#level')),
        getIntValue($('#hpRange')),
        $('#status').val()]
        .concat(gameSpecificCycleCounts[game].concat(gameReroll2Counts[game]));

    function createCatchRateWorker(hpDV) {
        return new Promise((resolve, reject) => {
            const catchRateWorker = new Worker('js/catchRateWorker.js');
            catchRateWorker.onmessage = function (e) {
                resolve(e.data);
            }
            catchRateWorker.postMessage(catchRateData.concat(hpDV));
        });
    }

    Promise.all([...Array(16)].map((x, i) => createCatchRateWorker(i))).then(results => {
        var actualRate = 0;
        var intendedRate = 0;
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
    this.value = Math.min(Math.max(this.value, 2), 100);
});