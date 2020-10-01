onmessage = function (e) {
    var catchRate = e.data.catchRate;
    var ballRerollCutoff = e.data.ball.ballRerollCutoff;
    var ballReroll1 = e.data.ball.reroll1;
    var ballReroll2 = e.data.ball.reroll2;
    var status = e.data.status;
    var hpFactor = e.data.hpFactor;
    var reroll1Count = e.data.reroll1Count;
    var reroll2Count = e.data.reroll2Count;
    var roll2Count = e.data.roll2Count;
    var intendedRate = status / ballRerollCutoff + Math.min(catchRate + 1, ballRerollCutoff - status) / ballRerollCutoff * (hpFactor + 1) / 256;
    var actualSuccesses = 16384 * status;
    for (var initialRNGByte = status; initialRNGByte < 256; initialRNGByte++) {
        for (var initialDividerWord = 0; initialDividerWord < 65536; initialDividerWord += 4) {
            var currentDividerWord = initialDividerWord;
            var currentRNGByte = initialRNGByte;
            do {
                currentRNGByte = (currentRNGByte + (currentDividerWord >>> 8)) & 0xFF;
                if (ballReroll1 && currentRNGByte > 200) {
                    currentDividerWord = (currentDividerWord + reroll1Count) & 0xFFFF;
                }
                else if (ballReroll2 && currentRNGByte > 150) {
                    currentDividerWord = (currentDividerWord + reroll2Count) & 0xFFFF;
                } else {
                    break;
                }
            }
            while (true);
            if ((currentRNGByte - status) <= catchRate) {
                currentDividerWord = (currentDividerWord + roll2Count) & 0xFFFF;
                currentRNGByte = (currentRNGByte + (currentDividerWord >>> 8)) & 0xFF;
                actualSuccesses += currentRNGByte <= hpFactor ? 1 : 0;
            }
        }
    }
    postMessage([actualSuccesses, intendedRate]);
    close();
}