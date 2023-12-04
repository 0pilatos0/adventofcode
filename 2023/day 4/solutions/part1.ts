export function part1(input: string): string {
  type Card = {
    cardNumber: number;
    winningNumbers: number[];
    myNumbers: number[];
    points: number;
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
      points: 0,
    };
    cards.push(card);
  }

  let totalPoints = 0;
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    for (let j = 0; j < card.myNumbers.length; j++) {
      const myNumber = card.myNumbers[j];
      if (card.winningNumbers.includes(myNumber)) {
        if (card.points > 0) card.points = card.points * 2;
        else card.points = 1;
      }
    }
    totalPoints += card.points;
  }

  return totalPoints.toString();
}
