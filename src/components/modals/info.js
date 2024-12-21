import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';
import { Accordion, Card } from 'react-bootstrap';

const InfoModal = ({ show, onClose }) => {

  const section = (label, children) => {
    return (
      <Accordion activeKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{label}</Accordion.Header>
          <Accordion.Body>
            <Card>
              <Card.Body>
                {children}
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  return (
    <Modal
      dialogClassName="info-modal"
      show={show}
      size="xl"
      onHide={onClose}
    >
      <Modal.Body>
        {section('Legal', (
          <p>
            This site is not affiliated with Eternal or Dire Wolf Digital.
            This is just a fan site for the community.
            {'\n\n'}
            All assets from Eternal are property of Dire Wolf Digital.
            {'\n\n'}
            Special thanks to EternalWarcry.com for card data.
          </p>
        ))}
        {section('Donate', (
          <div className="donate-button-container">
            <form action="https://www.paypal.com/donate" method="post" target="_top">
              <input type="hidden" name="business" value="JQF82433NLYME" />
              <input type="hidden" name="currency_code" value="USD" />
              <input
                className="paypal-button"
                type="image"
                src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
                border="0"
                name="submit"
                title="PayPal - The safer, easier way to pay online!"
                alt="Donate with PayPal button"
              />
              <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
            </form>
            <a href="https://www.buymeacoffee.com/EternalRenown" rel="noreferrer" target="_blank">
              <img
                className="coffee-button"
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
              />
            </a>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

InfoModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default InfoModal;