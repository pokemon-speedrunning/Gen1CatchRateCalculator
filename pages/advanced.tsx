import { useDeno } from 'aleph/react'
import React, { useState } from 'react'
import Navigation from '../components/navigation.tsx'
import Progress from '../components/progress.tsx'
import { BallSelect, GameSelect, CatchRateInput, CurrentHPInput, MaxHPInput, StatusInput, NumberFormat} from '../components/inputs/index.tsx'
// @ts-ignore
import pokeBalls from '../lib/pokeballs.json'

export default function Home() {
  const [game, setGame] = useState("RB");
  const [ball, setBall] = useState(pokeBalls[Object.keys(pokeBalls)[0]]);
  const [catchRate, setCatchRate] = useState(0);
  const [currentHP, setCurrentHP] = useState(1);
  const [maxHP, setMaxHP] = useState(1);
  const [status, setStatus] = useState(0);
  const [isHex, setIsHex] = useState(true);
  const [actualRate, setActualRate] = useState(0);
  const [intendedRate, setIntendedRate] = useState(0);
  const [loading, setLoading] = useState(false);

  const gameSpecificCycleCounts = {
    RB: [520, 564],
    Y: [516, 560]
  }
  const gameRoll2Counts = {
      RB: 0,
      Y: 152
  }

  function bitCount (n: number) {
    const bits = n.toString(2).match(/1/g);
    if (bits !== null) {
      return bits.length;
    }
    return 0;
  }

  const version = useDeno(() => Deno.version.deno);

  const handleSubmit = () => {
    setLoading(true);

    function createCatchRateWorker(hpDV: number) : Promise<MessageEvent> {
      const currentHPModifier = Math.max(((currentHP / 4) >> 0) & 0xFF, 1);
      let c1 = (((maxHP * 255) / ball.ballFactor) >> 0);
      let c2 = (c1 / currentHPModifier) >> 0;
      let hpFactor = Math.min(currentHPModifier > 0 ? c2 : c1, 255);
      const catchRateData = {
          "catchRate" : catchRate,
          "ballRerollCutoff" : ball.ballRerollCutoff,
          "ballReroll1": ball.reroll1,
          "ballReroll2": ball.reroll2,
          "status" : status,
          "hpFactor" : hpFactor,
          "reroll1Count" : gameSpecificCycleCounts[game as keyof typeof gameSpecificCycleCounts][0],
          "reroll2Count" : gameSpecificCycleCounts[game as keyof typeof gameSpecificCycleCounts][1],
          "roll2Count" : gameRoll2Counts[game as keyof typeof gameRoll2Counts]
          + (bitCount(c1) + bitCount(c2)) * 144
          + 48 * (status === 12 ? 1 : 0) + 52 * (status === 25 ? 1 : 0)
          + 22308 + 60 * (["Ultra Ball", "Safari Ball"].includes(ball.ballName)? 1 : 0) + 48 * ("Great Ball" === ball.ballName ? 1 : 0)
      }
      return new Promise((resolve, reject) => {
          const catchRateWorker = new Worker('catchRateWorker.js');
          catchRateWorker.onmessage = function (e) {
              resolve(e);
          }
          catchRateWorker.postMessage(catchRateData);
      });
    }

    Promise.all([...Array(16)].map((x, i) => createCatchRateWorker(i))).then((results: MessageEvent[]) => {
        let actualRateResult = 0;
        let intendedRateResult = 0;
        results.forEach(function (result) {
            actualRateResult += result.data[0];
            intendedRateResult += result.data[1];
        });
        setActualRate(parseFloat(parseFloat((actualRateResult / 671088.64).toString()).toFixed(2)));
        setIntendedRate(parseFloat(parseFloat((100 * intendedRateResult / 16).toString()).toFixed(2)));
        setLoading(false);
    });
  }

  return (
    <div className="page">
      <head>
        <title>Pokemon Speedrunning - Advanced Gen 1 Catch Rate Calculator</title>
      </head>
      <Navigation></Navigation>
      <div className="container-fluid">
        <form>
          <div className="row mb-2">
            <div className="col">
              <GameSelect onChange={setGame}></GameSelect>
            </div>
            <div className="col">
              <BallSelect onChange={setBall}></BallSelect>
            </div>
            <div className="col">
              <CatchRateInput isHex={isHex} catchRate={catchRate} onChange={setCatchRate}></CatchRateInput>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <CurrentHPInput isHex={isHex} currentHP={currentHP} onChange={setCurrentHP}></CurrentHPInput>
            </div>
            <div className="col">
              <MaxHPInput isHex={isHex} maxHP={maxHP} onChange={setMaxHP}></MaxHPInput>
            </div>
            <div className="col">
              <StatusInput isHex={isHex} status={status} onChange={setStatus}></StatusInput>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <NumberFormat isHex={isHex} onChange={setIsHex}></NumberFormat>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <button onClick={e => handleSubmit()} className="btn btn-primary" type="button">
                {loading ? <span className="spinner-border spinner-border-sm" role="status"></span> : ''}
                {loading ? ' Loading...' : 'Check Catch Rate'}
              </button>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <Progress progressName="Actual Catch Chance" progressBarID="actualRate" progressValue={actualRate}></Progress>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Progress progressName="Intended Catch Chance" progressBarID="intendedRate" progressValue={intendedRate}></Progress>
            </div>
          </div>
        </form>
        <hr/>
        <div className="row">
          <div className="col">
            <p className="copyinfo">Built by Aleph.js in Deno {version}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
