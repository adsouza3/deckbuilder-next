import React from 'react';

import { Card, CardGroup } from 'react-bootstrap';

import CostChart from '@/components/charts/cost';
import FactionChart from '@/components/charts/faction';
import RarityChart from '@/components/charts/rarity';
import TypeChart from '@/components/charts/type';
import TribeChart from '@/components/charts/tribes';

const DeckComposition = () => {
  return <>
    <CardGroup>
      <Card>
        <Card.Body>
          <CostChart />
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <FactionChart />
        </Card.Body>
      </Card>
    </CardGroup>
    <CardGroup>
      <Card>
        <Card.Body>
          <TypeChart />
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <RarityChart />
        </Card.Body>
      </Card>
    </CardGroup>
    <TribeChart />
  </>;
};

export default DeckComposition;