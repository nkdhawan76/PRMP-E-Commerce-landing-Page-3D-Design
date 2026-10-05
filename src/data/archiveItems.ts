export interface ArchiveItem {
  id: number;
  code: string;
  title: string;
  category: string;
  season: string;
  price: string;
  fabric: string;
  edition: string;
  imageUrl: string;
  description: string;
  details: string[];
}

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 1,
    code: "PRMPT-001",
    title: "Structural Monolith Parka",
    category: "Outerwear",
    season: "AW26",
    price: "$97,33",
    fabric: "High-density technical bonded nylon",
    edition: "Batch 01 / 80 units",
    imageUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104530_521b2f85-c0f3-4d0e-9704-b578315b4cb9.png&w=1920&q=85",
    description: "An architectural silhouette cut with sculpted drape lines, waterproof taped inner seams, and oversized brutalist storm flap closure.",
    details: ["Laser cut hems", "Exclusion mix-blend hardware", "Ergonomic articulated sleeves", "Made in Tokyo atelier"]
  },
  {
    id: 2,
    code: "PRMPT-002",
    title: "Deconstructed Tailored Blazer",
    category: "Tailoring",
    season: "AW26",
    price: "$97,33",
    fabric: "Raw Japanese wool twill & cupro lining",
    edition: "Batch 01 / 65 units",
    imageUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103711_76ccdb8b-5043-4f47-9c54-4379713393ea.png&w=1920&q=85",
    description: "Angular shoulder pad geometry contrasting with unfinished raw edge accents and asymmetric single-button fastening.",
    details: ["Floating canvas construction", "Horn button hardware", "Internal harness strapping", "Hand finished stitchwork"]
  },
  {
    id: 3,
    code: "PRMPT-003",
    title: "Draped Asymmetric Knit",
    category: "Knitwear",
    season: "AW26",
    price: "$97,33",
    fabric: "Extra-fine merino wool & recycled silk yarn",
    edition: "Batch 01 / 50 units",
    imageUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103728_394f6a1b-85e2-4386-a4f6-408472a0a5b7.png&w=1920&q=85",
    description: "Engineered ribbing that gathers tension across the collarbone, producing a kinetic spiral drape as the body moves in space.",
    details: ["Seamless circular knit technique", "Extended thumbhole cuffs", "Multi-gauge tension zoning", "Natural garment wash"]
  },
  {
    id: 4,
    code: "PRMPT-004",
    title: "Parachute Cargo Trousers",
    category: "Bottoms",
    season: "AW26",
    price: "$97,33",
    fabric: "Weather-resistant ripstop cotton blend",
    edition: "Batch 01 / 90 units",
    imageUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc.png&w=1920&q=85",
    description: "Voluminous wide-leg cut with dual bellows cargo pockets and bungee hem cinching to transition between balloon and straight silhouettes.",
    details: ["Fidlock magnetic utility clasp", "Reinforced double knee panels", "Concealed passport pocket", "Water repellent finish"]
  },
  {
    id: 5,
    code: "PRMPT-005",
    title: "Cocoon Funnel Cape",
    category: "Outerwear",
    season: "AW26",
    price: "$97,33",
    fabric: "Double-faced virgin melton wool",
    edition: "Batch 01 / 40 units",
    imageUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37.png&w=1920&q=85",
    description: "Sculptural cocoon architecture with an exaggerated stand funnel neck and hidden arm slits for unrestricted utility.",
    details: ["Hand-rolled boundary piping", "Internal storm belt", "Heavyweight 620gsm melton", "Limited numbered edition"]
  },
  {
    id: 6,
    code: "PRMPT-006",
    title: "Distressed Modular Hood",
    category: "Tops",
    season: "AW26",
    price: "$97,33",
    fabric: "500gsm vintage loopback French terry",
    edition: "Batch 01 / 110 units",
    imageUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c.png&w=1920&q=85",
    description: "Sun-faded pigment dyed sweatshirt with modular detachable balaclava panel and dropped shoulder proportions.",
    details: ["Individual distress patina", "Raw rolled neckline", "Ribbed side gussets", "Heavy metal hardware"]
  },
  {
    id: 7,
    code: "PRMPT-007",
    title: "Cinched Bonded Trench",
    category: "Outerwear",
    season: "AW26",
    price: "$97,33",
    fabric: "3-layer membrane technical twill",
    edition: "Batch 01 / 55 units",
    imageUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103808_013583d0-3386-4547-9832-37c7d8edb3ac.png&w=1920&q=85",
    description: "Reimagined military trench featuring an off-center front overlap, deep wind flap, and wide seatbelt webbing belt.",
    details: ["20,000mm hydrostatic head", "Matte black snap closures", "Ventilated back storm shield", "Thermal welded seams"]
  },
  {
    id: 8,
    code: "PRMPT-008",
    title: "Pleated Column Trousers",
    category: "Bottoms",
    season: "AW26",
    price: "$97,33",
    fabric: "Tropical wool and technical gabardine",
    edition: "Batch 01 / 70 units",
    imageUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103937_a0c49d0a-33eb-4ead-aea6-c1baf241acbc.png&w=1920&q=85",
    description: "Deep inverted knife pleats that open with stride movement, cascading into an immaculate floor-skimming column hem.",
    details: ["Internal curtain waistband", "Adjustable side waist tabs", "Creased front and back", "Deep slash pockets"]
  },
  {
    id: 9,
    code: "PRMPT-009",
    title: "Kinetic Layered Vest",
    category: "Vests",
    season: "AW26",
    price: "$97,33",
    fabric: "Ballistic nylon with PrimaLoft Gold insulation",
    edition: "Batch 01 / 75 units",
    imageUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103956_d18ed8fd-7b6f-4b86-91f9-20010fe38670.png&w=1920&q=85",
    description: "Tactical warmth module engineered for layering over heavy tailoring or beneath unlined outer shells.",
    details: ["Modular molle loop system", "Two-way waterproof YKK zip", "Micro-fleece lined handwarmers", "Interior document pouch"]
  },
  {
    id: 10,
    code: "PRMPT-010",
    title: "Signature Archive Shell",
    category: "Outerwear",
    season: "AW26",
    price: "$97,33",
    fabric: "Membrane composite with carbon ripstop grid",
    edition: "Batch 01 / 50 units",
    imageUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104034_ba5a9963-87ff-4008-a545-6bd686c088b5.png&w=1920&q=85",
    description: "The definitive hero piece of the Prompt Archive. Featuring geometric paneling, anatomical hood, and reflective boundary tape.",
    details: ["Laser engraved serial tag", "Integrated audio cable routing", "Adjustable storm visor", "Full archive provenance"]
  }
];

export const VIDEO_LEFT = "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4";
export const VIDEO_RIGHT = "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4";

export const CIRCLE_SYMBOLS = ["8", "$", "^^", "%", "/"];
