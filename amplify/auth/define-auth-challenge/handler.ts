import type { DefineAuthChallengeTriggerHandler } from "aws-lambda"

export const handler: DefineAuthChallengeTriggerHandler = async (event) => {
    if (event.request.session.length === 0) {
        // If it's the first auth stage
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
    } else if (
        event.request.session.length === 1 &&
        event.request.session[0].challengeName === 'CUSTOM_CHALLENGE' &&
        event.request.session[0].challengeResult === true
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