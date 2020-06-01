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

    for (var hpDV = 0; hpDV < 16; hpDV++) {
        var hp = (((baseHP + hpDV) * 2 * level / 100) >> 0) + level + 10;
        var hpFactor = ((((hp * 255) / ballFactor) >> 0) / ((hp / 4) >> 0)) >> 0;
        intendedRate += Math.min(catchRate+1,ballRerollNumber) / ballRerollNumber * (hpFactor+1) / 256;
        for (var ihra = 0; ihra < 256; ihra++) {
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
    $('#actualCatchRate').html(`Actual catch rate: <strong>${parseFloat(actualSuccesses / 671088.64).toFixed(2)}%</strong>`);
    $('#intendedCatchRate').html(`Intended catch rate: <strong>${parseFloat(100*intendedRate/16).toFixed(2)}%</strong>`)
    actualSuccesses = 0;
    intendedRate = 0;
});