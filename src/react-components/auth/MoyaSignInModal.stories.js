import React from "react";
// import { Center } from "../layout/Center";
// import { Page } from "../layout/Page";
import { RoomLayout } from "../layout/RoomLayout";
import { MoyaSignInModal, SubmitEmail, WaitForVerification } from "./MoyaSignInModal";
// import backgroundUrl from "../../assets/images/home-hero-background-unbranded.png";

export default {
  title: "Auth/MoyaSignInModal",
  parameters: {
    layout: "fullscreen"
  }
};

// TODO: Page contains global typography styles which conflict with all the other stories.
// Uncomment this code when we migrate the Page component to the new design.
// export const PageSubmit = () => (
//   <Page style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: "cover" }}>
//     <Center>
//       <MoyaSignInModal disableFullscreen>
//         <SubmitEmail
//           termsUrl="https://github.com/mozilla/hubs/blob/master/TERMS.md"
//           showTerms
//           privacyUrl="https://github.com/mozilla/hubs/blob/master/PRIVACY.md"
//           showPrivacy
//         />
//       </MoyaSignInModal>
//     </Center>
//   </Page>
// );

// export const PageWaitForVerification = () => (
//   <Page style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: "cover" }}>
//     <Center>
//       <MoyaSignInModal disableFullscreen>
//         <WaitForVerification email="example@example.com" showNewsletterSignup />
//       </MoyaSignInModal>
//     </Center>
//   </Page>
// );

export const RoomSubmit = () => (
  <RoomLayout
    modal={
      <MoyaSignInModal closeable>
        <SubmitEmail
          termsUrl="https://github.com/mozilla/hubs/blob/master/TERMS.md"
          privacyUrl="https://github.com/mozilla/hubs/blob/master/PRIVACY.md"
        />
      </MoyaSignInModal>
    }
  />
);

export const RoomSubmitNoTOS = () => (
  <RoomLayout
    modal={
      <MoyaSignInModal closeable>
        <SubmitEmail privacyUrl="https://github.com/mozilla/hubs/blob/master/PRIVACY.md" />
      </MoyaSignInModal>
    }
  />
);

export const RoomSubmitNoPrivacyPolicy = () => (
  <RoomLayout
    modal={
      <MoyaSignInModal closeable>
        <SubmitEmail termsUrl="https://github.com/mozilla/hubs/blob/master/TERMS.md" />
      </MoyaSignInModal>
    }
  />
);

export const RoomSubmitNoTOSOrPrivacyPolicy = () => (
  <RoomLayout
    modal={
      <MoyaSignInModal closeable>
        <SubmitEmail />
      </MoyaSignInModal>
    }
  />
);

export const RoomWaitForVerification = () => (
  <RoomLayout
    modal={
      <MoyaSignInModal closeable>
        <WaitForVerification email="example@example.com" showNewsletterSignup />
      </MoyaSignInModal>
    }
  />
);

export const RoomWaitForVerificationNoNewsletterSignup = () => (
  <RoomLayout
    modal={
      <MoyaSignInModal closeable>
        <WaitForVerification email="example@example.com" />
      </MoyaSignInModal>
    }
  />
);
