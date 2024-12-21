import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


import './styles.scss';

export default function CollapsibleSection({ children, className, icon, title, tooltip }) {
  const [collapsed, setCollapsed] = useState(true);

  let iconElement;
  if (icon) {
    iconElement = <Icon name={icon} />;

    if (tooltip) {
      const overlay = (
        <Tooltip id="section-tooltip">
          {tooltip}
        </Tooltip>
      );
  
      iconElement = (
        <OverlayTrigger overlay={overlay} placement="top">
          {iconElement}
        </OverlayTrigger>
      );
    }
  }

  return (
    <div className={classNames('collapsible-section', className)}>
      <div className="collapsible-section-title" onClick={() => setCollapsed(!collapsed)}>
        {title}
        {children.length === 0 ? null : <Icon name={collapsed ? 'caret right' : 'caret down'} />}
        {iconElement}
      </div>

      {collapsed ? null : (
        <div className="collapsible-section-body">
          {children}
        </div>
      )}
    </div>
  );
}

CollapsibleSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.element
};
