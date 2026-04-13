import mouSigningImg from "@/assets/news/mou-signing-grand-heritage.png";
import mouMalekImg from "@/assets/news/mou-signing-regent-malek.png";
import groundBreakingPalaceImg from "@/assets/news/ground-breaking-regent-palace.png";

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "mou-signing-ceremony-regent-grand-heritage",
    title: "MOU Signing Ceremony of Regent Grand Heritage",
    date: "September 22, 2021",
    excerpt:
      "A Memorandum of Understanding (MOU) was signed on 22 September 2021 at the head office of Regent Group in Kemal Ataturk Avenue, Banani C/A between Regent Design & Development Ltd (RDDL) and Joint Landowners of 24 Katha land of North Badda (Beside Bti Premier Plaza & Opposite to Suvastu Nazar Valley Market). Chairman of Regent Design & Development Ltd, Barrister Tareque Akbar Khondakar signed the MOU on behalf of the company. RDDL will build a luxurious condominium project with facilities such as Double Height Entry, Swimming Pool, Shops, Kids Play Zone, BBQ Zone, Walkways, Mosques, Landscaping works, Waterfalls & other facilities.",
    image: mouSigningImg,
  },
  {
    slug: "mou-signing-ceremony-regent-malek",
    title: "MOU Signing Ceremony of Regent Malek",
    date: "September 14, 2021",
    excerpt:
      "A Memorandum of Understanding (MOU) was signed on 14 September 2021 at the head office of Regent Group in Kemal Ataturk Avenue, Banani C/A between Regent Design & Development Ltd (RDDL) and Landowners of 7 Katha land of West Agargaon. Chairman of Regent Design & Development Ltd, Barrister Tareque Akbar Khondakar signed the MOU on behalf of the company. RDDL will build a 10-Storied (B+G+9) luxurious residential building with facilities such as Mosques, Kids Play Zone, Landscaping works & other facilities.",
    image: mouMalekImg,
  },
  {
    slug: "ground-breaking-ceremony-regent-palace",
    title: "Ground Breaking Ceremony of Regent Palace",
    date: "June 6, 2021",
    excerpt:
      "Piling work inauguration of Regent Palace was held on 06 June 2021 at Road no.17, Baitul Aman Housing Society, Adabor, Mohammadpur. Chairman of Regent Design & Development, Barrister Tareque Akbar Khondakar inaugurated the ceremony along with the presence of the landowners and other distinguished guests.",
    image: groundBreakingPalaceImg,
  },
  {
    slug: "regent-grand-heritage-structural-completion",
    title: "Regent Grand Heritage Achieves Structural Completion",
    date: "March 15, 2026",
    excerpt:
      "We are proud to announce that Regent Grand Heritage has reached its structural milestone ahead of schedule.",
  },
  {
    slug: "rddl-excellence-construction-award",
    title: "RDDL Receives Excellence in Construction Award",
    date: "February 20, 2026",
    excerpt:
      "Regent Design & Development Ltd has been honored with the Excellence in Construction Award for 2026.",
  },
  {
    slug: "new-project-launch-regent-spring-dale",
    title: "New Project Launch: Regent Spring Dale",
    date: "January 10, 2026",
    excerpt:
      "We are excited to unveil our latest residential project in a prime location of Dhaka.",
  },
  {
    slug: "regent-sapphire-80-percent-sold",
    title: "Regent Sapphire — 80% Units Sold",
    date: "December 5, 2025",
    excerpt:
      "Overwhelming response from homebuyers for our premium Regent Sapphire development.",
  },
];
