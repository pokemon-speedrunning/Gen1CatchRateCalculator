var pokeball = { ballFactor: 12, reroll1: false, reroll2: false }
var greatball = { ballFactor: 8, reroll1: true, reroll2: false }
var safariUltraBall = { ballFactor: 12, reroll1: true, reroll2: true }
var redReroll200 = 520;
var redReroll150 = 564;
var yellowReroll200 = 516;
var yellowReroll150 = 560;
var r2RollCycles = 23664;
var r1Reroll200Cycles;
var r1Reroll150Cycles;
var successes;

$('button').click(function () {
    var catchRate = 45;
    var level = $('#level').val();
    var baseHP = 75;
    if ($('#game').val() === "RB") {
        r1Reroll200Cycles = redReroll200;
        r1Reroll150Cycles = redReroll150;
    } else if ($('#game').val() === "Y") {
        r1Reroll200Cycles = yellowReroll200;
        r1Reroll150Cycles = yellowReroll150;
    }
    var doReroll150 = true;
    var doReroll200 = true;
    var ballFactor = 12;

    successes = 0;
    for (var hpDV = 0; hpDV < 16; hpDV++) {
        var hp = (baseHP + hpDV) * 2 * level / 100 + level + 10;
        var hpFactor = (hp * 255) / ballFactor / (hp / 4);
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
                successes += catchMon ? 1 : 0;
            }
        }
    }
    $('output').html(`Catch rate: ${parseFloat(successes / 671088.64).toFixed(2)}%`);
});