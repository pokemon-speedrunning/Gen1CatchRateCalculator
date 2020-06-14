var pokeballs = {pokeBall : {ballFactor: 12, reroll1: false, reroll2: false, ballRerollCutoff: 256},
    greatBall: {ballFactor: 8, reroll1: true, reroll2: false, ballRerollCutoff: 201},
    ultraBall: {ballFactor: 12, reroll1: true, reroll2: true, ballRerollCutoff: 151},
    safariBall: {ballFactor: 12, reroll1: true, reroll2: true, ballRerollCutoff: 151}}
var gameSpecificCycleCounts = {RB: { reroll1: 520, reroll2: 564},
    Y: { reroll1: 516, reroll2: 560}}
var roll2Cycles = 23664;

$('button').click(function () {
    var intendedRate = 0;
    var actualSuccesses = 0;
    var pokemon = JSON.parse($('#species').val());
    var catchRate = pokemon.catchRate;
    var baseHP = pokemon.baseHP;
    var level = parseInt($('#level').val());
    var ball = pokeballs[$('#ball').val()];
    var currentHPPercent = Math.max(parseInt($('#hpRange').val()), 1);
    var statusLabel = $('#status').val();
    var status = 0;
    if (["poisoned", "burned", "paralyzed"].includes(statusLabel)) {
        status = 12;
    } else if (["asleep", "frozen"].includes(statusLabel)) {
        status = 25;
    }
    var game = $('#game').val();
    var reroll1Cycles = gameSpecificCycleCounts[game].reroll1;
    var reroll2Cycles = gameSpecificCycleCounts[game].reroll2;

    for (var hpDV = 0; hpDV < 16; hpDV++) {
        var maxHP = (((baseHP + hpDV) * 2 * level / 100) >> 0) + level + 10;
        var hpFactor = (((maxHP * 255) / ball.ballFactor) >> 0);
        var currentHPModifier = (((maxHP * (currentHPPercent / 100)) >> 0) / 4) >> 0;
        if (currentHPModifier > 0) {
            hpFactor = (hpFactor / currentHPModifier) >> 0;
        }
        hpFactor = Math.min(hpFactor, 255);
        intendedRate += status / ball.ballRerollCutoff + Math.min(catchRate + 1, ball.ballRerollCutoff - status) / ball.ballRerollCutoff * (hpFactor + 1) / 256;
        for (var initialRNGByte = 0; initialRNGByte < 256; initialRNGByte++) {
            if (initialRNGByte < status) {
                actualSuccesses += 16384;
            } else {
                for (var initialDividerWord = 0; initialDividerWord < 65536; initialDividerWord += 4) {
                    var catchMon = true;
                    var reroll = false;
                    var currentDividerWord = initialDividerWord;
                    var currentRNGByte = initialRNGByte;
                    do {
                        currentRNGByte = (currentRNGByte + (currentDividerWord >>> 8)) & 0xFF;
                        if (ball.reroll1 && currentRNGByte > 200) {
                            currentDividerWord = (currentDividerWord + reroll1Cycles) & 0xFFFF;
                            reroll = true;
                        }
                        else if (ball.reroll2 && currentRNGByte > 150) {
                            currentDividerWord = (currentDividerWord + reroll2Cycles) & 0xFFFF;
                            reroll = true;
                        }
                        else {
                            reroll = false;
                        }
                    }
                    while (reroll);
                    if (currentRNGByte > catchRate) {
                        catchMon = false;
                    } else {
                        currentDividerWord = (currentDividerWord + roll2Cycles) & 0xFFFF;
                        currentRNGByte = (currentRNGByte + (currentDividerWord >>> 8)) & 0xFF;
                        catchMon = currentRNGByte <= hpFactor;
                    }
                    actualSuccesses += catchMon ? 1 : 0;
                }
            }
        }
    }

    function setRateBar($element, percent) {
        $element.css("width", `${percent}%`).attr("aria-valuenow", percent).html(`${percent}%`);
        $element[0].className = `progress-bar ${percent >= 50 ? 'bg-success' : 'bg-danger'}`
    }
    setRateBar($('#actualRate'), parseFloat(actualSuccesses / 671088.64).toFixed(2));
    setRateBar($('#intendedRate'), parseFloat(100 * intendedRate / 16).toFixed(2));
});