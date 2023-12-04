export function part2(input: string): string {
  type Card = {
    cardNumber: number;
    winningNumbers: number[];
    myNumbers: number[];
    copies: number;
  };

  const lines = input.split("\n");

  const cards: Card[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const cardNumber = parseInt(line.split(":")[0].split(" ")[1]);
    const winningNumbers = line
      .split("|")[0]
      .split(": ")[1]
      .split(/(?=(?:...)*$)/)
      .map((x) => parseInt(x));
    const myNumbers = line
      .split("|")[1]
      .split(/(?=(?:...)*$)/)
      .map((x) => parseInt(x));
    const card = {
      cardNumber: cardNumber,
      winningNumbers: winningNumbers,
      myNumbers: myNumbers,
      copies: 1,
    };
    cards.push(card);
  }

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    for (let copy = 0; copy < card.copies; copy++) {
      let totalMatches = 0;
      for (let j = 0; j < card.myNumbers.length; j++) {
        const myNumber = card.myNumbers[j];
        if (card.winningNumbers.includes(myNumber)) {
          totalMatches++;
        }
      }

      for (let j = 1; j < totalMatches + 1; j++) {
        cards[i + j].copies = cards[i + j].copies + 1;
      }
    }
  }

  let totalCards = 0;
  for (let i = 0; i < cards.length; i++) {
    totalCards += cards[i].copies;
  }

  return totalCards.toString();
}
