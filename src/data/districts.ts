export interface District {
  id: string;
  name: string;
  score: number;
  areaType: string;
}

export const districts: District[] = [
  { id: "al-raha-beach", name: "Al Raha Beach", score: 77, areaType: "Coastal" },
  { id: "al-bateen", name: "Al Bateen", score: 77, areaType: "Coastal" },
  { id: "al-reef", name: "Al Reef", score: 76, areaType: "Suburban" },
  { id: "al-ghadeer", name: "Al Ghadeer", score: 75, areaType: "Suburban" },
  { id: "corniche", name: "Corniche", score: 75, areaType: "Urban" },
  { id: "al-shamkha", name: "Al Shamkha", score: 74, areaType: "Suburban" },
  { id: "al-reem-island", name: "Al Reem Island", score: 73, areaType: "Island" },
  { id: "yas-island", name: "Yas Island", score: 72, areaType: "Island" },
  { id: "khalifa-city", name: "Khalifa City", score: 72, areaType: "Suburban" },
  { id: "al-bahia", name: "Al Bahia", score: 72, areaType: "Suburban" },
  { id: "al-khalidiyah", name: "Al Khalidiyah", score: 72, areaType: "Urban" },
  { id: "zayed-city", name: "Zayed City", score: 72, areaType: "Urban" },
  { id: "mohammed-bin-zayed-city", name: "Mohammed Bin Zayed City", score: 72, areaType: "Urban" },
  { id: "danet-abu-dhabi", name: "Danet Abu Dhabi", score: 71, areaType: "Urban" },
  { id: "masdar-city", name: "Masdar City", score: 71, areaType: "Sustainable" },
  { id: "saadiyat-island", name: "Saadiyat Island", score: 70, areaType: "Island" },
  { id: "musaffah", name: "Musaffah", score: 70, areaType: "Industrial" },
  { id: "al-maryah-island", name: "Al Maryah Island", score: 69, areaType: "Island" },
  { id: "al-nahyan", name: "Al Nahyan", score: 68, areaType: "Urban" },
  { id: "al-zahiyah", name: "Al Zahiyah", score: 65, areaType: "Urban" },
];

export function getScoreColor(score: number): string {
  if (score >= 75) return "#5C3D2E";
  if (score >= 70) return "#8B6F47";
  return "#D4C5B0";
}

export function getScoreBg(score: number): string {
  if (score >= 75) return "bg-[#5C3D2E]";
  if (score >= 70) return "bg-[#8B6F47]";
  return "bg-[#D4C5B0]";
}
