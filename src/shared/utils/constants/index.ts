

export const NFT_STATUSES = Object.freeze({
    AVAILABLE: 'Available',
    NOT_AVAILABLE: 'Not Available'
  });

  export const RESPONSE_RESULT_TYPE: { ARRAY: 'array'; OBJECT: 'object' } =
  Object.freeze({
    ARRAY: 'array',
    OBJECT: 'object',
  });


export const JWT_CONFIG = Object.freeze({
    JWT_AUDIENCE: 'JWT_AUDIENCE',
    JWT_ISSUER: 'JWT_ISSUER',
    SIGN_IN: {
      JWT_EXPIRY: 'SIGNIN_JWT_EXPIRY',
      JWT_SECRET: 'SIGNIN_JWT_SECRET',
      STRATEGY_NAME: 'jwt', 
    }
  });