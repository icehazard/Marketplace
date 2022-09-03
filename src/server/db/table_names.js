module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI,

    COLLECTION_ACCOUNTS: 'accounts',
    COLLECTION_SHOPS: 'shops',
    COLLECTION_PRODUCTS: 'products',
    COLLECTION_ROLES: 'roles',
    COLLECTION_ADDRESS: 'address',
    COLLECTION_SERVER: 'server',
    COLLECTION_PROCESSED_TXS: 'processed_txs',
    COLLECTION_TRACKED_TXS: 'tracked_txs',
    COLLECTION_ORDERS: 'orders',
    COLLECTION_CHAT: 'chat'


}
