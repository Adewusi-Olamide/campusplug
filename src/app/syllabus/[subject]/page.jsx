"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

import "./page.css";

const syllabusData = {
  "use-of-english": {
    name: "Use of English",
    description:
      "JAMB UTME Use of English syllabus covering comprehension, summary, lexis and structure, oral forms and prescribed reading.",
    topics: [
      {
        title: "Comprehension and Summary",
        subtopics: [
          "Reading comprehension",
          "Main ideas",
          "Supporting details",
          "Inference",
          "Meaning of words in context",
          "Summary and synthesis of ideas",
        ],
      },
      {
        title: "Lexis and Structure",
        subtopics: [
          "Synonyms",
          "Antonyms",
          "Homonyms",
          "Word classes",
          "Clause and sentence patterns",
          "Tense, aspect and mood",
          "Agreement and concord",
          "Punctuation and spelling",
          "Idiomatic expressions",
        ],
      },
      {
        title: "Oral Forms",
        subtopics: [
          "Vowels",
          "Diphthongs",
          "Consonants",
          "Consonant clusters",
          "Rhymes and homophones",
          "Word stress",
          "Emphatic stress",
          "Intonation",
        ],
      },
      {
        title: "Prescribed Text",
        subtopics: [
          "The Lekki Headmaster",
          "Themes",
          "Characters",
          "Plot and events",
          "Language and style",
        ],
      },
    ],
  },

  mathematics: {
    name: "Mathematics",
    description:
      "JAMB UTME Mathematics syllabus covering number, algebra, geometry, trigonometry, statistics and probability.",
    topics: [
      {
        title: "Number and Numeration",
        subtopics: [
          "Number bases",
          "Fractions and decimals",
          "Percentages",
          "Ratio and proportion",
          "Approximation and estimation",
          "Indices",
          "Logarithms",
          "Sets",
        ],
      },
      {
        title: "Algebra",
        subtopics: [
          "Algebraic expressions",
          "Linear equations",
          "Simultaneous equations",
          "Quadratic equations",
          "Inequalities",
          "Variation",
          "Sequences and series",
        ],
      },
      {
        title: "Geometry",
        subtopics: [
          "Lines and angles",
          "Triangles",
          "Polygons",
          "Circles",
          "Mensuration",
          "Geometrical constructions",
          "Coordinate geometry",
        ],
      },
      {
        title: "Trigonometry",
        subtopics: [
          "Trigonometric ratios",
          "Sine and cosine rules",
          "Angles of elevation",
          "Angles of depression",
          "Bearings",
          "Simple trigonometric equations",
        ],
      },
      {
        title: "Statistics and Probability",
        subtopics: [
          "Data collection",
          "Frequency tables",
          "Graphs and charts",
          "Mean",
          "Median",
          "Mode",
          "Measures of dispersion",
          "Probability",
        ],
      },
      {
        title: "Calculus",
        subtopics: [
          "Limits",
          "Differentiation",
          "Applications of differentiation",
          "Integration",
          "Applications of integration",
        ],
      },
    ],
  },

  physics: {
    name: "Physics",
    description:
      "JAMB UTME Physics syllabus covering measurement, mechanics, heat, waves, electricity, magnetism and modern physics.",
    topics: [
      {
        title: "Measurement and Units",
        subtopics: [
          "Physical quantities",
          "Fundamental units",
          "Derived units",
          "Dimensions",
          "Measurement instruments",
          "Errors and accuracy",
        ],
      },
      {
        title: "Motion",
        subtopics: [
          "Distance and displacement",
          "Speed and velocity",
          "Acceleration",
          "Motion graphs",
          "Projectile motion",
          "Relative motion",
        ],
      },
      {
        title: "Force and Motion",
        subtopics: [
          "Newton's laws",
          "Inertia",
          "Momentum",
          "Impulse",
          "Conservation of momentum",
          "Friction",
          "Circular motion",
        ],
      },
      {
        title: "Work, Energy and Power",
        subtopics: [
          "Work",
          "Energy",
          "Kinetic energy",
          "Potential energy",
          "Power",
          "Conservation of energy",
          "Machines",
        ],
      },
      {
        title: "Gravitational Field",
        subtopics: [
          "Universal gravitation",
          "Gravitational field",
          "Gravitational potential",
          "Acceleration due to gravity",
          "Mass and weight",
          "Escape velocity",
          "Weightlessness",
        ],
      },
      {
        title: "Heat",
        subtopics: [
          "Temperature",
          "Thermal expansion",
          "Heat transfer",
          "Specific heat capacity",
          "Latent heat",
          "Change of state",
          "Gas laws",
        ],
      },
      {
        title: "Waves",
        subtopics: [
          "Wave motion",
          "Wave properties",
          "Sound",
          "Light",
          "Reflection",
          "Refraction",
          "Diffraction",
          "Interference",
        ],
      },
      {
        title: "Electricity",
        subtopics: [
          "Electric charge",
          "Electric field",
          "Current",
          "Potential difference",
          "Resistance",
          "Ohm's law",
          "Electrical circuits",
          "Electrical energy and power",
        ],
      },
      {
        title: "Magnetism",
        subtopics: [
          "Magnetic fields",
          "Electromagnets",
          "Force on current-carrying conductors",
          "Electromagnetic induction",
          "Transformers",
          "Applications of magnetism",
        ],
      },
      {
        title: "Modern Physics",
        subtopics: [
          "Atomic structure",
          "Radioactivity",
          "Nuclear reactions",
          "Nuclear energy",
          "Photoelectric effect",
          "Basic quantum concepts",
        ],
      },
    ],
  },

chemistry: {
    name: "Chemistry",
    description:
      "JAMB UTME Chemistry syllabus covering matter, atomic structure, bonding, chemical reactions, organic chemistry and environmental chemistry.",
    topics: [
      {
        title: "Separation Techniques",
        subtopics: [
          "Pure and impure substances",
          "Mixtures",
          "Filtration",
          "Distillation",
          "Crystallization",
          "Chromatography",
          "Sublimation",
        ],
      },
      {
        title: "Chemical Combination",
        subtopics: [
          "Laws of chemical combination",
          "Relative atomic mass",
          "Relative molecular mass",
          "Mole concept",
          "Chemical formulae",
          "Stoichiometric calculations",
        ],
      },
      {
        title: "Atomic Structure and Bonding",
        subtopics: [
          "Atoms, molecules and ions",
          "Atomic number",
          "Mass number",
          "Isotopes",
          "Electron configuration",
          "Periodic table",
          "Ionic bonding",
          "Covalent bonding",
          "Metallic bonding",
          "Hydrogen bonding",
        ],
      },
      {
        title: "States of Matter",
        subtopics: [
          "Kinetic theory",
          "Solids",
          "Liquids",
          "Gases",
          "Gas laws",
          "Ideal gas equation",
          "Vapour density",
        ],
      },
      {
        title: "Acids, Bases and Salts",
        subtopics: [
          "Properties of acids",
          "Properties of bases",
          "pH",
          "Indicators",
          "Neutralization",
          "Salt preparation",
          "Solubility",
        ],
      },
      {
        title: "Redox and Electrochemistry",
        subtopics: [
          "Oxidation",
          "Reduction",
          "Oxidizing agents",
          "Reducing agents",
          "Electrolysis",
          "Electrochemical cells",
          "Faraday's laws",
        ],
      },
      {
        title: "Chemical Energetics",
        subtopics: [
          "Heat changes",
          "Exothermic reactions",
          "Endothermic reactions",
          "Energy profiles",
          "Bond energy",
        ],
      },
      {
        title: "Organic Chemistry",
        subtopics: [
          "Hydrocarbons",
          "Alkanes",
          "Alkenes",
          "Alkynes",
          "Aromatic compounds",
          "Alcohols",
          "Aldehydes and ketones",
          "Carboxylic acids",
          "Esters",
          "Polymers",
        ],
      },
      {
        title: "Chemistry and Environment",
        subtopics: [
          "Water pollution",
          "Air pollution",
          "Industrial pollution",
          "Greenhouse gases",
          "Ozone depletion",
          "Environmental protection",
        ],
      },
    ],
  },

  biology: {
    name: "Biology",
    description:
      "JAMB UTME Biology syllabus covering living organisms, organisation, nutrition, ecology, genetics, evolution and physiology.",
    topics: [
      {
        title: "Organisation of Life",
        subtopics: [
          "Characteristics of living organisms",
          "Cell structure",
          "Cell functions",
          "Levels of organisation",
          "Cell theory",
        ],
      },
      {
        title: "Forms and Functions",
        subtopics: [
          "Plant tissues",
          "Animal tissues",
          "Support and movement",
          "Adaptation",
          "Structural adaptations",
          "Behavioural adaptations",
        ],
      },
      {
        title: "Nutrition",
        subtopics: [
          "Modes of nutrition",
          "Photosynthesis",
          "Mineral nutrition",
          "Human nutrition",
          "Digestive system",
          "Balanced diet",
          "Deficiency diseases",
        ],
      },
      {
        title: "Transport",
        subtopics: [
          "Transport in plants",
          "Transport in animals",
          "Blood",
          "Heart",
          "Circulatory system",
          "Transpiration",
          "Translocation",
        ],
      },
      {
        title: "Respiration",
        subtopics: [
          "Aerobic respiration",
          "Anaerobic respiration",
          "Energy release",
          "Respiratory organs",
          "Gas exchange",
        ],
      },
      {
        title: "Excretion",
        subtopics: [
          "Excretory products",
          "Kidney",
          "Lungs",
          "Skin",
          "Homeostasis",
        ],
      },
      {
        title: "Reproduction",
        subtopics: [
          "Asexual reproduction",
          "Sexual reproduction",
          "Reproductive organs",
          "Menstrual cycle",
          "Fertilization",
          "Pregnancy",
          "Plant reproduction",
        ],
      },
      {
        title: "Genetics and Evolution",
        subtopics: [
          "Heredity",
          "Variation",
          "Genes and chromosomes",
          "Genetic crosses",
          "Mutation",
          "Natural selection",
          "Evolution",
        ],
      },
      {
        title: "Ecology",
        subtopics: [
          "Ecosystems",
          "Food chains",
          "Food webs",
          "Energy flow",
          "Population",
          "Environmental factors",
          "Conservation",
          "Pollution",
        ],
      },
      {
        title: "Classification",
        subtopics: [
          "Kingdom classification",
          "Microorganisms",
          "Plants",
          "Invertebrates",
          "Vertebrates",
          "Economic importance of organisms",
        ],
      },
    ],
  },

  "agricultural-science": {
    name: "Agricultural Science",
    description:
      "JAMB UTME Agricultural Science syllabus covering farm management, soil, crops, livestock, agricultural economics and technology.",
    topics: [
      {
        title: "Basic Agricultural Concepts",
        subtopics: [
          "Meaning and importance of agriculture",
          "Agricultural development",
          "Problems of agricultural production",
          "Agricultural research",
        ],
      },
      {
        title: "Farm Management",
        subtopics: [
          "Farm planning",
          "Farm records",
          "Farm budgeting",
          "Farm accounts",
          "Farm machinery",
          "Sources of farm capital",
        ],
      },
      {
        title: "Soil Science",
        subtopics: [
          "Soil formation",
          "Soil profile",
          "Soil properties",
          "Soil fertility",
          "Soil organisms",
          "Soil conservation",
          "Soil erosion",
        ],
      },
      {
        title: "Crop Production",
        subtopics: [
          "Crop classification",
          "Crop propagation",
          "Planting methods",
          "Crop husbandry",
          "Harvesting",
          "Storage",
          "Crop pests and diseases",
        ],
      },
      {
        title: "Animal Production",
        subtopics: [
          "Farm animals",
          "Animal nutrition",
          "Animal health",
          "Animal breeding",
          "Livestock management",
          "Animal diseases",
        ],
      },
      {
        title: "Agricultural Economics",
        subtopics: [
          "Factors of production",
          "Demand and supply",
          "Marketing",
          "Farm labour",
          "Agricultural cooperatives",
          "Agricultural credit",
        ],
      },
      {
        title: "Forestry and Wildlife",
        subtopics: [
          "Forest resources",
          "Forest management",
          "Wildlife conservation",
          "Game reserves",
          "National parks",
        ],
      },
    ],
  },

economics: {
    name: "Economics",
    description:
      "JAMB UTME Economics syllabus covering economic principles, markets, production, national income, development and international trade.",
    topics: [
      {
        title: "Basic Economic Concepts",
        subtopics: [
          "Scarcity",
          "Choice",
          "Opportunity cost",
          "Scale of preference",
          "Factors of production",
          "Economic systems",
        ],
      },
      {
        title: "Demand and Supply",
        subtopics: [
          "Demand",
          "Supply",
          "Determinants",
          "Elasticity",
          "Market equilibrium",
          "Price determination",
        ],
      },
      {
        title: "Theory of Consumer Behaviour",
        subtopics: [
          "Utility",
          "Total and marginal utility",
          "Indifference curves",
          "Consumer equilibrium",
        ],
      },
      {
        title: "Production",
        subtopics: [
          "Division of labour",
          "Specialization",
          "Production scale",
          "Costs",
          "Revenue",
          "Productivity",
        ],
      },
      {
        title: "Market Structures",
        subtopics: [
          "Perfect competition",
          "Monopoly",
          "Monopolistic competition",
          "Oligopoly",
          "Price discrimination",
        ],
      },
      {
        title: "National Income",
        subtopics: [
          "GDP",
          "GNP",
          "NNP",
          "National income measurement",
          "Per capita income",
          "Limitations of national income statistics",
        ],
      },
      {
        title: "Money and Banking",
        subtopics: [
          "Meaning and functions of money",
          "Commercial banks",
          "Central bank",
          "Money supply",
          "Inflation",
          "Credit creation",
        ],
      },
      {
        title: "Public Finance",
        subtopics: [
          "Government revenue",
          "Taxation",
          "Government expenditure",
          "Public debt",
          "Fiscal policy",
        ],
      },
      {
        title: "Economic Development",
        subtopics: [
          "Economic growth",
          "Development indicators",
          "Population",
          "Unemployment",
          "Poverty",
          "Development planning",
        ],
      },
      {
        title: "International Trade",
        subtopics: [
          "Absolute advantage",
          "Comparative advantage",
          "Balance of trade",
          "Balance of payments",
          "Exchange rates",
          "International economic organisations",
        ],
      },
    ],
  },

  commerce: {
    name: "Commerce",
    description:
      "JAMB UTME Commerce syllabus covering trade, business organizations, finance, marketing, transportation and international trade.",
    topics: [
      {
        title: "Introduction to Commerce",
        subtopics: [
          "Meaning of commerce",
          "Scope of commerce",
          "Occupation",
          "Production",
          "Trade",
          "Aids to trade",
        ],
      },
      {
        title: "Trade",
        subtopics: [
          "Home trade",
          "Retail trade",
          "Wholesale trade",
          "Foreign trade",
          "Visible and invisible trade",
          "Balance of trade",
        ],
      },
      {
        title: "Purchase and Sale of Goods",
        subtopics: [
          "Enquiries",
          "Quotations",
          "Orders",
          "Invoices",
          "Terms of trade",
          "Terms of payment",
          "Cash and credit",
        ],
      },
      {
        title: "Business Organisations",
        subtopics: [
          "Sole proprietorship",
          "Partnership",
          "Limited liability companies",
          "Cooperatives",
          "Public corporations",
          "Franchising",
        ],
      },
      {
        title: "Banking and Finance",
        subtopics: [
          "Commercial banks",
          "Central bank",
          "Types of bank accounts",
          "Loans",
          "Credit facilities",
          "Insurance",
        ],
      },
      {
        title: "Marketing",
        subtopics: [
          "Meaning of marketing",
          "Market research",
          "Advertising",
          "Sales promotion",
          "Branding",
          "Packaging",
        ],
      },
      {
        title: "Transportation and Communication",
        subtopics: [
          "Road transport",
          "Rail transport",
          "Water transport",
          "Air transport",
          "Telecommunication",
          "Postal services",
        ],
      },
      {
        title: "International Trade",
        subtopics: [
          "Import trade",
          "Export trade",
          "Entrepot trade",
          "Trade documents",
          "Trade barriers",
          "Customs and ports authorities",
        ],
      },
    ],
  },

  accounting: {
    name: "Accounting",
    description:
      "JAMB UTME Accounting syllabus covering bookkeeping, financial statements, accounting principles and business records.",
    topics: [
      {
        title: "Introduction to Accounting",
        subtopics: [
          "Meaning of accounting",
          "Objectives of accounting",
          "Users of accounting information",
          "Accounting concepts",
          "Accounting principles",
        ],
      },
      {
        title: "Bookkeeping",
        subtopics: [
          "Source documents",
          "Books of original entry",
          "Ledger accounts",
          "Trial balance",
          "Double entry",
          "Errors and corrections",
        ],
      },
      {
        title: "Cash Book",
        subtopics: [
          "Single-column cash book",
          "Two-column cash book",
          "Three-column cash book",
          "Petty cash book",
          "Bank reconciliation",
        ],
      },
      {
        title: "Final Accounts",
        subtopics: [
          "Trading account",
          "Profit and loss account",
          "Statement of financial position",
          "Adjustments",
          "Depreciation",
          "Bad debts",
        ],
      },
      {
        title: "Manufacturing Accounts",
        subtopics: [
          "Manufacturing costs",
          "Prime cost",
          "Factory overhead",
          "Cost of production",
          "Manufacturing profit",
        ],
      },
      {
        title: "Partnership Accounts",
        subtopics: [
          "Partnership agreement",
          "Capital accounts",
          "Profit sharing",
          "Admission of partners",
          "Retirement of partners",
          "Dissolution",
        ],
      },
      {
        title: "Company Accounts",
        subtopics: [
          "Share capital",
          "Issue of shares",
          "Debentures",
          "Company financial statements",
          "Reserves",
          "Dividends",
        ],
      },
      {
        title: "Public Sector Accounting",
        subtopics: [
          "Government accounting",
          "Sources of government revenue",
          "Government expenditure",
          "Budgets",
          "Public funds",
        ],
      },
    ],
  },

government: {
    name: "Government",
    description:
      "JAMB UTME Government syllabus covering political concepts, institutions, Nigerian government and international relations.",
    topics: [
      {
        title: "Basic Concepts in Government",
        subtopics: [
          "Power",
          "Authority",
          "Legitimacy",
          "Sovereignty",
          "State",
          "Nation",
          "Political participation",
          "Political culture",
        ],
      },
      {
        title: "Forms of Government",
        subtopics: [
          "Monarchy",
          "Aristocracy",
          "Oligarchy",
          "Autocracy",
          "Republicanism",
          "Democracy",
        ],
      },
      {
        title: "Arms of Government",
        subtopics: [
          "Legislature",
          "Executive",
          "Judiciary",
          "Functions and powers",
          "Checks and balances",
          "Separation of powers",
        ],
      },
      {
        title: "Political Ideologies",
        subtopics: [
          "Capitalism",
          "Socialism",
          "Communism",
          "Fascism",
          "Nationalism",
        ],
      },
      {
        title: "Constitutions",
        subtopics: [
          "Meaning of constitution",
          "Types of constitution",
          "Constitutional development",
          "Constitutionalism",
          "Fundamental rights",
        ],
      },
      {
        title: "Nigerian Government",
        subtopics: [
          "Colonial administration",
          "Nationalist movements",
          "Military rule",
          "Civilian government",
          "Federalism",
          "Local government",
        ],
      },
      {
        title: "Political Parties and Elections",
        subtopics: [
          "Political parties",
          "Party systems",
          "Electoral systems",
          "Electoral commissions",
          "Voting",
          "Political participation",
        ],
      },
      {
        title: "Foreign Policy and International Relations",
        subtopics: [
          "Nigeria's foreign policy",
          "International organisations",
          "ECOWAS",
          "African Union",
          "United Nations",
          "Nigeria and the international community",
        ],
      },
    ],
  },

  history: {
    name: "History",
    description:
      "JAMB UTME History syllabus covering Nigerian history, African history and major developments in the wider world.",
    topics: [
      {
        title: "Early Nigerian History",
        subtopics: [
          "Early societies",
          "Archaeological discoveries",
          "Migration",
          "State formation",
          "Early political systems",
        ],
      },
      {
        title: "Pre-Colonial States",
        subtopics: [
          "Hausa states",
          "Kanem-Borno",
          "Oyo",
          "Benin",
          "Igbo political systems",
          "Niger Delta states",
        ],
      },
      {
        title: "Trans-Saharan Trade",
        subtopics: [
          "Origins",
          "Routes",
          "Major commodities",
          "Effects on West African states",
          "Islam and trade",
        ],
      },
      {
        title: "European Contact",
        subtopics: [
          "European exploration",
          "Missionary activities",
          "Trade",
          "British expansion",
          "Colonial administration",
        ],
      },
      {
        title: "Nationalism and Independence",
        subtopics: [
          "Nationalist movements",
          "Political associations",
          "Constitutional development",
          "Independence",
          "Early post-independence Nigeria",
        ],
      },
      {
        title: "Military Rule and Civil War",
        subtopics: [
          "Military coups",
          "Civil war",
          "Political developments",
          "Post-war reconstruction",
        ],
      },
      {
        title: "African History",
        subtopics: [
          "European imperialism",
          "Colonialism",
          "African nationalism",
          "Independence movements",
          "Apartheid",
        ],
      },
      {
        title: "World History",
        subtopics: [
          "Industrial Revolution",
          "First World War",
          "Second World War",
          "Cold War",
          "United Nations",
        ],
      },
    ],
  },

  geography: {
    name: "Geography",
    description:
      "JAMB UTME Geography syllabus covering physical geography, human geography, environment, map work and regional geography.",
    topics: [
      {
        title: "The Earth",
        subtopics: [
          "Shape and size of the earth",
          "Latitude and longitude",
          "Earth's movements",
          "Time zones",
          "International Date Line",
        ],
      },
      {
        title: "Rocks and Landforms",
        subtopics: [
          "Types of rocks",
          "Rock formation",
          "Tectonic forces",
          "Mountains",
          "Plateaus",
          "Plains",
          "Coastal landforms",
        ],
      },
      {
        title: "Volcanism and Earthquakes",
        subtopics: [
          "Volcanic activity",
          "Types of volcanoes",
          "Volcanic landforms",
          "Earthquakes",
          "Causes and effects",
        ],
      },
      {
        title: "Denudation",
        subtopics: [
          "Weathering",
          "Erosion",
          "Mass movement",
          "Deposition",
          "River processes",
          "Wind action",
        ],
      },
      {
        title: "Climate",
        subtopics: [
          "Weather elements",
          "Climate factors",
          "Atmospheric pressure",
          "Winds",
          "Rainfall",
          "Climate types",
        ],
      },
      {
        title: "Water Bodies",
        subtopics: [
          "Oceans",
          "Seas",
          "Ocean currents",
          "Lakes",
          "Rivers",
          "Drainage systems",
        ],
      },
      {
        title: "Human Geography",
        subtopics: [
          "Population",
          "Migration",
          "Settlement",
          "Urbanisation",
          "Economic activities",
          "Transportation",
        ],
      },
      {
        title: "Map Reading",
        subtopics: [
          "Scale",
          "Map symbols",
          "Grid references",
          "Contours",
          "Relief interpretation",
          "Distance and direction",
        ],
      },
    ],
  },

  "literature-in-english": {
    name: "Literature in English",
    description:
      "JAMB UTME Literature in English syllabus covering prose, poetry, drama, literary terms and prescribed texts.",
    topics: [
      {
        title: "Literary Appreciation",
        subtopics: [
          "Themes",
          "Plot",
          "Characterisation",
          "Setting",
          "Point of view",
          "Style",
        ],
      },
      {
        title: "Prose",
        subtopics: [
          "African prose",
          "Non-African prose",
          "Narrative techniques",
          "Character analysis",
          "Themes and motifs",
        ],
      },
      {
        title: "Poetry",
        subtopics: [
          "African poetry",
          "Non-African poetry",
          "Persona",
          "Imagery",
          "Tone",
          "Rhyme",
          "Rhythm",
          "Figures of speech",
        ],
      },
      {
        title: "Drama",
        subtopics: [
          "African drama",
          "Non-African drama",
          "Plot",
          "Characterisation",
          "Dialogue",
          "Stagecraft",
          "Dramatic techniques",
        ],
      },
      {
        title: "Literary Devices",
        subtopics: [
          "Metaphor",
          "Simile",
          "Personification",
          "Irony",
          "Symbolism",
          "Alliteration",
          "Hyperbole",
          "Oxymoron",
        ],
      },
    ],
  },


 "christian-religious-studies": {
    name: "Christian Religious Studies",
    description:
      "JAMB UTME Christian Religious Studies syllabus covering biblical teachings, personalities, leadership, morality and Christian principles.",
    topics: [
      {
        title: "Creation and God's Purpose",
        subtopics: [
          "Creation accounts",
          "Man's relationship with God",
          "The fall of man",
          "Consequences of disobedience",
        ],
      },
      {
        title: "God's Covenant",
        subtopics: [
          "Noah's covenant",
          "Abraham's covenant",
          "Covenant with Israel",
          "The New Covenant",
        ],
      },
      {
        title: "Leadership Qualities",
        subtopics: [
          "Joseph",
          "Moses",
          "Joshua",
          "Judges",
          "David",
          "Leadership lessons",
        ],
      },
      {
        title: "Prophets and Prophecy",
        subtopics: [
          "Major prophets",
          "Prophetic messages",
          "Justice",
          "Repentance",
          "Social responsibility",
        ],
      },
      {
        title: "The Life of Jesus",
        subtopics: [
          "Birth of Jesus",
          "Baptism",
          "Temptation",
          "Teachings",
          "Miracles",
          "Death and resurrection",
        ],
      },
      {
        title: "The Early Church",
        subtopics: [
          "Pentecost",
          "Early Christian community",
          "Missionary work",
          "Paul's conversion",
          "Paul's missionary journeys",
        ],
      },
      {
        title: "Christian Moral Teachings",
        subtopics: [
          "Love",
          "Forgiveness",
          "Faith",
          "Obedience",
          "Justice",
          "Peace",
          "Service",
        ],
      },
    ],
  },

  "islamic-religious-studies": {
    name: "Islamic Religious Studies",
    description:
      "JAMB UTME Islamic Religious Studies syllabus covering the Qur'an, Hadith, Islamic history, beliefs, practices and morality.",
    topics: [
      {
        title: "Qur'an",
        subtopics: [
          "Revelation of the Qur'an",
          "Compilation",
          "Major themes",
          "Qur'anic teachings",
          "Selected passages",
        ],
      },
      {
        title: "Hadith",
        subtopics: [
          "Meaning of Hadith",
          "Importance of Hadith",
          "Classification",
          "Selected Hadith",
          "Application of Hadith",
        ],
      },
      {
        title: "Islamic Beliefs",
        subtopics: [
          "Belief in Allah",
          "Angels",
          "Divine books",
          "Prophets",
          "Day of Judgment",
          "Divine decree",
        ],
      },
      {
        title: "Acts of Worship",
        subtopics: [
          "Shahadah",
          "Salah",
          "Zakah",
          "Sawm",
          "Hajj",
          "Jihad",
        ],
      },
      {
        title: "Islamic History",
        subtopics: [
          "Life of Prophet Muhammad",
          "Hijrah",
          "Medina",
          "Battles",
          "Caliphate",
          "Spread of Islam",
        ],
      },
      {
        title: "Islamic Morality",
        subtopics: [
          "Justice",
          "Honesty",
          "Patience",
          "Brotherhood",
          "Charity",
          "Respect for parents",
        ],
      },
    ],
  },

  "computer-studies": {
    name: "Computer Studies",
    description:
      "JAMB UTME Computer Studies syllabus covering computer fundamentals, hardware, software, data processing, networks and applications.",
    topics: [
      {
        title: "Computer Fundamentals",
        subtopics: [
          "Meaning of computer",
          "Characteristics",
          "Generations of computers",
          "Classification of computers",
          "Computer applications",
        ],
      },
      {
        title: "Computer Hardware",
        subtopics: [
          "Input devices",
          "Output devices",
          "Storage devices",
          "Processing unit",
          "Memory",
          "Ports and peripherals",
        ],
      },
      {
        title: "Software",
        subtopics: [
          "System software",
          "Application software",
          "Operating systems",
          "Utility programs",
          "Programming languages",
        ],
      },
      {
        title: "Data Processing",
        subtopics: [
          "Data and information",
          "Data processing cycle",
          "Data representation",
          "File organisation",
          "Databases",
        ],
      },
      {
        title: "Computer Networks",
        subtopics: [
          "Networking concepts",
          "LAN",
          "WAN",
          "Internet",
          "Network devices",
          "Communication media",
        ],
      },
      {
        title: "Information Technology",
        subtopics: [
          "Internet services",
          "Email",
          "Web technologies",
          "Cybersecurity",
          "Computer ethics",
          "Social implications",
        ],
      },
    ],
  },

  "fine-art": {
    name: "Fine Art",
    description:
      "JAMB UTME Fine Art syllabus covering drawing, painting, design, art history, crafts and artistic principles.",
    topics: [
      {
        title: "Drawing",
        subtopics: [
          "Observation drawing",
          "Figure drawing",
          "Still life",
          "Perspective",
          "Light and shade",
          "Proportion",
        ],
      },
      {
        title: "Painting",
        subtopics: [
          "Colour theory",
          "Colour mixing",
          "Painting techniques",
          "Composition",
          "Texture",
          "Light and shade",
        ],
      },
      {
        title: "Design",
        subtopics: [
          "Elements of design",
          "Principles of design",
          "Pattern",
          "Graphic design",
          "Lettering",
          "Poster design",
        ],
      },
      {
        title: "Sculpture",
        subtopics: [
          "Modelling",
          "Carving",
          "Casting",
          "Sculptural materials",
          "Sculptural techniques",
        ],
      },
      {
        title: "Art History",
        subtopics: [
          "Nigerian art",
          "African art",
          "Traditional art",
          "Contemporary art",
          "Major artists and movements",
        ],
      },
    ],
  },

french: {
    name: "French",
    description:
      "JAMB UTME French syllabus covering comprehension, vocabulary, grammar, sentence structure and communication.",
    topics: [
      {
        title: "Reading Comprehension",
        subtopics: [
          "Understanding passages",
          "Main ideas",
          "Details",
          "Inference",
          "Vocabulary in context",
        ],
      },
      {
        title: "Vocabulary",
        subtopics: [
          "Synonyms",
          "Antonyms",
          "Everyday expressions",
          "Contemporary vocabulary",
          "Contextual usage",
        ],
      },
      {
        title: "Grammar",
        subtopics: [
          "Nouns",
          "Gender",
          "Articles",
          "Adjectives",
          "Pronouns",
          "Prepositions",
          "Conjunctions",
          "Adverbs",
        ],
      },
      {
        title: "Verbs",
        subtopics: [
          "Verb conjugation",
          "Present tense",
          "Past tenses",
          "Future tense",
          "Imperative",
          "Negation",
          "Agreement",
        ],
      },
      {
        title: "Sentence Structure",
        subtopics: [
          "Affirmative sentences",
          "Interrogative sentences",
          "Imperative sentences",
          "Passive voice",
          "Word order",
        ],
      },
    ],
  },

  arabic: {
    name: "Arabic",
    description:
      "JAMB UTME Arabic syllabus covering Arabic grammar, vocabulary, comprehension, literature and language structure.",
    topics: [
      {
        title: "Arabic Grammar",
        subtopics: [
          "Nouns",
          "Gender",
          "Dual forms",
          "Plural forms",
          "Construct phrases",
          "Pronouns",
        ],
      },
      {
        title: "Adjectives and Conjunctions",
        subtopics: [
          "Adjectives",
          "Conjunctions",
          "Emphasis",
          "Permutatives",
          "Prepositions",
        ],
      },
      {
        title: "Arabic Verbs",
        subtopics: [
          "Perfect verbs",
          "Imperfect verbs",
          "Indicative",
          "Subjunctive",
          "Jussive",
          "Imperative",
          "Transitive verbs",
          "Intransitive verbs",
        ],
      },
      {
        title: "Morphology",
        subtopics: [
          "Trilateral verbs",
          "Derived verbs",
          "Verbal nouns",
          "Word formation",
          "Derivatives",
        ],
      },
      {
        title: "Comprehension",
        subtopics: [
          "Reading passages",
          "Vocabulary",
          "Meaning in context",
          "Grammar application",
          "Question answering",
        ],
      },
      {
        title: "Arabic Literature and Culture",
        subtopics: [
          "Arabic literary texts",
          "Poetry",
          "Prose",
          "Islamic literature",
          "Cultural knowledge",
        ],
      },
    ],
  },

  music: {
    name: "Music",
    description:
      "JAMB UTME Music syllabus covering music theory, harmony, notation, composition, African music and music history.",
    topics: [
      {
        title: "Music Theory",
        subtopics: [
          "Musical notation",
          "Scales",
          "Intervals",
          "Keys",
          "Time signatures",
          "Rhythm",
        ],
      },
      {
        title: "Harmony",
        subtopics: [
          "Chords",
          "Four-part harmony",
          "Chord progressions",
          "Dominant seventh chord",
          "Cadences",
          "Non-harmonic tones",
        ],
      },
      {
        title: "Melody and Composition",
        subtopics: [
          "Melodic phrases",
          "Phrase structure",
          "Melodic development",
          "Setting words to melody",
          "Elementary composition",
        ],
      },
      {
        title: "Modulation",
        subtopics: [
          "Major keys",
          "Closely related keys",
          "Diatonic modulation",
          "Key identification",
        ],
      },
      {
        title: "African Music",
        subtopics: [
          "Nigerian folksongs",
          "Call and response",
          "African rhythms",
          "Traditional instruments",
          "African scales",
          "African musical forms",
        ],
      },
      {
        title: "Music History",
        subtopics: [
          "Western music history",
          "African music history",
          "Musical periods",
          "Major composers",
          "Musical instruments",
        ],
      },
    ],
  },

  "physical-and-health-education": {
    name: "Physical & Health Education",
    description:
      "JAMB UTME Physical and Health Education syllabus covering physical education, fitness, sports, health and recreation.",
    topics: [
      {
        title: "Foundations of Physical Education",
        subtopics: [
          "Meaning of physical education",
          "Scope of physical education",
          "Objectives",
          "History of physical education",
          "Ancient Greece and Rome",
          "Development in Nigeria",
        ],
      },
      {
        title: "Health Education",
        subtopics: [
          "Meaning of health education",
          "Health promotion",
          "Health habits",
          "Personal health",
          "Community health",
          "Environmental health",
        ],
      },
      {
        title: "Physical Fitness",
        subtopics: [
          "Components of fitness",
          "Strength",
          "Endurance",
          "Flexibility",
          "Speed",
          "Fitness testing",
        ],
      },
      {
        title: "Games and Sports",
        subtopics: [
          "Athletics",
          "Football",
          "Basketball",
          "Volleyball",
          "Handball",
          "Swimming",
          "Track and field events",
        ],
      },
      {
        title: "Health and Diseases",
        subtopics: [
          "Communicable diseases",
          "Non-communicable diseases",
          "Disease prevention",
          "First aid",
          "Nutrition",
          "Personal hygiene",
        ],
      },
      {
        title: "Recreation and Leisure",
        subtopics: [
          "Meaning of recreation",
          "Importance of recreation",
          "Indoor activities",
          "Outdoor activities",
          "Leisure activities",
        ],
      },
    ],
  },
};


const Page = () => {
  const params = useParams();

  const subject = syllabusData[params.subject];

  if (!subject) {
    return (
      <div className="subject-page">
        <div className="subject-container subject-not-found">
          <BookOpen size={40} />

          <h1>Subject not found</h1>

          <p>
            We couldn't find a syllabus for this subject.
          </p>

          <Link href="/syllabus">
            <ArrowLeft size={18} />
            Back to syllabus
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="subject-page">

      {/* Header */}

      <section className="subject-hero">
        <div className="subject-container">

          <div className="top-left">
            <Link href="/syllabus" className="back-link">
                <ArrowLeft size={18} />
                Back to subjects
            </Link>

            <div className="subject-badge">
                <BookOpen size={16} />
                JAMB UTME SYLLABUS
            </div>
          </div>

          <h1>{subject.name}</h1>

          <p>{subject.description}</p>

        </div>
      </section>


      {/* Syllabus */}

      <section className="subject-content">
        <div className="subject-container">

          <div className="subject-heading">
            <div>
              <small>SYLLABUS CONTENT</small>

              <h2>
                What you need to study
              </h2>

              <p>
                Work through each topic and make sure you understand
                the important areas before your examination.
              </p>
            </div>

            <div className="topic-count">
              <strong>{subject.topics.length}</strong>
              <span>Major Topics</span>
            </div>
          </div>


          <div className="topics-list">

            {subject.topics.map((topic, index) => (

              <div className="topic-card" key={topic.title}>

                <div className="topic-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="topic-info">

                  <h3>{topic.title}</h3>

                  <div className="subtopics">

                    {topic.subtopics.map((item) => (

                      <div className="subtopic" key={item}>
                        <CheckCircle2 size={17} />
                        <span>{item}</span>
                      </div>

                    ))}

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* Source */}

          <div className="subject-source">

            <BookOpen size={22} />

            <div>
              <h3>Study from the official syllabus</h3>

              <p>
                CampusPlug organizes the syllabus into a cleaner
                format to make studying easier.
              </p>
            </div>

            <a
              href="https://ibass.jamb.gov.ng/e-syllabus"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official JAMB IBASS
            </a>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Page;
