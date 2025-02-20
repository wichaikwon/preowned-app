export async function fetchPhones(): Promise<
  { brand_id: number; model_id: number; phone_id: number; storage: string; original_price: number }[]
> {
  try {
    const response = await fetch("https://2nd-phone-api-production.up.railway.app/phones/")
    if (!response.ok) {
      throw new Error("Failed to fetch phones")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching phones:", error)
    return []
  }
}
