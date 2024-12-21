import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';

const PoolNameModal = ({ show, built, pools, onHide, onSubmit }) => {
  const [pool, setPool] = useState(null);

  useEffect(() => {
    setPool(null);
  }, [show]);

  pools = (pools || []).filter(pool => !!pool.name && pool.built === built);

  return (
    <Modal
      className="select-pool-name-modal"
      show={show}
      onHide={onHide}
      onSubmit={onSubmit}
    >
      <Modal.Header closeButton>
        <Modal.Title>Pool Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          placeholder="Pool Name"
          options={pools.map((pool) => {
            return {
              label: pool.name,
              value: pool
            };
          })}
          onChange={({ value }) => setPool(value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button disabled={!pool} variant="primary" onClick={() => onSubmit(pool)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PoolNameModal.propTypes = {
  built: PropTypes.bool.isRequired,
  pools: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ),
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = ({ present: { pools } }) => {
  return {
    pools: pools.pools
  };
};

export default connect(mapStateToProps)(PoolNameModal);