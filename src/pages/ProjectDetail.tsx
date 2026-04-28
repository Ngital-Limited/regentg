import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";
import BrochureDownloadDialog from "@/components/BrochureDownloadDialog";
import ProjectMap from "@/components/ProjectMap";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { MapPin, Maximize, BedDouble, Compass, Building2, Home, Layers, HardHat, Calendar, Download, Phone, Mail, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import img_lifestyle_3107041_1280 from "@/assets/imported/lifestyle-3107041_1280.jpg";
import img_real_estate_9053405_1280 from "@/assets/imported/real-estate-9053405_1280.jpg";
import img_img_07_04_03_524_1280 from "@/assets/imported/07-04-03-524_1280.jpg";
import img_img_07_36_12_440_1280 from "@/assets/imported/07-36-12-440_1280.jpg";
import img_img_07_41_50_734_1280 from "@/assets/imported/07-41-50-734_1280.jpg";
import img_m_Modern from "@/assets/imported/m-Modern.jpg";
import img_Blow_Up_2_1 from "@/assets/imported/Blow-Up-2-1.jpg";
import img_Close_01_Feb_2022_2 from "@/assets/imported/Close_01-Feb-2022-2.jpg";
import img_Front_1B_1 from "@/assets/imported/Front-1B-1.jpg";
import img_Front_1C from "@/assets/imported/Front-1C.jpg";
import img_Ground_View_1 from "@/assets/imported/Ground-View-1.jpg";
import img_Hasina_Close_02_Feb_2022_1 from "@/assets/imported/Hasina-Close_02-Feb-2022-1.jpg";
import img_Hasina_Close_02_Feb_2022_2 from "@/assets/imported/Hasina-Close_02-Feb-2022-2.jpg";
import img_Hasina_View_01_Feb_2022_1 from "@/assets/imported/Hasina-View_01-Feb-2022-1.jpg";
import img_Islam_Night_View_15_FEb_2022_scaled_1 from "@/assets/imported/Islam-Night-View_15-FEb-2022-scaled-1.jpg";
import img_Night_1_1 from "@/assets/imported/Night-1-1.jpg";
import img_Night_2_1 from "@/assets/imported/Night-2-1.jpg";
import img_Night_2 from "@/assets/imported/Night-2.jpg";
import img_Night_View_02_Feb_2022 from "@/assets/imported/Night-View_02-Feb-2022-.jpg";
import img_REGENT_ISLAM_1 from "@/assets/imported/REGENT-ISLAM-1.jpg";
import img_REGENT_ISLAM_2 from "@/assets/imported/REGENT-ISLAM-2.jpg";
import img_REGENT_ISLAM_3 from "@/assets/imported/REGENT-ISLAM-3.jpg";
import img_REGENT_ISLAM_4 from "@/assets/imported/REGENT-ISLAM-4.jpg";
import img_REGENT_ISLAM_5 from "@/assets/imported/REGENT-ISLAM-5.jpg";
import img_REGENT_PALACE_1 from "@/assets/imported/REGENT-PALACE-1.jpg";
import img_REGENT_PALACE_3 from "@/assets/imported/REGENT-PALACE-3.jpg";
import img_REGENT_PALACE_4 from "@/assets/imported/REGENT-PALACE-4.jpg";
import img_REGENT_PALACE_5 from "@/assets/imported/REGENT-PALACE-5.jpg";
import img_REGENT_PALACE_6 from "@/assets/imported/REGENT-PALACE-6.jpg";
import img_REGENT_PALACE_7 from "@/assets/imported/REGENT-PALACE-7.jpg";
import img_REGENT_SAPPHIRE_1 from "@/assets/imported/REGENT-SAPPHIRE-1.jpg";
import img_REGENT_SAPPHIRE_10 from "@/assets/imported/REGENT-SAPPHIRE-10.jpg";
import img_REGENT_SAPPHIRE_11 from "@/assets/imported/REGENT-SAPPHIRE-11.jpg";
import img_REGENT_SAPPHIRE_2 from "@/assets/imported/REGENT-SAPPHIRE-2.jpg";
import img_REGENT_SAPPHIRE_3 from "@/assets/imported/REGENT-SAPPHIRE-3.jpg";
import img_REGENT_SAPPHIRE_4 from "@/assets/imported/REGENT-SAPPHIRE-4.jpg";
import img_REGENT_SAPPHIRE_5 from "@/assets/imported/REGENT-SAPPHIRE-5.jpg";
import img_REGENT_SAPPHIRE_6 from "@/assets/imported/REGENT-SAPPHIRE-6.jpg";
import img_REGENT_SAPPHIRE_7 from "@/assets/imported/REGENT-SAPPHIRE-7.jpg";
import img_REGENT_SAPPHIRE_8 from "@/assets/imported/REGENT-SAPPHIRE-8.jpg";
import img_REGENT_SAPPHIRE_9 from "@/assets/imported/REGENT-SAPPHIRE-9.jpg";
import img_REGENT_SPRING_FIELD_1 from "@/assets/imported/REGENT-SPRING-FIELD-1.jpg";
import img_REGENT_SPRING_FIELD_2 from "@/assets/imported/REGENT-SPRING-FIELD-2.jpg";
import img_REGENT_SPRING_FIELD_3 from "@/assets/imported/REGENT-SPRING-FIELD-3.jpg";
import img_REGENT_SPRING_FIELD_4 from "@/assets/imported/REGENT-SPRING-FIELD-4.jpg";
import img_REGENT_SPRING_FIELD_5 from "@/assets/imported/REGENT-SPRING-FIELD-5.jpg";
import img_REGENT_SPRING_FIELD_6 from "@/assets/imported/REGENT-SPRING-FIELD-6.jpg";
import img_REGENT_SPRING_FIELD_7 from "@/assets/imported/REGENT-SPRING-FIELD-7.jpg";
import img_REGENT_TARA_1 from "@/assets/imported/REGENT-TARA-1.jpg";
import img_REGENT_TARA_10 from "@/assets/imported/REGENT-TARA-10.jpg";
import img_REGENT_TARA_2 from "@/assets/imported/REGENT-TARA-2.jpg";
import img_REGENT_TARA_3 from "@/assets/imported/REGENT-TARA-3.jpg";
import img_REGENT_TARA_4 from "@/assets/imported/REGENT-TARA-4.jpg";
import img_REGENT_TARA_5 from "@/assets/imported/REGENT-TARA-5.jpg";
import img_REGENT_TARA_6 from "@/assets/imported/REGENT-TARA-6.jpg";
import img_REGENT_TARA_7 from "@/assets/imported/REGENT-TARA-7.jpg";
import img_REGENT_TARA_8 from "@/assets/imported/REGENT-TARA-8.jpg";
import img_REGENT_TARA_9 from "@/assets/imported/REGENT-TARA-9.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_1 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-1.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_10 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-10.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_11 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-11.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_12 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-12.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_13 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-13.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_14 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-14.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_15 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-15.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_16 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-16.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_2 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-2.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_3 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-3.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_4 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-4.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_5 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-5.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_6 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-6.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_7 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-7.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_8 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-8.jpg";
import img_RGH_Roof_Top_3_24_Aug_2023_9 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-9.jpg";
import img_Roof_1_3 from "@/assets/imported/Roof-1-3.jpg";
import img_Roof_2B_2 from "@/assets/imported/Roof-2B-2.jpg";
import img_Side_Ground_1_scaled_1 from "@/assets/imported/Side-Ground-1-scaled-1.jpg";
import img_Side_Ground_Vertical_1 from "@/assets/imported/Side-Ground-Vertical-1.jpg";
import img_Top_View_1 from "@/assets/imported/Top-View-1.jpg";
import img_dae33a8cc9 from "@/assets/imported/dae33a8cc9.jpg";
import img_dfe593ed9f from "@/assets/imported/dfe593ed9f.jpg";
import img_e2e7202782 from "@/assets/imported/e2e7202782.jpg";
import img_Blow_Up_B from "@/assets/imported/Blow-Up-B.jpg";
import img_Blow_Up_C_1 from "@/assets/imported/Blow-Up-C-1.jpg";
import img_Blow_Up_Left_Side from "@/assets/imported/Blow-Up_Left-Side.jpg";
import img_Blow_Up_Right_Side from "@/assets/imported/Blow-Up_Right-Side.jpg";
import img_Ground_Outside from "@/assets/imported/Ground_Outside.jpg";
import img_Jannat_Day_View_1 from "@/assets/imported/Jannat-Day-View-1.jpg";
import img_Jannat_Night_View_2 from "@/assets/imported/Jannat-Night-View-2.jpg";
import img_Jannat_Close_1_1 from "@/assets/imported/Jannat_Close-1-1.jpg";
import img_Jannat_Close_2_1 from "@/assets/imported/Jannat_Close-2-1.jpg";
import img_Night_View from "@/assets/imported/Night-View.jpg";
import img_REGENT_EAST_CASTLE_1 from "@/assets/imported/REGENT-EAST-CASTLE-1.jpg";
import img_REGENT_EAST_CASTLE_2 from "@/assets/imported/REGENT-EAST-CASTLE-2.jpg";
import img_REGENT_EAST_CASTLE_3 from "@/assets/imported/REGENT-EAST-CASTLE-3.jpg";
import img_REGENT_EAST_CASTLE_4 from "@/assets/imported/REGENT-EAST-CASTLE-4.jpg";
import img_REGENT_EAST_CASTLE_5 from "@/assets/imported/REGENT-EAST-CASTLE-5.jpg";
import img_REGENT_EAST_QUEEN_1 from "@/assets/imported/REGENT-EAST-QUEEN-1.jpg";
import img_REGENT_EAST_QUEEN_2 from "@/assets/imported/REGENT-EAST-QUEEN-2.jpg";
import img_REGENT_EAST_QUEEN_3 from "@/assets/imported/REGENT-EAST-QUEEN-3.jpg";
import img_REGENT_EAST_QUEEN_4 from "@/assets/imported/REGENT-EAST-QUEEN-4.jpg";
import img_REGENT_EAST_QUEEN_5 from "@/assets/imported/REGENT-EAST-QUEEN-5.jpg";
import img_REGENT_PARBATA_GRAND_1 from "@/assets/imported/REGENT-PARBATA-GRAND-1.jpg";
import img_REGENT_PARBATA_GRAND_2 from "@/assets/imported/REGENT-PARBATA-GRAND-2.jpg";
import img_REGENT_PARBATA_GRAND_3 from "@/assets/imported/REGENT-PARBATA-GRAND-3.jpg";
import img_REGENT_PARBATA_GRAND_4 from "@/assets/imported/REGENT-PARBATA-GRAND-4.jpg";
import img_REGENT_PARBATA_GRAND_5 from "@/assets/imported/REGENT-PARBATA-GRAND-5.jpg";
import img_REGENT_SOUTH_LAKE_1 from "@/assets/imported/REGENT-SOUTH-LAKE-1.jpg";
import img_REGENT_SOUTH_LAKE_2 from "@/assets/imported/REGENT-SOUTH-LAKE-2.jpg";
import img_REGENT_SOUTH_LAKE_3 from "@/assets/imported/REGENT-SOUTH-LAKE-3.jpg";
import img_REGENT_SUFIA_1 from "@/assets/imported/REGENT-SUFIA-1.jpg";
import img_REGENT_SUFIA_2 from "@/assets/imported/REGENT-SUFIA-2.jpg";
import img_full_image_25_06_2018 from "@/assets/imported/full-image-25-06-2018.jpg";
import img_Day_View_2_scaled from "@/assets/imported/Day-View-2-scaled.jpg";
import img_Day_View_3_scaled from "@/assets/imported/Day-View-3-scaled.jpg";
import img_F_01_HD_15_07_25_scaled from "@/assets/imported/F-01-HD-15.07.25-scaled.jpg";
import img_Front_View_Partial_scaled from "@/assets/imported/Front-View-Partial-scaled.jpg";
import img_Front_View_scaled from "@/assets/imported/Front-View-scaled.jpg";
import img_GF_HD_01_15_07_25_scaled from "@/assets/imported/GF-HD-01-15.07.25-scaled.jpg";
import img_Side_View_1_scaled from "@/assets/imported/Side-View-1-scaled.jpg";
import img_Side_View_2_scaled from "@/assets/imported/Side-View-2-scaled.jpg";

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
    heroImage: img_RGH_Roof_Top_3_24_Aug_2023_8,
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
      img_RGH_Roof_Top_3_24_Aug_2023_8,
      img_RGH_Roof_Top_3_24_Aug_2023_1,
      img_RGH_Roof_Top_3_24_Aug_2023_2,
      img_RGH_Roof_Top_3_24_Aug_2023_3,
      img_RGH_Roof_Top_3_24_Aug_2023_5,
      img_RGH_Roof_Top_3_24_Aug_2023_13,
      img_RGH_Roof_Top_3_24_Aug_2023_6,
      img_RGH_Roof_Top_3_24_Aug_2023_7,
      img_RGH_Roof_Top_3_24_Aug_2023_9,
      img_RGH_Roof_Top_3_24_Aug_2023_4,
      img_RGH_Roof_Top_3_24_Aug_2023_11,
      img_RGH_Roof_Top_3_24_Aug_2023_14,
      img_RGH_Roof_Top_3_24_Aug_2023_15,
      img_RGH_Roof_Top_3_24_Aug_2023_10,
      img_RGH_Roof_Top_3_24_Aug_2023_16,
      img_RGH_Roof_Top_3_24_Aug_2023_12,
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
      img_Hasina_Close_02_Feb_2022_2,
      img_Night_View_02_Feb_2022,
      img_e2e7202782,
      img_Hasina_Close_02_Feb_2022_1,
      img_dae33a8cc9,
      img_Hasina_View_01_Feb_2022_1,
      img_dfe593ed9f,
      img_Close_01_Feb_2022_2,
    ],
    mapCoords: { lat: 23.8215359, lng: 90.4440474 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-HASINA-PDF.pdf",
  },
  "regent-sapphire": {
    name: "Regent Sapphire",
    tagline: "Prestigious North-Facing Living in Bashundhara R/A",
    status: "ongoing" as const,
    heroImage: img_m_Modern,
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
      img_REGENT_SAPPHIRE_1,
      img_REGENT_SAPPHIRE_2,
      img_REGENT_SAPPHIRE_3,
      img_REGENT_SAPPHIRE_4,
      img_REGENT_SAPPHIRE_5,
      img_REGENT_SAPPHIRE_6,
      img_REGENT_SAPPHIRE_7,
      img_REGENT_SAPPHIRE_8,
      img_REGENT_SAPPHIRE_9,
      img_REGENT_SAPPHIRE_10,
      img_REGENT_SAPPHIRE_11,
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
      img_Blow_Up_2_1,
      img_Front_1B_1,
      img_Front_1C,
      img_Ground_View_1,
      img_Night_1_1,
      img_Night_2_1,
      img_Roof_1_3,
      img_Roof_2B_2,
      img_Side_Ground_1_scaled_1,
      img_Side_Ground_Vertical_1,
      img_Top_View_1,
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
    progress: [
      { label: "Overall Progress", value: 55 },
    ],
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
      img_REGENT_TARA_1,
      img_REGENT_TARA_2,
      img_REGENT_TARA_3,
      img_REGENT_TARA_4,
      img_REGENT_TARA_5,
      img_REGENT_TARA_6,
      img_REGENT_TARA_7,
      img_REGENT_TARA_8,
      img_REGENT_TARA_9,
      img_REGENT_TARA_10,
    ],
    mapCoords: { lat: 23.7671012, lng: 90.4551473 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Regent-Tara-Brochure.pdf",
  },
  "regent-palace": {
    name: "Regent Palace",
    tagline: "Warmth, Serenity & Modern Luxury",
    status: "ongoing" as const,
    heroImage: img_REGENT_PALACE_1,
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
      img_Night_2,
      img_REGENT_PALACE_1,
      img_REGENT_PALACE_3,
      img_REGENT_PALACE_4,
      img_REGENT_PALACE_5,
      img_REGENT_PALACE_6,
      img_REGENT_PALACE_7,
    ],
    mapCoords: { lat: 23.7733429, lng: 90.3485950 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Regent-Palace-1.pdf",
  },
  "regent-spring-field": {
    name: "Regent Spring Field",
    tagline: "Unmatched Connectivity Come Together.",
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
      img_REGENT_SPRING_FIELD_1,
      img_REGENT_SPRING_FIELD_2,
      img_REGENT_SPRING_FIELD_3,
      img_REGENT_SPRING_FIELD_4,
      img_REGENT_SPRING_FIELD_5,
      img_REGENT_SPRING_FIELD_6,
      img_REGENT_SPRING_FIELD_7,
    ],
    mapCoords: { lat: 23.781365, lng: 90.367875 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Spring-Field-Brochure.pdf",
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
      { icon: "address", label: "Address", value: "Plot-09, Road-02, Sector-15/I, Uttara, Dhaka" },
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
      img_GF_HD_01_15_07_25_scaled,
      img_Side_View_1_scaled,
      img_Front_View_scaled,
      img_Front_View_Partial_scaled,
      img_Day_View_3_scaled,
      img_F_01_HD_15_07_25_scaled,
      img_Day_View_2_scaled,
      img_Side_View_2_scaled,
    ],
    mapCoords: { lat: 23.8759, lng: 90.3795 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2026/02/Rizia-Brochure-v12-1.pdf",
  },
  // Completed
  "regent-jannat": {
    name: "Regent Jannat",
    tagline: "Elegant South-Facing Living in Aftabnagar",
    status: "completed" as const,
    heroImage: img_img_07_04_03_524_1280,
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
      img_Jannat_Close_1_1,
      img_Jannat_Close_2_1,
      img_Jannat_Day_View_1,
      img_Jannat_Night_View_2,
    ],
    mapCoords: { lat: 23.7697, lng: 90.4312 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/04/Regent-Jannat-2.pdf",
  },
  "regent-south-pearl": {
    name: "Regent South Pearl",
    tagline: "Premium South-Facing Living in Khilgaon",
    status: "completed" as const,
    heroImage: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6",
    overview: "Regent South Pearl is a premium residential development located in the heart of Khilgaon Block-A. Designed for those who value comfort and prestige, this South-facing G+7 building offers 14 meticulously planned apartments. With its structural integrity certified by Prof. Shafiul Bari (BUET) and a completion status of 100%, this project stands as a testament to quality craftsmanship and functional urban living.",
    features: [
      "South-Facing Advantage: Optimized for maximum natural light and cross-ventilation",
      "Seismic Design: Earthquake-resistant structure designed by expert BUET consultants",
      "High-Speed Lift: Reliable passenger elevator ensuring smooth vertical transport",
      "Full Power Backup: Standby generator for common utilities and essential apartment points",
      "24/7 Security: Secure gated entrance with guard post and intercom connectivity",
      "Ground Floor Parking: Spacious and well-demarcated car parking for all residents",
      "Rooftop Area: Community space designed for recreation and open-air relaxation",
      "Utility Infrastructure: Independent WASA, DESCO, and deep tube-well water supply systems",
    ],
    progress: [{ label: "Overall Progress", value: 100 }],
    glance: [
      { icon: "address", label: "Address", value: "Block – A, Khilgaon, Dhaka" },
      { icon: "size", label: "Size", value: "1348 & 1361 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "3" },
      { icon: "facing", label: "Project Facing", value: "South" },
      { icon: "floor", label: "Floor", value: "G+7" },
      { icon: "apartments", label: "Apartments", value: "02" },
      { icon: "total", label: "Total Apartments", value: "14" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "December 2020" },
    ],
    gallery: [
      img_Blow_Up_Left_Side,
      img_Ground_Outside,
      img_full_image_25_06_2018,
      img_Blow_Up_Right_Side,
    ],
    mapCoords: { lat: 23.7501032, lng: 90.4294576 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/04/Regent-South-Pearl.pdf",
  },
  "regent-east-castle": {
    name: "Regent East Castle",
    tagline: "Signature East-Facing Living on Shadhinata Sarani",
    status: "completed" as const,
    heroImage: img_img_07_36_12_440_1280,
    overview: "Regent East Castle is a signature residential address located on Shadhinata Sarani in North Badda, offering a perfect blend of urban convenience and structural elegance. This East-facing G+7 building features 14 spacious apartments designed for modern family living. Completed in June 2021 and boasting a 100% progress rate, the project ensures peace of mind with a robust structure designed by Prof. Shafiul Bari (BUET).",
    features: [
      "East-Facing Orientation: Perfectly positioned to capture the morning sun and maintain a bright, refreshing indoor atmosphere",
      "BUET-Certified Design: Structural engineering by Prof. Shafiul Bari, ensuring high-grade earthquake resistance and safety",
      "Modern Elevator: A high-standard passenger lift providing quick and easy access to all seven floors",
      "Full Power Backup: A heavy-duty standby generator to power the lift, water pumps, and emergency lights",
      "Secure Environment: Round-the-clock security with a dedicated guard room and intercom facilities for every unit",
      "Functional Parking: Well-planned parking spaces on the ground floor with a wide entrance for easy vehicle movement",
      "Rooftop Community Area: A common space for residents to enjoy open-air views and community social gatherings",
    ],
    progress: [{ label: "Overall Progress", value: 100 }],
    glance: [
      { icon: "address", label: "Address", value: "Shadhinata Sarani Road, North Badda, Dhaka" },
      { icon: "size", label: "Size", value: "1393 & 1398 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "3" },
      { icon: "facing", label: "Project Facing", value: "East" },
      { icon: "floor", label: "Floor", value: "G+7" },
      { icon: "apartments", label: "Apartments", value: "02" },
      { icon: "total", label: "Total Apartments", value: "14" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "June 2021" },
    ],
    gallery: [
      img_REGENT_EAST_CASTLE_1,
      img_REGENT_EAST_CASTLE_2,
      img_REGENT_EAST_CASTLE_3,
      img_REGENT_EAST_CASTLE_4,
      img_REGENT_EAST_CASTLE_5,
    ],
    mapCoords: { lat: 23.784918, lng: 90.4301727 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/04/Regent-East-Castle.pdf",
  },
  "regent-south-lake": {
    name: "Regent South Lake",
    tagline: "Exclusive Single-Unit Living by Hatirjheel",
    status: "completed" as const,
    heroImage: img_img_07_41_50_734_1280,
    overview: "Regent South Lake offers an exclusive living experience within the prestigious Mahanagar Housing Society, adjacent to the scenic Hatirjheel area. This boutique G+7 development is designed for ultimate privacy, featuring only one apartment per floor. With a sprawling 1744 SFT layout and a desirable South-facing orientation, each home is bathed in natural light and air. Structural safety is guaranteed by Prof. Shafiul Bari (BUET), and the project has been fully handed over since June 2020.",
    features: [
      "Single-Unit Privacy: Exclusive one-apartment-per-floor layout ensuring maximum privacy and quiet",
      "Prime South Facing: Positioned to capture natural southern breezes and optimal sunlight throughout the year",
      "BUET-Standard Safety: Structural design by Prof. Shafiul Bari (BUET) for superior earthquake resistance",
      "Premium Elevator: High-quality passenger lift for efficient and safe vertical access to all levels",
      "Standby Power: Reliable generator backup for the lift, water pumps, and essential lighting in common areas",
      "Comprehensive Security: 24/7 security guard presence with intercom systems for controlled guest access",
      "Hatirjheel Proximity: Located in a tranquil housing society with quick access to the recreational amenities of Hatirjheel",
      "Ready-to-Live Utilities: Fully established water, electricity, and sewerage connections for an immediate move-in experience",
    ],
    progress: [{ label: "Overall Progress", value: 100 }],
    glance: [
      { icon: "address", label: "Address", value: "Block D, Mahanagar Housing Society, Hatirjheel, Dhaka" },
      { icon: "size", label: "Size", value: "1744 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "03" },
      { icon: "facing", label: "Project Facing", value: "South" },
      { icon: "floor", label: "Floor", value: "G+7" },
      { icon: "apartments", label: "Apartments", value: "01" },
      { icon: "total", label: "Total Apartments", value: "07" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "June 2020" },
    ],
    gallery: [
      img_REGENT_SOUTH_LAKE_1,
      img_REGENT_SOUTH_LAKE_2,
      img_REGENT_SOUTH_LAKE_3,
    ],
    mapCoords: { lat: 23.7663796, lng: 90.4147224 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/04/Regent-South-Lake.pdf",
  },
  "regent-east-queen": {
    name: "Regent East Queen",
    tagline: "Elegant East-Facing Living on Queen's Garden Road",
    status: "completed" as const,
    heroImage: "https://images.unsplash.com/photo-1776584865836-0c4220368998",
    overview: "Regent East Queen is an elegantly designed residential landmark situated on Queen's Garden Road in Vatara. This G+7 boutique development offers 14 spacious 1520 SFT apartments, featuring an East-facing orientation that welcomes the morning sun and ensures a vibrant living environment. With structural engineering led by Prof. Shafiul Bari (BUET) and a 100% completion status, this project offers a perfect combination of safety, modern aesthetics, and urban convenience.",
    features: [
      "East-Facing Units: Designed to maximize natural morning light and maintain a bright, energetic interior",
      "Structural Excellence: Earthquake-resistant design by Prof. Shafiul Bari (BUET) following strict BNBC codes",
      "Modern Lift: High-performance passenger elevator providing seamless access to all floors",
      "Standby Generator: Continuous power backup for the elevator, water pumps, and common area lighting",
      "Secured Entrance: 24/7 security surveillance with a dedicated guard post and intercom system",
      "Reserved Parking: Organized and secure car parking spaces on the ground floor with wide turning radii",
      "Rooftop Community Space: A common rooftop area for residents to enjoy fresh air and community interactions",
      "Reliable Utilities: Independent water supply (Deep Tube-well/WASA) and established electrical connections for hassle-free living",
    ],
    progress: [{ label: "Overall Progress", value: 100 }],
    glance: [
      { icon: "address", label: "Address", value: "Queen's Garden Road, Vatara, Dhaka" },
      { icon: "size", label: "Size", value: "1520 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "03" },
      { icon: "facing", label: "Project Facing", value: "East" },
      { icon: "floor", label: "Floor", value: "G+7" },
      { icon: "apartments", label: "Apartments", value: "02" },
      { icon: "total", label: "Total Apartments", value: "14" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "February 2023" },
    ],
    gallery: [
      img_REGENT_EAST_QUEEN_1,
      img_REGENT_EAST_QUEEN_2,
      img_REGENT_EAST_QUEEN_3,
      img_REGENT_EAST_QUEEN_4,
      img_REGENT_EAST_QUEEN_5,
    ],
    mapCoords: { lat: 23.7925, lng: 90.4225 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/04/Regent-East-Queen.pdf",
  },
  "regent-sufia": {
    name: "Regent Sufia",
    tagline: "Majestic South-Facing Living in West Agargaon",
    status: "completed" as const,
    heroImage: img_real_estate_9053405_1280,
    overview: "Regent Sufia is a majestic residential landmark situated in the rapidly developing hub of West Agargaon. Rising to G+9 floors, this project offers 18 thoughtfully designed apartments that prioritize space and functionality. With a South-facing orientation, residents enjoy the quintessential Dhaka breeze and ample natural light. Handed over in December 2020, the building stands as a symbol of structural reliability, having been designed by the renowned Prof. Shafiul Bari (BUET).",
    features: [
      "Optimal South Facing: Ideally positioned to capture the soothing southern breeze and provide excellent cross-ventilation",
      "BUET-Certified Structure: Engineered by Prof. Shafiul Bari for maximum durability and earthquake resilience",
      "High-Speed Passenger Lift: A modern, reliable elevator system serving all 10 levels of the building",
      "Full Power Backup: Standby generator support for common areas, the water pump, and the elevator",
      "Enhanced Security: Round-the-clock security personnel and a modern intercom system for every apartment",
      "Spacious Ground Floor Parking: Well-ventilated and secure parking area with easy entry and exit points",
      "Rooftop Community Space: A common area for residents to relax, featuring heat-protective roof treatment",
      "Established Utility Connections: Ready-to-use water, electricity, and sewerage systems for immediate residency",
    ],
    progress: [{ label: "Overall Progress", value: 100 }],
    glance: [
      { icon: "address", label: "Address", value: "West Agargaon, Dhaka" },
      { icon: "size", label: "Size", value: "1383 & 1405 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "03" },
      { icon: "facing", label: "Project Facing", value: "South" },
      { icon: "floor", label: "Floor", value: "G+9" },
      { icon: "apartments", label: "Apartments", value: "02" },
      { icon: "total", label: "Total Apartments", value: "18" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "December 2020" },
    ],
    gallery: [
      img_Night_View,
      img_Blow_Up_B,
      img_Blow_Up_C_1,
      img_REGENT_SUFIA_1,
      img_REGENT_SUFIA_2,
    ],
    mapCoords: { lat: 23.779832, lng: 90.3697709 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/04/Regent-Sufia.pdf",
  },
  "regent-parbata-grand": {
    name: "Regent Parbata Grand",
    tagline: "Landmark Community Living in Mirpur 10",
    status: "completed" as const,
    heroImage: img_lifestyle_3107041_1280,
    overview: "Regent Parbata Grand is a landmark residential complex situated in the vibrant heart of Mirpur 10 (Senpara Parbata). This impressive B+G+9 story development is designed for large-scale community living, housing 126 premium apartments with versatile sizes ranging from 1064 to 1396 SFT. With its South-facing orientation and a massive architectural footprint, it offers a perfect balance of urban connectivity and structural safety. Handed over in December 2020, the project remains a premier choice for families seeking a secure, BUET-designed home in a thriving neighborhood.",
    features: [
      "Massive Community Living: A large-scale project featuring 126 units, fostering a vibrant and diverse neighborly environment",
      "Basement Parking (B+G+9): Includes a dedicated basement level to ensure ample and organized parking for residents and guests",
      "South-Facing Advantage: Designed to capture maximum natural airflow and sunlight, reducing the need for artificial cooling",
      "BUET-Certified Safety: Structural design by the renowned Prof. Shafiul Bari (BUET), ensuring the highest standards of earthquake resistance",
      "Multiple High-Speed Lifts: Equipped with several modern elevators to handle the high volume of residents efficiently",
      "24/7 Advanced Security: Round-the-clock security personnel, CCTV monitoring, and intercom systems for every apartment",
      "Full Power Backup: Heavy-duty generator support to ensure uninterrupted service for lifts, water pumps, and common areas",
      "Prime Connectivity: Ideally located in Senpara Parbata, offering immediate access to the Mirpur 10 Metro Rail station and major commercial hubs",
    ],
    progress: [{ label: "Overall Progress", value: 100 }],
    glance: [
      { icon: "address", label: "Address", value: "Senpara Parbata, Mirpur 10, Dhaka" },
      { icon: "size", label: "Size", value: "1064-1396 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "03" },
      { icon: "facing", label: "Project Facing", value: "South" },
      { icon: "floor", label: "Floor", value: "B+G+9" },
      { icon: "apartments", label: "Apartments", value: "14" },
      { icon: "total", label: "Total Apartments", value: "126" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "December 2020" },
    ],
    gallery: [
      img_REGENT_PARBATA_GRAND_1,
      img_REGENT_PARBATA_GRAND_2,
      img_REGENT_PARBATA_GRAND_3,
      img_REGENT_PARBATA_GRAND_4,
      img_REGENT_PARBATA_GRAND_5,
    ],
    mapCoords: { lat: 23.8069, lng: 90.3687 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/04/Regent-Parbata-Grand-Final.pdf",
  },
  "regent-islam": {
    name: "Regent Islam",
    tagline: "Where Modern Convenience Meets Urban Sophistication",
    status: "completed" as const,
    heroImage: "https://images.unsplash.com/photo-1777297400400-59b3ba8c05d4",
    overview: "Regent Islam is a thoughtfully designed residential project featuring spacious 1650 SFT double-unit apartments, located in the vibrant heart of Shadhinata Sarani, North Badda. The building stands out with its majestic Architectural Design, offering a perfect fusion of Elegance, Comfort and Modern Urban Living. Ideally positioned within walking distance of AMZ Hospital, Badda General Hospital, leading universities, schools, colleges and shopping malls, this project ensures seamless access to essential amenities for everyday living. With excellent connectivity to Gulshan-1, Gulshan-2, Baridhara, Rampura and the greater Badda area, Regent Islam is especially convenient for professionals working in the Gulshan and Baridhara diplomatic and commercial zones—cutting down on commute times and enhancing work-life balance.",
    features: [
      "Full Building Made of Stone",
      "Premium Quality Fitting & Features",
      "Elegant Building Elevation",
      "Designed Landscaped Roof Top with Seating Arrangement",
      "Project is Just Few Blocks from Main Avenue Road",
      "Easy Accessibility to Gulshan-1 & Gulshan-2 Area",
    ],
    progress: [{ label: "Overall Progress", value: 100 }],
    glance: [
      { icon: "address", label: "Address", value: "Shadhinata Sarani Road, North Badda, Dhaka" },
      { icon: "size", label: "Size", value: "1650 SFT" },
      { icon: "bedroom", label: "Bedroom", value: "03" },
      { icon: "facing", label: "Project Facing", value: "North" },
      { icon: "floor", label: "Floor", value: "G+9" },
      { icon: "apartments", label: "Apartments", value: "02" },
      { icon: "total", label: "Total Apartments", value: "18" },
      { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
      { icon: "handover", label: "Handover Date", value: "June 2025" },
    ],
    gallery: [
      img_REGENT_ISLAM_1,
      img_REGENT_ISLAM_2,
      img_REGENT_ISLAM_3,
      img_REGENT_ISLAM_4,
      img_REGENT_ISLAM_5,
      img_Islam_Night_View_15_FEb_2022_scaled_1,
    ],
    mapCoords: { lat: 23.7849, lng: 90.4302 },
    brochureUrl: "https://regentgroup.com.bd/wp-content/uploads/2025/02/regent-islam-all.pdf",
  },
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
  const staticProject = projectsData[slug || ""];
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [dbProject, setDbProject] = useState<any | null>(null);
  const [dbLoaded, setDbLoaded] = useState(false);

  const { isPreview, authLoading } = usePreview();

  useEffect(() => {
    if (!slug || authLoading) return;
    (async () => {
      let q = supabase
        .from("projects")
        .select("*")
        .eq("slug", slug);
      if (!isPreview) q = q.eq("is_active", true);
      const { data } = await q.maybeSingle();
      setDbProject(data);
      setDbLoaded(true);
    })();
  }, [slug, isPreview, authLoading]);

  // Build merged project data — DB takes precedence, fallback to hardcoded
  const project: ProjectData | null = (() => {
    if (!dbProject && !staticProject) return null;
    if (!dbProject) return staticProject;

    const cover = dbProject.cover_image_path
      ? supabase.storage.from("project-images").getPublicUrl(dbProject.cover_image_path).data.publicUrl
      : staticProject?.heroImage;
    const gallery: string[] = (dbProject.gallery_paths || []).map(
      (p: string) => supabase.storage.from("project-images").getPublicUrl(p).data.publicUrl
    );
    const brochure = dbProject.brochure_path
      ? supabase.storage.from("brochures").getPublicUrl(dbProject.brochure_path).data.publicUrl
      : staticProject?.brochureUrl;

    const glance: { icon: string; label: string; value: string }[] = [];
    if (dbProject.location) glance.push({ icon: "address", label: "Address", value: dbProject.location });
    if (dbProject.area_sqft) glance.push({ icon: "size", label: "Size", value: `${dbProject.area_sqft} SFT` });
    if (dbProject.units != null) glance.push({ icon: "total", label: "Total Apartments", value: String(dbProject.units) });
    if (dbProject.floors != null) glance.push({ icon: "floor", label: "Floor", value: String(dbProject.floors) });
    if (dbProject.handover_date)
      glance.push({
        icon: "handover",
        label: "Handover Date",
        value: new Date(dbProject.handover_date).toLocaleDateString("en-US", { year: "numeric", month: "long" }),
      });

    return {
      name: dbProject.name,
      tagline: dbProject.short_description || staticProject?.tagline || "",
      status: ((dbProject.status || staticProject?.status || "ongoing").toLowerCase() === "completed"
        ? "completed"
        : "ongoing") as "ongoing" | "completed",
      heroImage: cover || undefined,
      overview: dbProject.description || staticProject?.overview || "",
      features: (dbProject.amenities && dbProject.amenities.length ? dbProject.amenities : staticProject?.features) || [],
      progress: staticProject?.progress || [],
      glance: glance.length ? glance : staticProject?.glance || [],
      gallery: gallery.length ? gallery : staticProject?.gallery || [],
      mapCoords: {
        lat: dbProject.latitude ?? staticProject?.mapCoords.lat ?? 23.7697,
        lng: dbProject.longitude ?? staticProject?.mapCoords.lng ?? 90.4312,
      },
      brochureUrl: brochure || undefined,
    };
  })();

  if (!dbLoaded && !staticProject) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Loading…</div>
        </div>
        <Footer />
      </div>
    );
  }

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


  const glanceMap = Object.fromEntries(project.glance.map((g) => [g.label.toLowerCase(), g.value]));
  const address = glanceMap["address"] || "Dhaka, Bangladesh";
  const sizeStr = glanceMap["size"] || "";
  const bedroomStr = glanceMap["bedroom"] || "";
  const facing = glanceMap["project facing"] || "";
  const floor = glanceMap["floor"] || "";
  const totalApartments = glanceMap["total apartments"] || "";
  const handover = glanceMap["handover date"] || "";

  const sizeNumbers = sizeStr.match(/\d+/g)?.map(Number) ?? [];
  const bedroomNumbers = bedroomStr.match(/\d+/g)?.map(Number) ?? [];
  const projectUrl = `https://regent.ngital.com.bd/projects/${slug}`;

  const residenceSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: project.name,
    description: project.overview,
    url: projectUrl,
    image: project.gallery.length ? project.gallery : project.heroImage ? [project.heroImage] : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: project.mapCoords.lat,
      longitude: project.mapCoords.lng,
    },
    numberOfRooms: bedroomNumbers.length
      ? { "@type": "QuantitativeValue", minValue: Math.min(...bedroomNumbers), maxValue: Math.max(...bedroomNumbers), unitText: "bedrooms" }
      : undefined,
    floorSize: sizeNumbers.length
      ? { "@type": "QuantitativeValue", minValue: Math.min(...sizeNumbers), maxValue: Math.max(...sizeNumbers), unitCode: "FTK" }
      : undefined,
    numberOfRoomsTotal: totalApartments || undefined,
    amenityFeature: project.features.map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
    additionalProperty: [
      facing && { "@type": "PropertyValue", name: "Facing", value: facing },
      floor && { "@type": "PropertyValue", name: "Floors", value: floor },
      handover && { "@type": "PropertyValue", name: "Handover Date", value: handover },
      project.status && { "@type": "PropertyValue", name: "Status", value: project.status },
    ].filter(Boolean),
  };

  // Remove undefined keys
  Object.keys(residenceSchema).forEach((k) => residenceSchema[k] === undefined && delete residenceSchema[k]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://regent.ngital.com.bd/" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://regent.ngital.com.bd/projects" },
      { "@type": "ListItem", position: 3, name: project.name, item: projectUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEO
        title={`${project.name} — ${project.tagline}`}
        description={project.overview.slice(0, 160)}
        path={`/projects/${slug}`}
        image={project.heroImage}
        type="article"
        jsonLd={[residenceSchema, breadcrumbSchema]}
      />

      {/* Hero Section – Full View */}
      <section className="relative w-full overflow-hidden bg-background pt-20 md:h-screen md:pt-0">
        {project.heroImage ? (
          <img src={project.heroImage} alt={project.name} className="relative h-[22vh] w-full bg-card object-contain md:absolute md:inset-0 md:h-full md:object-cover" />
        ) : (
          <div
            className="relative h-[22vh] md:absolute md:inset-0 md:h-full"
            style={{
              background: "linear-gradient(135deg, hsl(240 51% 14%), hsl(194 89% 10%), hsl(0 0% 5%))",
            }}
          />
        )}
        <div className="absolute inset-0 hidden bg-gradient-to-t from-background via-background/60 to-background/20 md:block" />
        <div className="relative flex flex-col justify-end px-4 py-8 md:h-full md:pb-20 md:pt-0">
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
              <div className="grid grid-cols-2 gap-3 mt-6 md:mt-8 sm:flex sm:flex-row">
                <a
                  href="#schedule"
                  className="w-full sm:w-auto px-4 md:px-8 py-3 bg-primary text-primary-foreground text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-primary/90 transition-colors text-center"
                >
                  Schedule Visit
                </a>
                <a
                  href="#overview"
                  className="w-full sm:w-auto px-4 md:px-8 py-3 border border-border text-foreground text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] hover:border-primary hover:text-primary transition-colors text-center"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
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
              { icon: <Mail className="w-5 h-5" />, label: "Email Us", value: "info@regentgroup.com.bd", href: "mailto:info@regentgroup.com.bd" },
              { icon: <Clock className="w-5 h-5" />, label: "Office Hours", value: "Sat–Thu, 9AM–6PM", href: null },
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
      <ContactButton />
    </div>
  );
};

export default ProjectDetail;
