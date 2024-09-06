import type { DefineAuthChallengeTriggerHandler } from "aws-lambda"

export const handler: DefineAuthChallengeTriggerHandler = async (event) => {
    if (event.request.session.length === 0) {
        // If it's the first auth stage
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'SRP_A';
      } else if (
        event.request.session.length === 1 &&
        event.request.session[0].challengeName === 'SRP_A' &&
        event.request.session[0].challengeResult === true
      ) {
        // If SRP_A is passed
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'PASSWORD_VERIFIER';
      } else if (
        event.request.session.length === 2 &&
        event.request.session[1].challengeName === 'PASSWORD_VERIFIER' &&
        event.request.session[1].challengeResult === true
      ) {
        // If PASSWORD_VERIFIER is passed
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
      } else if (
        event.request.session.length === 3 &&
        event.request.session[2].challengeName === 'CUSTOM_CHALLENGE' &&
        event.request.session[2].challengeResult === true
      ) {
        // If CUSTOM_CHALLENGE is passed
        event.response.issueTokens = true;
        event.response.failAuthentication = false;
      } else {
        // Fail auth if we don't have the expected challenge results
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
      }
    
      return event;
};