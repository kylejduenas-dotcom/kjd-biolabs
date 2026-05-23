export type ProductCategory =
  | "Tissue Repair"
  | "Dermal"
  | "Metabolic"
  | "Secretagogue"
  | "Cellular"
  | "Neuro"
  | "Circadian"
  | "Blend"
  | "Supplies";

export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  description: string;
  sequence: string;
  molecularWeight: string;
  purity: string;
  form: string;
  storage: string;
}

export const products: Product[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    subtitle: "Cellular Peptide",
    category: "Tissue Repair",
    description:
      "A pentadecapeptide composed of 15 amino acids, BPC-157 is a partial sequence of body protection compound discovered in human gastric juice. Studied extensively in tissue repair and regeneration research models.",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    molecularWeight: "1419.53 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C. Reconstituted: 2–8°C for up to 30 days.",
  },
  {
    slug: "tb-500",
    name: "TB-500",
    subtitle: "Cellular Peptide",
    category: "Tissue Repair",
    description:
      "A synthetic fraction of the protein thymosin beta-4 (Tβ4). TB-500 has been the subject of research into cellular migration, blood vessel formation, and tissue repair mechanisms.",
    sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys...",
    molecularWeight: "4963.44 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    subtitle: "Dermal Compound",
    category: "Dermal",
    description:
      "A naturally occurring copper peptide found in human plasma, saliva, and urine. GHK-Cu is a tripeptide-copper complex researched for its role in skin remodeling, collagen synthesis, and wound healing.",
    sequence: "Gly-His-Lys·Cu²⁺",
    molecularWeight: "403.93 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at 2–8°C. Protect from light.",
  },
  {
    slug: "snap-8",
    name: "SNAP-8",
    subtitle: "Dermal Peptide",
    category: "Dermal",
    description:
      "An octapeptide that is a longer analogue of the neuropeptide SNAP-25. Researched for its potential to modulate SNARE complex formation and muscle contraction signaling in dermal studies.",
    sequence: "Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH₂",
    molecularWeight: "1075.16 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "glp-3-rt",
    name: "GLP-3 (RT)",
    subtitle: "Triple-Action Metabolic Compound",
    category: "Metabolic",
    description:
      "A research-targeted triple-action metabolic compound studied for its multi-pathway approach to metabolic regulation. This novel formulation is the subject of ongoing in vitro metabolic research.",
    sequence: "Proprietary Sequence",
    molecularWeight: "Proprietary",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "mots-c",
    name: "MOTS-C",
    subtitle: "Metabolic Peptide",
    category: "Metabolic",
    description:
      "A mitochondrial-derived peptide encoded within the 12S rRNA gene. MOTS-C has been studied for its role in metabolic homeostasis, AMPK activation, and cellular energy regulation.",
    sequence: "Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg",
    molecularWeight: "2174.67 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "5-amino-1mq",
    name: "5-Amino-1MQ",
    subtitle: "Metabolic Peptide",
    category: "Metabolic",
    description:
      "A small molecule inhibitor of nicotinamide N-methyltransferase (NNMT). Studied for its potential effects on cellular metabolism and energy expenditure in preclinical models.",
    sequence: "C₇H₉N₃O",
    molecularWeight: "173.17 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C. Protect from moisture.",
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide",
    subtitle: "Metabolic Research Peptide",
    category: "Metabolic",
    description:
      "A long-acting amylin analogue peptide researched for its effects on appetite regulation and metabolic signaling pathways. Studied in metabolic research models for its dual-receptor activity.",
    sequence: "Proprietary Analogue",
    molecularWeight: "~3960 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    subtitle: "Cellular Peptide",
    category: "Metabolic",
    description:
      "A modified fragment of human growth hormone (hGH fragment 176-191). AOD-9604 has been researched for its role in lipolytic activity without the broader effects associated with full hGH.",
    sequence: "Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe",
    molecularWeight: "1815.08 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    subtitle: "Secretagogue Peptide",
    category: "Secretagogue",
    description:
      "A synthetic analogue of growth hormone-releasing hormone (GHRH) with a trans-3-hexenoic acid modification. Studied for its selective stimulation of growth hormone secretion.",
    sequence: "Modified GHRH(1-44) analogue",
    molecularWeight: "5135.9 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C. Reconstituted: 2–8°C.",
  },
  {
    slug: "cjc-1295-ipamorelin",
    name: "CJC-1295 / Ipamorelin (No DAC)",
    subtitle: "Secretagogue Peptide",
    category: "Secretagogue",
    description:
      "A combination of two growth hormone secretagogues: CJC-1295 without Drug Affinity Complex and Ipamorelin. Researched for synergistic effects on growth hormone pulsatility.",
    sequence: "Combined peptide formulation",
    molecularWeight: "CJC: 3367.97 / Ipa: 711.85 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    subtitle: "GH Secretagogue Peptide",
    category: "Secretagogue",
    description:
      "A pentapeptide growth hormone secretagogue and ghrelin receptor agonist. Known for its selective GH release without significant effects on cortisol, prolactin, or ACTH levels.",
    sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH₂",
    molecularWeight: "711.85 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "kpv",
    name: "KPV",
    subtitle: "Cellular Peptide",
    category: "Cellular",
    description:
      "A C-terminal tripeptide fragment of alpha-melanocyte-stimulating hormone (α-MSH). KPV has been studied for its role in cellular signaling related to immune modulation.",
    sequence: "Lys-Pro-Val",
    molecularWeight: "342.43 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    subtitle: "Cellular Peptide",
    category: "Cellular",
    description:
      "Nicotinamide adenine dinucleotide in its oxidized form. NAD+ is a critical coenzyme found in every living cell, researched extensively for its role in cellular metabolism and DNA repair mechanisms.",
    sequence: "C₂₁H₂₇N₇O₁₄P₂",
    molecularWeight: "663.43 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C. Protect from light and moisture.",
  },
  {
    slug: "glutathione",
    name: "Glutathione",
    subtitle: "Antioxidant & Detoxification Peptide",
    category: "Cellular",
    description:
      "A tripeptide composed of glutamate, cysteine, and glycine. Glutathione is the most abundant intracellular antioxidant, studied for its critical role in oxidative stress defense and detoxification.",
    sequence: "γ-Glu-Cys-Gly",
    molecularWeight: "307.32 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    subtitle: "Cellular Peptide",
    category: "Cellular",
    description:
      "A 28-amino acid peptide originally isolated from thymic tissue. Thymosin Alpha-1 has been extensively studied for its role in immune cell differentiation and modulation of T-cell function.",
    sequence: "Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys...",
    molecularWeight: "3108.27 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "epithalon",
    name: "Epithalon",
    subtitle: "Cellular Peptide",
    category: "Cellular",
    description:
      "A synthetic tetrapeptide based on the natural peptide epithalamin produced by the pineal gland. Researched for its effects on telomerase activation and cellular aging mechanisms.",
    sequence: "Ala-Glu-Asp-Gly",
    molecularWeight: "390.35 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "pt-141",
    name: "PT-141",
    subtitle: "Cellular Peptide",
    category: "Cellular",
    description:
      "A synthetic cyclic heptapeptide melanocortin receptor agonist derived from Melanotan II. PT-141 (Bremelanotide) has been researched for its mechanism of action on the melanocortin receptor system.",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH",
    molecularWeight: "1025.18 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "melanotan-ii",
    name: "Melanotan II",
    subtitle: "Peptide",
    category: "Cellular",
    description:
      "A synthetic analogue of the naturally occurring alpha-melanocyte-stimulating hormone. Melanotan II is a non-selective agonist of the melanocortin receptors MC1, MC3, MC4, and MC5.",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH₂",
    molecularWeight: "1024.18 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "melanotan-i",
    name: "Melanotan I",
    subtitle: "Peptide",
    category: "Cellular",
    description:
      "A linear synthetic analogue of alpha-MSH. Melanotan I (Afamelanotide) is a potent and selective agonist of the MC1 receptor, studied in dermatological and photoprotection research.",
    sequence: "[Nle⁴, D-Phe⁷]-α-MSH",
    molecularWeight: "1646.85 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "igf-1-lr3",
    name: "IGF-1 LR3",
    subtitle: "Growth Factor Analog Peptide",
    category: "Cellular",
    description:
      "A modified version of insulin-like growth factor-1 with an arginine substitution at position 3 and an N-terminal extension of 13 amino acids. Studied for enhanced bioactivity and half-life.",
    sequence: "Modified IGF-1 (83 amino acids)",
    molecularWeight: "9117.5 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "selank",
    name: "Selank",
    subtitle: "Cognitive & Anxiolytic Peptide",
    category: "Neuro",
    description:
      "A synthetic analogue of the immunomodulatory peptide tuftsin with an additional Gly-Pro sequence. Selank has been studied for its effects on anxiety-related behavior and cognitive function.",
    sequence: "Thr-Lys-Pro-Arg-Pro-Gly-Pro",
    molecularWeight: "751.9 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "semax",
    name: "Semax",
    subtitle: "Cognitive & Neuroprotective Peptide",
    category: "Neuro",
    description:
      "A synthetic peptide derived from adrenocorticotropic hormone (ACTH) fragment 4-10 with a C-terminal Pro-Gly-Pro addition. Researched for neuroprotective and nootropic properties.",
    sequence: "Met-Glu-His-Phe-Pro-Gly-Pro",
    molecularWeight: "813.93 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "dsip",
    name: "DSIP",
    subtitle: "Circadian Peptide",
    category: "Circadian",
    description:
      "Delta sleep-inducing peptide, a nonapeptide originally isolated from the cerebral venous blood of rabbits during induced sleep. Studied for its role in sleep architecture and circadian rhythm regulation.",
    sequence: "Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu",
    molecularWeight: "848.82 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "bpc-157-tb-500-wolverine",
    name: "BPC-157 / TB-500 (Wolverine)",
    subtitle: "Cellular Peptide Blend",
    category: "Blend",
    description:
      "A research blend combining BPC-157 and TB-500 in a single formulation. Studied for potential synergistic effects in tissue repair research models involving multiple signaling pathways.",
    sequence: "Combined peptide formulation",
    molecularWeight: "BPC: 1419.53 / TB: 4963.44 g/mol",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "glow",
    name: "GLOW",
    subtitle: "Cellular Peptide Blend",
    category: "Blend",
    description:
      "A proprietary cellular peptide blend formulated for dermal and cellular research applications. Combines multiple peptide compounds targeting skin cell signaling pathways.",
    sequence: "Proprietary Blend",
    molecularWeight: "Proprietary",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "klow",
    name: "KLOW",
    subtitle: "Cellular Peptide Blend",
    category: "Blend",
    description:
      "A proprietary cellular peptide blend designed for metabolic and cellular research. Combines multiple bioactive peptides for multi-pathway investigation.",
    sequence: "Proprietary Blend",
    molecularWeight: "Proprietary",
    purity: "≥99%",
    form: "Lyophilized Powder",
    storage: "Store at -20°C.",
  },
  {
    slug: "bacteriostatic-water",
    name: "Bacteriostatic Water",
    subtitle: "Research Supplies",
    category: "Supplies",
    description:
      "Sterile water containing 0.9% benzyl alcohol as a bacteriostatic preservative. Used as a solvent for reconstituting lyophilized peptides in laboratory settings. USP-grade.",
    sequence: "H₂O + 0.9% Benzyl Alcohol",
    molecularWeight: "N/A",
    purity: "USP Grade",
    form: "Sterile Liquid (10 mL)",
    storage: "Store at room temperature. Use within 28 days of first puncture.",
  },
];

export const categories: { name: ProductCategory; label: string }[] = [
  { name: "Tissue Repair", label: "Tissue Repair" },
  { name: "Dermal", label: "Dermal Research" },
  { name: "Metabolic", label: "Metabolic Research" },
  { name: "Secretagogue", label: "Secretagogue Research" },
  { name: "Cellular", label: "Cellular Research" },
  { name: "Neuro", label: "Neuro Research" },
  { name: "Circadian", label: "Circadian Research" },
  { name: "Blend", label: "Peptide Blends" },
  { name: "Supplies", label: "Research Supplies" },
];
