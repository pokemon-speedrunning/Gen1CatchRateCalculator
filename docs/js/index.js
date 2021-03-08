const gameSpecificCycleCounts={RB:[520,564],Y:[516,560]},gameRoll2Counts={RB:0,Y:152};var actualRateBar=$(".actualRateGroup"),intendedRateBar=$(".intendedRateGroup"),loadingSpinner=$(".spinner-border");function setRateBar(e,a){a=parseFloat(a).toFixed(2),e.find("p.rate").html(a+"%"),e.find(".progress-bar").css("width",a+"%").attr("aria-valuenow",a)[0].className="progress-bar "+(a>=50?"bg-success":"bg-danger")}function getJsonValue(e){return JSON.parse(e.val())}function getIntValue(e){return parseInt(e.val())}function bitCount(e){return e.toString(2).match(/1/g).length}$("form button").on("click",(function(){loadingSpinner.removeClass("d-none");const e=getJsonValue($("#species")),a=$("#game").val();"RB"===a&&["DRAGONAIR","DRAGONITE"].includes(e.name)&&(e.catchRate=45);const t=getJsonValue($("#ball")),n=getIntValue($("#level")),l=getIntValue($("#hpRange")),o=getIntValue($("#status"));Promise.all([...Array(16)].map((r,s)=>function(r){const s=(2*(e.baseHP+r)*n/100>>0)+n+10,c=Math.max((s*(l/100)>>0)/4>>0&255,1);let u=255*s/t.ballFactor>>0,i=u/c>>0,g=Math.min(c>0?i:u,255);const R={catchRate:e.catchRate,ballRerollCutoff:t.ballRerollCutoff,ballReroll1:t.reroll1,ballReroll2:t.reroll2,status:o,hpFactor:g,reroll1Count:gameSpecificCycleCounts[a][0],reroll2Count:gameSpecificCycleCounts[a][1],roll2Count:gameRoll2Counts[a]+144*(bitCount(u)+bitCount(i))+48*(12===o)+52*(25===o)+22308+60*["Ultra Ball","Safari Ball"].includes(t.ballName)+48*("Great Ball"===t.ballName)};return new Promise((e,a)=>{const t=new Worker("js/catchRateWorker.js");t.onmessage=function(a){e(a.data)},t.postMessage(R)})}(s))).then(e=>{let a=0,t=0;e.forEach((function(e){a+=e[0],t+=e[1]})),loadingSpinner.addClass("d-none"),setRateBar(actualRateBar,a/671088.64),setRateBar(intendedRateBar,100*t/16)})})),$("#level").on("change",(function(){this.value=Math.min(Math.max(this.value,2),70)}));
//# sourceMappingURL=../maps/index.js.map
