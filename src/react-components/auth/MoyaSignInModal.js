import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { CloseButton } from "../input/CloseButton";
import { Modal } from "../modal/Modal";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { CancelButton, NextButton, ContinueButton } from "../input/Button";
import { TextInputField } from "../input/TextInputField";
import { Column } from "../layout/Column";
import { LegalMessage } from "./LegalMessage";

export const SignInStep = {
  submit: "submit",
  waitForVerification: "waitForVerification",
  complete: "complete"
};

export const SignInMessages = defineMessages({
  default: {
    id: "sign-in-modal.signin-message.moya",
    defaultMessage: "You'll need to sign in to your MOYA account to continue."
  }
});

export function SubmitUsernamePassword({ onSubmitEmail, initialEmail, initialPassword, privacyUrl, termsUrl, message }) {
  const intl = useIntl();

  const [email, setEmail] = useState(initialPassword);
  const [password, setPassword] = useState(initialEmail);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      onSubmitEmail(email);
    },
    [onSubmitEmail, email]
  );

  const onChangeEmail = useCallback(
    e => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const onChangePassword = useCallback(
    e => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  return (
    <Column center padding as="form" onSubmit={onSubmitForm}>
      MOYA_LOGO
      <p>
        {message ? (
          intl.formatMessage(message)
        ) : (
          <FormattedMessage id="sign-in-modal.prompt" defaultMessage="Please Sign In" />
        )}
      </p>
      <TextInputField
        name="username"
        type="text"
        required
        value={email}
        onChange={onChangeEmail}
        placeholder="example@example.com"
      />
      <TextInputField
        name="password"
        type="password"
        required
        value={password}
        onChange={onChangePassword}
        placeholder="example@example.com"
      />
      <p>
        <small>
          <LegalMessage termsUrl={termsUrl} privacyUrl={privacyUrl} />
        </small>
      </p>
      <NextButton type="submit" />
    </Column>
  );
}

SubmitUsernamePassword.defaultProps = {
  initialEmail: "",
  initialPassword: ""
};

SubmitUsernamePassword.propTypes = {
  message: PropTypes.string,
  termsUrl: PropTypes.string,
  privacyUrl: PropTypes.string,
  initialEmail: PropTypes.string,
  initialPassword: PropTypes.string,
  onSubmitEmail: PropTypes.func.isRequired
};

export function WaitForVerification({ email, onCancel, showNewsletterSignup }) {
  return (
    <Column center padding>
      <FormattedMessage
        id="sign-in-modal.wait-for-verification"
        defaultMessage="<p>Email sent to {email}!</p><p>To continue, click on the link in the email using your phone, tablet, or PC.</p><p>No email? You may not be able to create an account.</p>"
        // eslint-disable-next-line react/display-name
        values={{ email, p: chunks => <p>{chunks}</p> }}
      />
      {showNewsletterSignup && (
        <p>
          <small>
            <FormattedMessage
              id="sign-in-modal.newsletter-signup-question"
              defaultMessage="Want Hubs news sent to your inbox?"
            />
            <br />
            <a href="https://eepurl.com/gX_fH9" target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="sign-in-modal.newsletter-signup-link" defaultMessage="Subscribe for updates" />
            </a>
          </small>
        </p>
      )}
      <CancelButton onClick={onCancel} />
    </Column>
  );
}

WaitForVerification.propTypes = {
  showNewsletterSignup: PropTypes.bool,
  email: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired
};

export function SignInComplete({ message, onContinue }) {
  const intl = useIntl();

  return (
    <Column center padding>
      <p>
        <b>
          {message ? (
            intl.formatMessage(message)
          ) : (
            <FormattedMessage id="sign-in-modal.complete" defaultMessage="You are now signed in." />
          )}
        </b>
      </p>
      <ContinueButton onClick={onContinue} />
    </Column>
  );
}

SignInComplete.propTypes = {
  message: PropTypes.string.isRequired,
  onContinue: PropTypes.func.isRequired
};

export function MoyaSignInModal({ closeable, onClose, children, ...rest }) {
  return (
    <Modal
      title={<FormattedMessage id="sign-in-modal.title" defaultMessage="Sign In" />}
      beforeTitle={closeable && <CloseButton onClick={onClose} />}
      {...rest}
    >
      {children}
    </Modal>
  );
}

MoyaSignInModal.propTypes = {
  closeable: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
};
