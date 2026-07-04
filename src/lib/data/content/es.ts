import { CategoryContent, ProductContent, PostContent, CategorySlug } from "@/lib/types";

export const categories: Record<CategorySlug, CategoryContent> = {
  "korean-food": {
    name: "Comida Coreana",
    description:
      "Ramyun, snacks y productos básicos de despensa de Corea, disponibles en Amazon y que vale la pena agregar a tu carrito.",
  },
  "k-beauty": {
    name: "K-Beauty",
    description: "Cuidado de la piel y cosméticos de marcas coreanas de confianza, todo disponible en Amazon.",
  },
  "baby-kids": {
    name: "Bebés y Niños",
    description: "Artículos esenciales de cuidado infantil coreanos a los que los padres siempre vuelven, disponibles en Amazon.",
  },
  "ipx-goods": {
    name: "Artículos de BT21 e IPX",
    description: "Mercancía de BT21 y otros personajes de IPX, desde peluches hasta accesorios de uso diario.",
  },
};

export const products: Record<string, ProductContent> = {
  "shin-ramyun-multipack": {
    name: "Shin Ramyun Multipack",
    brand: "Nongshim",
    summary: "El ramyun más icónico de Corea, en un paquete múltiple que sale más barato por porción.",
    description:
      "Un ramyun picante con caldo de res y fideos elásticos que ha sido un básico en los hogares coreanos durante décadas. Comprar el paquete múltiple en lugar de paquetes individuales reduce notablemente el costo por porción, lo cual importa si lo repones con regularidad.",
    highlights: [
      "Sabor intenso y picante de caldo de res",
      "El paquete múltiple reduce el costo por porción frente a comprar paquetes individuales",
      "Solo necesitas una olla, no hace falta microondas",
    ],
  },
  "buldak-hot-chicken-noodle": {
    name: "Fideos Buldak Hot Chicken",
    brand: "Samyang",
    summary: "Los fideos de fuego originales detrás del viral reto de picante.",
    description:
      "El fideo que dio origen a miles de videos de retos en YouTube. Si a ti o a alguien que conoces le gusta el picante extremo, este es el referente. Además del original, busca las variantes Carbonara y Jjajang, que son más suaves y vale la pena comparar en precio por paquete.",
    highlights: [
      "El fideo detrás del viral reto de picante",
      "Variantes Carbonara y Jjajang disponibles a distintos precios",
      "Estilo salteado, sin caldo",
    ],
  },
  "orion-choco-pie": {
    name: "Orion Choco Pie",
    brand: "Orion",
    summary: "Suave malvavisco envuelto en bizcocho cubierto de chocolate: un clásico de los snacks coreanos.",
    description:
      "Dos capas de bizcocho suave, un centro de malvavisco y una cobertura de chocolate. Es un básico en el pasillo de snacks en Corea y viaja bien, por eso las cajas suelen aparecer a buen precio por unidad en Amazon. Ideal para surtir un cajón de snacks o para regalar.",
    highlights: [
      "Envueltos individualmente, fáciles de repartir en porciones",
      "Se conservan bien a temperatura ambiente, sin necesidad de refrigeración",
      "El formato en caja suele tener mejor precio por pieza que los snacks sueltos",
    ],
  },
  "roasted-seaweed-snack": {
    name: "Snacks de Alga Tostada",
    brand: "Gwangcheon",
    summary: "Snacks de alga crujientes y ligeramente salados, con un toque final de aceite de sésamo.",
    description:
      "Hojas empacadas individualmente y sazonadas con aceite de sésamo y sal. Bajas en calorías, fáciles de llevar en una bolsa, y un snack que funciona tanto para niños como para adultos. Las cajas con varios paquetes suelen tener mejor precio por hoja que los paquetes individuales.",
    highlights: [
      "Empacadas individualmente para mantener frescura y facilidad de transporte",
      "Opción de snack bajo en calorías",
      "Los paquetes múltiples suelen costar menos por hoja",
    ],
  },
  "cosrx-snail-mucin-essence": {
    name: "COSRX Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    summary: "La esencia hidratante favorita de culto del K-beauty.",
    description:
      "Elaborada con 96% de filtrado de secreción de caracol, esta esencia se ha mantenido como un producto superventas por buenas razones: es ligera, hidratante y suficientemente suave para pieles sensibles. Un punto de entrada razonable si eres nuevo en el cuidado de la piel coreano.",
    highlights: [
      "96% de filtrado de secreción de caracol",
      "Textura de gel ligera que se absorbe rápido",
      "Uno de los productos más vendidos de K-beauty a largo plazo",
    ],
  },
  "innisfree-green-tea-serum": {
    name: "Innisfree Green Tea Seed Serum",
    brand: "Innisfree",
    summary: "Un sérum hidratante elaborado con extracto de semilla de té verde de Jeju.",
    description:
      "Formulado con aceite y extracto de semilla de té verde cultivado en la isla de Jeju. Su textura acuosa se absorbe rápido sin sentirse pesada, lo que lo convierte en una buena opción de uso diario incluso para piel grasa o mixta.",
    highlights: [
      "Elaborado con aceite de semilla de té verde cultivado en Jeju",
      "Textura ligera de absorción rápida",
      "Funciona bien en pieles grasas y mixtas",
    ],
  },
  "drjart-cicapair-cream": {
    name: "Dr. Jart+ Cicapair Cream",
    brand: "Dr. Jart+",
    summary: "Una crema a base de centella que calma el enrojecimiento y la irritación.",
    description:
      "Elaborada con extracto de centella asiática, esta crema está diseñada para calmar la piel sensibilizada o irritada. Su tono verdoso también cumple una función correctora del color, por lo que algunas personas la usan como base de maquillaje en los días de más enrojecimiento.",
    highlights: [
      "Fórmula calmante a base de centella asiática",
      "El tono verde ayuda a corregir el enrojecimiento",
      "Una opción consolidada para piel sensible",
    ],
  },
  "missha-time-revolution-essence": {
    name: "Missha Time Revolution The First Treatment Essence",
    brand: "Missha",
    summary: "Una esencia de levadura fermentada que es una de las mejores opciones de valor en K-beauty.",
    description:
      "Formulada con filtrado de levadura fermentada, esta esencia es un paso diario popular para suavizar la textura de la piel. Suele mencionarse como una de las formas más económicas de probar una esencia de K-beauty a base de fermentación.",
    highlights: [
      "Fórmula con filtrado de levadura fermentada",
      "Suficientemente ligera para uso diario",
      "Una de las esencias de K-beauty con mejor relación calidad-precio del mercado",
    ],
  },
  "baby-water-wipes": {
    name: "Toallitas Húmedas para Bebé MotherK",
    brand: "MotherK",
    summary: "Toallitas suaves y seguras para recién nacidos, vendidas en paquetes grandes que bajan el costo por toallita.",
    description:
      "Formuladas para ser lo bastante suaves para la piel de un recién nacido. Comprarlas al por mayor reduce de forma considerable el costo por toallita en comparación con los paquetes individuales, algo que se nota rápido para los padres que las usan a diario. Conviene tener un paquete pequeño para salidas y uno grande para reponer en casa.",
    highlights: [
      "Suficientemente suaves para la piel de un recién nacido",
      "Los paquetes grandes cuestan menos por toallita que los individuales",
      "Buena combinación: paquete de viaje para salidas y paquete grande para casa",
    ],
  },
  "baby-strawberry-lotion": {
    name: "Loción de Fresa para Bebé Gung",
    brand: "Gung",
    summary: "Una loción suave de absorción rápida para el cuidado de la piel del bebé después del baño.",
    description:
      "Una loción ligeramente perfumada diseñada para la piel sensible del recién nacido, pensada para usarse justo después del baño. Se absorbe rápido sin sensación grasosa, lo que ayuda a que la rutina antes de dormir sea breve.",
    highlights: [
      "Fórmula de bajo riesgo de irritación, apta desde el nacimiento",
      "Se absorbe rápido y deja poco residuo",
      "Tamaño adecuado para una rutina diaria después del baño",
    ],
  },
  "premium-baby-diapers": {
    name: "Pañales Premium Sundooni",
    brand: "Sundooni",
    summary: "Pañales delgados pero absorbentes vendidos por talla; vale la pena comparar el costo por pañal entre tallas.",
    description:
      "Un pañal delgado que sigue rindiendo bien en absorción, hecho con un material transpirable que resulta más cómodo para uso prolongado. Disponible en tallas desde recién nacido hasta niño pequeño; vale la pena revisar el precio por pañal en cada talla, ya que la cantidad por caja varía.",
    highlights: [
      "Perfil delgado sin sacrificar la absorción",
      "Material transpirable para un uso más prolongado",
      "Disponible en tallas de recién nacido a niño pequeño: compara el costo por pañal según la caja",
    ],
  },
  "baby-food-storage-set": {
    name: "Set de Almacenamiento de Comida para Bebé Agad",
    brand: "Agad",
    summary: "Recipientes aptos para congelador con marcas de medición para porcionar comida de bebé.",
    description:
      "Diseñado para porcionar y congelar comida casera para bebé, con marcas de volumen impresas en el recipiente para medir sin necesidad de herramientas adicionales. Hecho de un material apto tanto para microondas como para vaporera, lo que simplifica recalentar la comida.",
    highlights: [
      "Las marcas de volumen facilitan porcionar la comida",
      "Material apto para microondas y vaporera",
      "Pensado para almacenamiento en congelador y recalentado rápido",
    ],
  },
  "bt21-mini-plush-set": {
    name: "Set de Mini Peluches BT21",
    brand: "BT21 (IPX)",
    summary: "Un set de mini peluches con los personajes principales de BT21.",
    description:
      "Un set compacto de peluches que incluye a los personajes favoritos de los fans de BT21, como Cooky, Tata y Koya. Suficientemente pequeños para colgar de una bolsa o poner sobre un escritorio, y una opción común para regalar a un fan de BT21.",
    highlights: [
      "Incluye personajes favoritos de los fans como Cooky, Tata y Koya",
      "Tamaño compacto, ideal para bolsas o escritorios",
      "Una opción de regalo popular para fans de BT21",
    ],
  },
  "bt21-baby-cushion": {
    name: "Cojín de Personaje BT21 Baby",
    brand: "BT21 (IPX)",
    summary: "Un cojín suave con los personajes de la línea BT21 Baby.",
    description:
      "Un cojín de peluche con el diseño más redondeado y suave de la línea BT21 Baby. Funciona tanto como pieza de colección como cojín decorativo realmente utilizable en un sofá o una cama.",
    highlights: [
      "Material suave y afelpado",
      "Funciona como decoración del hogar y como pieza de colección para fans",
      "Diseño de personaje de la línea BT21 Baby",
    ],
  },
  "bt21-sticker-pack": {
    name: "Pack de Stickers BT21",
    brand: "BT21 (IPX)",
    summary: "Un set de stickers de personajes de BT21 para decorar cuadernos, laptops y más.",
    description:
      "Una forma económica de empezar a coleccionar mercancía de BT21; ideal para decorar una agenda, una laptop o una funda de teléfono. Muchos packs usan un recubrimiento resistente al agua, por lo que aguantan bien en botellas de agua y otros artículos de uso al aire libre.",
    highlights: [
      "Punto de entrada económico a la mercancía de BT21",
      "Recubrimiento resistente al agua en muchos packs",
      "Ideal para laptops, agendas y fundas de teléfono",
    ],
  },
  "bt21-tumbler": {
    name: "Vaso Térmico de Personajes BT21",
    brand: "BT21 (IPX)",
    summary: "Un vaso térmico de uso diario con estampado de personajes de BT21.",
    description:
      "Un vaso térmico aislado con gráficos de personajes de BT21, pensado para uso frecuente en el trayecto al trabajo o en la escuela. Una opción práctica si quieres un artículo de BT21 que realmente uses todos los días en lugar de dejarlo en un estante.",
    highlights: [
      "Aislamiento térmico para bebidas frías o calientes",
      "Estampado de personajes de BT21",
      "Un artículo práctico de uso diario, también popular como regalo",
    ],
  },
};

export const posts: Record<string, PostContent> = {
  "korean-snacks-summer-top-picks": {
    title: "4 Snacks Coreanos que Vale la Pena Pedir en Amazon Este Verano",
    excerpt:
      "¿No tienes un supermercado coreano cerca? Aquí tienes cuatro snacks y ramyun que suelen aparecer como buenas compras en Amazon.",
    body: [
      "Si se te antoja comida coreana pero no tienes un supermercado coreano cerca, pedir un paquete múltiple en línea suele ser la opción más práctica. Aquí tienes cuatro snacks que aparecen una y otra vez como opciones sólidas para compradores en Estados Unidos que navegan en Amazon.",
      "El primero es Shin Ramyun, un ramyun picante con caldo de res que suele ser lo primero que la gente vuelve a comprar después de probarlo. Comprar el paquete múltiple en lugar de paquetes individuales reduce el precio por porción, algo que vale la pena si lo comes con regularidad.",
      "Si te gusta el picante, los Fideos Buldak Hot Chicken son los fideos detrás de los videos virales del reto de picante. Es un fideo estilo salteado en lugar de sopa, así que es una experiencia distinta a la del Shin Ramyun; vale la pena probar ambos.",
      "Para algo dulce, el Orion Choco Pie combina dos capas de bizcocho suave con un centro de malvavisco y una cobertura de chocolate. Viene en caja, lo que suele ser mejor negocio por pieza que comprar snacks sueltos, y viaja bien para loncheras o para picar en la oficina.",
      "Por último, si buscas algo más ligero o estás cuidando las calorías, los snacks de alga tostada son una opción crujiente y ligeramente salada. Las hojas empacadas individualmente son fáciles de llevar en una bolsa, y los paquetes múltiples suelen ser la mejor compra por hoja.",
      "Si todavía no has probado alguno de estos, quizás valga la pena agregarlo a tu próximo pedido de Amazon.",
    ],
  },
  "k-beauty-daily-skincare-routine-guide": {
    title: "Una Rutina Sencilla de K-Beauty en 4 Pasos para Principiantes",
    excerpt:
      "El K-beauty tiene fama de rutinas de 10 pasos, pero puedes obtener buenos resultados con solo cuatro productos.",
    body: [
      "El K-beauty suele asociarse con elaboradas rutinas de 10 pasos, pero no necesitas tantos productos para ver resultados. Aquí tienes una rutina sencilla de 4 pasos para quien recién empieza, usando productos fáciles de encontrar en Amazon.",
      "El paso uno es una esencia hidratante. Aplicada justo después de la limpieza, algo como la Snail Mucin Essence de COSRX es un buen punto de partida: es suave para piel sensible y se ha mantenido como producto superventas por buenas razones.",
      "El paso dos es una esencia fermentada. La esencia Time Revolution de Missha usa filtrado de levadura fermentada y suele mencionarse como una de las opciones con mejor relación calidad-precio si quieres probar un producto a base de fermentación sin gastar mucho.",
      "El paso tres es un sérum. El Green Tea Seed Serum de Innisfree tiene una textura acuosa que funciona bien incluso en piel grasa o mixta, lo que lo convierte en una buena opción de uso diario.",
      "El paso cuatro es una crema para terminar. En los días en que tu piel se siente irritada o enrojecida, la Cicapair Cream de Dr. Jart+ está elaborada a base de centella asiática para calmarla, y su tono verdoso también funciona como base correctora del color bajo el maquillaje.",
      "No necesitas comprar los cuatro productos a la vez: empieza con el paso que corresponda a tu inquietud actual de piel y ve construyendo el resto de la rutina desde ahí.",
    ],
  },
  "newborn-essentials-checklist": {
    title: "Una Lista de Esenciales para Recién Nacidos para Padres Primerizos",
    excerpt:
      "¿No sabes por dónde empezar a prepararte para un recién nacido? Aquí tienes una lista de esenciales que vale la pena tener listos.",
    body: [
      "Prepararse para un recién nacido viene con una lista abrumadora de cosas por comprar. Aquí tienes cuatro esenciales que vale la pena priorizar antes de que llegue el bebé, según lo que suele acabarse más rápido.",
      "Las toallitas húmedas son el artículo que se acabará más rápido. Comprar unas suaves y seguras para recién nacidos al por mayor reduce de forma considerable el costo por toallita en comparación con los paquetes individuales, algo útil durante las primeras semanas de falta de sueño, cuando no quieres estar reordenando constantemente.",
      "Una loción suave para después del baño es lo siguiente. Una loción ligeramente perfumada y de bajo riesgo de irritación mantiene breve la rutina antes de dormir y funciona bien para la piel sensible de un recién nacido.",
      "Al principio, vale la pena comprar pañales en cantidades pequeñas de varias tallas y marcas, ya que los bebés varían en forma corporal y ajuste. Una vez que encuentres el que funciona, comprar esa talla al por mayor es donde realmente se nota el ahorro por pañal.",
      "Cuando empieces con los sólidos, los recipientes aptos para congelador con marcas de volumen facilitan mucho porcionar la comida del bebé; busca unos que también sean aptos para microondas y vaporera para que recalentar sea sencillo.",
      "No necesitas tener todo listo de una vez. Empieza con estos esenciales y agrega artículos conforme cambien las necesidades de tu bebé.",
    ],
  },
  "bt21-ipx-goods-beginner-guide": {
    title: "Una Guía para Principiantes sobre Mercancía de BT21: Por Dónde Empezar",
    excerpt:
      "¿Eres nuevo en BT21? Aquí tienes un resumen de las categorías de mercancía y cuál tiene más sentido para empezar.",
    body: [
      "BT21, la propiedad intelectual de personajes de IPX, ha construido una base de fans leales en todo el mundo gracias a sus personajes. Si eres nuevo en coleccionar y no sabes por dónde empezar, aquí tienes un desglose por categoría de mercancía.",
      "El punto de entrada de menor compromiso es un pack de stickers: económico, y una buena forma de familiarizarte con los personajes mientras decoras un cuaderno o una laptop. Busca packs con recubrimiento resistente al agua si quieres que también aguanten en botellas de agua.",
      "Si quieres algo que realmente uses a diario, un vaso térmico es una buena opción. Es una forma sencilla de incorporar BT21 a tu rutina sin que se quede guardado en un estante.",
      "¿Listo para empezar una colección de verdad? Un set de mini peluches con personajes como Cooky, Tata y Koya es un siguiente paso común: suficientemente pequeños para colgar de una bolsa, y un regalo popular para los fans.",
      "Si quieres algo para tu cuarto, un cojín de la línea BT21 Baby es suave, funciona como cojín decorativo de verdad y sigue contando como pieza de colección.",
      "Sin importar con qué categoría empieces, una pequeña pieza de mercancía de BT21 es una forma sencilla de agregarle un poco de diversión a tu día.",
    ],
  },
};
