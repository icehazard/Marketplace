export default {
    "/": { page: "Home", auth: false },
    "/categories/:id": { page: "Home", auth: false },
    "/top": { page: "Home", auth: false},
    "/listing/:id": { page: "Listing", auth: false },

    "/shops": { page: "Home", auth: false },
    "/shops/id/:id": { page: "Seller", auth: false },
    "/store/create": { page: "ShopWizard", auth: false },
    "/store/settings": { page: "Shop", auth: false },
    "/store/add": { page: "AddListing", auth: false },
    "/store/listing/edit/:id": { page: "AddListing", auth: false },
    "/seller": { page: "Seller", auth: false },

    "/addresses/overview": { page: "Addresses", auth: false },
    "/addresses/choose": { page: "Addresses", auth: false },
    "/addresses/add": { page: "AddressesAdd", auth: false },
    "/addresses/add/choose": { page: "AddressesAdd", auth: false },
    "/addresses/edit/:id": { page: "AddressesAdd", auth: false },

    "/wallet/overview": { page: "Wallet", auth: false },
    "/wallet/receive": { page: "WalletReceive", auth: false },
    "/wallet/send": { page: "WalletSend", auth: false },
    "/wallet/transactions": { page: "WalletTransactions", auth: false },

    "/orders/overview": { page: "Orders", auth: false },
    "/orders/active": { page: "ActiveOrders", auth: false },
    "/orders/active/:id": { page: "ActiveOrders", auth: false },
    "/orders/view/:id": { page: "ViewOrder", auth: false },

    "/cart": { page: "Cart", auth: false },
    "/bankPayment": { page: "BankPayment", auth: false },
    "/notifications": { page: "Notifications", auth: false },
    "/account": { page: "Profile", auth: false },
    "/messages": { page: "Messages", auth: false },
    "/settings": { page: "Settings", auth: false },

    "/login": { page: "Login", auth: false },
    "/signup": { page: "Signup", auth: false },
    "/policy": { page: "Policy", auth: false },
    "/terms": { page: "Terms", auth: false },
    "/admin": { page: "Admin", auth: false },
}