var gameSpecificCycleCounts = {RB: { reroll1: 520, reroll2: 564},
    Y: { reroll1: 516, reroll2: 560}}
var roll2Cycles = 23664;

$('button').click(function () {
    var intendedRate = 0;
    var actualSuccesses = 0;
    var pokemon = JSON.parse($('#species').val());
    var ball = JSON.parse($('#ball').val());
    var level = parseInt($('#level').val());
    var currentHPPercent = Math.max(parseInt($('#hpRange').val()), 1);
    var status = $('#status').val();
    var game = $('#game').val();
    if (game === "RB") {
        if (["DRAGONAIR", "DRAGONITE"].includes(pokemon.name)) {
            pokemon.catchRate = 45;
        }
    }
    var reroll1Cycles = gameSpecificCycleCounts[game].reroll1;
    var reroll2Cycles = gameSpecificCycleCounts[game].reroll2;

    for (var hpDV = 0; hpDV < 16; hpDV++) {
        var maxHP = (((pokemon.baseHP + hpDV) * 2 * level / 100) >> 0) + level + 10;
        var hpFactor = (((maxHP * 255) / ball.ballFactor) >> 0);
        var currentHPModifier = (((maxHP * (currentHPPercent / 100)) >> 0) / 4) >> 0;
        if (currentHPModifier > 0) {
            hpFactor = (hpFactor / currentHPModifier) >> 0;
        }
        hpFactor = Math.min(hpFactor, 255);
        intendedRate += status / ball.ballRerollCutoff + Math.min(pokemon.catchRate + 1, ball.ballRerollCutoff - status) / ball.ballRerollCutoff * (hpFactor + 1) / 256;
        for (var initialRNGByte = 0; initialRNGByte < 256; initialRNGByte++) {
            if (initialRNGByte < status) {
                actualSuccesses += 16384;
            } else {
                for (var initialDividerWord = 0; initialDividerWord < 65536; initialDividerWord += 4) {
                    var catchMon = false;
                    var currentDividerWord = initialDividerWord;
                    var currentRNGByte = initialRNGByte;
                    do {
                        currentRNGByte = (currentRNGByte + (currentDividerWord >>> 8)) & 0xFF;
                        if (ball.reroll1 && currentRNGByte > 200) {
                            currentDividerWord = (currentDividerWord + reroll1Cycles) & 0xFFFF;
                        }
                        else if (ball.reroll2 && currentRNGByte > 150) {
                            currentDividerWord = (currentDividerWord + reroll2Cycles) & 0xFFFF;
                        } else {
                            break;
                        }
                    }
                    while (true);
                    if (currentRNGByte <= pokemon.catchRate) {
                        currentDividerWord = (currentDividerWord + roll2Cycles) & 0xFFFF;
                        currentRNGByte = (currentRNGByte + (currentDividerWord >>> 8)) & 0xFF;
                        catchMon = currentRNGByte <= hpFactor;
                    }
                    actualSuccesses += catchMon ? 1 : 0;
                }
            }
        }
    }

    function setRateBar(progressBarClass, percent) {
        var progressBar = $(`#${progressBarClass}`);
        progressBar.css("width", `${percent}%`).attr("aria-valuenow", percent);
        $(`.${progressBarClass}`).html(`${percent}%`);
        progressBar[0].className = `progress-bar ${percent >= 50 ? 'bg-success' : 'bg-danger'}`
    }
    setRateBar('actualRate', parseFloat(actualSuccesses / 671088.64).toFixed(2));
    setRateBar('intendedRate', parseFloat(100 * intendedRate / 16).toFixed(2));
});