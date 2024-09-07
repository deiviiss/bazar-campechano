import bcrypt from 'bcryptjs'

interface SeedProduct {
  title: string
  description: string
  price: number
  slug: string
  images: string[]
  type: Categories
}

interface SeedUser {
  email: string
  name: string
  phoneNumber: string
  password: string
  role: 'admin' | 'user'
}

type Categories = 'clothe' | 'shoe' | 'toy'

interface SeedData {
  categories: Categories[]
  products: SeedProduct[]
  users: SeedUser[]
}

export const initialData: SeedData = {
  categories: ['clothe', 'shoe', 'toy'],

  products: [
    {
      description: 'Presentamos la colección Turbine de ModaShop. Diseñada para brindar estilo, comodidad y estilo de vida cotidiano, la camiseta de manga larga Turbine para hombre presenta un sutil logotipo de T a base de agua en el lado izquierdo del pecho y nuestra marca ModaShop debajo del cuello trasero. El material liviano está teñido doblemente, lo que crea un estilo suave e informal ideal para usar en cualquier época del año. Confeccionada en 50% algodón y 50% poliéster.',
      images: [
        '1740280-00-A_0_2000.jpg',
        '1740280-00-A_1.jpg'
      ],
      price: 150,
      slug: 'men_turbine_camiseta_de_manga_larga',
      title: 'Camiseta de manga larga Turbine para hombre',
      type: 'clothe'
    },
    {
      description: 'Presentamos la colección Turbine de ModaShop. Diseñada para brindar estilo, comodidad y estilo de vida cotidiano, la camiseta de manga corta Turbine para hombre presenta una sutil marca denominativa ModaShop a base de agua en el pecho y nuestro logotipo M debajo del cuello trasero. El material liviano está teñido doblemente, lo que crea un estilo suave e informal ideal para usar en cualquier época del año. Confeccionada en 50% algodón y 50% poliéster.',
      images: [
        '1741416-00-A_0_2000.jpg',
        '1741416-00-A_1.jpg'
      ],
      price: 150,
      slug: 'men_turbine_camiseta_de_manga_corta',
      title: 'Camiseta de manga corta Turbine para hombre',
      type: 'clothe'
    },
    {
      description: 'Diseñada para brindar comodidad, la camiseta Cybertruck Owl está hecha de 100% algodón y presenta nuestro ícono Cybertruck característico en la parte posterior.',
      images: [
        '7654393-00-A_2_2000.jpg',
        '7654393-00-A_3.jpg'
      ],
      price: 150,
      slug: 'camiseta_de_buho_cybertruck_para_hombre',
      title: 'Camiseta Cybertruck Owl para hombre',
      type: 'clothe'
    },
    {
      description: 'Inspirada en nuestro sistema de almacenamiento y energía solar doméstico totalmente integrado, la camiseta para techo solar ModaShop aboga por la energía limpia y sostenible dondequiera que vaya. Diseñada para brindar ajuste, comodidad y estilo, la camiseta presenta una vista aérea de nuestro diseño Solar Roof sin costuras en el frente con nuestro logotipo M característico sobre "Solar Roof" en la parte posterior. Confeccionada en 100% algodón peruano.',
      images: [
        '1703767-00-A_0_2000.jpg',
        '1703767-00-A_1.jpg'
      ],
      price: 150,
      slug: 'men_solar_roof_tee',
      title: 'Camiseta con techo solar para hombre',
      type: 'clothe'
    },
    {
      description: "Inspirado en nuestro sistema de almacenamiento y energía solar totalmente integrado para el hogar, la camiseta ModaShop Solar Roof aboga por una energía limpia y sostenible dondequiera que vayas. Diseñada para ajuste, comodidad y estilo, la camiseta presenta una vista aérea de nuestro diseño Solar Roof sin costuras en el frente con nuestro logotipo T en la parte superior de 'Solar Roof' en la parte trasera. Hecha de 100% algodón peruano.",
      images: [
        '1703767-00-A_0_2000.jpg',
        '1703767-00-A_1.jpg'
      ],
      price: 150,
      slug: 'camiseta_solar_roof_hombre',
      title: 'Camiseta Solar Roof para Hombre',
      type: 'clothe'
    },
    {
      description: "Diseñada para ajuste, comodidad y estilo, la Camiseta 3D Large Wordmark para Hombre está hecha de 100% algodón peruano con una palabra 'ModaShop' impresa en silicona 3D en el pecho.",
      images: [
        '8764734-00-A_0_2000.jpg',
        '8764734-00-A_1.jpg'
      ],
      price: 150,
      slug: 'camiseta_3d_large_wordmark_hombre',
      title: 'Camiseta 3D Large Wordmark para Hombre',
      type: 'clothe'
    },
    {
      description: 'Diseñada para ajuste, comodidad y estilo, la Camiseta M Logo de ModaShop está hecha de 100% algodón peruano y presenta un logotipo M impreso en silicona en el pecho izquierdo.',
      images: [
        '7652426-00-A_0_2000.jpg',
        '7652426-00-A_1.jpg'
      ],
      price: 150,
      slug: 'camiseta_3d_t_logo_hombre',
      title: 'Camiseta 3D M Logo para Hombre',
      type: 'clothe'
    },
    {
      description: 'Diseñada para comodidad y estilo en cualquier tamaño, la Camiseta Small Wordmark de ModaShop está hecha de 100% algodón peruano y presenta una palabra impresa en silicona 3D en el pecho izquierdo.',
      images: [
        '8528839-00-A_0_2000.jpg',
        '8528839-00-A_2.jpg'
      ],
      price: 150,
      slug: 'camiseta_3d_small_wordmark_hombre',
      title: 'Camiseta 3D Small Wordmark para Hombre',
      type: 'clothe'
    },
    {
      description: 'Diseñada para celebrar el increíble modo de rendimiento de ModaShop, la Camiseta Plaid Mode ofrece un gran ajuste, comodidad y estilo. Hecha de 100% algodón, es lo mejor después de ir de copiloto en el Nürburgring.',
      images: [
        '1549268-00-A_0_2000.jpg',
        '1549268-00-A_2.jpg'
      ],
      price: 150,
      slug: 'camiseta_plaid_mode_hombre',
      title: 'Camiseta Plaid Mode para Hombre',
      type: 'clothe'
    },
    {
      description: "Inspirada en nuestra popular batería doméstica, la Camiseta Powerwall de ModaShop está hecha de 100% algodón y presenta la frase 'Pure Energy' debajo de nuestro logotipo en la parte trasera. Diseñada para ajuste, comodidad y estilo, la exclusiva camiseta promueve la energía sostenible en cualquier entorno.",
      images: [
        '9877034-00-A_0_2000.jpg',
        '9877034-00-A_2.jpg'
      ],
      price: 150,
      slug: 'camiseta_powerwall_hombre',
      title: 'Camiseta Powerwall para Hombre',
      type: 'clothe'
    },
    {
      description: 'Inspirada en el Día de la Batería de ModaShop y presentando la celda de batería sin lengüeta revelada, la Camiseta del Día de la Batería celebra el futuro del almacenamiento de energía y la fabricación de celdas. Diseñada para ajuste, comodidad y estilo, la Camiseta del Día de la Batería está hecha de 100% algodón con una celda estilizada impresa en el pecho. Hecha en Perú.',
      images: [
        '1633802-00-A_0_2000.jpg',
        '1633802-00-A_2.jpg'
      ],
      price: 150,
      slug: 'camiseta_dia_bateria_hombre',
      title: 'Camiseta del Día de la Batería para Hombre',
      type: 'clothe'
    },
    {
      description: 'Diseñada para estilo y comodidad, la suave Camiseta de Cuello Redondo de Manga Corta con logo M para Mujer presenta un sutil logo M impreso en 3D en tono sobre el pecho izquierdo. Hecha de 50% algodón peruano y 50% viscosa peruana.',
      images: [
        '8765090-00-A_0_2000.jpg',
        '8765090-00-A_1.jpg'
      ],
      price: 150,
      slug: 'camiseta_cuello_redondo_manga_corta_logo_t_mujer',
      title: 'Camiseta de Cuello Redondo de Manga Corta con logo M para Mujer',
      type: 'clothe'
    },
    {
      description: 'Diseñada para estilo y comodidad, la suave Camiseta de Cuello Redondo de Manga Larga con logo M para Mujer presenta un sutil logo M impreso en 3D en tono sobre el pecho izquierdo. Hecha de 50% algodón peruano y 50% viscosa peruana.',
      images: [
        '8765100-00-A_0_2000.jpg',
        '8765100-00-A_1.jpg'
      ],
      price: 150,
      slug: 'camiseta_cuello_redondo_manga_larga_logo_t_mujer',
      title: 'Camiseta de Cuello Redondo de Manga Larga con logo M para Mujer',
      type: 'clothe'
    },
    {
      description: 'Diseñada para estilo y comodidad, la Camiseta de Cuello en V de Manga Corta con Pequeño Logo en el Pecho Izquierdo para Mujer presenta un sutil logo impreso en 3D en tono sobre el pecho izquierdo. Hecha de 100% algodón peruano.',
      images: [
        '8765120-00-A_0_2000.jpg',
        '8765120-00-A_1.jpg'
      ],
      price: 150,
      slug: 'camiseta_cuello_v_manga_corta_logo_pequeno_mujer',
      title: 'Camiseta de Cuello en V de Manga Corta Logo en el Pecho para Mujer',
      type: 'clothe'
    },
    {
      description: 'Diseñada para estilo y comodidad, la Camiseta de Cuello Redondo de Manga Corta con Gran Logo en el Pecho para Mujer presenta un sutil logo impreso en 3D en tono sobre el pecho. Hecha de 100% algodón pima peruano.',
      images: [
        '8765115-00-A_0_2000.jpg',
        '8765115-00-A_1.jpg'
      ],
      price: 150,
      slug: 'camiseta_cuello_redondo_manga_corta_gran_logo_mujer',
      title: 'Camiseta de Cuello Redondo de Manga Corta para Mujer',
      type: 'clothe'
    },
    {
      description: 'Diseñada para celebrar el increíble modo de rendimiento de ModaShop, la Camiseta Modo Tartán ofrece un ajuste excelente, comodidad y estilo. Hecha de 100% algodón, es lo más parecido a estar al lado del conductor en el Nürburgring.',
      images: [
        '1549275-00-A_0_2000.jpg',
        '1549275-00-A_1.jpg'
      ],
      price: 150,
      slug: 'camiseta_modo_tartan_mujer',
      title: 'Camiseta Modo Tartán para Mujer',
      type: 'clothe'
    },
    {
      description: "Inspirada en nuestra popular batería doméstica, la Camiseta Powerwall de ModaShop está hecha de 100% algodón y presenta la frase 'Energía Pura' debajo de nuestro logo característico en la parte posterior. Diseñada para ajuste, comodidad y estilo, esta camiseta exclusiva promueve la energía sostenible en cualquier lugar.",
      images: [
        '9877040-00-A_0_2000.jpg',
        '9877040-00-A_1.jpg'
      ],
      price: 100,
      slug: 'camiseta_powerwall_mujer',
      title: 'Camiseta Powerwall para Mujer',
      type: 'clothe'
    },
    {
      description: "Totalmente personalizada y con un estilo único, la Chaqueta Corp para Mujer presenta un logo 'M' impreso en silicona en el pecho izquierdo y el destacado wordmark de ModaShop en la parte trasera.",
      images: [
        '5645680-00-A_0_2000.jpg',
        '5645680-00-A_3.jpg'
      ],
      price: 100,
      slug: 'chaqueta_corp_mujer',
      title: 'Chaqueta Corp para Mujer',
      type: 'clothe'
    },
    {
      description: 'Presentando la Colección Raven de ModaShop. Los Joggers Raven para Mujer tienen una silueta relajada y premium hecha de una mezcla sostenible de bambú y algodón. Estos joggers cuentan con un sutil wordmark y logo M de ModaShop en termoplástico poliuretano, y un interior de felpa francesa para una apariencia y sensación acogedora en todas las estaciones. Combínalos con tu sudadera Raven Slouchy Crew, chaqueta Raven Lightweight Zip Up u otra prenda favorita para estar cómoda en cualquier ocasión. Hechos de 70% bambú y 30% algodón.',
      images: [
        '1740270-00-A_0_2000.jpg',
        '1740270-00-A_1.jpg'
      ],
      price: 100,
      slug: 'joggers_raven_mujer',
      title: 'Joggers Raven para Mujer',
      type: 'clothe'
    },
    {
      description: 'Diseñada para ajuste, comodidad y estilo, la Camiseta de Manga Larga Niño Cybertruck Graffiti presenta un wordmark graffiti Cybertruck a base de agua en el pecho, un wordmark de ModaShop en el brazo izquierdo y nuestro logo M distintivo en el cuello trasero. Hecha de 50% algodón y 50% poliéster.',
      images: [
        '1742694-00-A_1_2000.jpg',
        '1742694-00-A_3.jpg'
      ],
      price: 100,
      slug: 'camiseta_manga_larga_nino_cybertruck',
      title: 'Camiseta de Manga Larga Niño Cybertruck',
      type: 'clothe'
    },
    {
      description: 'La Camiseta Niño Scribble M Logo está hecha de 100% algodón peruano y presenta un logo M de ModaShop dibujado para que cada joven artista la use.',
      images: [
        '8529312-00-A_0_2000.jpg',
        '8529312-00-A_1.jpg'
      ],
      price: 100,
      slug: 'camiseta_nino_scribble_t_logo',
      title: 'Camiseta Niño Scribble M Logo',
      type: 'clothe'
    },
    {
      description: 'La Camiseta Niño Cybertruck presenta el icónico logotipo de graffiti Cybertruck y está hecha de 100% algodón peruano para máxima comodidad.',
      images: [
        '8529342-00-A_0_2000.jpg',
        '8529342-00-A_1.jpg'
      ],
      price: 100,
      slug: 'camiseta_ninos_cybertruck',
      title: 'Camiseta Niño Cybertruck',
      type: 'clothe'
    },
    {
      description: 'La Camiseta Niño Racing Stripe renovada está hecha de 100% algodón peruano, con una franja de carreras mejorada recientemente y un logotipo de ModaShop cepillado perfecto para cualquier corredor de velocidad.',
      images: [
        '8529354-00-A_0_2000.jpg',
        '8529354-00-A_1.jpg'
      ],
      price: 100,
      slug: 'camiseta_nino_racing_stripe',
      title: 'Camiseta Niño Racing Stripe',
      type: 'clothe'
    },
    {
      description: 'Diseñada para ajuste, comodidad y estilo, la Camiseta ModaShop M Logo está hecha de 100% algodón peruano y presenta un logotipo T impreso en silicona en el pecho izquierdo.',
      images: [
        '7652465-00-A_0_2000.jpg',
        '7652465-00-A_1.jpg'
      ],
      price: 100,
      slug: 'camiseta_nino_t_logo_3d',
      title: 'Camiseta Niño 3D M Logo',
      type: 'clothe'
    },
    {
      description: 'La camiseta a cuadros está hecha de algodón peruano de grano largo, libre de OMG. Perú es el único país en el mundo donde el algodón se recoge a mano a gran escala. Esta tradición de 4,500 años evita daños a la fibra durante el proceso de recolección y elimina la necesidad de usar productos químicos para abrir las plantas de algodón antes de la cosecha. Este proceso respetuoso con el medio ambiente resulta en algodón suave, resistente y brillante, y la camiseta se volverá aún más suave con cada lavado.',
      images: [
        '100042307_0_2000.jpg',
        '100042307_alt_2000.jpg'
      ],
      price: 100,
      slug: 'camiseta_nino_a_cuadros',
      title: 'Camiseta Niño a Cuadros',
      type: 'clothe'
    },
    {
      description: 'Para el futuro viajero espacial con un gusto exigente, un mono de algodón suave con cierre de broche en la parte inferior. Etiquetado claro proporcionado en caso de contacto con una nueva civilización espacial. 100% algodón. Hecho en Perú.',
      images: [
        '1473809-00-A_1_2000.jpg',
        '1473809-00-A_alt.jpg'
      ],
      price: 100,
      slug: 'mono_made_on_earth_by_humans',
      title: 'Mono Made on Earth by Humans',
      type: 'clothe'
    },
    {
      description: 'El Mono Scribble M Logo está hecho de 100% algodón peruano y presenta un logo ModaShop T dibujado a mano para que cada pequeño artista lo use.',
      images: [
        '8529387-00-A_0_2000.jpg',
        '8529387-00-A_1.jpg'
      ],
      price: 100,
      slug: 'scribble_t_logo_onesie',
      title: 'Scribble M Logo Onesie',
      type: 'clothe'
    },
    {
      description: 'Demuestra tu compromiso con la energía sostenible con este gracioso onesie para tu pequeño. Nota: No previene emisiones. 100% algodón. Hecho en Perú.',
      images: [
        '1473834-00-A_2_2000.jpg',
        '1473829-00-A_2_2000.jpg'
      ],
      price: 100,
      slug: 'zero_emissions_(almost)_onesie',
      title: 'Zero Emissions (Almost) Onesie',
      type: 'clothe'
    },
    {
      description: 'Usa tu chaqueta bomber Niño Cyberquad durante tus aventuras en el Cyberquad para niños. La chaqueta bomber presenta una ilustración de estilo graffiti de nuestro perfil Cyberquad y wordmark. Con tres bolsillos con cremallera y nuestro logo M y wordmark de ModaShop impresos a lo largo de las mangas, la chaqueta bomber Niño Cyberquad es perfecta para cualquier lugar donde te lleve el camino. Hecha de 60% algodón y 40% poliéster.',
      images: [
        '1742702-00-A_0_2000.jpg',
        '1742702-00-A_1.jpg'
      ],
      price: 100,
      slug: 'nino_cyberquad_bomber_jacket',
      title: 'Niño Cyberquad Bomber Jacket',
      type: 'clothe'
    },
    {
      description: 'Cruza el patio de recreo con estilo con la chaqueta Niño Corp. Modelada según la chaqueta original de ModaShop Corp, la chaqueta Niño Corp presenta el mismo estilo discreto y materiales de alta calidad pero a escala miniatura.',
      images: [
        '1506211-00-A_0_2000.jpg',
        '1506211-00-A_1_2000.jpg'
      ],
      price: 100,
      slug: 'nino_corp_jacket',
      title: 'Niño Corp Jacket',
      type: 'clothe'
    },
    // toys
    {
      description: 'Robot de gorila de juguete con 4 extremidades móviles y cabeza giratoria. Hecho de plástico ABS duradero y resistente a los golpes. Recomendado para niños de 3 años en adelante.',
      images: [
        'robot-1_A.jpg',
        'robot-1_B.jpg'
      ],
      price: 100,
      slug: 'robot_gorila',
      title: 'Robot de Gorila',
      type: 'toy'
    },
    {
      description: 'Robot de perro de juguete con 4 extremidades móviles y cabeza giratoria. Hecho de plástico ABS duradero y resistente a los golpes. Recomendado para niños de 3 años en adelante.',
      images: [
        'robot-1_A.jpg',
        'robot-1_B.jpg'
      ],
      price: 100,
      slug: 'robot_perro',
      title: 'Robot de Perro',
      type: 'toy'
    },
    {
      description: 'Robot de gato de juguete con 4 extremidades móviles y cabeza giratoria. Hecho de plástico ABS duradero y resistente a los golpes. Recomendado para niños de 3 años en adelante.',
      images: [
        'robot-1_A.jpg',
        'robot-1_B.jpg'
      ],
      price: 100,
      slug: 'robot_gato',
      title: 'Robot de Gato',
      type: 'toy'
    },
    {
      description: 'Robot de león de juguete con 4 extremidades móviles y cabeza giratoria. Hecho de plástico ABS duradero y resistente a los golpes. Recomendado para niños de 3 años en adelante.',
      images: [
        'robot-1_A.jpg',
        'robot-1_B.jpg'
      ],
      price: 100,
      slug: 'robot_leon',
      title: 'Robot de León',
      type: 'toy'
    },
    {
      description: 'Robot de dinosaurio de juguete con 4 extremidades móviles y cabeza giratoria. Hecho de plástico ABS duradero y resistente a los golpes. Recomendado para niños de 3 años en adelante.',
      images: [
        'robot-1_A.jpg',
        'robot-1_B.jpg'
      ],
      price: 100,
      slug: 'robot_dinosaurio',
      title: 'Robot de Dinosaurio',
      type: 'toy'
    },
    {
      description: 'Robot de dragón de juguete con 4 extremidades móviles y cabeza giratoria. Hecho de plástico ABS duradero y resistente a los golpes. Recomendado para niños de 3 años en adelante.',
      images: [
        'robot-1_A.jpg',
        'robot-1_B.jpg'
      ],
      price: 100,
      slug: 'robot_dragon',
      title: 'Robot de Dragón',
      type: 'toy'
    },
    {
      description: 'Robot de elefante de juguete con 4 extremidades móviles y cabeza giratoria. Hecho de plástico ABS duradero y resistente a los golpes. Recomendado para niños de 3 años en adelante.',
      images: [
        'robot-1_A.jpg',
        'robot-1_B.jpg'
      ],
      price: 100,
      slug: 'robot_elefante',
      title: 'Robot de Elefante',
      type: 'toy'
    },
    {
      description: 'Robot de tigre de juguete con 4 extremidades móviles y cabeza giratoria. Hecho de plástico ABS duradero y resistente a los golpes. Recomendado para niños de 3 años en adelante.',
      images: [
        'robot-1_A.jpg',
        'robot-1_B.jpg'
      ],
      price: 100,
      slug: 'robot_tigre',
      title: 'Robot de Tigre',
      type: 'toy'
    },
    {
      description: 'Robot de caballo de juguete con 4 extremidades móviles y cabeza giratoria. Hecho de plástico ABS duradero y resistente a los golpes. Recomendado para niños de 3 años en adelante.',
      images: [
        'robot-1_A.jpg',
        'robot-1_B.jpg'
      ],
      price: 100,
      slug: 'robot_caballo',
      title: 'Robot de Caballo',
      type: 'toy'
    },
    {
      description: 'Robot de oso de juguete con 4 extremidades móviles y cabeza giratoria. Hecho de plástico ABS duradero y resistente a los golpes. Recomendado para niños de 3 años en adelante.',
      images: [
        'robot-1_A.jpg',
        'robot-1_B.jpg'
      ],
      price: 100,
      slug: 'robot_oso',
      title: 'Robot de Oso',
      type: 'toy'
    },
    // shoes
    {
      description: 'Zapatos de vestir de alta calidad con suela de goma y parte superior de cuero sintético. Disponible en tallas para niños y adultos.',
      images: [
        'shoe-1_A.jpg',
        'shoe-1_B.jpg'
      ],
      price: 100,
      slug: 'zapatos_de_vestir',
      title: 'Zapatos de vestir',
      type: 'shoe'
    },
    {
      description: 'Zapatos de salir para toda ocasión con suela de goma y parte superior de cuero sintético. Disponible en tallas para niños y adultos.',
      images: [
        'shoe-1_A.jpg',
        'shoe-1_B.jpg'
      ],
      price: 100,
      slug: 'zapatos_de_salir',
      title: 'Zapatos de salir',
      type: 'shoe'
    },
    {
      description: 'Zapatillas de deporte de alta calidad con suela de goma y parte superior de cuero sintético. Disponible en tallas para niños y adultos.',
      images: [
        'shoe-1_A.jpg',
        'shoe-1_B.jpg'
      ],
      price: 100,
      slug: 'zapatillas_de_deporte',
      title: 'Zapatillas de Deporte',
      type: 'shoe'
    },
    {
      description: 'Zapatos elegantes de alta calidad con suela de goma y parte superior de cuero sintético. Disponible en tallas para niños y adultos.',
      images: [
        'shoe-1_A.jpg',
        'shoe-1_B.jpg'
      ],
      price: 100,
      slug: 'zapatos_elegantes',
      title: 'Zapatos elegantes',
      type: 'shoe'
    },
    {
      description: 'Tennis deportivos de alta calidad con suela de goma y parte superior de cuero sintético. Disponible en tallas para niños y adultos.',
      images: [
        'shoe-1_A.jpg',
        'shoe-1_B.jpg'
      ],
      price: 100,
      slug: 'tennis_deportivos_soccer',
      title: 'Tennis Deportivos Soccer',
      type: 'shoe'
    },
    {
      description: 'Zapatos casuales cómodos con suela de goma y parte superior de cuero sintético. Perfectos para el uso diario. Disponible en tallas para niños y adultos.',
      images: [
        'shoe-1_A.jpg',
        'shoe-1_B.jpg'
      ],
      price: 90,
      slug: 'zapatos_casuales',
      title: 'Zapatos Casuales',
      type: 'shoe'
    },
    {
      description: 'Botas de trabajo resistentes con suela antideslizante y parte superior de cuero sintético. Ideal para condiciones exigentes. Disponible en tallas para niños y adultos.',
      images: [
        'shoe-1_A.jpg',
        'shoe-1_B.jpg'
      ],
      price: 120,
      slug: 'botas_de_trabajo',
      title: 'Botas de Trabajo',
      type: 'shoe'
    },
    {
      description: 'Sandalias de verano ligeras con suela de goma y correas ajustables. Perfectas para días cálidos y relajados. Disponible en tallas para niños y adultos.',
      images: [
        'shoe-1_A.jpg',
        'shoe-1_B.jpg'
      ],
      price: 70,
      slug: 'sandalias_de_verano',
      title: 'Sandalias de Verano',
      type: 'shoe'
    },
    {
      description: 'Mocasines elegantes con suela de goma y parte superior de cuero sintético. Combinan estilo y comodidad. Disponible en tallas para niños y adultos.',
      images: [
        'shoe-1_A.jpg',
        'shoe-1_B.jpg'
      ],
      price: 110,
      slug: 'mocasines_elegantes',
      title: 'Mocasines Elegantes',
      type: 'shoe'
    },
    {
      description: 'Zapatos de senderismo duraderos con suela de goma antideslizante y parte superior de cuero sintético resistente al agua. Ideal para aventuras al aire libre. Disponible en tallas para niños y adultos.',
      images: [
        'shoe-1_A.jpg',
        'shoe-1_B.jpg'
      ],
      price: 130,
      slug: 'zapatos_de_senderismo',
      title: 'Zapatos de Senderismo',
      type: 'shoe'
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
