onmessage = function (e) {
    var pokemon = e.data[0];
    var ball = e.data[1];
    var status = e.data[2];
    var hpFactor = e.data[3];
    var reroll1Cycles = e.data[4];
    var reroll2Cycles = e.data[5];
    var intendedRate = status / ball.ballRerollCutoff + Math.min(pokemon.catchRate + 1, ball.ballRerollCutoff - status) / ball.ballRerollCutoff * (hpFactor + 1) / 256;
    var actualSuccesses = 16384 * status;
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
                currentDividerWord = (currentDividerWord + e.data[6]) & 0xFFFF;
                currentRNGByte = (currentRNGByte + (currentDividerWord >>> 8)) & 0xFF;
                actualSuccesses += currentRNGByte <= hpFactor ? 1 : 0;
            }
        }
    }
    postMessage([actualSuccesses, intendedRate]);
    close();
}