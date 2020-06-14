var pokeBall = { ballFactor: 12, reroll1: false, reroll2: false };
var greatBall = { ballFactor: 8, reroll1: true, reroll2: false };
var safariUltraBall = { ballFactor: 12, reroll1: true, reroll2: true };
var redReroll200 = 520;
var redReroll150 = 564;
var yellowReroll200 = 516;
var yellowReroll150 = 560;
var r2RollCycles = 23664;
var r1Reroll200Cycles;
var r1Reroll150Cycles;
var intendedRate = 0;
var actualSuccesses = 0;
var doReroll150;
var doReroll200;
var ballFactor;
var ballRerollNumber;

$('button').click(function () {
    var pokemon = JSON.parse($('#species').val());
    var catchRate = pokemon.catchRate;
    var baseHP = pokemon.baseHP;
    var level = parseInt($('#level').val());
    var game = $('#game').val();
    if (game === "RB") {
        r1Reroll200Cycles = redReroll200;
        r1Reroll150Cycles = redReroll150;
    } else if (game === "Y") {
        r1Reroll200Cycles = yellowReroll200;
        r1Reroll150Cycles = yellowReroll150;
    }
    var ball = $('#ball').val();
    if (ball === "pokeBall") {
        doReroll150 = pokeBall.reroll1;
        doReroll200 = pokeBall.reroll2;
        ballFactor = pokeBall.ballFactor;
        ballRerollNumber = 256;
    } else if (ball === "greatBall") {
        doReroll150 = greatBall.reroll1;
        doReroll200 = greatBall.reroll2;
        ballFactor = greatBall.ballFactor;
        ballRerollNumber = 201;
    } else if (ball === "ultraBall" || ball === "safariBall") {
        doReroll150 = safariUltraBall.reroll1;
        doReroll200 = safariUltraBall.reroll2;
        ballFactor = safariUltraBall.ballFactor;
        ballRerollNumber = 151;
    }
    var currentHPPercent = Math.max(parseInt($('#hpRange').val()), 1);
    var statusLabel = $('#status').val();
    var status = 0;
    if (["poisoned", "burned", "paralyzed"].includes(statusLabel)) {
        status = 12;
    } else if (["asleep", "frozen"].includes(statusLabel)) {
        status = 25;
    }

    for (var hpDV = 0; hpDV < 16; hpDV++) {
        var maxHP = (((baseHP + hpDV) * 2 * level / 100) >> 0) + level + 10;
        var hpFactor = (((maxHP * 255) / ballFactor) >> 0);
        var currentHPModifier = (((maxHP * (currentHPPercent / 100)) >> 0) / 4) >> 0;
        if (currentHPModifier > 0) {
            hpFactor = (hpFactor / currentHPModifier) >> 0;
        }
        hpFactor = Math.min(hpFactor, 255);
        intendedRate += status / ballRerollNumber + Math.min(catchRate + 1, ballRerollNumber - status) / ballRerollNumber * (hpFactor + 1) / 256;
        for (var ihra = 0; ihra < 256; ihra++) {
            if (ihra < status) {
                actualSuccesses += 16384;
            } else {
                for (var idivstate = 0; idivstate < 65536; idivstate += 4) {
                    var catchMon = true;
                    var reroll = false;
                    var divstate = idivstate;
                    var hra = ihra;
                    do {
                        hra = (hra + (divstate >>> 8)) & 0xFF;
                        if (doReroll200 && hra > 200) {
                            divstate = (divstate + r1Reroll200Cycles) & 0xFFFF;
                            reroll = true;
                        }
                        else if (doReroll150 && hra > 150) {
                            divstate = (divstate + r1Reroll150Cycles) & 0xFFFF;
                            reroll = true;
                        }
                        else {
                            reroll = false;
                        }
                    }
                    while (reroll);
                    if (hra > catchRate) {
                        catchMon = false;
                    } else {
                        divstate = (divstate + r2RollCycles) & 0xFFFF;
                        hra = (hra + (divstate >>> 8)) & 0xFF;
                        catchMon = hra <= hpFactor;
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
    actualSuccesses = 0;
    intendedRate = 0;
});