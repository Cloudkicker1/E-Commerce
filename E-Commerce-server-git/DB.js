
use(supernirgrx);

db.users.insertMany([{
    role: "admin",
    name: "Nir",
    lastName: "Graziani",
    userName: "Cloudkicker",
    idNumber: 314995200,
    password: 976431852,
    city: "Tel-Aviv",
    street: "yabubei",
}]);

db.products.insertMany([
    {
        name: "PS 4",
        category: "Game Consoles",
        price: "400",
        image: "https://images-na.ssl-images-amazon.com/images/I/41GGPRqTZtL._AC_.jpg",
        amount: 10,
    },
    {
        name: "XBOX ONE",
        category: "Game Consoles",
        price: "350",
        image: "https://d3m9l0v76dty0.cloudfront.net/system/photos/3989583/large/562eb105fb8fa1023579ead08ee7a20c.jpg",
        amount: 10,
    },
    {
        name: "Call Of Duty: Cold War",
        category: "Video games",
        price: "230",
        image: "https://s3.gaming-cdn.com/images/products/6680/271x377/call-of-duty-black-ops-cold-war-cover.jpg",
        amount: 10,
    }
]);

db.carts.insertMany([
    {
        date: {
            $date: "2020-08-31T10:47:15.798Z"
        },
        userID: "314995200",
        products: [
            {
                productID: {
                    $oid: "5f45222a1debb47f24546415"
                },
                amount: 5
            },
            {
                productID: {
                    $oid: "5f451c64549e6832ec120931"
                },
                amount: 3
            }
        ],
    }
]);

