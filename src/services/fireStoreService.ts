import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    QueryDocumentSnapshot,
  } from "firebase/firestore";
  import { db } from "../config/firebaseConfig";
  
  // Fetch paginated currency alerts
  export const fetchCurrencyAlerts = async () => {
    try {
      // Create Firestore query
      const alertsQuery = query(
        collection(db, "currency_exchange_alerts"),
        orderBy("createdAt", "desc") // Order alerts by creation date
      );
  
      // Fetch documents
      const querySnapshot = await getDocs(alertsQuery);
  
      // Map Firestore documents to usable objects
      const alerts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return alerts; // Return all alerts
    } catch (error) {
      console.error("Error fetching alerts:", error);
      throw error;
    }
  };
  
  
  // Real-time listener for alerts
  export const subscribeToAlerts = (
    callback: (alerts: any[]) => void,
    errorCallback?: (error: any) => void
  ) => {
    try {
      const alertsQuery = query(
        collection(db, "currency_exchange_alerts"),
        orderBy("createdAt", "desc")
      );
  
      const unsubscribe = onSnapshot(
        alertsQuery,
        (snapshot) => {
          const alerts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback(alerts);
        },
        (error) => {
          console.error("Error listening to alerts:", error);
          if (errorCallback) errorCallback(error);
        }
      );
  
      return unsubscribe; // Return the unsubscribe function for cleanup
    } catch (error) {
      console.error("Error subscribing to alerts:", error);
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

    // Save to Firestore
    await addDoc(collection(db, "currency_exchange_alerts"), {
      title: title.trim(),
      currencyPair,
      targetRate,
      triggered: false,
      createdAt: serverTimestamp(),
    });
    console.log("Rate alert saved successfully!");
  } catch (error) {
    console.error("Error saving rate alert:", error);
    throw error; // Re-throw the error for the calling component to handle
  }
};

  