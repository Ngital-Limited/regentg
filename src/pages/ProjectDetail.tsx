import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrochureDownloadDialog from "@/components/BrochureDownloadDialog";
import ProjectMap from "@/components/ProjectMap";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { MapPin, Maximize, BedDouble, Compass, Building2, Home, Layers, HardHat, Calendar, Download, Phone, Mail, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

const defaultFeatures = [
  "Earthquake-resistant RCC structure designed by BUET professor",
  "High-speed passenger elevator with generator backup",
  "24/7 security with CCTV surveillance",
  "Standby generator for common areas",
  "Intercom & video door phone system",
  "Landscaped rooftop garden with community space",
  "Underground car parking facility",
  "Fire detection & suppression system",
  "Premium bathroom fittings & sanitary ware",
  "Imported tiles & high-quality finishes",
];

const defaultProgress = [
  { label: "Foundation", value: 100 },
  { label: "Structure", value: 85 },
  { label: "Brickwork", value: 60 },
  { label: "Plumbing & Electrical", value: 40 },
  { label: "Finishing", value: 15 },
  { label: "Overall Progress", value: 55 },
];

const defaultGlance = [
  { icon: "address", label: "Address", value: "Block-M, Sector-03, Aftabnagar R/A, Dhaka" },
  { icon: "size", label: "Size", value: "2080 SFT" },
  { icon: "bedroom", label: "Bedroom", value: "04" },
  { icon: "facing", label: "Project Facing", value: "South" },
  { icon: "floor", label: "Floor", value: "G+6" },
  { icon: "apartments", label: "Apartments", value: "1" },
  { icon: "total", label: "Total Apartments", value: "6" },
  { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
  { icon: "handover", label: "Handover Date", value: "December 2026" },
];

interface ProjectData {
  name: string;
  tagline: string;
  status: "ongoing" | "completed";
  heroImage?: string;
  overview: string;
  features: string[];
  progress: { label: string; value: number }[];
  glance: { icon: string; label: string; value: string }[];
  gallery: string[];
  mapCoords: { lat: number; lng: number };
  brochureUrl?: string;
}

const makeProject = (name: string, status: "ongoing" | "completed"): ProjectData => ({
  name,
  tagline: "A Legacy of Luxury Living",
  status,
  overview: `${name} is a prestigious residential project by Regent Design & Development Ltd. Designed with meticulous attention to detail, this development offers an unparalleled living experience combining modern architecture with timeless elegance. Every aspect of the project has been carefully planned to provide residents with comfort, convenience, and a sense of belonging.`,
  features: defaultFeatures,
  progress: defaultProgress,
  glance: defaultGlance,
  gallery: [],
  mapCoords: { lat: 23.7697, lng: 90.4312 },
});

const projectsData: Record<string, ProjectData> = {
  // Ongoing
  "regent-grand-heritage": {
    name: "Regent Grand Heritage",
    tagline: "Where Luxury Meets Everyday Convenience",
    status: "ongoing" as const,
    heroImage: "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-8.jpg",
    overview: "Introducing Regent Grand Heritage—a Premium South-Facing Condominium in the peaceful residential area of Shahjadpur, just a stone's throw from Gulshan-2. Spanning 10 levels (B+G+9) of refined living, this Architectural Gem offers a seamless blend of Elegance, Comfort and Modern Functionality. Designed with sophistication in mind, the well-ventilated apartments are set within a striking Grand Stoned Façade and supported by 4 High-Speed Lifts for smooth access. Residents enjoy a wide range of Premium Amenities including a Fully Equipped Gym, Mosque, Children's Play Zone and a Beautifully Landscaped Rooftop complete with a BBQ area, Jogging track and Serene Seating Zones for socializing or unwinding. Ideally suited for professionals and families, Regent Grand Heritage is especially convenient for those who work in or frequently commute to Gulshan and Baridhara, ensuring a quick and hassle-free connection to Dhaka's key business and diplomatic centers.",
    features: [
      "Magnificient Grand Structure With Double Height Entrance",
      "Well-Ventilated Apartments",
      "04 High-Speed Modern Lifts operating at the same time",
      "Full Building Made of Stone",
      "Modern Gym",
      "Mosque with Ablution Area",
      "Children's Play-Zone",
      "BBQ Area",
      "Jogging Track",
    ],
    progress: [
      { label: "Overall Progress", value: 22 },
    ],
    glance: [
      { icon: "address", label: "Address", value: "Pragati Sarani Road, Shahjadpur, North Badda, Dhaka" },
      { icon: "size", label: "Size", value: "1350 SFT - 3280 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "03-04" },
      { icon: "facing", label: "Project Facing", value: "South" },
      { icon: "floor", label: "Floor", value: "B+G+9" },
      { icon: "apartments", label: "Apartments", value: "10" },
      { icon: "total", label: "Total Apartments", value: "90" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "December 2028" },
    ],
    gallery: [
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-8.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-2.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-3.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-5.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-13.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-6.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-7.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-9.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-4.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-11.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-14.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-15.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-10.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-16.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/RGH-Roof-Top-3_24-Aug-2023-12.jpg",
    ],
    mapCoords: { lat: 23.7937, lng: 90.4203 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Grand_Heritage_Brochure_20.pdf",
  },
  "regent-hasina": {
    name: "Regent Hasina",
    tagline: "A Masterpiece of Refined Architecture",
    status: "ongoing" as const,
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
    overview: "Regent Group proudly presents Regent Hasina—a true Masterpiece of refined Architecture and Exclusive Living, located in the prestigious Block-K of Bashundhara R/A. This elegantly designed residence offers 2180 SFT of thoughtfully planned space, featuring 4 spacious bedrooms that embrace privacy, comfort, and sophistication. Crafted for those who appreciate both form and function, Regent Hasina boasts a beautifully landscaped rooftop complete with tranquil seating area creating a serene escape within the city.",
    features: [
      "Full Building Made of Stone",
      "Modern Architectural Design",
      "Landscaped Roof Top with Seating Arrangement",
      "Premium Quality Fitting & Features",
      "Very Close to 300 Feet Purbachal Express Highway",
      "Project is just Beside the Corner Plot Facing 40ft & 25ft Road",
    ],
    progress: [
      { label: "Overall Progress", value: 100 },
    ],
    glance: [
      { icon: "address", label: "Address", value: "Block – K, Bashundhara R/A, Dhaka" },
      { icon: "size", label: "Size", value: "2180 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "04" },
      { icon: "facing", label: "Project Facing", value: "North" },
      { icon: "floor", label: "Floor", value: "G+9" },
      { icon: "apartments", label: "Apartments", value: "01" },
      { icon: "total", label: "Total Apartments", value: "09" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "June 2025" },
    ],
    gallery: [
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Hasina-Close_02-Feb-2022-2.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Night-View_02-Feb-2022-.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/e2e7202782.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Hasina-Close_02-Feb-2022-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/dae33a8cc9.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Hasina-View_01-Feb-2022-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/dfe593ed9f.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Close_01-Feb-2022-2.jpg",
    ],
    mapCoords: { lat: 23.8215359, lng: 90.4440474 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-HASINA-PDF.pdf",
  },
  "regent-sapphire": {
    name: "Regent Sapphire",
    tagline: "Prestigious North-Facing Living in Bashundhara R/A",
    status: "ongoing" as const,
    heroImage: "https://i.ibb.co.com/3mgVLkBb/m-Modern.jpg",
    overview: "Regent Sapphire is a prestigious North-Facing residential development in the serene and secure neighborhood of Block-L of Bashundhara R/A. Each Floor is dedicated to a single, expansive 2650 SFT apartment—thoughtfully designed for optimum Natural Light, Cross-Ventilation and Seamless Living. What truly sets Regent Sapphire apart is its impressive Wide Façade, a Rare Architectural advantage in Bashundhara, which not only enhances the building's aesthetic appeal but also allows for a grander presence and more open interior layouts. The building blends Modern elegance with functional design, featuring a beautifully landscaped rooftop for leisure and social gatherings. Nestled in a fully planned area, Regent Sapphire enjoys close proximity to essential amenities including a mosque, reputed schools and more—offering residents a lifestyle of both luxury and convenience in one of Dhaka's most sought-after locations.",
    features: [
      "Well Ventilated Apartment",
      "High-Capacity Generator Backup",
      "Full Building Made of Stone",
      "Designed Landscaped Roof Top with Seating Arrangement",
      "Elegant & Modern Building Elevation",
      "Premium Quality Fitting & Features",
    ],
    progress: [
      { label: "Overall Progress", value: 5 },
    ],
    glance: [
      { icon: "address", label: "Address", value: "Block-L, Bashundhara R/A, Dhaka" },
      { icon: "size", label: "Size", value: "2650 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "04" },
      { icon: "facing", label: "Project Facing", value: "North" },
      { icon: "floor", label: "Floor", value: "G+9" },
      { icon: "apartments", label: "Apartments", value: "1" },
      { icon: "total", label: "Total Apartments", value: "9" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "December 2027" },
    ],
    gallery: [
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-2.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-3.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-4.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-5.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-6.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-7.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-8.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-9.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-10.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-11.jpg",
    ],
    mapCoords: { lat: 23.8190, lng: 90.4350 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/05/Regent-Sapphire-v2-low.pdf",
  },
  "regent-spring-dale": {
    name: "Regent Spring Dale",
    tagline: "Premium Living Beside a Serene Lake",
    status: "ongoing" as const,
    heroImage: "https://images.unsplash.com/photo-1776108450800-524c042a6c40",
    overview: "Regent Springdale presents a premium residential experience with its West-Facing, 9-Storied (G+8) Structure featuring spacious 2450 SFT Single-unit 4-bedroom apartments. Thoughtfully designed to maximize Comfort and Natural Light, each unit combines generous space with greenery to create a truly elevated lifestyle. The building's elegant Stone Exterior, Well-Ventilated interiors and a Landscaped Rooftop provide a serene and refreshing living environment, perfect for families seeking peace without sacrificing modern comforts. Ideally situated just 5 minutes from the 300 Feet Purbachal Express Highway and close to 100 Feet Madani Avenue, Regent Springdale offers unmatched connectivity while maintaining a quiet, residential atmosphere—seamlessly blending luxury with convenience.",
    features: [
      "Magnificent Grand Structure",
      "Full Building Made of Stone",
      "Well-Ventilated Apartment",
      "Landscaped Roof Top with Seating Arrangement",
      "Premium Quality Fitting & Features",
      "Project Nestled Beside a Serene Lake",
    ],
    progress: [
      { label: "Overall Progress", value: 5 },
    ],
    glance: [
      { icon: "address", label: "Address", value: "Block- K, Bashundara R/A, Dhaka" },
      { icon: "size", label: "Size", value: "2450 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "04" },
      { icon: "facing", label: "Project Facing", value: "West" },
      { icon: "floor", label: "Floor", value: "G+8" },
      { icon: "apartments", label: "Apartments", value: "1" },
      { icon: "total", label: "Total Apartments", value: "8" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "December 2027" },
    ],
    gallery: [
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Blow-Up-2-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Front-1B-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Front-1C.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Ground-View-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Night-1-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Night-2-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Roof-1-3.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Roof-2B-2.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Side-Ground-1-scaled-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Side-Ground-Vertical-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Top-View-1.jpg",
    ],
    mapCoords: { lat: 23.8200, lng: 90.4440 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/02/spring-dale.pdf",
  },
  "regent-tara": {
    name: "Regent Tara",
    tagline: "Comfort, Convenience & Security in One Address",
    status: "ongoing" as const,
    heroImage: "https://images.unsplash.com/photo-1776109526175-da1dca43cc86",
    overview: "Regent Tara stands with elegance in the heart of Block-M @ Aftabnagar R/A combining Comfort, Convenience & Security in one thoughtfully crafted address. This South-Facing, 7-Storied (G+6) residential building features spacious 2080 SFT 4-Bedroom apartments, tailored for modern families who value Space, Light and Smart Design. The project welcomes residents with a Grand Entrance, while the beautifully Landscaped Rooftop—featuring a BBQ area and Serene Greenery—offers a perfect escape for relaxation and social gatherings. Strategically located near leading institutions such as East West University, reputed schools, hospitals, and major convention centers, Regent Tara ensures unmatched urban connectivity. With quick access to Banasree, Khilgaon, Hatirjheel, Badda, Rampura & Gulshan areas, this is where vibrant city life meets peaceful residential charm.",
    features: [
      "South Facing Project",
      "Full Building Made of Stone",
      "Modern Architectural Design",
      "Landscaped Roof Top with Seating Arrangement",
      "Project is Just Few Blocks from Main Avenue Road",
      "Well Ventilated Apartments",
    ],
    progress: defaultProgress,
    glance: [
      { icon: "address", label: "Address", value: "Block-M, Sector-03, Aftabnagar R/A, Dhaka" },
      { icon: "size", label: "Size", value: "2080 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "04" },
      { icon: "facing", label: "Project Facing", value: "South" },
      { icon: "floor", label: "Floor", value: "G+6" },
      { icon: "apartments", label: "Apartments", value: "1" },
      { icon: "total", label: "Total Apartments", value: "6" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "December 2026" },
    ],
    gallery: [
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-TARA-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-TARA-2.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-TARA-3.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-TARA-4.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-TARA-5.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-TARA-6.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-TARA-7.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-TARA-8.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-TARA-9.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-TARA-10.jpg",
    ],
    mapCoords: { lat: 23.7671012, lng: 90.4551473 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Regent-Tara-Brochure.pdf",
  },
  "regent-palace": {
    name: "Regent Palace",
    tagline: "Warmth, Serenity & Modern Luxury",
    status: "ongoing" as const,
    heroImage: "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-PALACE-1.jpg",
    overview: "Regent Palace is nestled in the vibrant heart of Adabor offering a harmonious blend of Warmth, Serenity and Modern Luxury. This thoughtfully crafted residential development features elegant 1580 SFT, 3-bedroom apartment tailored for comfortable, stylish urban living. With standout architectural beauty and premium finishing materials used throughout the common areas, Regent Palace sets a new benchmark in the Adabor–Mohammadpur zone, reflecting a level of craftsmanship rarely found in the area. Residents will enjoy a range of lifestyle-enhancing amenities, including a Landscaped Rooftop with BBQ facilities and a Grand Community Hall—perfect for both relaxation and community gatherings. Ideally located near Shyamoli, Tokyo Square, top schools, hospitals & more, Regent Palace also offers seamless access to Dhanmondi, Lalmatia, Mirpur, and Japan Garden City.",
    features: [
      "Premium Quality Fitting & Features",
      "BBQ Zone",
      "Landscaped Roof Top with Seating Arrangement",
      "Roof Top Community Hall Room with Toilet",
      "Full Building Made of Stone",
      "Well Ventilated Apartments",
    ],
    progress: [
      { label: "Overall Progress", value: 100 },
    ],
    glance: [
      { icon: "address", label: "Address", value: "Adabor, Mohammadpur, Dhaka" },
      { icon: "size", label: "Size", value: "1580 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "03" },
      { icon: "facing", label: "Project Facing", value: "North" },
      { icon: "floor", label: "Floor", value: "G+9" },
      { icon: "apartments", label: "Apartments", value: "04" },
      { icon: "total", label: "Total Apartments", value: "36" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "June 2025" },
    ],
    gallery: [
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/Night-2.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-PALACE-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-PALACE-3.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-PALACE-4.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-PALACE-5.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-PALACE-6.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-PALACE-7.jpg",
    ],
    mapCoords: { lat: 23.7733429, lng: 90.3485950 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Regent-Palace-1.pdf",
  },
  "regent-spring-field": {
    name: "Regent Spring Field",
    tagline: "West Agargaon | Dhaka",
    status: "ongoing" as const,
    heroImage: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
    overview: "Regent Spring Field is an Exclusive 8-Storied residential development located in the highly secure and prestigious neighborhood of West Agargaon—home to some of the Country's Key Government Institutions. Each Floor features well-designed 1650 SFT double-unit apartments offering a harmonious balance of Space, Privacy and Functionality. Surrounded by Key Government and Public establishments—including the Bangladesh Election Commission, Passport Office, Pongu Hospital, Neuro-Science Hospital, Department of Environment, Bangladesh Betar, PKSF, National Institute of Kidney Diseases and National Institute of Cardiovascular Diseases—this address is at the heart of national infrastructure. The project also enjoys excellent access to the Metro Rail Station.",
    features: [
      "Full Building Made of Stone",
      "Modern Architectural Design",
      "Just Steps Away from Govt. Offices & Metro Rail Station",
      "Premium Quality Fitting & Features",
      "Roof Top Community Hall Room with Toilet",
      "Landscaped Roof Top with Seating Arrangement",
    ],
    progress: [
      { label: "Overall Progress", value: 70 },
    ],
    glance: [
      { icon: "address", label: "Address", value: "West Agargaon (Near 60Ft Road), Dhaka-1207" },
      { icon: "size", label: "Size", value: "1650 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "03" },
      { icon: "facing", label: "Project Facing", value: "West" },
      { icon: "floor", label: "Floor", value: "G+7" },
      { icon: "apartments", label: "Apartments", value: "02" },
      { icon: "total", label: "Total Apartments", value: "14" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "March 2026" },
    ],
    gallery: [
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SPRING-FIELD-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SPRING-FIELD-2.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SPRING-FIELD-3.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SPRING-FIELD-4.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SPRING-FIELD-5.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SPRING-FIELD-6.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SPRING-FIELD-7.jpg",
    ],
    mapCoords: { lat: 23.781365, lng: 90.367875 },
  },
  "regent-rizia": {
    name: "Regent Rizia",
    tagline: "Live at the Center of Growth & Convenience",
    status: "ongoing" as const,
    heroImage: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9",
    overview: "Regent Rizia enjoys a truly enviable location at Sector-15/I of Uttara—just a few steps away from the Uttara Metro Rail Station. This excellent connectivity ensures fast, effortless travel across the city, making your daily commute smoother than ever. Surrounded by Major Landmarks like the North Metro Rail Station, Fantasy Island, University of Creative Arts and close to essential facilities like mosque, universities & hospitals, Regent Rizia is perfectly placed for a vibrant yet peaceful lifestyle. Live at the center of growth and convenience while enjoying the comfort of a beautifully designed home at Regent Rizia.",
    features: [
      "Steps Away from Uttara Metro Rail Station",
      "Surrounded by Major Landmarks & Essential Facilities",
      "Beautifully Designed Modern Home",
      "Earthquake-resistant RCC structure designed by BUET professor",
      "High-speed passenger elevator with generator backup",
      "24/7 security with CCTV surveillance",
    ],
    progress: [
      { label: "Overall Progress", value: 30 },
    ],
    glance: [
      { icon: "address", label: "Address", value: "Plot-09, Road-02, Sector-15/I, Uttara | Dhaka" },
      { icon: "size", label: "Size", value: "2680 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "04" },
      { icon: "facing", label: "Project Facing", value: "East" },
      { icon: "floor", label: "Floor", value: "G+9" },
      { icon: "apartments", label: "Apartments", value: "01" },
      { icon: "total", label: "Total Apartments", value: "09" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "—" },
    ],
    gallery: [
      "https://regentgroup.com.bd/wp-content/uploads/2026/02/GF-HD-01-15.07.25-scaled.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2026/02/Side-View-1-scaled.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2026/02/Front-View-scaled.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2026/02/Front-View-Partial-scaled.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2026/02/Day-View-3-scaled.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2026/02/F-01-HD-15.07.25-scaled.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2026/02/Day-View-2-scaled.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2026/02/Side-View-2-scaled.jpg",
    ],
    mapCoords: { lat: 23.8759, lng: 90.3795 },
  },
  // Completed
  "regent-jannat": {
    name: "Regent Jannat",
    tagline: "Elegant South-Facing Living in Aftabnagar",
    status: "completed" as const,
    heroImage: "https://pixabay.com/get/gbda65925da7641f07eb3396ca264bcf6dfed856e314f545b95665a745476a94aa05659d0da1cc369f05dbb4b48bd603aaebae4479e9dd436374fa9274592daa9_1920.jpg",
    overview: "Regent Jannat is a completed residential project located in Block F of the Aftabnagar R/A, Dhaka. This G+8 building features 16 south-facing apartments, offering spacious 3-bedroom layouts of 1570 and 1670 SFT. Designed by Prof. Shafiul Bari of BUET, the earthquake-resistant structure combines modern architectural elegance with premium amenities, including 24/7 security, generator backup, and a communal rooftop space.",
    features: [
      "Modern and elegant architectural design",
      "South-facing apartments with excellent natural light and ventilation",
      "Spacious 3-bedroom units with efficient layouts",
      "Earthquake-resistant RCC structure (BUET standard design)",
      "Lift with full-time generator backup",
      "24/7 security with CCTV surveillance and intercom system",
      "Dedicated car parking for residents",
      "Rooftop space for community and recreational use",
    ],
    progress: [{ label: "Overall Progress", value: 100 }],
    glance: [
      { icon: "address", label: "Address", value: "Block F, Aftabnagar R/A, Dhaka" },
      { icon: "size", label: "Size", value: "1570 & 1670 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "03" },
      { icon: "facing", label: "Project Facing", value: "South" },
      { icon: "floor", label: "Floor", value: "G+8" },
      { icon: "apartments", label: "Apartments", value: "02" },
      { icon: "total", label: "Total Apartments", value: "16" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "June 2023" },
    ],
    gallery: [
      "https://regentgroup.com.bd/wp-content/uploads/2025/04/Jannat_Close-1-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/04/Jannat_Close-2-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/04/Jannat-Day-View-1.jpg",
      "https://regentgroup.com.bd/wp-content/uploads/2025/04/Jannat-Night-View-2.jpg",
    ],
    mapCoords: { lat: 23.7697, lng: 90.4312 },
  },
  "regent-south-pearl": makeProject("Regent South Pearl", "completed"),
  "regent-east-castle": makeProject("Regent East Castle", "completed"),
  "regent-south-lake": makeProject("Regent South Lake", "completed"),
  "regent-east-queen": makeProject("Regent East Queen", "completed"),
  "regent-sufia": makeProject("Regent Sufia", "completed"),
  "regent-parbata-grand": makeProject("Regent Parbata Grand", "completed"),
  "regent-islam": makeProject("Regent Islam", "completed"),
};

const getGlanceIcon = (icon: string) => {
  switch (icon) {
    case "address": return <MapPin className="w-5 h-5" />;
    case "size": return <Maximize className="w-5 h-5" />;
    case "bedroom": return <BedDouble className="w-5 h-5" />;
    case "facing": return <Compass className="w-5 h-5" />;
    case "floor": return <Building2 className="w-5 h-5" />;
    case "apartments": return <Home className="w-5 h-5" />;
    case "total": return <Layers className="w-5 h-5" />;
    case "designer": return <HardHat className="w-5 h-5" />;
    case "handover": return <Calendar className="w-5 h-5" />;
    default: return <MapPin className="w-5 h-5" />;
  }
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projectsData[slug || ""];
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [brochureOpen, setBrochureOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light text-foreground tracking-wide">Project Not Found</h1>
            <p className="text-muted-foreground mt-4">The project you're looking for doesn't exist.</p>
            <Link to="/projects" className="inline-block mt-8 px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em]">
              View All Projects
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section – Full View */}
      <section className="relative h-screen w-full overflow-hidden">
        {project.heroImage ? (
          <img src={project.heroImage} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, hsl(240 51% 14%), hsl(194 89% 10%), hsl(0 0% 5%))",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="relative h-full flex flex-col justify-end pb-20 px-4">
          <div className="container-regent">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">
                {project.status === "ongoing" ? "Ongoing Project" : "Completed Project"}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-wide mt-4 text-foreground uppercase">
                {project.name}
              </h1>
              <p className="text-muted-foreground text-sm md:text-lg lg:text-xl mt-3 md:mt-4 font-light tracking-wide">
                {project.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8">
                <a
                  href="#schedule"
                  className="px-6 md:px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors text-center"
                >
                  Schedule Visit
                </a>
                <a
                  href="#overview"
                  className="px-6 md:px-8 py-3 border border-border text-foreground text-sm uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors text-center"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">About the Project</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mt-3 text-foreground">PROJECT OVERVIEW</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-10 text-base md:text-lg leading-relaxed">
              {project.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Features */}
      <section className="section-padding bg-card/50">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">What We Offer</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mt-3 text-foreground">PROJECT FEATURES</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto">
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-4 py-4 border-b border-border/50"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <p className="text-foreground/90 text-sm md:text-base font-light leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Progress */}
      <section className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Construction Update</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mt-3 text-foreground">PROJECT PROGRESS</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>

          <div className="space-y-8">
            {project.progress.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground text-sm uppercase tracking-[0.15em] font-light">{item.label}</span>
                  <span className="text-primary text-sm font-medium">{item.value}%</span>
                </div>
                <Progress
                  value={item.value}
                  className="h-2 bg-muted"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* At a Glance */}
      <section className="section-padding bg-card/50">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Quick Info</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mt-3 text-foreground">AT A GLANCE</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {project.glance.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-4 p-6 border border-border/50 bg-background/50 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-primary/30 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                  {getGlanceIcon(item.icon)}
                </div>
                <div>
                  <span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">{item.label}</span>
                  <p className="text-foreground text-sm md:text-base font-light mt-1">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Brochure */}
      <section className="py-8 bg-background">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-border/50 px-4 md:px-6 py-4 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm uppercase tracking-[0.15em] text-foreground font-light">Project Brochure</span>
            </div>
            <button
              onClick={() => setBrochureOpen(true)}
              className="w-full sm:w-auto px-6 py-2 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </motion.div>
        </div>
      </section>

      <BrochureDownloadDialog
        open={brochureOpen}
        onOpenChange={setBrochureOpen}
        projectName={project.name}
        brochureUrl={project.brochureUrl}
      />

      {/* Dynamic Project Location */}
      <section className="section-padding bg-card/50">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Find Us</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mt-3 text-foreground">PROJECT LOCATION</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
        <ProjectMap
          lat={project.mapCoords.lat}
          lng={project.mapCoords.lng}
          projectName={project.name}
          address={project.glance.find(g => g.icon === "address")?.value}
        />
      </section>

      {/* Project Gallery – Full View */}
      <section className="section-padding bg-background">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Visual Tour</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mt-3 text-foreground">PROJECT GALLERY</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>

          {project.gallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`${project.name} gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(${130 + i * 25}deg, hsl(240 51% 14%), hsl(194 89% ${10 + i * 3}%), hsl(0 0% 8%))`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground/50 text-xs uppercase tracking-[0.3em]">Coming Soon</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Schedule Your Visit */}
      <section id="schedule" className="section-padding bg-card/50">
        <div className="container-regent max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Get in Touch</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mt-3 text-foreground">SCHEDULE YOUR VISIT</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed max-w-xl mx-auto">
              Interested in this project? Schedule a site visit or contact us for more information.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
            {[
              { icon: <Phone className="w-5 h-5" />, label: "Call Us", value: "0181 000 9333", href: "tel:01810009333" },
              { icon: <Mail className="w-5 h-5" />, label: "Email Us", value: "info@regentddl.com", href: "mailto:info@regentddl.com" },
              { icon: <Clock className="w-5 h-5" />, label: "Office Hours", value: "Sat–Thu, 10AM–6PM", href: null },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-8 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center border border-primary/30 text-primary mb-4">
                  {item.icon}
                </div>
                <span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="block text-foreground mt-2 text-sm hover:text-primary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-foreground mt-2 text-sm">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-border/50 p-5 md:p-8 lg:p-12 space-y-6 md:space-y-8"
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const name = (formData.get("name") as string)?.trim();
              const phone = (formData.get("phone") as string)?.trim();
              const email = (formData.get("email") as string)?.trim();

              if (!name || !phone) {
                toast.error("Please fill in your name and phone number.");
                return;
              }
              if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                toast.error("Please enter a valid email address.");
                return;
              }

              toast.success("Thank you! We'll contact you shortly to confirm your visit.", {
                duration: 5000,
              });
              form.reset();
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-foreground font-medium">Book a Site Visit</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground block">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  className="w-full bg-background/50 border border-border/50 px-4 py-3.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/40"
                  placeholder="e.g. Mohammad Rahman"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground block">
                  Phone Number <span className="text-primary">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  maxLength={20}
                  className="w-full bg-background/50 border border-border/50 px-4 py-3.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/40"
                  placeholder="e.g. 01XXXXXXXXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground block">Email Address</label>
                <input
                  name="email"
                  type="email"
                  maxLength={255}
                  className="w-full bg-background/50 border border-border/50 px-4 py-3.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/40"
                  placeholder="e.g. your@email.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground block">Preferred Visit Date</label>
                <input
                  name="date"
                  type="date"
                  className="w-full bg-background/50 border border-border/50 px-4 py-3.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground block">
                Interested In
              </label>
              <select
                name="interest"
                className="w-full bg-background/50 border border-border/50 px-4 py-3.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="site-visit">Site Visit</option>
                <option value="pricing">Pricing Information</option>
                <option value="floor-plan">Floor Plan Details</option>
                <option value="payment-plan">Payment Plan</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground block">Message</label>
              <textarea
                name="message"
                rows={4}
                maxLength={1000}
                className="w-full bg-background/50 border border-border/50 px-4 py-3.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-muted-foreground/40"
                placeholder="Any specific questions or requirements..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 font-medium"
              >
                Schedule Visit
              </button>
              <a
                href="tel:01810009333"
                className="flex items-center justify-center gap-2 py-4 px-6 border border-primary/30 text-primary text-sm uppercase tracking-[0.2em] hover:bg-primary/10 transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            <p className="text-[10px] text-muted-foreground/60 text-center">
              By submitting, you agree to be contacted by Regent Design & Development Ltd regarding your inquiry.
            </p>
          </motion.form>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage > 0 ? selectedImage - 1 : project.gallery.length - 1);
            }}
            className="absolute left-4 md:left-8 p-2 text-muted-foreground hover:text-foreground transition-colors z-50"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage < project.gallery.length - 1 ? selectedImage + 1 : 0);
            }}
            className="absolute right-4 md:right-8 p-2 text-muted-foreground hover:text-foreground transition-colors z-50"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <img
            src={project.gallery[selectedImage]}
            alt={`${project.name} gallery ${selectedImage + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 text-center text-muted-foreground text-xs uppercase tracking-[0.2em]">
            {selectedImage + 1} / {project.gallery.length}
          </div>
        </motion.div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProjectDetail;
