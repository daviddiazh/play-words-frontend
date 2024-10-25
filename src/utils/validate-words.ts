
export const isValidWord = (word: string, answer: string) => {
    if (!word || !answer) return false;

    if(word.toLowerCase().trim() === answer.toLowerCase().trim()) {
        return true
    }
    return false;
}