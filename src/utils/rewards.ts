// One reward per recognition attempt, after a successful final result.
export function createSpeechRewardGate() {
  let rewarded = false;
  return (score: number, isFinal: boolean): boolean => {
    if (rewarded || !isFinal || score < 60) return false;
    rewarded = true;
    return true;
  };
}
