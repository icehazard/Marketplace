module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI,

    COLLECTION_ACCOUNTS: 'accounts',
    COLLECTION_SHOPS: 'shops',
    COLLECTION_PRODUCTS: 'products',
    COLLECTION_ROLES: 'roles',
}
