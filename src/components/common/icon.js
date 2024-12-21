import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faShieldAlt, faMagic, faVihara, faPowerOff } from '@fortawesome/free-solid-svg-icons';

import { BuildStatuses, Classes, Types } from '@/lib/card_classification';

const buildStatusString = {
  [BuildStatuses.IN_BUILD]: 'Old Build',
  [BuildStatuses.NEW]: 'New Cards'
};

const typeIcons = {
  [Types.UNIT]: faCat,
  [Types.ATTACHMENT]: faShieldAlt,
  [Types.SPELL]: faMagic,
  [Types.SITE]: faVihara,
  [Types.POWER]: faPowerOff
};

const Icon = ({ type, option }) => {
  if (type === Classes.FACTION || type === Classes.RARITY) {
    return <img className={`settings-icon ${option.toLowerCase()}`} src={`/images/${type}-${option}.png`} />;
  } else if (type === Classes.TYPE) {
    return <FontAwesomeIcon icon={typeIcons[option]} />;
  } else if (type === Classes.COST) {
    return option;
  } else if (type === Classes.BUILD_STATUS) {
    return buildStatusString[option];
  }

  return option.toUpperCase()[0];
};

export default Icon;