import React, { useState } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { Popup, Table } from 'semantic-ui-react';

import Influence from './influence';

const ConsistencyTable = ({ uniqueSpells }) => {
  const [sortColumn, setSortColumn] = useState();
  const [sortDirection, setSortDirection] = useState();

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(!sortDirection);
    }
    setSortColumn(column);
  };

  const getSort = (column) => {
    return sortColumn === column ? (sortDirection ? 'ascending' : 'descending') : null;
  };

  const sortedSpells = uniqueSpells.sort((s1, s2) => {
    let result = 0;
    if (['influence', 'name'].indexOf(sortColumn) !== -1) {
      result = s1[sortColumn].localeCompare(s2[sortColumn]);
    }
    if (['count', 'cost', 'probability'].indexOf(sortColumn) !== -1) {
      result = s1[sortColumn] > s2[sortColumn] ? 1 : -1;
    }

    return result * (sortDirection ? 1 : -1);
  });

  return (
    <Table celled sortable>
      <Table.Header>
        <Table.Row>
          {['name', 'count', 'cost', 'influence', 'probability'].map((column) => {
            return (
              <Table.HeaderCell
                key={column}
                sorted={getSort(column)}
                onClick={() => handleSort(column)}
              >
                {_.capitalize(column)}
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedSpells.map((card) => {
          return <Table.Row key={card.name}>
            <Table.Cell>
              <Popup
                trigger={<div>{card.name}</div>}
              >
                <Popup.Content>
                  <img width="150px" src={card.imageUrl} />
                </Popup.Content>
              </Popup>
            </Table.Cell>
            <Table.Cell>{card.count}</Table.Cell>
            <Table.Cell>{card.cost}</Table.Cell>
            <Table.Cell><Influence influence={card.influence}/></Table.Cell>
            <Table.Cell>{card.probability}</Table.Cell>
          </Table.Row>;
        })}
      </Table.Body>
    </Table>
  );
};

ConsistencyTable.propTypes = {
  uniqueSpells: PropTypes.arrayOf(PropTypes.shape({
    cost: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    influence: PropTypes.string,
    name: PropTypes.string.isRequired,
    probability: PropTypes.number
  }))
};

export default ConsistencyTable;