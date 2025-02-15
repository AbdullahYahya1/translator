declare namespace google.accounts.id {
    function initialize(options: {
      client_id: string;
      callback: (response: CredentialResponse) => void;
      auto_select?: boolean;
      cancel_on_tap_outside?: boolean;
    }): void;
  
    function renderButton(
      parent: HTMLElement,
      options: { theme: string; size: string; width?: string }
    ): void;
  
    function prompt(momentListener?: (res: PromptMomentNotification) => void): void;
  
    interface CredentialResponse {
      credential: string;
      select_by: string;
    }
  
    interface PromptMomentNotification {
      isDisplayMoment: () => boolean;
      isDisplayed: () => boolean;
      isNotDisplayed: () => boolean;
      getNotDisplayedReason: () => string;
      isSkippedMoment: () => boolean;
      getSkippedReason: () => string;
      isDismissedMoment: () => boolean;
      getDismissedReason: () => string;
    }
  }
  