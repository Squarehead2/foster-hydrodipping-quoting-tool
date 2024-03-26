// import { collection, getDocs, getFirestore } from "firebase/firestore";
// import { firestore } from "../../../../../_utils/firebase";

// export default async function getAllPatternPrices() {
//   try {
//     const patternsCollectionRef = collection(firestore, "patterns");
//     const patternsSnapshot = await getDocs(patternsCollectionRef);

//     const patternPrices = patternsSnapshot.docs.map((doc) => doc.data().price);

//     return patternPrices;
//   } catch (error) {
//     console.error("Error getting pattern prices: ", error);
//     return []; // Return an empty array in case of error
//   }
// }