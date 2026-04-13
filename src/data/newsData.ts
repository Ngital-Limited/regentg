import mouSigningImg from "@/assets/news/mou-signing-grand-heritage.png";
import mouMalekImg from "@/assets/news/mou-signing-regent-malek.png";
import groundBreakingPalaceImg from "@/assets/news/ground-breaking-regent-palace.png";
import groundBreakingJannatImg from "@/assets/news/ground-breaking-regent-jannat.png";
import groundBreakingEastQueenImg from "@/assets/news/ground-breaking-regent-east-queen.png";
import rehabFair2022Img from "@/assets/news/rehab-fair-2022.png";

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "rehab-fair-2022-co-sponsored-by-regent",
    title: "REHAB FAIR 2022 – Co-Sponsored by REGENT",
    date: "December 21, 2022",
    excerpt:
      "The country's largest event in the housing sector REHAB FAIR 2022 started from 21 Dec 2022 till 25 December 2022 at BICC, Dhaka & REGENT contributed as the co-sponsor of this annual programme. The 5-Day long winter REHAB FAIR 2022 finished with a huge response from visitors and buyers during the flagship real estate sector event. With the current REHAB membership of amongst 1191 real-estate developers a total of 180 housing and land developers, 16 buildings materials companies and 13 financial institutions showcased their products including flats, plots, housing loans and construction materials in the fair.",
    image: rehabFair2022Img,
  },
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
    slug: "ground-breaking-ceremony-regent-jannat",
    title: "Ground Breaking Ceremony of Regent Jannat",
    date: "February 15, 2021",
    excerpt:
      "Ground Breaking Ceremony of Regent Jannat was held on 15 February 2021 at Plot F-37 & F-39, Block-F, Road- 03, Sector-02, Aftabnagar R/A. The ceremony took place in the presence of the Chairman of Regent Design & Development (RDDL) Barrister Tareque Akbar Khondakar and other guests. RDDL shall build a 9 (G+8) Storied residential building with modern facilities & architectural work.",
    image: groundBreakingJannatImg,
  },
  {
    slug: "ground-breaking-ceremony-regent-east-queen",
    title: "Ground Breaking Ceremony of Regent East Queen",
    date: "January 28, 2021",
    excerpt:
      "Piling work inauguration of Regent East Queen was held on 28 January 2021 at Queens Garden Road, Nurer Chala, Vatara. Chairman of Regent Design & Development (RDDL), Barrister Tareque Akbar Khondakar inaugurated the ceremony along with the presence of the landowner and other staffs. RDDL shall building a 8-Storied (G+7) luxurious residential project which will cater to the housing needs of customers whose job location is within close proximity of Gulshan, Baridhara, Bashundhara, Khilgaon.",
    image: groundBreakingEastQueenImg,
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
