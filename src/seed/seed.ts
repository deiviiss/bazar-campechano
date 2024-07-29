import bcrypt from 'bcryptjs'

interface SeedProduct {
  description: string
  images: string[]
  price: 1
  slug: string
  title: string
  type: ValidTypes
  gender: 'men' | 'women' | 'kid' | 'unisex'
}

interface SeedUser {
  email: string
  name: string
  phoneNumber: string
  password: string
  role: 'admin' | 'user'
}

type ValidTypes = 'camisas' | 'pants' | 'sudaderas' | 'gorros'

interface SeedData {
  categories: ValidTypes[]
  products: SeedProduct[]
  users: SeedUser[]
}

export const initialData: SeedData = {
  categories: ['camisas', 'pants', 'sudaderas', 'gorros'],

  products: [
    {
      description: 'Presentamos la colección ModaShop Chill. La sudadera Chill con cuello redondo para hombre tiene un exterior pesado de primera calidad y un interior de tejido polar suave para brindar comodidad en cualquier época del año. La sudadera presenta un sutil logotipo M de poliuretano termoplástico en el pecho y una marca denominativa ModaShop debajo del cuello trasero. Confeccionada con 60% algodón y 40% poliéster reciclado.',
      images: [
        '1740176-00-A_0_2000.jpg',
        '1740176-00-A_1.jpg'
      ],
      price: 1,
      slug: 'sudadera_cuello_mens_chill',
      type: 'camisas',
      title: 'Sudadera Chill de cuello redondo para hombre',
      gender: 'men'
    },
    {
      description: 'La chaqueta camisera acolchada para hombre presenta un diseño acolchado de ajuste único para brindar calidez y movilidad en las estaciones de clima frío. Con una estética urbana general, la chaqueta presenta sutiles logotipos de ModaShop inyectados con silicona debajo del cuello trasero y en la manga derecha, así como tiradores de cremallera de metal mate personalizados. Fabricado con 87% nailon y 13% poliuretano.',
      images: [
        '1740507-00-A_0_2000.jpg',
        '1740507-00-A_1.jpg'
      ],
      price: 1,
      slug: 'chaqueta_camisa_acolchada_hombre',
      type: 'camisas',
      title: 'Chaqueta camisera acolchada para hombre',
      gender: 'men'
    },
    {
      description: 'Presentamos la colección ModaShop Raven. La cazadora bomber ligera con cremallera Raven para hombre tiene una silueta moderna y de primera calidad confeccionada con una mezcla de algodón de bambú sostenible para brindar versatilidad en cualquier temporada. La sudadera con capucha presenta sutiles logotipos de ModaShop de poliuretano termoplástico en el lado izquierdo del pecho y debajo del cuello trasero, un bolsillo oculto en el pecho con tiradores de cremallera mate personalizados y un interior de felpa francesa. Fabricada en 70% bambú y 30% algodón.',
      images: [
        '1740250-00-A_0_2000.jpg',
        '1740250-00-A_1.jpg'
      ],
      price: 1,
      slug: 'men_raven_lightweight_zip_up_bomber_jacket',
      type: 'camisas',
      title: 'Chaqueta bomber ligera con cremallera Raven para hombre',
      gender: 'men'
    },
    {
      description: 'Presentamos la colección Turbine de ModaShop. Diseñada para brindar estilo, comodidad y estilo de vida cotidiano, la camiseta de manga larga Turbine para hombre presenta un sutil logotipo de T a base de agua en el lado izquierdo del pecho y nuestra marca ModaShop debajo del cuello trasero. El material liviano está teñido doblemente, lo que crea un estilo suave e informal ideal para usar en cualquier época del año. Confeccionada en 50% algodón y 50% poliéster.',
      images: [
        '1740280-00-A_0_2000.jpg',
        '1740280-00-A_1.jpg'
      ],
      price: 1,
      slug: 'men_turbine_camiseta_de_manga_larga',
      type: 'camisas',
      title: 'Camiseta de manga larga Turbine para hombre',
      gender: 'men'
    },
    {
      description: 'Presentamos la colección Turbine de ModaShop. Diseñada para brindar estilo, comodidad y estilo de vida cotidiano, la camiseta de manga corta Turbine para hombre presenta una sutil marca denominativa ModaShop a base de agua en el pecho y nuestro logotipo M debajo del cuello trasero. El material liviano está teñido doblemente, lo que crea un estilo suave e informal ideal para usar en cualquier época del año. Confeccionada en 50% algodón y 50% poliéster.',
      images: [
        '1741416-00-A_0_2000.jpg',
        '1741416-00-A_1.jpg'
      ],
      price: 1,
      slug: 'men_turbine_camiseta_de_manga_corta',
      type: 'camisas',
      title: 'Camiseta de manga corta Turbine para hombre',
      gender: 'men'
    },
    {
      description: 'Diseñada para brindar comodidad, la camiseta Cybertruck Owl está hecha de 100% algodón y presenta nuestro ícono Cybertruck característico en la parte posterior.',
      images: [
        '7654393-00-A_2_2000.jpg',
        '7654393-00-A_3.jpg'
      ],
      price: 1,
      slug: 'camiseta_de_buho_cybertruck_para_hombre',
      type: 'camisas',
      title: 'Camiseta Cybertruck Owl para hombre',
      gender: 'men'
    },
    {
      description: 'Inspirada en nuestro sistema de almacenamiento y energía solar doméstico totalmente integrado, la camiseta para techo solar ModaShop aboga por la energía limpia y sostenible dondequiera que vaya. Diseñada para brindar ajuste, comodidad y estilo, la camiseta presenta una vista aérea de nuestro diseño Solar Roof sin costuras en el frente con nuestro logotipo M característico sobre "Solar Roof" en la parte posterior. Confeccionada en 100% algodón peruano.',
      images: [
        '1703767-00-A_0_2000.jpg',
        '1703767-00-A_1.jpg'
      ],
      price: 1,
      slug: 'men_solar_roof_tee',
      type: 'camisas',
      title: 'Camiseta con techo solar para hombre',
      gender: 'men'
    },
    {
      description: "Inspirado en nuestro sistema de almacenamiento y energía solar totalmente integrado para el hogar, la camiseta ModaShop Solar Roof aboga por una energía limpia y sostenible dondequiera que vayas. Diseñada para ajuste, comodidad y estilo, la camiseta presenta una vista aérea de nuestro diseño Solar Roof sin costuras en el frente con nuestro logotipo T en la parte superior de 'Solar Roof' en la parte trasera. Hecha de 100% algodón peruano.",
      images: [
        '1703767-00-A_0_2000.jpg',
        '1703767-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_solar_roof_hombre',
      type: 'camisas',
      title: 'Camiseta Solar Roof para Hombre',
      gender: 'men'
    },
    {
      description: "Diseñada para ajuste, comodidad y estilo, la Camiseta 3D Large Wordmark para Hombre está hecha de 100% algodón peruano con una palabra 'ModaShop' impresa en silicona 3D en el pecho.",
      images: [
        '8764734-00-A_0_2000.jpg',
        '8764734-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_3d_large_wordmark_hombre',
      type: 'camisas',
      title: 'Camiseta 3D Large Wordmark para Hombre',
      gender: 'men'
    },
    {
      description: 'Diseñada para ajuste, comodidad y estilo, la Camiseta M Logo de ModaShop está hecha de 100% algodón peruano y presenta un logotipo M impreso en silicona en el pecho izquierdo.',
      images: [
        '7652426-00-A_0_2000.jpg',
        '7652426-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_3d_t_logo_hombre',
      type: 'camisas',
      title: 'Camiseta 3D M Logo para Hombre',
      gender: 'men'
    },
    {
      description: 'Diseñada para comodidad y estilo en cualquier tamaño, la Camiseta Small Wordmark de ModaShop está hecha de 100% algodón peruano y presenta una palabra impresa en silicona 3D en el pecho izquierdo.',
      images: [
        '8528839-00-A_0_2000.jpg',
        '8528839-00-A_2.jpg'
      ],
      price: 1,
      slug: 'camiseta_3d_small_wordmark_hombre',
      type: 'camisas',
      title: 'Camiseta 3D Small Wordmark para Hombre',
      gender: 'men'
    },
    {
      description: 'Diseñada para celebrar el increíble modo de rendimiento de ModaShop, la Camiseta Plaid Mode ofrece un gran ajuste, comodidad y estilo. Hecha de 100% algodón, es lo mejor después de ir de copiloto en el Nürburgring.',
      images: [
        '1549268-00-A_0_2000.jpg',
        '1549268-00-A_2.jpg'
      ],
      price: 1,
      slug: 'camiseta_plaid_mode_hombre',
      type: 'camisas',
      title: 'Camiseta Plaid Mode para Hombre',
      gender: 'men'
    },
    {
      description: "Inspirada en nuestra popular batería doméstica, la Camiseta Powerwall de ModaShop está hecha de 100% algodón y presenta la frase 'Pure Energy' debajo de nuestro logotipo en la parte trasera. Diseñada para ajuste, comodidad y estilo, la exclusiva camiseta promueve la energía sostenible en cualquier entorno.",
      images: [
        '9877034-00-A_0_2000.jpg',
        '9877034-00-A_2.jpg'
      ],
      price: 1,
      slug: 'camiseta_powerwall_hombre',
      type: 'camisas',
      title: 'Camiseta Powerwall para Hombre',
      gender: 'men'
    },
    {
      description: 'Inspirada en el Día de la Batería de ModaShop y presentando la celda de batería sin lengüeta revelada, la Camiseta del Día de la Batería celebra el futuro del almacenamiento de energía y la fabricación de celdas. Diseñada para ajuste, comodidad y estilo, la Camiseta del Día de la Batería está hecha de 100% algodón con una celda estilizada impresa en el pecho. Hecha en Perú.',
      images: [
        '1633802-00-A_0_2000.jpg',
        '1633802-00-A_2.jpg'
      ],
      price: 1,
      slug: 'camiseta_dia_bateria_hombre',
      type: 'camisas',
      title: 'Camiseta del Día de la Batería para Hombre',
      gender: 'men'
    },
    {
      description: 'Diseñada para una comodidad excepcional e inspirada en el evento de presentación de la Cybertruck, la Camiseta a Prueba de Balas Cybertruck está hecha de 100% algodón y presenta nuestro ícono característico de Cybertruck en la parte trasera.',
      images: [
        '7654399-00-A_0_2000.jpg',
        '7654399-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_prueba_balas_cybertruck_hombre',
      type: 'camisas',
      title: 'Camiseta a Prueba de Balas Cybertruck para Hombre',
      gender: 'men'
    },
    {
      description: 'Inspirada en el gráfico de confirmación de pedido del Model Y, la Camiseta Haha Yes de edición limitada está diseñada para comodidad y estilo. Hecha de 100% algodón peruano y con el logotipo de ModaShop en el pecho, esta camiseta exclusiva conmemorará tu pedido durante años.',
      images: [
        '7652410-00-A_0.jpg',
        '7652410-00-A_1_2000.jpg'
      ],
      price: 1,
      slug: 'camiseta_haha_yes_hombre',
      type: 'camisas',
      title: 'Camiseta Haha Yes para Hombre',
      gender: 'men'
    },
    {
      description: "Diseñada para ajuste, comodidad y estilo, la Camiseta S3XY de edición limitada está hecha de 100% algodón con el logotipo 'S3XY' impreso en 3D en silicona en el pecho. Hecha en Perú. Disponible en negro.",
      images: [
        '8764600-00-A_0_2000.jpg',
        '8764600-00-A_2.jpg'
      ],
      price: 1,
      slug: 'camiseta_s3xy_hombre',
      type: 'camisas',
      title: 'Camiseta S3XY para Hombre',
      gender: 'men'
    },
    {
      description: 'Diseñada para ajuste, comodidad y estilo, la Camiseta de Manga Larga 3D M Logo para Hombre está hecha de 100% algodón y presenta un discreto logotipo T en el pecho izquierdo.',
      images: [
        '8529198-00-A_0_2000.jpg',
        '8529198-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_manga_larga_3d_t_logo_hombre',
      type: 'camisas',
      title: 'Camiseta de Manga Larga 3D M Logo para Hombre',
      gender: 'men'
    },
    {
      description: 'Presentamos la Colección Raven de ModaShop. La Sudadera Ligera con Capucha Raven para Hombre tiene una silueta premium y relajada hecha de una mezcla sostenible de bambú y algodón. La sudadera cuenta con sutiles logotipos de ModaShop de poliuretano termoplástico en el pecho y en la manga, con un interior de french terry para versatilidad en cualquier temporada. Hecha de 70% bambú y 30% algodón.',
      images: [
        '1740245-00-A_0_2000.jpg',
        '1740245-00-A_1.jpg'
      ],
      price: 1,
      slug: 'sudadera_ligera_con_capucha_raven_hombre',
      type: 'sudaderas',
      title: 'Sudadera Ligera con Capucha Raven para Hombre',
      gender: 'men'
    },
    {
      description: 'Presentamos la Colección Chill de ModaShop. La Sudadera con Capucha Chill Pullover tiene un exterior premium y pesado, con un interior suave de fleece para confort en cualquier temporada. La sudadera unisex cuenta con sutiles logotipos de ModaShop de poliuretano termoplástico en el pecho y en la manga, una capucha de doble capa con costura simple y bolsillos con tiradores de cremallera mate personalizados. Hecha de 60% algodón y 40% poliéster reciclado.',
      images: [
        '1740051-00-A_0_2000.jpg',
        '1740051-00-A_1.jpg'
      ],
      price: 1,
      slug: 'sudadera_con_capucha_chill_pullover',
      type: 'sudaderas',
      title: 'Sudadera con Capucha Chill Pullover',
      gender: 'unisex'
    },
    {
      description: 'Presentamos la Colección Chill de ModaShop. La Sudadera con Capucha Completa Chill para Hombre tiene un exterior premium y pesado, con un interior suave de fleece para confort en cualquier temporada. La sudadera con capucha presenta sutiles logotipos de ModaShop de poliuretano termoplástico en el pecho izquierdo y en la manga, una capucha de doble capa con costura simple y bolsillos con tiradores de cremallera mate personalizados. Hecha de 60% algodón y 40% poliéster reciclado.',
      images: [
        '1741111-00-A_0_2000.jpg',
        '1741111-00-A_1.jpg'
      ],
      price: 1,
      slug: 'sudadera_con_capucha_completa_chill_para_hombre',
      type: 'camisas',
      title: 'Sudadera con Capucha Completa Chill para Hombre',
      gender: 'men'
    },
    {
      description: 'Presentamos la Colección Chill de ModaShop. El Pullover de Cuarto de Cremallera Chill para Hombre tiene un exterior premium y pesado, con un interior suave de fleece para confort en cualquier temporada. El pullover presenta sutiles logotipos de ModaShop de poliuretano termoplástico en el pecho izquierdo y debajo del cuello trasero, así como un tirador de cremallera mate personalizado. Hecho de 60% algodón y 40% poliéster reciclado.',
      images: [
        '1740140-00-A_0_2000.jpg',
        '1740140-00-A_1.jpg'
      ],
      price: 1,
      slug: 'pullover_de_cuarto_de_cremallera_chill_para_hombre_gris',
      type: 'camisas',
      title: 'Pullover de Cuarto de Cremallera Chill para Hombre - Gris',
      gender: 'men'
    },
    {
      description: 'Presentamos la Colección Chill de ModaShop. El Pullover de Cuarto de Cremallera Chill para Hombre tiene un exterior premium y pesado, con un interior suave de fleece para confort en cualquier temporada. El pullover presenta sutiles logotipos de ModaShop de poliuretano termoplástico en el pecho izquierdo y debajo del cuello trasero, así como un tirador de cremallera mate personalizado. Hecho de 60% algodón y 40% poliéster reciclado.',
      images: [
        '1740145-00-A_2_2000.jpg',
        '1740145-00-A_1.jpg'
      ],
      price: 1,
      slug: 'pullover_de_cuarto_de_cremallera_chill_para_hombre_blanco',
      type: 'camisas',
      title: 'Pullover de Cuarto de Cremallera Chill para Hombre - Blanco',
      gender: 'men'
    },
    {
      description: 'La Sudadera con Capucha 3D Large Wordmark presenta un suave fleece y una capucha ajustable forrada en jersey para mayor comodidad y cobertura. Diseñada en un estilo unisex, la sudadera incluye un logotipo en 3D impreso en silicona tono sobre tono en el pecho.',
      images: [
        '8529107-00-A_0_2000.jpg',
        '8529107-00-A_1.jpg'
      ],
      price: 1,
      slug: 'sudadera_con_capucha_3d_large_wordmark',
      type: 'sudaderas',
      title: 'Sudadera con Capucha 3D Large Wordmark',
      gender: 'unisex'
    },
    {
      description: 'Al igual que con el icónico logo de ModaShop, la Sudadera Cybertruck Graffiti es un clásico en proceso. Estilo unisex con fleece suave y una capucha ajustable forrada en jersey para una cobertura cómoda.',
      images: [
        '7654420-00-A_0_2000.jpg',
        '7654420-00-A_1_2000.jpg'
      ],
      price: 1,
      slug: 'sudadera_cybertruck_graffiti',
      type: 'sudaderas',
      title: 'Sudadera Cybertruck Graffiti',
      gender: 'unisex'
    },
    {
      description: 'La Gorra Relaxed M Logo es una silueta clásica combinada con detalles modernos, con un logo M en 3D y un cierre personalizado de hebilla metálica. El diseño ultrasuave es flexible y resistente a la abrasión, mientras que la banda interior incluye acolchado acolchado para mayor comodidad y absorción de la humedad. La visera está completamente hecha de botellas de plástico recicladas. 100% Algodón.',
      images: [
        '1657932-00-A_0_2000.jpg',
        '1657932-00-A_1.jpg'
      ],
      price: 1,
      slug: 'gorra_relaxed_m_logo',
      type: 'gorros',
      title: 'Gorra Relaxed M Logo',
      gender: 'unisex'
    },
    {
      description: 'El Gorro Beanie con Puños Térmicos es una silueta clásica combinada con detalles modernos, que incluye un logo M en 3D y un cierre personalizado de hebilla metálica. El diseño ultrasuave es flexible y resistente a la abrasión, mientras que la banda interior incluye acolchado acolchado para mayor comodidad y absorción de la humedad. La visera está completamente hecha de botellas de plástico recicladas. 100% Algodón.',
      images: [
        '1740417-00-A_0_2000.jpg',
        '1740417-00-A_1.jpg'
      ],
      price: 1,
      slug: 'gorro_con_punos_termicos',
      type: 'gorros',
      title: 'Gorro con Puños Térmicos',
      gender: 'unisex'
    },
    {
      description: 'La Chaqueta Acolchada Corta para Mujer presenta una silueta única corta para un estilo moderno perfecto para la temporada acogedora que se avecina. El acolchado incluye sutiles logotipos de ModaShop inyectados con silicona debajo del cuello trasero y en la manga derecha, tiradores de cremallera personalizados de metal mate y un cuello forrado de suave fleece. Hecha de 87% nylon y 13% poliuretano.',
      images: [
        '1740535-00-A_0_2000.jpg',
        '1740535-00-A_1.jpg'
      ],
      price: 1,
      slug: 'chaqueta_acolchada_corta_mujer',
      type: 'sudaderas',
      title: 'Chaqueta Acolchada Corta para Mujer',
      gender: 'women'
    },
    {
      description: 'Presentamos la Colección Chill de ModaShop. La Sudadera con Capucha Corta y Cremallera Media para Mujer tiene un exterior premium de suave fleece y una silueta corta para mayor comodidad en el estilo de vida diario. La sudadera cuenta con un dobladillo elástico que se ajusta en la cintura, sutiles logotipos de ModaShop de poliuretano termoplástico a lo largo de la capucha y en la manga, una capucha de doble capa y costura simple, y un tirador de cremallera personalizado. Hecha de 60% algodón y 40% poliéster reciclado.',
      images: [
        '1740226-00-A_0_2000.jpg',
        '1740226-00-A_1.jpg'
      ],
      price: 1,
      slug: 'sudadera_capucha_corta_cremallera_media_mujer',
      type: 'sudaderas',
      title: 'Sudadera con Capucha Corta y Cremallera Media para Mujer',
      gender: 'women'
    },
    {
      description: 'Presentamos la Colección Raven de ModaShop. La Sudadera Slouchy de Cuello Redondo para Mujer tiene una silueta relajada y premium hecha de una mezcla sostenible de bambú y algodón. El diseño incluye un sutil logotipo de ModaShop de poliuretano termoplástico en la manga izquierda y un interior de french terry para una apariencia y sensación acogedora en todas las estaciones. Combínala con tus Joggers Raven o tu conjunto favorito para estar cómoda en movimiento. Hecha de 70% bambú y 30% algodón.',
      images: [
        '1740260-00-A_0_2000.jpg',
        '1740260-00-A_1.jpg'
      ],
      price: 1,
      slug: 'sudadera_slouchy_cuello_redondo_mujer_raven',
      type: 'sudaderas',
      title: 'Sudadera Slouchy de Cuello Redondo para Mujer',
      gender: 'women'
    },
    {
      description: 'Presentamos la Colección Turbine de ModaShop. Diseñada para estilo, comodidad y el estilo de vida diario, la Camiseta de Manga Larga Corta para Mujer Turbine presenta un sutil logotipo de ModaShop a base de agua en el pecho y nuestro logo M debajo del cuello trasero. El material ligero está teñido doblemente, creando un estilo suave y casual con una silueta corta. Hecha de 50% algodón y 50% poliéster.',
      images: [
        '1740290-00-A_0_2000.jpg',
        '1740290-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_manga_larga_corta_mujer_turbine',
      type: 'camisas',
      title: 'Camiseta de Manga Larga Corta para Mujer Turbine',
      gender: 'women'
    },
    {
      description: 'Presentamos la Colección Turbine de ModaShop. Diseñada para estilo, comodidad y el estilo de vida diario, la Camiseta de Manga Corta Corta para Mujer Turbine presenta un sutil logotipo de ModaShop a base de agua en el pecho y nuestro logo M debajo del cuello trasero. El material ligero está teñido doblemente, creando un estilo suave y casual con una silueta corta. Hecha de 50% algodón y 50% poliéster.',
      images: [
        '1741441-00-A_0_2000.jpg',
        '1741441-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_manga_corta_cortada_mujer_turbine',
      type: 'camisas',
      title: 'Camiseta de Manga Corta Cortada para Mujer Turbine',
      gender: 'women'
    },
    {
      description: 'Diseñada para estilo y comodidad, la suave Camiseta de Cuello Redondo de Manga Corta con logo M para Mujer presenta un sutil logo M impreso en 3D en tono sobre el pecho izquierdo. Hecha de 50% algodón peruano y 50% viscosa peruana.',
      images: [
        '8765090-00-A_0_2000.jpg',
        '8765090-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_cuello_redondo_manga_corta_logo_t_mujer',
      type: 'camisas',
      title: 'Camiseta de Cuello Redondo de Manga Corta con logo M para Mujer',
      gender: 'women'
    },
    {
      description: 'Diseñada para estilo y comodidad, la suave Camiseta de Cuello Redondo de Manga Larga con logo M para Mujer presenta un sutil logo M impreso en 3D en tono sobre el pecho izquierdo. Hecha de 50% algodón peruano y 50% viscosa peruana.',
      images: [
        '8765100-00-A_0_2000.jpg',
        '8765100-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_cuello_redondo_manga_larga_logo_t_mujer',
      type: 'camisas',
      title: 'Camiseta de Cuello Redondo de Manga Larga con logo M para Mujer',
      gender: 'women'
    },
    {
      description: 'Diseñada para estilo y comodidad, la Camiseta de Cuello en V de Manga Corta con Pequeño Logo en el Pecho Izquierdo para Mujer presenta un sutil logo impreso en 3D en tono sobre el pecho izquierdo. Hecha de 100% algodón peruano.',
      images: [
        '8765120-00-A_0_2000.jpg',
        '8765120-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_cuello_v_manga_corta_logo_pequeno_mujer',
      type: 'camisas',
      title: 'Camiseta de Cuello en V de Manga Corta con Pequeño Logo en el Pecho Izquierdo para Mujer',
      gender: 'women'
    },
    {
      description: 'Diseñada para estilo y comodidad, la Camiseta de Cuello Redondo de Manga Corta con Gran Logo en el Pecho para Mujer presenta un sutil logo impreso en 3D en tono sobre el pecho. Hecha de 100% algodón pima peruano.',
      images: [
        '8765115-00-A_0_2000.jpg',
        '8765115-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_cuello_redondo_manga_corta_gran_logo_mujer',
      type: 'camisas',
      title: 'Camiseta de Cuello Redondo de Manga Corta para Mujer',
      gender: 'women'
    },
    {
      description: 'Diseñada para celebrar el increíble modo de rendimiento de ModaShop, la Camiseta Modo Tartán ofrece un ajuste excelente, comodidad y estilo. Hecha de 100% algodón, es lo más parecido a estar al lado del conductor en el Nürburgring.',
      images: [
        '1549275-00-A_0_2000.jpg',
        '1549275-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_modo_tartan_mujer',
      type: 'camisas',
      title: 'Camiseta Modo Tartán para Mujer',
      gender: 'women'
    },
    {
      description: "Inspirada en nuestra popular batería doméstica, la Camiseta Powerwall de ModaShop está hecha de 100% algodón y presenta la frase 'Energía Pura' debajo de nuestro logo característico en la parte posterior. Diseñada para ajuste, comodidad y estilo, esta camiseta exclusiva promueve la energía sostenible en cualquier lugar.",
      images: [
        '9877040-00-A_0_2000.jpg',
        '9877040-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_powerwall_mujer',
      type: 'camisas',
      title: 'Camiseta Powerwall para Mujer',
      gender: 'women'
    },
    {
      description: "Totalmente personalizada y con un estilo único, la Chaqueta Corp para Mujer presenta un logo 'M' impreso en silicona en el pecho izquierdo y el destacado wordmark de ModaShop en la parte trasera.",
      images: [
        '5645680-00-A_0_2000.jpg',
        '5645680-00-A_3.jpg'
      ],
      price: 1,
      slug: 'chaqueta_corp_mujer',
      type: 'camisas',
      title: 'Chaqueta Corp para Mujer',
      gender: 'women'
    },
    {
      description: 'Presentando la Colección Raven de ModaShop. Los Joggers Raven para Mujer tienen una silueta relajada y premium hecha de una mezcla sostenible de bambú y algodón. Estos joggers cuentan con un sutil wordmark y logo M de ModaShop en termoplástico poliuretano, y un interior de felpa francesa para una apariencia y sensación acogedora en todas las estaciones. Combínalos con tu sudadera Raven Slouchy Crew, chaqueta Raven Lightweight Zip Up u otra prenda favorita para estar cómoda en cualquier ocasión. Hechos de 70% bambú y 30% algodón.',
      images: [
        '1740270-00-A_0_2000.jpg',
        '1740270-00-A_1.jpg'
      ],
      price: 1,
      slug: 'joggers_raven_mujer',
      type: 'camisas',
      title: 'Joggers Raven para Mujer',
      gender: 'women'
    },
    {
      description: 'Diseñada para ajuste, comodidad y estilo, la Camiseta de Manga Larga Niño Cybertruck Graffiti presenta un wordmark graffiti Cybertruck a base de agua en el pecho, un wordmark de ModaShop en el brazo izquierdo y nuestro logo M distintivo en el cuello trasero. Hecha de 50% algodón y 50% poliéster.',
      images: [
        '1742694-00-A_1_2000.jpg',
        '1742694-00-A_3.jpg'
      ],
      price: 1,
      slug: 'camiseta_manga_larga_nino_cybertruck',
      type: 'camisas',
      title: 'Camiseta de Manga Larga Niño Cybertruck',
      gender: 'kid'
    },
    {
      description: 'La Camiseta Niño Scribble M Logo está hecha de 100% algodón peruano y presenta un logo M de ModaShop dibujado para que cada joven artista la use.',
      images: [
        '8529312-00-A_0_2000.jpg',
        '8529312-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_nino_scribble_t_logo',
      type: 'camisas',
      title: 'Camiseta Niño Scribble M Logo',
      gender: 'kid'
    },
    {
      description: 'La Camiseta Niño Cybertruck presenta el icónico logotipo de graffiti Cybertruck y está hecha de 100% algodón peruano para máxima comodidad.',
      images: [
        '8529342-00-A_0_2000.jpg',
        '8529342-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_ninos_cybertruck',
      type: 'camisas',
      title: 'Camiseta Niño Cybertruck',
      gender: 'kid'
    },
    {
      description: 'La Camiseta Niño Racing Stripe renovada está hecha de 100% algodón peruano, con una franja de carreras mejorada recientemente y un logotipo de ModaShop cepillado perfecto para cualquier corredor de velocidad.',
      images: [
        '8529354-00-A_0_2000.jpg',
        '8529354-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_nino_racing_stripe',
      type: 'camisas',
      title: 'Camiseta Niño Racing Stripe',
      gender: 'kid'
    },
    {
      description: 'Diseñada para ajuste, comodidad y estilo, la Camiseta ModaShop M Logo está hecha de 100% algodón peruano y presenta un logotipo T impreso en silicona en el pecho izquierdo.',
      images: [
        '7652465-00-A_0_2000.jpg',
        '7652465-00-A_1.jpg'
      ],
      price: 1,
      slug: 'camiseta_nino_t_logo_3d',
      type: 'camisas',
      title: 'Camiseta Niño 3D M Logo',
      gender: 'kid'
    },
    {
      description: 'La camiseta a cuadros está hecha de algodón peruano de grano largo, libre de OMG. Perú es el único país en el mundo donde el algodón se recoge a mano a gran escala. Esta tradición de 4,500 años evita daños a la fibra durante el proceso de recolección y elimina la necesidad de usar productos químicos para abrir las plantas de algodón antes de la cosecha. Este proceso respetuoso con el medio ambiente resulta en algodón suave, resistente y brillante, y la camiseta se volverá aún más suave con cada lavado.',
      images: [
        '100042307_0_2000.jpg',
        '100042307_alt_2000.jpg'
      ],
      price: 1,
      slug: 'camiseta_nino_a_cuadros',
      type: 'camisas',
      title: 'Camiseta Niño a Cuadros',
      gender: 'kid'
    },
    {
      description: 'Para el futuro viajero espacial con un gusto exigente, un mono de algodón suave con cierre de broche en la parte inferior. Etiquetado claro proporcionado en caso de contacto con una nueva civilización espacial. 100% algodón. Hecho en Perú.',
      images: [
        '1473809-00-A_1_2000.jpg',
        '1473809-00-A_alt.jpg'
      ],
      price: 1,
      slug: 'mono_made_on_earth_by_humans',
      type: 'camisas',
      title: 'Mono Made on Earth by Humans',
      gender: 'kid'
    },
    {
      description: 'El Mono Scribble M Logo está hecho de 100% algodón peruano y presenta un logo ModaShop T dibujado a mano para que cada pequeño artista lo use.',
      images: [
        '8529387-00-A_0_2000.jpg',
        '8529387-00-A_1.jpg'
      ],
      price: 1,
      slug: 'scribble_t_logo_onesie',
      type: 'camisas',
      title: 'Scribble M Logo Onesie',
      gender: 'kid'
    },
    {
      description: 'Demuestra tu compromiso con la energía sostenible con este gracioso onesie para tu pequeño. Nota: No previene emisiones. 100% algodón. Hecho en Perú.',
      images: [
        '1473834-00-A_2_2000.jpg',
        '1473829-00-A_2_2000.jpg'
      ],
      price: 1,
      slug: 'zero_emissions_(almost)_onesie',
      type: 'camisas',
      title: 'Zero Emissions (Almost) Onesie',
      gender: 'kid'
    },
    {
      description: 'Usa tu chaqueta bomber Niño Cyberquad durante tus aventuras en el Cyberquad para niños. La chaqueta bomber presenta una ilustración de estilo graffiti de nuestro perfil Cyberquad y wordmark. Con tres bolsillos con cremallera y nuestro logo M y wordmark de ModaShop impresos a lo largo de las mangas, la chaqueta bomber Niño Cyberquad es perfecta para cualquier lugar donde te lleve el camino. Hecha de 60% algodón y 40% poliéster.',
      images: [
        '1742702-00-A_0_2000.jpg',
        '1742702-00-A_1.jpg'
      ],
      price: 1,
      slug: 'nino_cyberquad_bomber_jacket',
      type: 'camisas',
      title: 'Niño Cyberquad Bomber Jacket',
      gender: 'kid'
    },
    {
      description: 'Cruza el patio de recreo con estilo con la chaqueta Niño Corp. Modelada según la chaqueta original de ModaShop Corp, la chaqueta Niño Corp presenta el mismo estilo discreto y materiales de alta calidad pero a escala miniatura.',
      images: [
        '1506211-00-A_0_2000.jpg',
        '1506211-00-A_1_2000.jpg'
      ],
      price: 1,
      slug: 'nino_corp_jacket',
      type: 'camisas',
      title: 'Niño Corp Jacket',
      gender: 'kid'
    }
  ],

  users: [
    {
      email: 'bazar.campechano@hotmail.com',
      name: 'Bazar Campechano',
      password: bcrypt.hashSync('userseed'),
      role: 'admin',
      phoneNumber: '+5219812099475'
    }
  ]

}
