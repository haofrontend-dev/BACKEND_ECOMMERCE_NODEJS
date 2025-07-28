const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2 days",
        });

        // refreshToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days",
        });

        // Verify Token
        JWT.verify(accessToken, publicKey, (error, decode) => {
            if (error) {
                console.log('error verify: ', error);
            } else {
                console.log('decode: ', decode);
            }
        })

        return { accessToken, refreshToken };
    } catch (error) {}
};

module.exports = {
    createTokenPair,
};
