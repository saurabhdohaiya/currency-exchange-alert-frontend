import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
  } from "firebase/firestore";
  import { db } from "../config/firebaseConfig";
  
  export const fetchCurrencyAlerts = async () => {
    try {
      const alertsQuery = query(
        collection(db, "currency_exchange_alerts"),
        orderBy("createdAt", "desc") // Order alerts by creation date
      );
  
      const querySnapshot = await getDocs(alertsQuery);
  
      const alerts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return alerts; 
    } catch (error) {
      console.error("Error fetching alerts:", error);
      throw error;
    }
  };
  
/**
 * Save a rate alert to Firestore.
 * @param {string} title - Title of the rate alert.
 * @param {string} currencyPair - Currency pair (e.g., "AEDINR").
 * @param {number} targetRate - Target exchange rate.
 * @returns {Promise<void>}
 */
export const saveRateAlert = async (
  title: string,
  currencyPair: string,
  targetRate: number
) => {
  try {
    // Validate inputs
    if (!title.trim() || !currencyPair || targetRate <= 0) {
      throw new Error("Invalid input data");
    }

    const payload = {
      title: title.trim(),
      currencyPair,
      targetRate,
      triggered: false,
      createdAt: serverTimestamp(),
    };
    // Save to Firestore
    await addDoc(collection(db, "currency_exchange_alerts"), payload);
    console.log("Rate alert saved successfully!");
    return payload;
  } catch (error) {
    console.error("Error saving rate alert:", error);
    throw error; // Re-throw the error for the calling component to handle
  }
};

  