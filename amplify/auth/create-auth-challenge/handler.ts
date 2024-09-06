import type { CreateAuthChallengeTriggerHandler } from "aws-lambda"

export const handler: CreateAuthChallengeTriggerHandler = async (event) => {
    if (event.request.challengeName === 'CUSTOM_CHALLENGE' 
        || event.request.challengeName === 'CONFIRM_SIGN_IN_WITH_SRP_CODE'
        || event.request.challengeName === 'SRP_A'
    ) {
    
    // Generate a random code for the custom challenge
    const challengeCode = "123456";
    
    event.response.challengeMetadata = "TOKEN_CHECK";
    
    event.response.publicChallengeParameters = { trigger: 'true', code: challengeCode };
    
    event.response.privateChallengeParameters = { trigger: 'true' };
    event.response.privateChallengeParameters.answer = challengeCode;
    }
    return event;
};