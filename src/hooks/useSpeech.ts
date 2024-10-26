
export const useSpeech = () => {

  const speak = (text: string) => {
    if (window?.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = 'en-US';
      utterance.pitch = 1; // Voice tone
      utterance.rate = 1; // Speak speed

      // string speaking
      window.speechSynthesis.speak(utterance);
    } else {
      alert('SpeechSynthesis is not supported in this browser.');
      console.log('SpeechSynthesis API is not supported in this browser.')
    }
  };

  return { speak };
};
