onmessage = function (e) {
    const {catchRate, ballRerollCutoff, ballReroll1, ballReroll2, status, hpFactor, reroll1Count, reroll2Count, roll2Count} = e.data;
    const intendedRate = status / ballRerollCutoff + Math.min(catchRate + 1, ballRerollCutoff - status) / ballRerollCutoff * (hpFactor + 1) / 256;
    var actualSuccesses = 16384 * status;
    for (var initialRNGByte = status; initialRNGByte < 256; initialRNGByte++) {
        for (var initialDividerWord = 0; initialDividerWord < 65536; initialDividerWord += 4) {
            var currentDividerWord = initialDividerWord;
            var currentRNGByte = initialRNGByte;
            do {
                currentRNGByte = (currentRNGByte + (currentDividerWord >>> 8) + 1) & 0xFF;
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
                actualSuccesses += currentRNGByte <= hpFactor;
            }
        }
    }
    postMessage([actualSuccesses, intendedRate]);
    close();
}