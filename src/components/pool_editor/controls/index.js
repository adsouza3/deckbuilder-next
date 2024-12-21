import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
  expandSettings,
  collapseSettings
} from '@/components/pool_editor/store/actions/settings';

const PoolControls = ({ expanded, collapseSettings, expandSettings, onInfo }) => {
  const handleToggleExpanded = (expanded ? collapseSettings : expandSettings);

  // const overlay = (child, text, tooltipId) => (
  //   <OverlayTrigger
  //     placement="left"
  //     delay={{ show: 0, hide: 100 }}
  //     overlay={<Tooltip id={tooltipId}>{text}</Tooltip>}
  //   >
  //     {child}
  //   </OverlayTrigger>
  // );

  return ''; // TODO: fix overlay

  return (
    <div className="pool-controls">
      {/* {overlay( */}
        <Button
          className="sidebar-toggle"
          color={expanded ? 'grey' : 'grey'} 
          icon="cog"
          onClick={handleToggleExpanded}
        />,
        {/* expanded ? 'Hide Settings' : 'Show Settings',
        'settings-tooltip' */}
      {/* )}
      {overlay( */}
        <Button
          className="info-toggle"
          color={expanded ? 'grey' : 'grey'} 
          icon="info circle"
          onClick={onInfo}
        />,
        {/* 'Show Info',
        'info-tooltip' */}
      {/* )} */}
    </div>
  );
};

PoolControls.propTypes = {
  collapseSettings: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
  expandSettings: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  expandSettings,
  collapseSettings
};

const mapStateToProps = ({ present }) => {
  return {
    expanded: present.settings.common.expanded
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolControls);