export interface ProjectLocation {
  name: string;
  slug: string;
  location: string;
  status: "ongoing" | "completed";
  lat: number;
  lng: number;
}

export const projectLocations: ProjectLocation[] = [
  // Ongoing
  { name: "Regent Grand Heritage", slug: "regent-grand-heritage", location: "Shahjadpur, Gulshan", status: "ongoing", lat: 23.7937, lng: 90.4203 },
  { name: "Regent Sapphire", slug: "regent-sapphire", location: "Bashundhara R/A", status: "ongoing", lat: 23.8190, lng: 90.4350 },
  { name: "Regent Spring Dale", slug: "regent-spring-dale", location: "Bashundhara R/A", status: "ongoing", lat: 23.8200, lng: 90.4440 },
  { name: "Regent Tara", slug: "regent-tara", location: "Aftabnagar R/A", status: "ongoing", lat: 23.7671, lng: 90.4551 },
  { name: "Regent Palace", slug: "regent-palace", location: "Adabor, Mohammadpur", status: "ongoing", lat: 23.7733, lng: 90.3486 },
  { name: "Regent Spring Field", slug: "regent-spring-field", location: "West Agargaon", status: "ongoing", lat: 23.7814, lng: 90.3679 },
  { name: "Regent Rizia", slug: "regent-rizia", location: "Uttara", status: "ongoing", lat: 23.8759, lng: 90.3795 },
  // Completed
  { name: "Regent Hasina", slug: "regent-hasina", location: "Bashundhara R/A", status: "completed", lat: 23.8215, lng: 90.4440 },
  { name: "Regent Jannat", slug: "regent-jannat", location: "Aftabnagar R/A", status: "completed", lat: 23.7697, lng: 90.4312 },
  { name: "Regent South Pearl", slug: "regent-south-pearl", location: "Dhanmondi", status: "completed", lat: 23.7461, lng: 90.3742 },
  { name: "Regent East Castle", slug: "regent-east-castle", location: "Badda", status: "completed", lat: 23.7840, lng: 90.4260 },
  { name: "Regent South Lake", slug: "regent-south-lake", location: "Dhanmondi", status: "completed", lat: 23.7445, lng: 90.3730 },
  { name: "Regent East Queen", slug: "regent-east-queen", location: "Vatara, Badda", status: "completed", lat: 23.7980, lng: 90.4300 },
  { name: "Regent Sufia", slug: "regent-sufia", location: "Bashundhara R/A", status: "completed", lat: 23.8180, lng: 90.4400 },
  { name: "Regent Parbata Grand", slug: "regent-parbata-grand", location: "Uttara", status: "completed", lat: 23.8700, lng: 90.3900 },
  { name: "Regent Islam", slug: "regent-islam", location: "Mirpur", status: "completed", lat: 23.8070, lng: 90.3680 },
];
