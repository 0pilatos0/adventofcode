type Hand = {
  value: String;
  bid: number;
  type?: HandType;
};

enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

export function part1(input: string): string {
  const lines = input.split("\n").map((x) => x.split(" "));
  let hands: Hand[] = [];

  lines.forEach((line) => {
    let value = String(line[0]);
    let bid = Number(line[1]);

    let newHand: Hand = {
      value: value,
      bid: bid,
    };

    newHand.type = getHandType(newHand);

    hands.push(newHand);
  });

  let isSorted = false;

  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < hands.length - 1; i++) {
      let currentHand = hands[i];
      let nextHand = hands[i + 1];

      if (currentHand.type === undefined || nextHand.type === undefined)
        throw new Error("Hand type not found");

      if (currentHand.type > nextHand.type) {
        hands[i] = nextHand;
        hands[i + 1] = currentHand;
        isSorted = false;
      }

      if (
        currentHand.type === nextHand.type &&
        isValueWorse(currentHand, nextHand)
      ) {
        hands[i] = nextHand;
        hands[i + 1] = currentHand;
        isSorted = false;
      }
    }
  }

  let totalResult = 0;
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    totalResult += hand.bid * (i + 1);
  }

  return String(totalResult);
}

function isValueWorse(hand1: Hand, hand2: Hand): boolean {
  let lettersInOrder = "AKQJT98765432";
  let hand1Values = hand1.value.split("");
  let hand2Values = hand2.value.split("");

  for (let i = 0; i < hand1Values.length; i++) {
    let hand1Letter = hand1Values[i];
    let hand2Letter = hand2Values[i];

    if (hand1Letter !== hand2Letter) {
      return (
        lettersInOrder.indexOf(hand1Letter) <
        lettersInOrder.indexOf(hand2Letter)
      );
    }
  }

  return false;
}

function isFiveOfAKind(hand: Hand): boolean {
  let values = hand.value.split("");
  let pairsFound = 0;

  for (let i = 0; i < values.length - 1; i++) {
    let filteredValues = values.filter((x) => x === values[i]);
    if (filteredValues.length === 5) {
      pairsFound++;
      values = values.filter((x) => x !== values[i]);
    }
  }
  return pairsFound === 1;
}

function isFourOfAKind(hand: Hand): boolean {
  let values = hand.value.split("");
  let pairsFound = 0;

  for (let i = 0; i < values.length - 1; i++) {
    let filteredValues = values.filter((x) => x === values[i]);
    if (filteredValues.length === 4) {
      pairsFound++;
      values = values.filter((x) => x !== values[i]);
    }
  }
  return pairsFound === 1;
}

function isFullHouse(hand: Hand): boolean {
  let values = hand.value.split("");
  let pairsFound = 0;

  for (let i = 0; i < values.length - 1; i++) {
    let filteredValues = values.filter((x) => x === values[i]);
    if (filteredValues.length === 3) {
      pairsFound++;
      values = values.filter((x) => x !== values[i]);
      break; // Exit the loop after finding the first set of three cards
    }
  }

  if (pairsFound === 1) {
    for (let i = 0; i < values.length - 1; i++) {
      let filteredValues = values.filter((x) => x === values[i]);
      if (filteredValues.length === 2) {
        pairsFound++;
        break; // Exit the loop after finding the first set of two cards
      }
    }
  }

  return pairsFound === 2;
}

function isThreeOfAKind(hand: Hand): boolean {
  let values = hand.value.split("");
  let pairsFound = 0;

  for (let i = 0; i < values.length - 1; i++) {
    let filteredValues = values.filter((x) => x === values[i]);
    if (filteredValues.length === 3) {
      pairsFound++;
      values = values.filter((x) => x !== values[i]);
    }
  }
  return pairsFound === 1;
}

function isTwoPair(hand: Hand): boolean {
  let values = hand.value.split("");
  let pairsFound = 0;

  let valueCopy = [...values];
  for (let i = 0; i < valueCopy.length - 1; i++) {
    let filteredValues = values.filter((x) => x === values[i]);
    if (filteredValues.length === 2) {
      pairsFound++;
      values = values.filter((x) => x !== values[i]);
    }
  }

  return pairsFound === 2;
}

function isOnePair(hand: Hand): boolean {
  let values = hand.value.split("");
  let pairsFound = 0;

  for (let i = 0; i < values.length - 1; i++) {
    let filteredValues = values.filter((x) => x === values[i]);
    if (filteredValues.length === 2) {
      pairsFound++;
      values = values.filter((x) => x !== values[i]);
    }
  }
  return pairsFound === 1;
}

function isHighCard(hand: Hand): boolean {
  let values = hand.value.split("");
  let allValuesUnique = new Set(values).size === values.length;
  return allValuesUnique;
}

function getHandType(hand: Hand): HandType {
  if (isFiveOfAKind(hand)) {
    return HandType.FiveOfAKind;
  } else if (isFourOfAKind(hand)) {
    return HandType.FourOfAKind;
  } else if (isFullHouse(hand)) {
    return HandType.FullHouse;
  } else if (isThreeOfAKind(hand)) {
    return HandType.ThreeOfAKind;
  } else if (isTwoPair(hand)) {
    return HandType.TwoPair;
  } else if (isOnePair(hand)) {
    return HandType.OnePair;
  } else if (isHighCard(hand)) {
    return HandType.HighCard;
  } else {
    throw new Error("Hand type not found for hand: " + hand.value);
  }
}
