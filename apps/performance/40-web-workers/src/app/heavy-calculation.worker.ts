/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const finalLength = 664579;
  let progress = 0;

  for (let num = 2; num <= 10_000_000; num++) {
    let randomFlag = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        randomFlag = false;
        break;
      }
    }
    if (randomFlag) {
      progress++;
      postMessage(((progress * 100) / finalLength).toFixed(2));
    }
  }
});
