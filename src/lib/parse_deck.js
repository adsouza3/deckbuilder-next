
const parseList = (text, { namesOnly, built, previous }) => {
  const cardData = []; // TODO 
  let cards = [];
  text.split('\n').forEach((line) => {
    const format = /(\d+) (.+) \(Set(\d+) #(\d+)\)/
    const parsed = line.match(format);

    // TODO market
    if (parsed) {
      const [_garb, copies, cardName] = parsed;

      const card = namesOnly ? cardName : cardData.find(card => card.name === cardName);
      if (built) {
        const i = built.indexOf(cardName);
        if (i !== -1) {
          card.inBuild = true;
          built.splice(i, 1);
        }
      }
      if (previous) {
        const i = previous.indexOf(cardName);
        if (i !== -1) {
          card.inPreviousPool = true;
          previous.splice(i, 1);
        }
      }

      for (let i = 0; i < copies; i++) {
        cards.push(card);
      }
    }
  });

  return cards;
};

export const parseDeck = (primary, built, previous) => {
  const parsedBuilt = built ? parseList(built, { namesOnly: true }) : [];
  const parsedPrevious = built ? parseList(previous, { namesOnly: true }) : [];
  return parseList(primary, { built: parsedBuilt, previous: parsedPrevious });
};