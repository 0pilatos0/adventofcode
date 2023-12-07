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

const possibleValuesInsteadOfJoker = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

export function part2(input: string): string {
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

    if (value.includes("J")) {
      console.log("Joker found in hand: " + value);

      let bestHand = newHand;
      let posibleNewHands: Hand[] = [bestHand];
      let amountOfJokers = value.split("J").length - 1;
      for (let i = 0; i < amountOfJokers; i++) {
        for (let j = 0; j < possibleValuesInsteadOfJoker.length; j++) {
          let newValue = value.split("J");
          newValue[i] = possibleValuesInsteadOfJoker[j];
          let newValueText = newValue.join("");

          let newHand: Hand = {
            value: newValueText,
            bid: bid,
          };

          newHand.type = getHandType(newHand);

          posibleNewHands.push(newHand);
        }
      }

      posibleNewHands = sortHands(posibleNewHands);
      bestHand = posibleNewHands[posibleNewHands.length - 1];

      hands.push(bestHand);
    } else {
      hands.push(newHand);
    }
  });

  hands = sortHands(hands);

  let totalResult = 0;
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    totalResult += hand.bid * (i + 1);
  }

  return String(totalResult);
}

function sortHands(hands: Hand[]): Hand[] {
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

  return hands;
}

function isValueWorse(hand1: Hand, hand2: Hand): boolean {
  let lettersInOrder = "AKQT98765432J";
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
  switch (true) {
    case isFiveOfAKind(hand):
      return HandType.FiveOfAKind;
    case isFourOfAKind(hand):
      return HandType.FourOfAKind;
    case isFullHouse(hand):
      return HandType.FullHouse;
    case isThreeOfAKind(hand):
      return HandType.ThreeOfAKind;
    case isTwoPair(hand):
      return HandType.TwoPair;
    case isOnePair(hand):
      return HandType.OnePair;
    case isHighCard(hand):
      return HandType.HighCard;
    default:
      throw new Error("Hand type not found for hand: " + hand.value);
  }
}
