const roll2Cycles = 23664;

onmessage = function (e) {
    var intendedRate = 0;
    var actualSuccesses = 0;
    var pokemon = e.data[0];
    var ball = e.data[1];
    var level = e.data[2];
    var currentHPPercent = e.data[3];
    var status = e.data[4];
    var reroll1Cycles = e.data[5];
    var reroll2Cycles = e.data[6];
    var hpDV = e.data[7];

    var maxHP = (((pokemon.baseHP + hpDV) * 2 * level / 100) >> 0) + level + 10;
    var hpFactor = (((maxHP * 255) / ball.ballFactor) >> 0);
    var currentHPModifier = (((maxHP * (currentHPPercent / 100)) >> 0) / 4) >> 0;
    if (currentHPModifier > 0) {
        hpFactor = (hpFactor / currentHPModifier) >> 0;
    }
    hpFactor = Math.min(hpFactor, 255);
    intendedRate += status / ball.ballRerollCutoff + Math.min(pokemon.catchRate + 1, ball.ballRerollCutoff - status) / ball.ballRerollCutoff * (hpFactor + 1) / 256;
    actualSuccesses += 16384 * status;
    for (var initialRNGByte = status; initialRNGByte < 256; initialRNGByte++) {
        for (var initialDividerWord = 0; initialDividerWord < 65536; initialDividerWord += 4) {
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
            if ((currentRNGByte - status) <= pokemon.catchRate) {
                currentDividerWord = (currentDividerWord + roll2Cycles) & 0xFFFF;
                currentRNGByte = (currentRNGByte + (currentDividerWord >>> 8)) & 0xFF;
                actualSuccesses += currentRNGByte <= hpFactor ? 1 : 0;
            }
        }
    }
    postMessage([actualSuccesses, intendedRate]);
    close();
}