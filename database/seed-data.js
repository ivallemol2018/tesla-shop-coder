const bcrypt = require('bcryptjs')

const initialData = {
    users: [
        {
            name:  'Jimmy valle',
            email: 'ivallemol@gmail.com',
            password: bcrypt.hashSync('123456',bcrypt.genSaltSync(10)),
            address: 'piura',
            phone: '948579299',
            age: 20,
            role: 'admin'
        },
        {
            name:  'Ivan Molina',
            email: 'molina_valle@hotmail.com',
            password: bcrypt.hashSync('123456',bcrypt.genSaltSync(10)),
            address: 'piura',
            phone: '948579299',
            age: 20,
            role: 'client'
        },
    ],
    products: [
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668391952/uyjuuldrqeh1i6jluvq0.webp',
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668391983/f4hfmcgr1wrhi1yvbtwa.webp',
            ],
            inStock: 7,
            price: 75,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "mens_chill_crew_neck_sweatshirt",
            type: 'shirts',
            tags: ['sweatshirt'],
            title: "Men’s Chill Crew Neck Sweatshirt",
            gender: 'men'
        },
        {
            description: "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
            images: [
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668392181/tvktqov4hihxwmwu4xeo.webp',
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668392204/jtnwyqisdoot3opyptyb.jpg',
            ],
            inStock: 5,
            price: 200,
            sizes: ['XS','S','M','XL','XXL'],
            slug: "men_quilted_shirt_jacket",
            type: 'shirts',
            tags: ['jacket'],
            title: "Men's Quilted Shirt Jacket",
            gender: 'men'
        },
        {
            description: "The Women's Cropped Puffer Jacket features a uniquely cropped silhouette for the perfect, modern style while on the go during the cozy season ahead. The puffer features subtle silicone injected Tesla logos below the back collar and on the right sleeve, custom matte metal zipper pulls and a soft, fleece lined collar. Made from 87% nylon and 13% polyurethane.",
            images: [
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668392540/huqre0zhjof0vhwarlas.webp',
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668392576/vqs6rvnlaxjmowm7east.webp',
            ],
            inStock: 85,
            price: 225,
            sizes: ['XS','S','M'],
            slug: "women_cropped_puffer_jacket",
            type: 'hoodies',
            tags: ['hoodie'],
            title: "Women's Cropped Puffer Jacket",
            gender: 'women'
        },
        {
            description: "Designed for fit, comfort and style, the Kids Cybertruck Graffiti Long Sleeve Tee features a water-based Cybertruck graffiti wordmark across the chest, a Tesla wordmark down the left arm and our signature T logo on the back collar. Made from 50% cotton and 50% polyester.",
            images: [
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668392664/olm4upcsdgnkdoyb1zxx.jpg',
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668392685/guxtgl7tz40xcjzy1vei.webp',
            ],
            inStock: 10,
            price: 30,
            sizes: ['XS','S','M'],
            slug: "kids_cybertruck_long_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Kids Cybertruck Long Sleeve Tee",
            gender: 'kid'
        },
        {
            description: "The Kids Scribble T Logo Tee is made from 100% Peruvian cotton and features a Tesla T sketched logo for every young artist to wear.",
            images: [
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668392740/vibzpeoco9eitbasqlcq.jpg',
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668392756/jmivnkwxwzwolgmn513k.jpg',
            ],
            inStock: 0,
            price: 25,
            sizes: ['XS','S','M'],
            slug: "kids_scribble_t_logo_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Kids Scribble T Logo Tee",
            gender: 'kid'
        },
        {
            description: "The Kids Cybertruck Tee features the iconic Cybertruck graffiti wordmark and is made from 100% Peruvian cotton for maximum comfort.",
            images: [
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668392838/pibaca54vpuhogsckhqn.webp',
                'https://res.cloudinary.com/do1uwxcks/image/upload/v1668392849/lutjhehs193lylqqxpfh.webp',
            ],
            inStock: 10,
            price: 25,
            sizes: ['XS','S','M'],
            slug: "kids_cybertruck_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Kids Cybertruck Tee",
            gender: 'kid'
        },
    ]
}

module.exports = initialData