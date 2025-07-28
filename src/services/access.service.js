const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.sevice");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // Check email exist
            const holderShop = await shopModel.findOne({ email }).lean();
            if (holderShop) {
                return {
                    code: "xxx",
                    message: "Email already exist",
                    status: "error",
                };
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: RoleShop.SHOP,
            });

            if (newShop) {
                // created privateKey, publicKey
                const privateKey = crypto.getRandomValues(64).toString("hex");
                const publicKey = crypto.getRandomValues(64).toString("hex");

                console.log({
                    privateKey,
                    publicKey,
                }); // Save colection store key

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                });

                if (!keyStore) {
                    return {
                        code: "xxx",
                        message: "Create keyStore fail",
                        status: "error",
                    };
                }

                // create token pair
                const tokenPair = await createTokenPair(
                    {
                        userId: newShop._id,
                        email: newShop.email,
                        roles: newShop.roles,
                    },
                    publicKeyString,
                    privateKey
                );

                console.log("Created token pair: ", tokenPair);
                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({
                            fields: ["_id", "name", "email"],
                            object: newShop,
                        }),
                        tokenPair,
                    },
                };
            }

            return {
                code: 200,
                metadata: null,
            };
        } catch (error) {
            return {
                code: "xxx",
                message: error.message,
                status: "error",
            };
        }
    };
}

module.exports = AccessService;
