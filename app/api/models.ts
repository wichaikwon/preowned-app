export async function fetchModels(): Promise<{ brand_id: number; model_id: number; name: string }[]> {
  try {
    const response = await fetch("https://2nd-phone-api-production.up.railway.app/models/")
    if (!response.ok) {
      throw new Error("Failed to fetch brands")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching brands:", error)
    return []
  }
}
